# Clinify

<p align="left">
  <img src="https://skillicons.dev/icons?i=html,css,js,python,git,github,vscode&theme=light" alt="HTML, CSS, JavaScript, Python, Git, GitHub e VS Code" />
</p>

O Clinify é uma plataforma de apoio à formação médica com estudos, questões, casos clínicos simulados, acompanhamento de desempenho e áreas para estudantes, professores e administradores.

## Grupo

| Integrante | RM |
| --- | --- |
| Anita Palhares | 571264 |
| Vitória Kereski | 569438 |
| Kauã Coelho | 568665 |
| Carlos Alberto | 571841 |

# Computational Thinking With Python

Esta entrega da Sprint 3 utiliza Python para ler e resumir os dados de estudo e simulação gerados pelo Front Web do Clinify.

## Entrega

O programa está concentrado em `main.py` e utiliza somente as bibliotecas padrão `os`, `json` e `datetime`.

Funcionalidades implementadas:

- listagem de todos os arquivos `.json` presentes na pasta `dados`;
- escolha do arquivo por número, independentemente do nome;
- leitura do JSON exportado pelo site e do histórico consolidado;
- resumo de aluno, interações, estudos e simulados;
- feedback para arquivo válido ou inválido;
- encerramento automático após a leitura.

## Integração com o Front Web

1. O JavaScript registra as atividades do estudante no navegador.
2. O botão **Salvar dados** gera um novo arquivo com data e horário no nome, sem substituir os anteriores.
3. Em navegadores compatíveis, a pasta `dados` pode ser selecionada para gravação direta. Nos demais, o arquivo é baixado.
4. O estudante executa o programa Python e escolhe um dos JSONs listados.
5. O Python apresenta o resumo e encerra.

A transferência do arquivo é manual. A entrega não utiliza API, servidor ou banco de dados.

## Como executar

Na raiz do projeto, execute:

```bash
python3 "Computational Thinking With Python/main.py"
```

O programa mostra todos os arquivos `.json` da pasta `dados`. Digite o número desejado para ler o arquivo ou `0` para sair.

Para testar a integração, conclua uma atividade no Front Web, clique em **Salvar dados**, mantenha o JSON na pasta `dados` e execute o programa Python.

## Estrutura

```text
Computational Thinking With Python/
├── main.py
├── dados/
└── README.md
```

O arquivo de dados é criado durante a execução e não deve conter informações pessoais reais.

# Front-End Design e Web Development

Esta entrega da Sprint 3 apresenta a interface visual e interativa do Clinify para estudante, professor e administrador.

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

O JavaScript controla as interações, os componentes compartilhados e a persistência local da plataforma.

Principais entregas:

- scripts separados por perfil e responsabilidade;
- componentes compartilhados de navegação, mensagens, ícones e layout;
- login para estudante, professor e administrador;
- buscas, filtros, formulários, cards e modais interativos;
- persistência de sessão, perfil, progresso e atividades com `localStorage`;
- separação dos dados por usuário;
- registro de estudos e simulações concluídas;
- exportação de um novo JSON a cada uso do botão **Salvar dados**;
- geração de QR Code da sala pelo professor;
- leitura do QR Code por câmera ou imagem pelo estudante;
- acesso à sala com etapas e feedback de preenchimento;
- salas clínicas entre abas do mesmo navegador;
- paciente virtual integrado à simulação clínica.

O paciente virtual utiliza regras e palavras-chave definidas em `assets/js/student/agent.js`. Ele responde de acordo com o caso, reconhece critérios da conversa, oferece feedback educacional e atualiza a pontuação. O funcionamento é local, sem API e sem inteligência artificial generativa.

## Como executar

Na raiz do projeto, execute:

```bash
python3 -m http.server 8000 --directory "Front Web"
```

Acesse:

<http://localhost:8000/login.html>

## Contas de acesso

Todas utilizam a senha `123456`.

| Perfil        | E-mail                |
| ------------- | --------------------- |
| Administrador | admin@clinify.com     |
| Professor     | professor@clinify.com |
| Estudante     | 12345678900@gmail.com |

## Roteiro de uso

1. Entre como estudante.
2. Navegue pelas áreas de estudos, casos, desempenho e perfil.
3. Conclua uma atividade de estudo.
4. Abra uma simulação e converse com o paciente virtual.
5. Consulte os sinais vitais e escreva no notebook de anotações.
6. Finalize a simulação e recarregue a página para conferir a persistência.
7. Clique em **Salvar dados** para gerar um novo JSON usado pela entrega de Python.
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

## Observações

- O login não representa autenticação segura de produção.
- O `localStorage` não sincroniza dados entre dispositivos.
- As salas funcionam entre abas do mesmo navegador e origem.
- O paciente virtual não realiza diagnóstico médico.
- A versão publicada deve ser conferida após cada atualização local.

## Links

Repositório do GitHub

- https://github.com/anitapalhares/Clinify_1.0

Deploy no Vercel

- https://clinifylxp.vercel.app/

## Uso de Inteligência Artificial

A Inteligência Artificial (IA) foi utilizada como ferramenta de apoio durante o desenvolvimento do projeto, auxiliando na comparação dos requisitos da Sprint 3 com o código, organização dos arquivos e componentes, correção de referências e melhorias nas interações e acessibilidade. A IA também auxiliou na preparação e revisão deste README.

As alterações foram acompanhadas de verificações no código e testes de navegação. A IA foi utilizada apenas como suporte ao desenvolvimento, e o agente da simulação não realiza diagnósticos.
