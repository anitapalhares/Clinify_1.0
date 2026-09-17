"""Interpreta o JSON de atividades criado pelo JavaScript e persiste por aluno.

Usa somente recursos da biblioteca padrão: listas, dicionários, funções,
condicionais, leitura e escrita de arquivos JSON.
"""
import json
import os

from dados import agora

PASTA = os.path.join(os.path.dirname(__file__), "dados")
ARQUIVO = os.path.join(PASTA, "atividades_alunos.json")


def ler():
    """Lê o arquivo de atividades ou devolve uma estrutura vazia."""
    try:
        with open(ARQUIVO, "r", encoding="utf-8") as arquivo:
            dados = json.load(arquivo)
    except FileNotFoundError:
        return {"versao": 1, "alunos": []}
    except (OSError, json.JSONDecodeError):
        raise ValueError("Não foi possível ler as atividades dos alunos.")

    if not isinstance(dados, dict) or not isinstance(dados.get("alunos"), list):
        raise ValueError("Formato do arquivo de atividades inválido.")
    return dados


def salvar(dados):
    """Grava os dados das atividades no arquivo JSON."""
    os.makedirs(PASTA, exist_ok=True)
    try:
        with open(ARQUIVO, "w", encoding="utf-8") as arquivo:
            json.dump(dados, arquivo, ensure_ascii=False, indent=2)
    except OSError:
        raise ValueError("Não foi possível salvar as atividades dos alunos.")


def texto(valor, campo, limite):
    if not isinstance(valor, str) or not valor.strip():
        raise ValueError(f"O campo {campo} deve ser um texto.")
    valor = " ".join(valor.split())
    if len(valor) > limite:
        raise ValueError(f"O campo {campo} excede {limite} caracteres.")
    return valor


def numero(valor, campo):
    if isinstance(valor, bool) or not isinstance(valor, (int, float)) or valor < 0:
        raise ValueError(f"O campo {campo} deve ser um número maior ou igual a zero.")
    return valor


def interpretar(json_recebido):
    """Valida e normaliza o dicionário produzido por JSON.parse no servidor."""
    if not isinstance(json_recebido, dict):
        raise ValueError("O JSON deve conter um objeto.")
    if json_recebido.get("versao") != 1:
        raise ValueError("Versão do JSON de atividades não suportada.")

    aluno_recebido = json_recebido.get("aluno")
    if not isinstance(aluno_recebido, dict):
        raise ValueError("Dados do aluno não informados.")
    aluno = {
        "id": texto(aluno_recebido.get("id"), "aluno.id", 120),
        "nome": texto(aluno_recebido.get("nome"), "aluno.nome", 120),
        "email": texto(aluno_recebido.get("email"), "aluno.email", 160),
    }

    lista = json_recebido.get("atividades")
    if not isinstance(lista, list) or not 1 <= len(lista) <= 100:
        raise ValueError("Envie de 1 a 100 atividades.")

    atividades = []
    for item in lista:
        if not isinstance(item, dict):
            raise ValueError("Cada atividade deve ser um objeto.")
        tipo = texto(item.get("tipo"), "atividade.tipo", 20)
        if tipo not in ("estudo", "simulado"):
            raise ValueError("O tipo deve ser estudo ou simulado.")
        detalhes = item.get("detalhes", {})
        if not isinstance(detalhes, dict):
            raise ValueError("Os detalhes da atividade devem formar um objeto.")
        atividades.append({
            "id": texto(item.get("id"), "atividade.id", 140),
            "tipo": tipo,
            "recurso": texto(item.get("recurso"), "atividade.recurso", 120),
            "titulo": texto(item.get("titulo"), "atividade.titulo", 160),
            "estado": "concluida",
            "concluida_em": texto(item.get("concluida_em"), "atividade.concluida_em", 50),
            "duracao_segundos": numero(item.get("duracao_segundos", 0), "atividade.duracao_segundos"),
            "pontuacao": numero(item.get("pontuacao", 0), "atividade.pontuacao"),
            "detalhes": detalhes,
        })

    return {"aluno": aluno, "atividades": atividades}


def resumir(aluno):
    estudos_concluidos = 0
    simulados_concluidos = 0
    soma_simulados = 0

    for atividade in aluno["atividades"]:
        if atividade["tipo"] == "estudo":
            estudos_concluidos += 1
        elif atividade["tipo"] == "simulado":
            simulados_concluidos += 1
            soma_simulados += atividade["pontuacao"]

    media = 0
    if simulados_concluidos > 0:
        media = round(soma_simulados / simulados_concluidos, 1)

    return {
        "aluno_id": aluno["id"],
        "total_atividades": len(aluno["atividades"]),
        "estudos_concluidos": estudos_concluidos,
        "simulados_concluidos": simulados_concluidos,
        "media_simulados": media,
    }


def registrar_lote(json_recebido):
    """Interpreta o lote e atualiza atividades sem duplicar o mesmo ID."""
    pacote = interpretar(json_recebido)
    dados = ler()
    aluno = None
    for aluno_salvo in dados["alunos"]:
        if aluno_salvo.get("id") == pacote["aluno"]["id"]:
            aluno = aluno_salvo

    if aluno is None:
        aluno = dict(pacote["aluno"])
        aluno["atividades"] = []
        dados["alunos"].append(aluno)
    else:
        aluno.update(pacote["aluno"])

    for atividade_nova in pacote["atividades"]:
        atividade_existente = None
        for atividade_salva in aluno["atividades"]:
            if atividade_salva["id"] == atividade_nova["id"]:
                atividade_existente = atividade_salva

        if atividade_existente is None:
            aluno["atividades"].append(atividade_nova)
        else:
            atividade_existente.update(atividade_nova)
    aluno["atualizado_em"] = agora()
    salvar(dados)

    return {
        "mensagem": "Atividades interpretadas e salvas pelo Python.",
        "recebidas": len(pacote["atividades"]),
        "resumo": resumir(aluno),
    }


def consultar(aluno_id):
    dados = ler()
    aluno_encontrado = None
    for aluno in dados["alunos"]:
        if aluno.get("id") == aluno_id:
            aluno_encontrado = aluno

    if aluno_encontrado is None:
        raise ValueError("Aluno não encontrado.")
    return {"aluno": aluno_encontrado, "resumo": resumir(aluno_encontrado)}


def listar_resumos():
    resumos = []
    dados = ler()
    for aluno in dados["alunos"]:
        resumos.append(resumir(aluno))
    return resumos
