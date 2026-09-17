"""Recebe interações do Front Web e salva os dados em JSON."""
import json
import os

PASTA = os.path.join(os.path.dirname(__file__), "dados")
ARQUIVO = os.path.join(PASTA, "interacoes.json")


def ler():
    try:
        with open(ARQUIVO, "r", encoding="utf-8") as arquivo:
            dados = json.load(arquivo)
            if isinstance(dados, dict) and isinstance(dados.get("usuarios"), list):
                return dados
    except FileNotFoundError:
        return {"usuarios": []}
    except (OSError, json.JSONDecodeError):
        raise ValueError("Não foi possível ler as interações.")
    raise ValueError("Formato das interações inválido.")


def salvar(dados):
    os.makedirs(PASTA, exist_ok=True)
    try:
        with open(ARQUIVO, "w", encoding="utf-8") as arquivo:
            json.dump(dados, arquivo, ensure_ascii=False, indent=2)
    except OSError:
        raise ValueError("Não foi possível salvar as interações.")


def validar_texto(valor, nome, limite):
    if not isinstance(valor, str) or not valor.strip():
        raise ValueError("O campo " + nome + " é obrigatório.")
    valor = " ".join(valor.split())
    if len(valor) > limite:
        raise ValueError("O campo " + nome + " é muito grande.")
    return valor


def registrar(pacote):
    if not isinstance(pacote, dict) or pacote.get("versao") != 1:
        raise ValueError("JSON de interações inválido.")

    usuario_recebido = pacote.get("usuario")
    lista_recebida = pacote.get("interacoes")
    if not isinstance(usuario_recebido, dict):
        raise ValueError("Usuário não informado.")
    if not isinstance(lista_recebida, list) or len(lista_recebida) == 0 or len(lista_recebida) > 100:
        raise ValueError("Envie de 1 a 100 interações.")

    usuario_id = validar_texto(usuario_recebido.get("id"), "usuario.id", 160)
    perfil = validar_texto(usuario_recebido.get("perfil"), "usuario.perfil", 30)
    novas = []
    tipos = ("navegacao", "clique", "formulario")

    for item in lista_recebida:
        if not isinstance(item, dict):
            raise ValueError("Cada interação deve ser um objeto JSON.")
        tipo = validar_texto(item.get("tipo"), "interacao.tipo", 30)
        if tipo not in tipos:
            raise ValueError("Tipo de interação inválido.")
        novas.append({
            "id": validar_texto(item.get("id"), "interacao.id", 100),
            "tipo": tipo,
            "acao": validar_texto(item.get("acao"), "interacao.acao", 100),
            "pagina": validar_texto(item.get("pagina"), "interacao.pagina", 200),
            "data": validar_texto(item.get("data"), "interacao.data", 50)
        })

    dados = ler()
    usuario = None
    for registro in dados["usuarios"]:
        if registro["id"] == usuario_id:
            usuario = registro
    if usuario is None:
        usuario = {"id": usuario_id, "perfil": perfil, "interacoes": []}
        dados["usuarios"].append(usuario)

    for nova in novas:
        existe = False
        for salva in usuario["interacoes"]:
            if salva["id"] == nova["id"]:
                existe = True
        if not existe:
            usuario["interacoes"].append(nova)

    salvar(dados)
    return {"mensagem": "Interações recebidas pelo Python.", "recebidas": len(novas)}


def total():
    quantidade = 0
    dados = ler()
    for usuario in dados["usuarios"]:
        quantidade += len(usuario["interacoes"])
    return quantidade
