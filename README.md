# Clinify

<p align="left"> <img src="https://skillicons.dev/icons?i=html,css,js,git,github,vscode&theme=light" /> </p>

Projeto acadêmico da FIAP para o Challenge Hospital Moinhos de Vento. A plataforma reúne estudos, questões, simulações clínicas e painéis de estudante, professor e administrador.

Esta versão reúne HTML, CSS, JavaScript e a lógica da Sprint 3 de Computational Thinking With Python.

## Tecnologias

HTML5 semântico, CSS3 (Flexbox, Grid e media queries), JavaScript e Python 3 com biblioteca padrão. Não há dependências externas obrigatórias.

## Como executar

Na pasta do projeto, execute:

```bash
python3 "Computational Thinking With Python/main.py"
```

Escolha **4** no menu para iniciar o servidor e acesse <http://127.0.0.1:8000/>. As páginas e a API Python são servidas no mesmo endereço. As opções 1, 2 e 3 permitem testar a lógica pelo terminal. A consulta interativa precisa desse servidor para receber feedback e salvar a tentativa em JSON.

## Contas de teste

Todas utilizam a senha `123456`.

| Perfil        | E-mail                |
| ------------- | --------------------- |
| Administrador | admin@clinify.com     |
| Professor     | professor@clinify.com |
| Estudante     | 12345678900@gmail.com |

O login é uma demonstração em JavaScript. Não há autenticação de servidor: as páginas também podem ser abertas diretamente.

## Estrutura

```text
Computational Thinking With Python/
├── main.py                 Entrada da aplicação Python
├── servidor.py             API e servidor do site
├── atividades.py           Persistência das atividades dos alunos
├── interacoes.py           Recebimento das interações do Front Web
├── fluxo.py                Fluxo das simulações
├── agente.py               Avaliação educacional das respostas
├── gerador.py              Geração de casos personalizados
├── dados.py                Leitura e gravação de JSON
└── dados/                  Arquivos JSON gerados durante a execução
Front Web/
├── login.html              Entrada e autenticação do site
├── estudante/              Estudos, questões, casos, desempenho e perfil
├── professor/              Turmas, alunos, estudos, desempenho e perfil
├── administrador/          Painel, professores e perfil
└── assets/                 CSS, JavaScript, marca e demais recursos visuais
docs/                       Conferência acadêmica da Sprint 3
INTEGRANTES.TXT             Integrantes e RMs
```

As duas disciplinas ficam separadas sem quebrar a integração: o servidor em `Computational Thinking With Python` publica a pasta `Front Web` como raiz do site. As variáveis visuais ficam em `root.css`. Menus, rodapé e mensagens de retorno são compartilhados em `components.js`. Os layouts principais começam com uma coluna no celular e se ampliam com media queries para tablet e desktop.

## Como testar

1. Entre como administrador. Busque, cadastre, edite e altere o status de um professor. Recarregue a página para conferir a persistência.
2. Abra Meu perfil, altere o nome e salve. Recarregue para conferir o resultado.
3. Entre como estudante. Abra Estudos e use “Ver casos desta matéria”. Na página de casos, alterne entre Cardiologia, Pneumologia, Neurologia, Gastroenterologia, Endocrinologia e Histologia; combine busca e dificuldade.
4. Abra Cardiologia, responda às questões e finalize o módulo. O JavaScript registra a conclusão e envia o JSON ao Python.
5. Abra um caso, envie uma fala e confira o feedback e a pontuação. Ao finalizar, a atividade do simulado também é enviada ao Python. Em Clinify AI, descreva um cenário, escolha matéria e dificuldade e inicie um caso personalizado. Como professor, crie uma sala e copie o código. Em outra aba do mesmo navegador, entre como estudante, informe seu nome e esse código, finalize e analise as respostas na aba do professor.
6. No terminal, escolha a opção **3** para conferir os totais de estudos e simulados persistidos por aluno.
7. Confira o site em larguras de 375px, 768px e 1440px. Teste o menu no celular e navegue usando Tab e Escape.

## Dados e limites da demonstração

Os dados de professores, turmas, alunos e casos são fictícios. Cadastros, perfis, preferências e progresso usam localStorage neste navegador. Cardiologia possui conteúdo e questões; as demais especialidades mostram um estado de conteúdo em preparação. O vídeo ainda não está disponível. As salas personalizadas guardam nome, turma, orientações, código e tentativas; podem ser editadas, encerradas, reabertas e excluídas. Funcionam entre abas do mesmo navegador e origem, sem sincronização entre dispositivos. Cada card abre seu próprio contexto fictício. As salas do professor usam o caso de cefaleia. Casos criados em Clinify AI ficam na sessão atual do navegador. O gerador Python usa modelos de texto e regras educacionais, sem um modelo de IA treinado ou sistema de diagnóstico.

## Links Relevantes

Repositório do GitHub
- https://github.com/anitapalhares/Clinify_1.0

Deploy no Vercel
-  https://clinifylxp.vercel.app/

## Uso de Inteligência Artificial

A Inteligência Artificial (IA) foi utilizada como ferramenta de apoio durante o desenvolvimento do projeto, auxiliando na comparação dos requisitos da Sprint 3 com o código, organização dos arquivos e componentes, correção de referências e melhorias nas interações e acessibilidade. A IA também auxiliou na preparação e revisão deste README.

As alterações foram acompanhadas de verificações no código e testes de navegação. A IA foi utilizada apenas como suporte ao desenvolvimento, e o agente da simulação não realiza diagnósticos.

## Persistência das atividades — Computational Thinking With Python

Ao concluir uma atividade, `Front Web/assets/js/shared/activity-data.js` reúne a identificação do estudante e os dados do estudo ou simulado. O JavaScript transforma esse objeto em JSON com `JSON.stringify()` e o envia por `POST /api/atividades`. Se o servidor estiver indisponível, o lote permanece em uma fila no `localStorage` e uma nova sincronização é tentada ao abrir outra página integrada.

O servidor Python usa `json.loads()` para interpretar o conteúdo. `Computational Thinking With Python/atividades.py` valida os campos, organiza os registros por aluno, evita duplicidade pelo identificador da atividade, calcula um resumo e grava `Computational Thinking With Python/dados/atividades_alunos.json`. Esse arquivo é criado durante a execução e não é enviado ao Git. A solução utiliza os conteúdos das aulas: variáveis e tipos, operadores, condicionais, `while`, `for`, listas, tuplas, dicionários, conjuntos, funções, bibliotecas, exceções, arquivos, JSON e API. A classe presente em `servidor.py` contém apenas o adaptador exigido pela biblioteca padrão `http.server`; as regras do projeto permanecem em funções simples.

Todas as páginas carregam `Front Web/assets/js/shared/interactions.js`. O módulo registra navegação, cliques em links ou botões e envio de formulários, gera o JSON com `JSON.stringify()` e envia para `POST /api/interacoes`. O Python interpreta o conteúdo e grava `Computational Thinking With Python/dados/interacoes.json`. Senhas e valores digitados nos campos não são coletados. Quando o servidor está indisponível, os eventos permanecem em uma fila no `localStorage` até a próxima sincronização.

Exemplo resumido do JSON gerado pelo JavaScript:

```json
{
  "versao": 1,
  "aluno": {"id": "aluno@email.com", "nome": "Aluno", "email": "aluno@email.com"},
  "atividades": [
    {"id": "estudo-123", "tipo": "estudo", "recurso": "cardiologia", "titulo": "Fundamentos", "estado": "concluida", "concluida_em": "2026-09-17T12:00:00.000Z", "duracao_segundos": 0, "pontuacao": 80, "detalhes": {"modulo": 1}}
  ]
}
```

Também é possível consultar um aluno com `GET /api/atividades?aluno_id=aluno@email.com`.

## Lógica Python da Sprint 3

`Computational Thinking With Python/agente.py` identifica critérios educacionais em falas fictícias. `gerador.py` monta cenários personalizados a partir de matéria, dificuldade e características escritas pelo aluno. `fluxo.py` inicia, atualiza e conclui tentativas; `dados.py` armazena os registros em `dados/tentativas.json`; `atividades.py` persiste estudos e simulados por aluno; `interacoes.py` guarda as ações recebidas do Front Web. `servidor.py` oferece `POST /api/gerar-caso`, `POST /api/responder`, `POST /api/concluir`, `POST /api/atividades`, `POST /api/interacoes`, `GET /api/atividades` e `GET /api/saude`. Os arquivos JSON são gerados na execução e ignorados pelo Git. A pontuação começa em 64 e aumenta uma única vez por critério reconhecido. O estudante vê o feedback na consulta; o professor vê as respostas de sua sala. Códigos de sala, perfil e XP ainda usam o armazenamento do navegador e não sincronizam entre dispositivos.


## Links da entrega

- Repositório: https://github.com/anitapalhares/Clinify_1.0
- Deploy na Vercel: adicionar a URL pública após vincular este repositório à conta da equipe.
- Conferência acadêmica: docs/SPRINT-3.md

A interface da pasta `Front Web` funciona em hospedagem estática. Configure essa pasta como diretório raiz da publicação. Quando a API Python não estiver disponível, a criação e a avaliação dos casos usam o modo de demonstração local e mantêm o progresso no localStorage. Para testar também a persistência em JSON e os endpoints Python, use a execução local descrita acima.

## Acessibilidade e responsividade
A interface utiliza landmarks semânticos, hierarquia de títulos, rótulos associados aos campos, navegação por teclado, link para pular ao conteúdo, foco visível, regiões de status e suporte à preferência de redução de movimento. Os layouts foram preparados para celular, tablet e desktop com Grid, Flexbox e media queries mobile first
