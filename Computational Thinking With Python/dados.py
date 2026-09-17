"""Leitura e gravação das tentativas em um arquivo JSON."""
import json
import os
from datetime import datetime, timezone

PASTA = os.path.join(os.path.dirname(__file__), "dados")
ARQUIVO = os.path.join(PASTA, "tentativas.json")


def ler():
    try:
        with open(ARQUIVO, "r", encoding="utf-8") as arquivo:
            dados = json.load(arquivo)
        if isinstance(dados, dict) and isinstance(dados.get("tentativas"), list):
            return dados
    except FileNotFoundError:
        return {"tentativas": []}
    except (OSError, json.JSONDecodeError):
        raise ValueError("Não foi possível ler as tentativas salvas.")
    raise ValueError("Formato dos dados de tentativas inválido.")


def salvar(dados):
    os.makedirs(PASTA, exist_ok=True)
    try:
        with open(ARQUIVO, "w", encoding="utf-8") as arquivo:
            json.dump(dados, arquivo, ensure_ascii=False, indent=2)
    except OSError:
        raise ValueError("Não foi possível salvar as tentativas.")


def agora():
    return datetime.now(timezone.utc).isoformat()
