"""Menu navegável em Python para testar a lógica sem abrir o navegador."""
import dados
import fluxo
import atividades
import interacoes


def executar():
    while True:
        print("\nClinify · Computational Thinking With Python")
        print("1. Responder um caso\n2. Concluir uma tentativa\n3. Listar tentativas e atividades\n4. Iniciar servidor do site\n0. Sair")
        escolha = input("Escolha: ").strip()
        try:
            if escolha == "1":
                identificador = input("Identificador da tentativa: ").strip()
                fala = input("Fala ao paciente fictício: ").strip()
                print(fluxo.responder(identificador, fala))
            elif escolha == "2":
                print(fluxo.concluir(input("Identificador da tentativa: ").strip()))
            elif escolha == "3":
                print("\nTentativas de simulados:")
                for tentativa in dados.ler()["tentativas"]:
                    print(tentativa["id"], tentativa["estado"], tentativa["pontos"], "pontos")
                print("\nAtividades por aluno:")
                for resumo in atividades.listar_resumos():
                    print(resumo["aluno_id"], resumo["estudos_concluidos"], "estudos,", resumo["simulados_concluidos"], "simulados")
                print("\nInterações recebidas do Front Web:", interacoes.total())
            elif escolha == "4":
                from servidor import executar as servidor
                servidor()
            elif escolha == "0":
                break
            else:
                print("Escolha uma opção do menu.")
        except ValueError as erro:
            print("Erro:", erro)
        except KeyboardInterrupt:
            print("\nServidor interrompido.")


if __name__ == "__main__":
    executar()
