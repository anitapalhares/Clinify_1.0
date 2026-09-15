"""Persistência JSON de tentativas fictícias. Apenas biblioteca padrão."""
import json
from pathlib import Path
from datetime import datetime, timezone

ARQUIVO = Path(__file__).resolve().parent / "dados" / "tentativas.json"


def ler():
    try:
        with ARQUIVO.open("r", encoding="utf-8") as arquivo:
            dados = json.load(arquivo)
        if isinstance(dados, dict) and isinstance(dados.get("tentativas"), list):
            return dados
    except FileNotFoundError:
        return {"tentativas": []}
    except (OSError, json.JSONDecodeError) as erro:
        raise ValueError("Não foi possível ler as tentativas salvas.") from erro
    raise ValueError("Formato dos dados de tentativas inválido.")


def salvar(dados):
    ARQUIVO.parent.mkdir(parents=True, exist_ok=True)
    temporario = ARQUIVO.with_suffix(".tmp")
    try:
        with temporario.open("w", encoding="utf-8") as arquivo:
            json.dump(dados, arquivo, ensure_ascii=False, indent=2)
        temporario.replace(ARQUIVO)
    except OSError as erro:
        raise ValueError("Não foi possível salvar as tentativas.") from erro


def agora():
    return datetime.now(timezone.utc).isoformat()
