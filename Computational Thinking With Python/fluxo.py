"""Passos principais: iniciar, responder, concluir e consultar uma tentativa."""
import agente
import dados


def buscar(lista, identificador):
    for tentativa in lista:
        if tentativa.get("id") == identificador:
            return tentativa
    return None


def responder(identificador, fala, codigo="", caso="cefaleia"):
    if not isinstance(identificador, str) or not 1 <= len(identificador) <= 100:
        raise ValueError("Identificador da tentativa inválido.")
    if not isinstance(fala, str) or not 1 <= len(fala.strip()) <= 2000:
        raise ValueError("Escreva uma resposta de até 2000 caracteres.")
    if not isinstance(codigo, str) or len(codigo) > 20:
        raise ValueError("Código da sala inválido.")
    if not isinstance(caso, str) or not 1 <= len(caso) <= 80:
        raise ValueError("Caso inválido.")
    base = dados.ler()
    tentativa = buscar(base["tentativas"], identificador)
    if tentativa is None:
        tentativa = {"id": identificador, "codigo_sala": codigo, "caso": caso, "inicio": dados.agora(),
                     "estado": "em andamento", "respostas": [], "criterios": [], "pontos": 64}
        base["tentativas"].append(tentativa)
    if tentativa["estado"] != "em andamento":
        raise ValueError("A tentativa já foi concluída.")
    resultado = agente.analisar(fala.strip(), set(tentativa["criterios"]))
    tentativa["criterios"].extend(resultado["criterios"])
    tentativa["pontos"] = min(100, tentativa["pontos"] + resultado["ganho"])
    tentativa["respostas"].append({"fala": fala.strip(), "feedback": resultado["feedback"],
                                    "criterios": resultado["criterios"], "data": dados.agora()})
    dados.salvar(base)
    return {"feedback": resultado["feedback"], "criterios": resultado["criterios"], "criterios_total": tentativa["criterios"],
            "pontos": tentativa["pontos"], "respostas": len(tentativa["respostas"])}


def concluir(identificador):
    base = dados.ler()
    tentativa = buscar(base["tentativas"], identificador)
    if tentativa is None:
        raise ValueError("Responda ao caso antes de concluí-lo.")
    if tentativa["estado"] != "em andamento":
        raise ValueError("A tentativa já foi concluída.")
    tentativa["estado"] = "concluída"
    tentativa["fim"] = dados.agora()
    dados.salvar(base)
    return {"pontos": tentativa["pontos"], "criterios": tentativa["criterios"],
            "respostas": len(tentativa["respostas"]), "estado": tentativa["estado"]}
