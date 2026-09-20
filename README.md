# Clinify

# Clinify

<p align="left">
  <img src="https://skillicons.dev/icons?i=html,css,js,git,github,vscode&theme=light" />
</p>

O Clinify é um protótipo acadêmico de uma plataforma de aprendizagem para formação médica, desenvolvido para o Challenge Hospital Moinhos de Vento. O MVP reúne estudos, questões, casos clínicos, acompanhamento de desempenho e áreas demonstrativas para estudantes, professores e administradores.

Projeto acadêmico da FIAP para o Challenge Hospital Moinhos de Vento. A plataforma reúne estudos, questões, simulações clínicas e painéis de estudante, professor e administrador.

Projeto acadêmico da FIAP para o Challenge Hospital Moinhos de Vento. A plataforma reúne estudos, questões, simulações clínicas e painéis de estudante, professor e administrador.

Esta versão reúne HTML, CSS, JavaScript e a lógica da Sprint 3 de Computational Thinking With Python.

- Anita Palhares — RM 571264
- Vitória Kereski — RM 569438
- Kauã Coelho — RM 568665
- Carlos Alberto — RM 571841

## Sprint 3

Esta entrega concentra os requisitos de Computational Thinking With Python, Front-End Design e Web Development. A matriz de requisitos está em [docs/sprint3-checklist.md](docs/sprint3-checklist.md) e os testes estão em [docs/sprint3-validacao.md](docs/sprint3-validacao.md).

### Computational Thinking With Python

O botão **Salvar dados**, na barra lateral da interface, transforma em JSON as interações e atividades armazenadas pelo JavaScript. A transferência para o Python é manual e não utiliza API.

### Front-End Design

A interface usa HTML semântico, CSS, Flexbox, Grid e media queries. O design mantém cores, tipografia, espaçamentos, cards, formulários e estados de foco consistentes nas três áreas.

### Web Development

O JavaScript está separado por perfil e responsabilidade. O projeto contém componentes compartilhados, manipulação do DOM, busca, filtros, formulários, modais, validações, mensagens de retorno e persistência significativa com localStorage.

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

```bash
python3 -m http.server 8000 --directory "Front Web"
```

Acesse http://localhost:8000/login.html. O comando inicia apenas um servidor estático para testar os arquivos; ele não cria uma API.

Todas as contas demonstrativas usam a senha 123456.

Todas as contas demonstrativas usam a senha 123456.

| Perfil        | E-mail                |
| ------------- | --------------------- |
| Administrador | admin@clinify.com     |
| Professor     | professor@clinify.com |
| Estudante     | 12345678900@gmail.com |

| Professor     | professor@clinify.com |
| Estudante     | 12345678900@gmail.com |

O login é uma demonstração em JavaScript. Não há autenticação de servidor: as páginas também podem ser abertas diretamente.

Para demonstrar o fluxo principal:

1. Entre como estudante.
2. Conclua um módulo de estudo ou uma simulação.
3. Recarregue a página para conferir a persistência no navegador.
4. Clique em **Salvar dados** na barra lateral.
5. Confirme o download do arquivo JSON.

## Como executar o Python

Na raiz do projeto, execute:

```bash
python3 "Computational Thinking With Python/main.py"
```

No menu:

1. Escolha 1 e informe o caminho exato do JSON baixado.
2. Escolha 2 para consultar o resumo dos alunos.
3. Escolha 3 para listar as atividades recentes.
4. Importe o mesmo arquivo novamente para demonstrar que os identificadores evitam duplicação.

## Estrutura

```text
Computational Thinking With Python/
├── main.py
├── servidor.py
├── atividades.py
├── interacoes.py
├── fluxo.py
├── agente.py
├── gerador.py
├── dados.py
└── dados/
Front Web/
├── login.html
├── estudante/
├── professor/
├── administrador/
└── assets/
```

## Como testar

1. Entre como administrador. Busque, cadastre, edite e altere o status de um professor. Recarregue a página para conferir a persistência.
2. Abra Meu perfil, altere o nome e salve. Recarregue para conferir o resultado.
3. Entre como estudante. Abra Estudos e use “Ver casos desta matéria”. Na página de casos, alterne entre Cardiologia, Pneumologia, Neurologia, Gastroenterologia, Endocrinologia e Histologia; combine busca e dificuldade.
4. Abra Cardiologia, responda às questões e finalize o módulo. O JavaScript registra a conclusão e envia o JSON ao Python.
5. Abra um caso, envie uma fala e confira o feedback e a pontuação. Ao finalizar, a atividade do simulado também é enviada ao Python. Em Clinify AI, descreva um cenário, escolha matéria e dificuldade e inicie um caso personalizado. Como professor, crie uma sala e copie o código. Em outra aba do mesmo navegador, entre como estudante, informe seu nome e esse código, finalize e analise as respostas na aba do professor.
6. No terminal, escolha a opção **3** para conferir os totais de estudos e simulados persistidos por aluno.
7. Confira o site em larguras de 375px, 768px e 1440px. Teste o menu no celular e navegue usando Tab e Escape.

## Dados e limites da demonstração

Os dados de professores, turmas, alunos e casos são fictícios. Cadastros, perfis, preferências e progresso usam localStorage. Cardio possui conteúdo e questões; as demais especialidades estão em preparação. As salas personalizadas guardam nome, turma, orientações, código e tentativas e funcionam entre abas do mesmo navegador.

## Links Relevantes

- Repositório do GitHub: https://github.com/anitapalhares/Clinify_1.0
- Deploy no Vercel: https://clinifylxp.vercel.app/

## Uso de Inteligência Artificial

A IA foi usada como apoio na comparação de requisitos, organização dos arquivos, revisão do README e melhorias de acessibilidade e interações. O paciente virtual continua sendo uma simulação local e não realiza diagnóstico médico.

## Evidências

## Evidências

As capturas responsivas estão em [docs/evidencias](docs/evidencias). O relatório informa quais testes foram realmente executados e quais limitações permanecem.

## Persistência das atividades — Computational Thinking With Python

Ao concluir uma atividade, o JavaScript serializa o registro em JSON e envia para a API Python. O backend valida os campos, evita duplicidade e grava os dados em `Computational Thinking With Python/dados/atividades_alunos.json` e `interacoes.json`, com fila em `localStorage` quando o servidor está indisponível.

## Lógica Python da Sprint 3

`agente.py`, `gerador.py`, `fluxo.py`, `dados.py`, `atividades.py` e `interacoes.py` formam o motor de simulação: geram cenários, avaliam respostas, registram tentativas e persistem resultados por aluno. O módulo `Edge_Computing` complementa a entrega com um serviço C++ em HTTP para avaliação clínica e integração com Python.

### Edge Computing

O backend C++ usa `cpp-httplib` e `nlohmann/json` para expor uma API local em `http://127.0.0.1:8080`, com `GET /api/saude` e `POST /api/avaliar` para verificar disponibilidade e calcular critérios clínicos e pontuação. Esse serviço opera de forma isolada do front-end estático e é uma extensão da entrega acadêmica.
