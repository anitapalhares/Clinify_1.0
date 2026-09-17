"""Monta cenários fictícios a partir das escolhas do estudante.

O projeto usa regras e modelos de texto, sem solicitar diagnósticos.
"""
from datetime import datetime


MATERIAS = {
    "cardiologia": ("Cardiologia", "Sinto um desconforto no peito e gostaria de entender o que está acontecendo."),
    "pneumologia": ("Pneumologia", "Minha respiração mudou e isso tem me preocupado."),
    "neurologia": ("Neurologia", "Tenho percebido sintomas diferentes e quero contar quando começaram."),
    "gastroenterologia": ("Gastroenterologia", "Tenho sentido um desconforto digestivo e gostaria de conversar sobre isso."),
    "endocrinologia": ("Endocrinologia", "Notei mudanças no meu corpo e gostaria de entender melhor."),
    "histologia": ("Histologia", "Recebi informações sobre um exame e gostaria de entender o contexto da avaliação."),
}

DIFICULDADES = {
    "facil": ("Fácil", "Organize a queixa principal e faça perguntas iniciais."),
    "media": ("Média", "Investigue a evolução dos sintomas e os sinais que precisam de atenção."),
    "dificil": ("Difícil", "Priorize sinais de alerta e explique uma avaliação supervisionada com clareza."),
}

SINAIS_VITAIS = {
    "cardiologia": {"pa": "148/92", "fc": "104", "temperatura": "36,7", "dor": "7/10", "dorDescricao": "forte"},
    "pneumologia": {"pa": "126/78", "fc": "98", "temperatura": "37,2", "dor": "2/10", "dorDescricao": "leve"},
    "neurologia": {"pa": "120/80", "fc": "72", "temperatura": "36,5", "dor": "8/10", "dorDescricao": "intensa"},
    "gastroenterologia": {"pa": "112/72", "fc": "88", "temperatura": "37,1", "dor": "6/10", "dorDescricao": "moderada"},
    "endocrinologia": {"pa": "138/86", "fc": "92", "temperatura": "36,4", "dor": "3/10", "dorDescricao": "leve"},
    "histologia": {"pa": "118/76", "fc": "74", "temperatura": "36,6", "dor": "0/10", "dorDescricao": "ausente"},
}


def gerar(materia, dificuldade, caracteristicas):
    if not isinstance(materia, str) or materia not in MATERIAS:
        raise ValueError("Selecione uma matéria válida.")
    if not isinstance(dificuldade, str) or dificuldade not in DIFICULDADES:
        raise ValueError("Selecione uma dificuldade válida.")
    if not isinstance(caracteristicas, str):
        raise ValueError("Descreva as características do caso.")
    descricao = " ".join(caracteristicas.split())
    if not 20 <= len(descricao) <= 500:
        raise ValueError("Descreva o caso com 20 a 500 caracteres.")

    area, fala = MATERIAS[materia]
    nivel, objetivo = DIFICULDADES[dificuldade]
    return {
        "id": "personalizado-" + datetime.now().strftime("%Y%m%d%H%M%S%f"),
        "materia": materia,
        "area": area,
        "dificuldade": dificuldade,
        "titulo": "Caso personalizado de " + area,
        "pessoa": "Paciente fictício",
        "resumo": descricao,
        "fala": fala,
        "objetivo": objetivo,
        "nivel": nivel,
        "sinaisVitais": dict(SINAIS_VITAIS[materia]),
    }
