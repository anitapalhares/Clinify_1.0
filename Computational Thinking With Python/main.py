import os
import json
from datetime import datetime


PASTA_DADOS = os.path.join(os.path.dirname(__file__), "dados")


def listar_jsons():
    if not os.path.isdir(PASTA_DADOS):
        return []
    arquivos = []
    for nome in os.listdir(PASTA_DADOS):
        caminho = os.path.join(PASTA_DADOS, nome)
        if os.path.isfile(caminho) and nome.lower().endswith(".json"):
            arquivos.append(nome)
    return sorted(arquivos, key=str.lower)


def escolher_arquivo(arquivos):
    print("Arquivos disponíveis na pasta dados:\n")
    for numero, nome in enumerate(arquivos, start=1):
        print(str(numero) + ".", nome)
    print("0. Sair")

    while True:
        escolha = input("\nEscolha um arquivo: ").strip()
        if escolha == "0":
            return None
        if escolha.isdigit():
            indice = int(escolha) - 1
            if 0 <= indice < len(arquivos):
                return os.path.join(PASTA_DADOS, arquivos[indice])
        print("Digite um número exibido na lista.")


def ler_json(caminho):
    try:
        with open(caminho, "r", encoding="utf-8") as arquivo:
            return json.load(arquivo)
    except json.JSONDecodeError:
        raise ValueError("O arquivo não contém um JSON válido.")
    except OSError:
        raise ValueError("Não foi possível abrir o arquivo.")


def formatar_data(valor):
    if not isinstance(valor, str) or not valor:
        return "não informada"
    try:
        data = datetime.fromisoformat(valor.replace("Z", "+00:00"))
        return data.strftime("%d/%m/%Y às %H:%M")
    except ValueError:
        return valor


def resumo_atividades(atividades):
    if not isinstance(atividades, list):
        atividades = []
    estudos = 0
    simulados = 0
    pontos = []
    for atividade in atividades:
        if not isinstance(atividade, dict):
            continue
        if atividade.get("tipo") == "estudo":
            estudos += 1
        elif atividade.get("tipo") == "simulado":
            simulados += 1
            pontuacao = atividade.get("pontuacao")
            if isinstance(pontuacao, (int, float)) and not isinstance(pontuacao, bool):
                pontos.append(pontuacao)
    media = round(sum(pontos) / len(pontos), 1) if pontos else 0
    return estudos, simulados, media


def mostrar_usuario(usuario):
    if not isinstance(usuario, dict):
        return
    estudos, simulados, media = resumo_atividades(usuario.get("atividades", []))
    interacoes = usuario.get("interacoes", [])
    total_interacoes = len(interacoes) if isinstance(interacoes, list) else 0
    print("Aluno:", usuario.get("nome") or "Nome não informado")
    print("Perfil:", usuario.get("perfil") or "não informado")
    print("Interações:", total_interacoes)
    print("Estudos concluídos:", estudos)
    print("Simulados concluídos:", simulados)
    print("Média dos simulados:", media)


def mostrar_resumo(dados):
    if not isinstance(dados, dict):
        print("JSON válido, mas o conteúdo não está no formato do Clinify.")
        return

    if isinstance(dados.get("usuario"), dict):
        print("Tipo: dados exportados pelo site")
        print("Gerado em:", formatar_data(dados.get("gerado_em")))
        usuario = dados["usuario"].copy()
        usuario["interacoes"] = dados.get("interacoes", [])
        usuario["atividades"] = dados.get("atividades", [])
        mostrar_usuario(usuario)
        return

    if isinstance(dados.get("usuarios"), list):
        usuarios = [item for item in dados["usuarios"] if isinstance(item, dict)]
        print("Tipo: histórico consolidado")
        print("Atualizado em:", formatar_data(dados.get("atualizado_em")))
        print("Total de alunos:", len(usuarios))
        for numero, usuario in enumerate(usuarios, start=1):
            print("\nAluno", numero)
            mostrar_usuario(usuario)
        return

    print("JSON válido, mas o conteúdo não está no formato do Clinify.")


def executar():
    print("\nClinify - leitura dos dados\n")
    arquivos = listar_jsons()
    if not arquivos:
        print("Nenhum arquivo JSON foi encontrado na pasta dados.")
        return

    try:
        caminho = escolher_arquivo(arquivos)
        if caminho is None:
            print("Programa encerrado.")
            return
        dados = ler_json(caminho)
        print("\nArquivo lido com sucesso:", os.path.basename(caminho))
        print("-" * 45)
        mostrar_resumo(dados)
        print("-" * 45)
        print("Leitura concluída. Programa encerrado.")
    except ValueError as erro:
        print("\nErro:", erro)
        print("Nenhum dado foi alterado. Programa encerrado.")
    except (KeyboardInterrupt, EOFError):
        print("\nPrograma encerrado.")


if __name__ == "__main__":
    executar()
