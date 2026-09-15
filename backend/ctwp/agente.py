"""Agente educacional baseado em regras simples para um caso fictício.

Não realiza diagnóstico. Cada critério só pontua uma vez por tentativa.
"""
import unicodedata

CRITERIOS = (
    ("acolhimento", ("ola", "bom dia", "como posso ajudar", "entendo", "compreendo"),
     "Boa abertura: acolhimento e linguagem clara ajudam a conduzir a conversa."),
    ("anamnese", ("quando comecou", "inicio", "duracao", "intensidade", "localizacao", "historia", "sintomas"),
     "Você investigou a história da queixa. Continue organizando as perguntas."),
    ("sinais de alerta", ("febre", "rigidez", "fraqueza", "visao", "confusao", "neurolog", "subita", "pior dor"),
     "Você procurou sinais de alerta. Em uma situação real, isso exigiria avaliação profissional."),
    ("segurança", ("avaliacao", "encaminhar", "urgencia", "emergencia", "supervisao", "exame", "retorno"),
     "Você considerou um encaminhamento ou avaliação supervisionada."),
)


def normalizar(texto):
    texto = unicodedata.normalize("NFD", texto.lower())
    return "".join(letra for letra in texto if unicodedata.category(letra) != "Mn")


def analisar(texto, encontrados):
    """Retorna critérios encontrados, feedback e ganho de pontos (0 a 18)."""
    frase = normalizar(texto)
    novos = []
    mensagens = []
    for nome, palavras, feedback in CRITERIOS:
        if nome not in encontrados and any(palavra in frase for palavra in palavras):
            novos.append(nome)
            mensagens.append(feedback)
    if not mensagens:
        mensagens.append("Resposta registrada. Detalhe a história, os sinais de alerta e a conduta segura.")
    return {"criterios": novos, "feedback": " ".join(mensagens), "ganho": min(18, 9 * len(novos))}
