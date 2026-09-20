# Clinify

O Clinify é um protótipo acadêmico de uma plataforma de aprendizagem para formação médica, desenvolvido para o Challenge Hospital Moinhos de Vento. O MVP reúne estudos, questões, casos clínicos, acompanhamento de desempenho e áreas demonstrativas para estudantes, professores e administradores.

## Grupo

- Anita Palhares — RM 571264
- Vitória Kereski — RM 569438
- Kauã Coelho — RM 568665
- Carlos Alberto — RM 571841

## Sprint 3

Esta entrega concentra os requisitos de Computational Thinking With Python, Front-End Design e Web Development. A matriz de requisitos está em [docs/sprint3-checklist.md](docs/sprint3-checklist.md) e os testes estão em [docs/sprint3-validacao.md](docs/sprint3-validacao.md).

### Computational Thinking With Python

O botão **Salvar dados**, na barra lateral da interface, transforma em JSON as interações e atividades armazenadas pelo JavaScript. A transferência para o Python é manual e não utiliza API.

O Python fica concentrado em [main.py](Computational%20Thinking%20With%20Python/main.py), responsável pela importação, validação, armazenamento e consulta dos dados exportados pelo site. Ele usa somente as bibliotecas padrão os, json e datetime para:

- ler e validar o JSON exportado;
- organizar dados por aluno;
- adicionar ou atualizar registros pelo identificador, sem duplicar uma reimportação;
- preservar os dados existentes quando o arquivo de entrada é inválido;
- armazenar os dados em dados/dados_alunos.json;
- exibir resumos e atividades recentes.

O contrato entre JavaScript e Python está documentado em [docs/contrato-json.md](docs/contrato-json.md).

### Front-End Design

A interface usa HTML semântico, CSS, Flexbox, Grid e media queries. O design mantém cores, tipografia, espaçamentos, cards, formulários e estados de foco consistentes nas três áreas. Os fluxos foram verificados em 360, 390, 768, 1024 e 1440 pixels.

O link do Figma não foi encontrado no projeto. Por isso, a consistência com a identidade visual existente foi revisada, mas a fidelidade a um protótipo externo não pôde ser confirmada.

### Web Development

O JavaScript está separado por perfil e responsabilidade. O projeto contém componentes compartilhados, manipulação do DOM, busca, filtros, formulários, modais, validações, mensagens de retorno e persistência significativa com localStorage.

Na simulação clínica, o módulo [agent.js](Front%20Web/assets/js/student/agent.js) responde às perguntas do aluno com regras de palavras-chave específicas para cada caso. Ele é carregado diretamente por simulacao.html, funciona localmente, sem API e sem modelo generativo, registra a atividade concluída e mantém o feedback educacional.

As contas, dados e resultados exibidos são demonstrativos. A autenticação feita no navegador não representa segurança de produção.

## Tecnologias

- HTML5
- CSS3, Flexbox, Grid e media queries
- JavaScript
- localStorage e JSON
- Python 3 com os, json e datetime
- Git e GitHub

Não há pacotes externos para instalar.

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
├── docs/
│   ├── evidencias/
│   ├── contrato-json.md
│   ├── sprint3-checklist.md
│   └── sprint3-validacao.md
└── README.md
~~~

## Como executar a interface

Na raiz do projeto, execute:

~~~bash
python3 -m http.server 8000 --directory "Front Web"
~~~

Acesse http://localhost:8000/login.html. O comando inicia apenas um servidor estático para testar os arquivos; ele não cria uma API.

Todas as contas demonstrativas usam a senha 123456.

| Perfil | E-mail |
| --- | --- |
| Administrador | admin@clinify.com |
| Professor | professor@clinify.com |
| Estudante | 12345678900@gmail.com |

Para demonstrar o fluxo principal:

1. Entre como estudante.
2. Conclua um módulo de estudo ou uma simulação.
3. Recarregue a página para conferir a persistência no navegador.
4. Clique em **Salvar dados** na barra lateral.
5. Confirme o download do arquivo JSON.

## Como executar o Python

Na raiz do projeto, execute:

~~~bash
python3 "Computational Thinking With Python/main.py"
~~~

No menu:

1. Escolha 1 e informe o caminho exato do JSON baixado.
2. Escolha 2 para consultar o resumo dos alunos.
3. Escolha 3 para listar as atividades recentes.
4. Importe o mesmo arquivo novamente para demonstrar que os identificadores evitam duplicação.

O arquivo dados/dados_alunos.json é criado durante a execução e está ignorado pelo Git.

## Links e estado de publicação

- Repositório: https://github.com/anitapalhares/Clinify_1.0 — acessível em 19/09/2026. As alterações locais desta entrega ainda não foram publicadas.
- Vercel: https://clinifylxp.vercel.app/ — acessível em 19/09/2026. A URL comprova um deploy anterior, não a publicação do código local atual.
- Figma: link não localizado no projeto.

## Uso de Inteligência Artificial

Uma ferramenta de inteligência artificial foi usada como apoio para comparar requisitos, revisar código, propor e aplicar correções, testar fluxos e organizar a documentação. A equipe deve revisar o resultado antes da entrega acadêmica. O paciente virtual da simulação usa regras locais de JavaScript e não realiza diagnóstico médico.

## Evidências

As capturas responsivas estão em [docs/evidencias](docs/evidencias). O relatório informa quais testes foram realmente executados e quais limitações permanecem.
