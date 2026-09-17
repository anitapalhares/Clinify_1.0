# Conferência da Sprint 3

## Computational Thinking With Python

- [x] O JavaScript gera JSON com `JSON.stringify()` ao concluir estudos e simulados.
- [x] O servidor Python interpreta o corpo com `json.loads()`.
- [x] Os dados são validados antes da gravação.
- [x] As atividades ficam organizadas por aluno em arquivo JSON.
- [x] IDs repetidos atualizam o registro sem criar duplicidade.
- [x] Há consulta por aluno e resumo no menu do terminal.
- [x] A fila local conserva atividades enquanto a API estiver indisponível.
- [x] Navegação, cliques e formulários do Front Web são enviados em JSON para o Python.
- [x] O Python persiste as interações por usuário sem armazenar senhas ou valores dos campos.
- [x] A implementação usa os conteúdos das aulas: variáveis, operadores, condicionais, laços, coleções, funções, bibliotecas, exceções, arquivos, JSON e API.

## Fluxo verificado

1. O estudante conclui um módulo ou finaliza um simulado.
2. O JavaScript cria o registro, salva uma cópia local e gera o JSON.
3. `POST /api/atividades` entrega o JSON ao servidor.
4. O Python interpreta, valida e grava `Computational Thinking With Python/dados/atividades_alunos.json`.
5. O registro pode ser conferido pela opção 3 do menu ou por `GET /api/atividades?aluno_id=...`.

As demais interações de interface seguem um fluxo semelhante por `POST /api/interacoes` e são gravadas em `Computational Thinking With Python/dados/interacoes.json`.

## Organização didática

- `dados.py`: manipulação de arquivos e JSON.
- `atividades.py`: listas, dicionários, funções, laços, condicionais e persistência.
- `interacoes.py`: recebimento do JSON de eventos e organização por usuário.
- `agente.py`: tuplas, listas, conjuntos, operadores e laços.
- `fluxo.py`: funções, validações e tratamento de exceções.
- `gerador.py`: dicionários, funções e biblioteca de data.
- `servidor.py`: recebimento e resposta de dados por API.
