"""Serve o site e uma API JSON no mesmo endereço, sem dependências externas."""
import json
import os
from http.server import SimpleHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, unquote, parse_qs
import fluxo
import gerador
import atividades
import interacoes

# Esta classe contém somente a adaptação exigida pela biblioteca da API.
PASTA_PROJETO = os.path.dirname(os.path.dirname(__file__))
RAIZ = os.path.join(PASTA_PROJETO, "Front Web")


class Aplicacao(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=RAIZ, **kwargs)

    def responder_json(self, codigo, corpo):
        conteudo = json.dumps(corpo, ensure_ascii=False).encode("utf-8")
        self.send_response(codigo)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(conteudo)))
        self.end_headers()
        self.wfile.write(conteudo)

    def do_GET(self):
        endereco = urlparse(self.path)
        caminho = unquote(endereco.path)
        if caminho == "/":
            self.path = "/login.html"
            super().do_GET()
        elif caminho == "/api/saude":
            self.responder_json(200, {"servico": "Clinify CTWP", "estado": "ativo"})
        elif caminho == "/api/atividades":
            try:
                aluno_id = parse_qs(endereco.query).get("aluno_id", [""])[0]
                self.responder_json(200, atividades.consultar(aluno_id))
            except ValueError as erro:
                self.responder_json(404, {"erro": str(erro)})
        elif caminho.startswith("/api/"):
            self.responder_json(404, {"erro": "Rota não encontrada."})
        elif caminho == "/backend" or caminho.startswith("/backend/") or caminho.startswith("/.git"):
            self.send_error(404)
        else:
            super().do_GET()

    def do_POST(self):
        caminho = unquote(urlparse(self.path).path)
        if caminho not in ("/api/responder", "/api/concluir", "/api/gerar-caso", "/api/atividades", "/api/interacoes"):
            self.responder_json(404, {"erro": "Rota não encontrada."})
            return
        try:
            tamanho = int(self.headers.get("Content-Length", "0"))
            if not 1 <= tamanho <= 10000:
                raise ValueError("Requisição vazia ou grande demais.")
            entrada = json.loads(self.rfile.read(tamanho))
            if not isinstance(entrada, dict):
                raise ValueError("Envie um objeto JSON.")
            if caminho == "/api/atividades":
                resposta = atividades.registrar_lote(entrada)
            elif caminho == "/api/interacoes":
                resposta = interacoes.registrar(entrada)
            elif caminho == "/api/responder":
                resposta = fluxo.responder(entrada.get("tentativa"), entrada.get("fala"), entrada.get("codigo_sala", ""), entrada.get("caso", "cefaleia"))
            elif caminho == "/api/gerar-caso":
                resposta = gerador.gerar(entrada.get("materia"), entrada.get("dificuldade"), entrada.get("caracteristicas"))
            else:
                resposta = fluxo.concluir(entrada.get("tentativa"))
            self.responder_json(200, resposta)
        except (ValueError, json.JSONDecodeError) as erro:
            self.responder_json(400, {"erro": str(erro)})


def executar(host="127.0.0.1", porta=8000):
    with HTTPServer((host, porta), Aplicacao) as servidor:
        print(f"Clinify disponível em http://{host}:{porta}/")
        servidor.serve_forever()
