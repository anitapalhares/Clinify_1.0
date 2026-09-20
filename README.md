# Clinify

<p align="left">
  <img src="https://skillicons.dev/icons?i=html,css,js,python,git,github,vscode&theme=light" alt="HTML, CSS, JavaScript, Python, Git, GitHub e VS Code" />
</p>

O Clinify é uma plataforma de apoio a formação médica com estudos, questões, casos clínicos simulados, acompanhamento de desempenho e áreas demonstrativas para estudantes, professores e administradores.


## Grupo

| Integrante | RM |
| --- | --- |
| Anita Palhares | 571264 |
| Vitória Kereski | 569438 |
| Kauã Coelho | 568665 |
| Carlos Alberto | 571841 |

# Computational Thinking With Python
Esta entrega da Sprint 3 utiliza Python para receber, validar, armazenar e consultar os dados de estudo e simulação gerados pelo Front Web do Clinify.

## Entrega

O programa está concentrado em `main.py` e utiliza somente as bibliotecas padrão `os`, `json` e `datetime`.

Funcionalidades implementadas:

- menu navegável pelo terminal;
- leitura do arquivo `clinify_dados.json` exportado pelo site;
- validação dos dados do aluno, interações e atividades;
- armazenamento dos registros por aluno;
- controle de duplicidade pelo identificador de cada registro;
- resumo de estudos, simulados, tempo e desempenho;
- listagem das atividades recentes;
- tratamento de arquivo ausente, JSON inválido e dados inconsistentes;
- preservação dos dados já armazenados quando uma importação falha.

## Integração com o Front Web

1. O JavaScript registra as atividades do estudante no navegador.
2. O botão **Salvar dados** gera o arquivo `clinify_dados.json`.
3. O estudante executa o programa Python e informa o caminho do arquivo.
4. O Python interpreta, valida e armazena os registros.
5. Os dados podem ser consultados pelo menu.

A transferência do arquivo é manual. A entrega não utiliza API, servidor ou banco de dados.

## Como executar

Na raiz do projeto, execute:

```bash
python3 "Computational Thinking With Python/main.py"
```

Menu disponível:

1. Importar `clinify_dados.json`.
2. Mostrar o resumo dos alunos.
3. Listar as atividades recentes.
0. Encerrar.

Para testar a integração, use primeiro o Front Web, conclua uma atividade e clique em **Salvar dados**. Depois escolha a opção 1 no programa e informe o caminho do JSON baixado. Importe novamente o mesmo arquivo para conferir que os registros não são duplicados.

## Estrutura

```text
Computational Thinking With Python/
├── main.py
├── dados/
└── README.md
```

O arquivo de dados é criado durante a execução e não deve conter informações pessoais reais.

# Front-End Design e Web Development
Esta entrega da Sprint 3 apresenta o MVP visual e interativo do Clinify, uma plataforma educacional para formação médica. O site possui áreas demonstrativas para estudante, professor e administrador.

## Front-End Design

A interface foi desenvolvida para manter identidade visual, clareza, responsividade e facilidade de uso.

Principais entregas:

- HTML semântico e hierarquia organizada de títulos;
- identidade visual consistente entre os três perfis;
- estilos separados por responsabilidade e variáveis em `assets/css/root.css`;
- layouts com Flexbox, Grid e media queries;
- adaptação para celular, tablet e desktop;
- formulários com rótulos, validações e mensagens de retorno;
- foco visível e navegação por teclado;
- menus, cards, tabelas, modais e estados de interação;
- barra lateral com ícones e interação visual minimalista;
- área recolhível de sinais vitais em todas as simulações;
- ícones para pressão arterial, frequência cardíaca, temperatura e dor;
- notebook de anotações clínicas com salvamento automático.

O link do Figma não foi localizado no projeto. A revisão visual utiliza como referência a identidade já implementada no Clinify.

## Web Development

O JavaScript controla as interações, os componentes compartilhados e a persistência local do protótipo.

Principais entregas:

- scripts separados por perfil e responsabilidade;
- componentes compartilhados de navegação, mensagens, ícones e layout;
- login demonstrativo para estudante, professor e administrador;
- buscas, filtros, formulários, cards e modais interativos;
- persistência de sessão, perfil, progresso e atividades com `localStorage`;
- separação dos dados por usuário;
- registro de estudos e simulações concluídas;
- exportação em JSON pelo botão **Salvar dados**;
- salas clínicas demonstrativas entre abas do mesmo navegador;
- paciente virtual integrado à simulação clínica.

O paciente virtual utiliza regras e palavras-chave definidas em `assets/js/student/agent.js`. Ele responde de acordo com o caso, reconhece critérios da conversa, oferece feedback educacional e atualiza a pontuação. O protótipo funciona localmente no navegador, sem API e sem inteligência artificial generativa.

## Como executar

Na raiz do projeto, execute:

```bash
python3 -m http.server 8000 --directory "Front Web"
```

Acesse:

<http://localhost:8000/login.html>

## Contas demonstrativas

Todas utilizam a senha `123456`.

| Perfil | E-mail |
| --- | --- |
| Administrador | admin@clinify.com |
| Professor | professor@clinify.com |
| Estudante | 12345678900@gmail.com |

## Roteiro de demonstração

1. Entre como estudante.
2. Navegue pelas áreas de estudos, casos, desempenho e perfil.
3. Conclua uma atividade de estudo.
4. Abra uma simulação e converse com o paciente virtual.
5. Consulte os sinais vitais e escreva no notebook de anotações.
6. Finalize a simulação e recarregue a página para conferir a persistência.
7. Clique em **Salvar dados** para gerar o JSON usado pela entrega de Python.
8. Entre como professor e administrador para demonstrar os outros fluxos.

## Estrutura

```text
Front Web/
├── login.html
├── estudante/
├── professor/
├── administrador/
├── assets/
│   ├── css/
│   ├── img/
│   └── js/
└── README.md
```

## Limitações do protótipo

- Os dados apresentados são fictícios e demonstrativos.
- O login não representa autenticação segura de produção.
- O `localStorage` não sincroniza dados entre dispositivos.
- As salas demonstrativas funcionam entre abas do mesmo navegador e origem.
- O paciente virtual não realiza diagnóstico médico.
- A versão publicada deve ser conferida após cada atualização local.

## Links

Repositório do GitHub
- https://github.com/anitapalhares/Clinify_1.0

Deploy no Vercel
-  https://clinifylxp.vercel.app/

## Uso de Inteligência Artificial

A Inteligência Artificial (IA) foi utilizada como ferramenta de apoio durante o desenvolvimento do projeto, auxiliando na comparação dos requisitos da Sprint 3 com o código, organização dos arquivos e componentes, correção de referências e melhorias nas interações e acessibilidade. A IA também auxiliou na preparação e revisão deste README.

As alterações foram acompanhadas de verificações no código e testes de navegação. A IA foi utilizada apenas como suporte ao desenvolvimento, e o agente da simulação não realiza diagnósticos.
