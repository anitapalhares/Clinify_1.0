# Clinify

<p align="left">
  <img src="https://skillicons.dev/icons?i=html,css,js,python,git,github,vscode&theme=light" alt="HTML, CSS, JavaScript, Python, Git, GitHub e VS Code" />
</p>

O Clinify é um protótipo acadêmico desenvolvido para o Challenge Hospital Moinhos de Vento da FIAP. A plataforma apoia a formação médica com estudos, questões, casos clínicos simulados, acompanhamento de desempenho e áreas demonstrativas para estudantes, professores e administradores.

Esta versão corresponde à Sprint 3 nas disciplinas de **Computational Thinking With Python**, **Web Development** e **Front-End Design**.

## Grupo

- Anita Palhares — RM 571264
- Vitória Kereski — RM 569438
- Kauã Coelho — RM 568665
- Carlos Alberto — RM 571841

## Computational Thinking With Python

A entrega de Python está concentrada em [main.py](Computational%20Thinking%20With%20Python/main.py). O programa utiliza somente as bibliotecas padrão os, json e datetime.

### Funcionalidades

- Importação do clinify_dados.json gerado pelo JavaScript.
- Validação da versão, usuário, tipos, datas, atividades e interações.
- Organização dos registros por usuário.
- Inclusão e atualização por identificador, evitando duplicações.
- Gravação segura em dados/dados_alunos.json.
- Preservação dos dados existentes quando a entrada é inválida.
- Resumo de estudos, simulados, pontuações, duração e página mais acessada.
- Listagem das atividades recentes.

### Integração com o site

O fluxo é manual e não utiliza API:

1. O JavaScript registra atividades e interações no localStorage.
2. O botão **Salvar dados**, na barra lateral, reúne os dados do usuário atual.
3. O navegador gera e baixa o arquivo clinify_dados.json.
4. O arquivo é informado ao main.py.
5. O Python valida, armazena e apresenta consultas úteis.

O paciente virtual funciona diretamente no navegador por meio de JavaScript. O Python é responsável somente pela persistência e consulta do JSON exportado.

### Como executar

Na raiz do projeto:

~~~bash
python3 "Computational Thinking With Python/main.py"
~~~

No menu:

1. Escolha **1** para importar o JSON e informe o caminho do arquivo baixado.
2. Escolha **2** para visualizar o resumo dos alunos.
3. Escolha **3** para listar as atividades recentes.
4. Escolha **0** para encerrar.

Importar o mesmo arquivo novamente não duplica os registros que mantiverem o mesmo identificador.

## Web Development + Front-End Design

O Front Web é um MVP estático construído com HTML, CSS e JavaScript. Ele não depende de servidor de aplicação, framework ou pacote externo.

### Web Development

- Separação dos scripts por autenticação, componentes compartilhados e perfis.
- Componentes compartilhados de menu, cabeçalho, rodapé, mensagens e ícones.
- Manipulação do DOM em formulários, filtros, buscas, cards, modais e indicadores.
- Sessão demonstrativa e dados separados por usuário no localStorage.
- Registro de estudos e simulações concluídas.
- Exportação dos dados em JSON pelo botão **Salvar dados**.
- Tratamento de valores padrão e dados locais inválidos.
- Áreas navegáveis de estudante, professor e administrador.
- Salas clínicas demonstrativas entre abas da mesma origem.

### Paciente virtual integrado

O módulo [agent.js](Front%20Web/assets/js/student/agent.js) contém as respostas e regras do paciente virtual. Ele é carregado diretamente por [simulacao.html](Front%20Web/estudante/simulacao.html) e conectado à interface por [simulation.js](Front%20Web/assets/js/student/simulation.js).

Durante a consulta, o estudante pode:

- escrever perguntas para o paciente;
- receber respostas relacionadas ao caso;
- investigar início, sintomas associados, intensidade e medicamentos;
- receber feedback educacional;
- acumular pontuação por critérios reconhecidos;
- finalizar a tentativa e registrar o resultado;
- escrever anotações clínicas com salvamento automático.

O agente utiliza regras locais e palavras-chave. Ele não é uma IA generativa e não realiza diagnóstico médico.

### Front-End Design

- HTML semântico, hierarquia de títulos e formulários com rótulos.
- Identidade visual centralizada em assets/css/root.css.
- Layouts com Flexbox, Grid e media queries.
- Navegação lateral com ícones e interação minimalista em azul.
- Foco visível, navegação por teclado e fechamento de modais com Escape.
- Mensagens de validação, retorno e identificação dos dados demonstrativos.
- Área de anotações em formato de notebook na consulta.
- Sinais vitais recolhíveis com ícones para PA, FC, temperatura e dor.
- Adaptação para celular, tablet e desktop.

O link do Figma não foi localizado no projeto. A revisão visual foi feita com base na identidade já implementada.

## Tecnologias

- HTML5
- CSS3
- Flexbox e CSS Grid
- JavaScript
- localStorage e JSON
- Python 3
- Git e GitHub

Não há dependências externas obrigatórias.

## Estrutura relevante

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
│   │   ├── css/
│   │   ├── img/
│   │   └── js/
│   │       ├── admin/
│   │       ├── auth/
│   │       ├── professor/
│   │       ├── shared/
│   │       └── student/
│   └── INTEGRANTES.TXT
└── README.md
~~~

## Como executar a interface

Na raiz do projeto:

~~~bash
python3 -m http.server 8000 --directory "Front Web"
~~~

Acesse:

<http://localhost:8000/login.html>

Esse comando inicia somente um servidor estático para os arquivos do Front Web. Ele não cria uma API.

## Contas demonstrativas

Todas utilizam a senha 123456.

| Perfil | E-mail |
| --- | --- |
| Administrador | admin@clinify.com |
| Professor | professor@clinify.com |
| Estudante | 12345678900@gmail.com |

O login é uma demonstração executada no navegador e não representa autenticação segura de produção.

## Roteiro de demonstração

1. Entre como estudante e navegue por Estudos, Simulação Clínica, Desempenho e Meu Perfil.
2. Abra um estudo de Cardiologia, responda às questões e finalize o módulo.
3. Abra um caso clínico e faça perguntas ao paciente virtual.
4. Confira os sinais vitais e use o notebook de anotações.
5. Finalize a simulação e recarregue a página para verificar a persistência.
6. Clique em **Salvar dados** para baixar clinify_dados.json.
7. Execute o main.py, importe o arquivo e consulte o resumo.
8. Entre como professor para criar e acompanhar uma sala demonstrativa.
9. Entre como administrador para testar busca, cadastro, edição e status de professores.
10. Verifique a interface em larguras de celular, tablet e desktop.

## Validações realizadas

- Sintaxe dos 17 arquivos JavaScript.
- Compilação do main.py.
- Verificação das 18 páginas HTML e de 198 referências locais.
- Fluxos dos três perfis no navegador.
- Resposta, feedback e pontuação do paciente virtual.
- Persistência após recarregar a página.
- Exportação real do JSON e importação no Python.
- Reimportação sem duplicar registros.
- Rejeição de JSON inválido sem apagar dados existentes.
- Responsividade em 360, 390, 768, 1024 e 1440 pixels.

## Dados e limitações

- Contas, professores, turmas, alunos, casos e resultados são demonstrativos.
- O armazenamento do navegador não sincroniza entre dispositivos.
- Salas demonstrativas funcionam entre abas do mesmo navegador e origem.
- O envio do JSON para Python é manual.
- Cardiologia possui o conteúdo de estudo mais completo; outras especialidades podem apresentar conteúdo em preparação.
- A aplicação não utiliza banco de dados, API ou autenticação de produção.

## Links

- Repositório: https://github.com/anitapalhares/Clinify_1.0
- Deploy informado: https://clinifylxp.vercel.app/

A existência do link de deploy não comprova que as alterações locais mais recentes estejam publicadas.

## Uso de Inteligência Artificial

Uma ferramenta de inteligência artificial foi utilizada como apoio para comparar requisitos, revisar código, organizar arquivos, melhorar acessibilidade e responsividade, testar fluxos e revisar esta documentação. A equipe deve revisar o resultado antes da entrega acadêmica.

O paciente virtual do Clinify utiliza regras locais em JavaScript e não emprega um modelo de inteligência artificial treinado.
