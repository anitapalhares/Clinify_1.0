"""Importa, valida e salva os dados JSON exportados pelo Front Web do Clinify."""

import os
import json
from datetime import datetime


PASTA = os.path.join(os.path.dirname(__file__), "dados")
ARQUIVO = os.path.join(PASTA, "dados_alunos.json")


def ler_json(caminho):
    """Lê um arquivo JSON sem alterar os dados já persistidos."""
    try:
        with open(caminho, "r", encoding="utf-8") as arquivo:
            return json.load(arquivo)
    except FileNotFoundError:
        raise ValueError("Arquivo JSON não encontrado.")
    except json.JSONDecodeError:
        raise ValueError("O arquivo não contém um JSON válido.")
    except OSError:
        raise ValueError("Não foi possível abrir o arquivo.")


def base_vazia():
    return {"versao": 1, "usuarios": []}


def ler_dados_salvos():
    if not os.path.exists(ARQUIVO):
        return base_vazia()
    dados = ler_json(ARQUIVO)
    if not isinstance(dados, dict) or dados.get("versao") != 1:
        raise ValueError("O arquivo de dados salvos possui versão inválida.")
    if not isinstance(dados.get("usuarios"), list):
        raise ValueError("O arquivo de dados salvos está inconsistente.")
    return dados


def salvar(dados):
    """Grava primeiro em um temporário para preservar o arquivo em caso de erro."""
    os.makedirs(PASTA, exist_ok=True)
    temporario = ARQUIVO + ".tmp"
    dados["atualizado_em"] = datetime.now().isoformat(timespec="seconds")
    try:
        with open(temporario, "w", encoding="utf-8") as arquivo:
            json.dump(dados, arquivo, ensure_ascii=False, indent=2)
        os.replace(temporario, ARQUIVO)
    except OSError:
        if os.path.exists(temporario):
            try:
                os.remove(temporario)
            except OSError:
                pass
        raise ValueError("Não foi possível salvar os dados.")


def validar_texto(valor, campo, limite, obrigatorio=True):
    if not isinstance(valor, str):
        raise ValueError("O campo " + campo + " deve ser um texto.")
    valor = " ".join(valor.split())
    if obrigatorio and not valor:
        raise ValueError("O campo " + campo + " é obrigatório.")
    if len(valor) > limite:
        raise ValueError("O campo " + campo + " ultrapassou o limite de caracteres.")
    return valor


def validar_data(valor, campo):
    texto = validar_texto(valor, campo, 50)
    try:
        datetime.fromisoformat(texto.replace("Z", "+00:00"))
    except ValueError:
        raise ValueError("O campo " + campo + " deve usar uma data ISO 8601.")
    return texto


def validar_numero(valor, campo, minimo, maximo=None):
    if isinstance(valor, bool) or not isinstance(valor, (int, float)):
        raise ValueError("O campo " + campo + " deve ser numérico.")
    if valor < minimo or (maximo is not None and valor > maximo):
        raise ValueError("O campo " + campo + " está fora do intervalo esperado.")
    return valor


def validar_pacote(pacote):
    """Valida o contrato versão 1 e preserva todos os campos documentados."""
    if not isinstance(pacote, dict) or pacote.get("versao") != 1:
        raise ValueError("Formato ou versão do JSON inválida.")
    gerado_em = validar_data(pacote.get("gerado_em"), "gerado_em")
    usuario_json = pacote.get("usuario")
    interacoes = pacote.get("interacoes")
    atividades = pacote.get("atividades")
    if not isinstance(usuario_json, dict):
        raise ValueError("Dados do usuário não encontrados.")
    if not isinstance(interacoes, list) or not isinstance(atividades, list):
        raise ValueError("Interações ou atividades devem ser listas.")

    email = usuario_json.get("email", "")
    usuario = {
        "id": validar_texto(usuario_json.get("id"), "usuario.id", 160),
        "nome": validar_texto(usuario_json.get("nome"), "usuario.nome", 120),
        "email": validar_texto(email, "usuario.email", 160, False),
        "perfil": validar_texto(usuario_json.get("perfil"), "usuario.perfil", 30),
        "ultimo_pacote_em": gerado_em,
        "interacoes": [],
        "atividades": []
    }

    for item in interacoes:
        if not isinstance(item, dict):
            raise ValueError("Uma interação está inválida.")
        usuario["interacoes"].append({
            "id": validar_texto(item.get("id"), "interacao.id", 140),
            "tipo": validar_texto(item.get("tipo"), "interacao.tipo", 30),
            "acao": validar_texto(item.get("acao"), "interacao.acao", 100),
            "pagina": validar_texto(item.get("pagina"), "interacao.pagina", 240),
            "data": validar_data(item.get("data"), "interacao.data")
        })

    for item in atividades:
        if not isinstance(item, dict):
            raise ValueError("Uma atividade está inválida.")
        detalhes = item.get("detalhes", {})
        if not isinstance(detalhes, dict):
            raise ValueError("O campo atividade.detalhes deve ser um objeto.")
        usuario["atividades"].append({
            "id": validar_texto(item.get("id"), "atividade.id", 160),
            "tipo": validar_texto(item.get("tipo"), "atividade.tipo", 30),
            "recurso": validar_texto(item.get("recurso", ""), "atividade.recurso", 160, False),
            "titulo": validar_texto(item.get("titulo"), "atividade.titulo", 160),
            "estado": validar_texto(item.get("estado"), "atividade.estado", 30),
            "concluida_em": validar_data(item.get("concluida_em"), "atividade.concluida_em"),
            "duracao_segundos": validar_numero(item.get("duracao_segundos", 0), "atividade.duracao_segundos", 0),
            "pontuacao": validar_numero(item.get("pontuacao", 0), "atividade.pontuacao", 0, 100),
            "detalhes": detalhes
        })
    return usuario


def adicionar_ou_atualizar(lista, recebidos):
    """Usa o identificador do registro para tornar a reimportação idempotente."""
    novos = 0
    atualizados = 0
    for recebido in recebidos:
        indice = -1
        for posicao, salvo in enumerate(lista):
            if isinstance(salvo, dict) and salvo.get("id") == recebido["id"]:
                indice = posicao
                break
        if indice == -1:
            lista.append(recebido)
            novos += 1
        elif lista[indice] != recebido:
            lista[indice] = recebido
            atualizados += 1
    return novos, atualizados


def importar(caminho):
    """Valida todo o pacote antes de modificar e salvar a base local."""
    pacote = ler_json(os.path.expanduser(caminho))
    recebido = validar_pacote(pacote)
    dados = ler_dados_salvos()
    usuario = None
    for item in dados["usuarios"]:
        if isinstance(item, dict) and item.get("id") == recebido["id"]:
            usuario = item
            break
    if usuario is None:
        usuario = {
            "id": recebido["id"], "nome": recebido["nome"],
            "email": recebido["email"], "perfil": recebido["perfil"],
            "ultimo_pacote_em": recebido["ultimo_pacote_em"],
            "interacoes": [], "atividades": []
        }
        dados["usuarios"].append(usuario)
    else:
        usuario["nome"] = recebido["nome"]
        usuario["email"] = recebido["email"]
        usuario["perfil"] = recebido["perfil"]
        usuario["ultimo_pacote_em"] = recebido["ultimo_pacote_em"]
        if not isinstance(usuario.get("interacoes"), list) or not isinstance(usuario.get("atividades"), list):
            raise ValueError("Os registros já salvos deste usuário estão inconsistentes.")

    novas_interacoes, interacoes_atualizadas = adicionar_ou_atualizar(usuario["interacoes"], recebido["interacoes"])
    novas_atividades, atividades_atualizadas = adicionar_ou_atualizar(usuario["atividades"], recebido["atividades"])
    salvar(dados)
    return {
        "interacoes_novas": novas_interacoes,
        "interacoes_atualizadas": interacoes_atualizadas,
        "atividades_novas": novas_atividades,
        "atividades_atualizadas": atividades_atualizadas
    }


def criar_resumo(usuario):
    estudos = []
    simulados = []
    paginas = {}
    for atividade in usuario.get("atividades", []):
        if atividade.get("tipo") == "estudo":
            estudos.append(atividade)
        elif atividade.get("tipo") == "simulado":
            simulados.append(atividade)
    for interacao in usuario.get("interacoes", []):
        pagina = interacao.get("pagina", "")
        paginas[pagina] = paginas.get(pagina, 0) + 1
    pagina_mais_acessada = "—"
    if paginas:
        pagina_mais_acessada = max(paginas, key=paginas.get)
    media = 0
    if simulados:
        media = round(sum(item.get("pontuacao", 0) for item in simulados) / len(simulados), 1)
    duracao = sum(item.get("duracao_segundos", 0) for item in usuario.get("atividades", []))
    return {
        "interacoes": len(usuario.get("interacoes", [])),
        "estudos": len(estudos),
        "simulados": len(simulados),
        "media_simulados": media,
        "duracao_segundos": duracao,
        "pagina_mais_acessada": pagina_mais_acessada
    }


def mostrar_resumo():
    dados = ler_dados_salvos()
    if not dados["usuarios"]:
        print("Nenhum JSON foi importado.")
        return
    for usuario in dados["usuarios"]:
        resumo = criar_resumo(usuario)
        print("\nUsuário:", usuario.get("nome", "Sem nome"), "-", usuario.get("perfil", "sem perfil"))
        print("Interações:", resumo["interacoes"])
        print("Estudos concluídos:", resumo["estudos"])
        print("Simulados concluídos:", resumo["simulados"])
        print("Média nos simulados:", resumo["media_simulados"])
        print("Tempo registrado:", resumo["duracao_segundos"], "segundos")
        print("Página com mais interações:", resumo["pagina_mais_acessada"])


def listar_atividades():
    dados = ler_dados_salvos()
    encontrou = False
    for usuario in dados["usuarios"]:
        atividades = usuario.get("atividades", [])
        if atividades:
            encontrou = True
            print("\nAtividades de", usuario.get("nome", "Sem nome"))
            for atividade in sorted(atividades, key=lambda item: item.get("concluida_em", ""), reverse=True):
                print("-", atividade.get("concluida_em", "sem data"), "|", atividade.get("titulo", "sem título"), "|", atividade.get("pontuacao", 0), "pontos")
    if not encontrou:
        print("Nenhuma atividade foi importada.")


def executar():
    while True:
        print("\nClinify - dados exportados pelo Front Web")
        print("1. Importar clinify_dados.json")
        print("2. Mostrar resumo dos alunos")
        print("3. Listar atividades recentes")
        print("0. Sair")
        escolha = input("Escolha: ").strip()
        try:
            if escolha == "1":
                padrao = os.path.expanduser("~/Downloads/clinify_dados.json")
                caminho = input("Caminho do JSON [" + padrao + "]: ").strip() or padrao
                resultado = importar(caminho)
                print("Importação concluída:", resultado["interacoes_novas"], "interações novas e", resultado["atividades_novas"], "atividades novas.")
                if resultado["interacoes_atualizadas"] or resultado["atividades_atualizadas"]:
                    print("Registros atualizados:", resultado["interacoes_atualizadas"], "interações e", resultado["atividades_atualizadas"], "atividades.")
            elif escolha == "2":
                mostrar_resumo()
            elif escolha == "3":
                listar_atividades()
            elif escolha == "0":
                break
            else:
                print("Escolha uma opção válida.")
        except ValueError as erro:
            print("Erro:", erro)


if __name__ == "__main__":
    executar()
