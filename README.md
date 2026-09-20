# Clinify

## Apresentação

O Clinify é um protótipo acadêmico desenvolvido para o Challenge Hospital Moinhos de Vento da FIAP. A plataforma apoia a formação médica com conteúdos de estudo, questões, simulações clínicas e acompanhamento de desempenho.

A Sprint 3 apresenta um MVP navegável com áreas demonstrativas para estudante, professor e administrador.

## Grupo

| Integrante | RM |
| --- | --- |
| Anita Palhares | 571264 |
| Vitória Kereski | 569438 |
| Kauã Coelho | 568665 |
| Carlos Alberto | 571841 |

## Entregas da Sprint 3

### Computational Thinking With Python

**Objetivo da disciplina:** aplicar lógica, funções, manipulação de dados e persistência em uma solução relacionada ao projeto.

**Entrega realizada:**

- Programa navegável pelo terminal em main.py.
- Leitura do JSON exportado pelo Front Web.
- Validação de usuários, interações, atividades, datas e pontuações.
- Armazenamento dos registros por aluno.
- Controle de duplicidade pelo identificador de cada registro.
- Resumo de estudos, simulados, tempo e desempenho.
- Tratamento de arquivo ausente, JSON inválido e dados inconsistentes.
- Uso somente das bibliotecas padrão os, json e datetime.

**Integração com o projeto:**

1. O JavaScript registra as atividades no navegador.
2. O estudante seleciona **Salvar dados**.
3. O navegador baixa clinify_dados.json.
4. O arquivo é importado pelo main.py.
5. O Python salva e apresenta os dados do aluno.

A transferência é manual e não utiliza API.

### Front-End Design

**Objetivo da disciplina:** entregar uma interface coerente, navegável, responsiva e acessível.

**Entrega realizada:**

- Identidade visual consistente entre estudante, professor e administrador.
- HTML semântico e hierarquia organizada de títulos e conteúdos.
- CSS separado por responsabilidade e variáveis visuais em root.css.
- Layouts com Flexbox, Grid e media queries.
- Adaptação para celular, tablet e desktop.
- Formulários com rótulos, validações e mensagens de retorno.
- Foco visível e navegação por teclado.
- Menus, cards, tabelas, modais e estados de interação.
- Barra lateral com ícones e interação visual minimalista.
- Consulta clínica com sinais vitais recolhíveis.
- Ícones para pressão arterial, frequência cardíaca, temperatura e dor.
- Notebook de anotações com salvamento automático.

O link do Figma não foi localizado no projeto. A revisão visual foi baseada na identidade implementada.

### Web Development

**Objetivo da disciplina:** aplicar JavaScript, manipulação do DOM, componentes, dados e armazenamento no navegador.

**Entrega realizada:**

- Scripts separados por perfil e responsabilidade.
- Componentes compartilhados de navegação, mensagens, ícones e layout.
- Login demonstrativo para os três perfis.
- Busca, filtros, formulários, cards e modais interativos.
- Persistência de sessão, perfil, progresso e atividades com localStorage.
- Dados separados por usuário.
- Registro de estudos e simulações concluídas.
- Exportação dos dados em JSON pelo botão **Salvar dados**.
- Salas clínicas demonstrativas entre abas do mesmo navegador.
- Paciente virtual integrado diretamente à simulação.

O paciente virtual está em agent.js. Ele utiliza palavras-chave e regras locais para:

- responder conforme o caso clínico;
- reconhecer critérios da conversa;
- fornecer feedback educacional;
- atualizar a pontuação;
- registrar a conclusão da simulação.

O agente funciona no navegador, sem API e sem modelo de inteligência artificial generativa.

## Como executar

### Interface

Na raiz do projeto:

~~~bash
python3 -m http.server 8000 --directory "Front Web"
~~~

Acesse:

<http://localhost:8000/login.html>

### Contas demonstrativas

Todas utilizam a senha 123456.

| Perfil | E-mail |
| --- | --- |
| Administrador | admin@clinify.com |
| Professor | professor@clinify.com |
| Estudante | 12345678900@gmail.com |

### Python

Na raiz do projeto:

~~~bash
python3 "Computational Thinking With Python/main.py"
~~~

Opções disponíveis:

1. Importar clinify_dados.json.
2. Mostrar o resumo dos alunos.
3. Listar as atividades recentes.
0. Encerrar.

## Demonstração do fluxo

1. Entre como estudante.
2. Conclua um estudo ou uma simulação clínica.
3. Use os sinais vitais e a área de anotações durante a consulta.
4. Clique em **Salvar dados** para baixar o JSON.
5. Execute o main.py e importe o arquivo.
6. Consulte o resumo e as atividades registradas.

Os perfis de professor e administrador possuem fluxos demonstrativos próprios para salas, alunos, professores e acompanhamento.

## Estrutura

~~~text
Clinify_1.0/
├── Computational Thinking With Python/
│   ├── main.py
│   └── dados/
├── Front Web/
│   ├── login.html
│   ├── estudante/
│   ├── professor/
│   ├── administrador/
│   ├── assets/
│   └── INTEGRANTES.TXT
└── README.md
~~~

## Escopo do protótipo

- Os dados apresentados são fictícios e demonstrativos.
- O login não representa autenticação segura de produção.
- O localStorage não sincroniza dados entre dispositivos.
- O Python recebe o JSON manualmente.
- O paciente virtual não realiza diagnóstico médico.

## Links

- Repositório: https://github.com/anitapalhares/Clinify_1.0
- Deploy informado: https://clinifylxp.vercel.app/

A versão publicada deve ser conferida após cada atualização local.

## Uso de Inteligência Artificial

Uma ferramenta de inteligência artificial foi utilizada como apoio na análise dos requisitos, revisão do código, testes e documentação. A equipe deve revisar o resultado antes da entrega acadêmica.
