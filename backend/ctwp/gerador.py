"""Monta cenários fictícios a partir das escolhas do estudante.

O projeto usa regras e modelos de texto, sem solicitar diagnósticos.
"""
from uuid import uuid4


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
        "id": "personalizado-" + uuid4().hex,
        "materia": materia,
        "area": area,
        "dificuldade": dificuldade,
        "titulo": "Caso personalizado de " + area,
        "pessoa": "Paciente fictício",
        "resumo": descricao,
        "fala": fala,
        "objetivo": objetivo,
        "nivel": nivel,
    }
