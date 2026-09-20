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

HTML5 semântico, CSS3 (Flexbox, Grid e media queries), JavaScript e Python 3 com biblioteca padrão. Não há dependências externas obrigatórias.

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

Para a experiência completa com persistência e API Python, execute também:

```bash
python3 "Computational Thinking With Python/main.py"
```

No menu, escolha **4** para iniciar o servidor e acesse <http://127.0.0.1:8000/>. As páginas e a API Python são servidas no mesmo endereço. As opções 1, 2 e 3 permitem testar a lógica pelo terminal. A consulta interativa precisa desse servidor para receber feedback e salvar a tentativa em JSON.

## Contas demonstrativas

Todas utilizam a senha 123456.

O login é uma demonstração em JavaScript. Não há autenticação de servidor: as páginas também podem ser abertas diretamente.

Todas utilizam a senha `123456`.

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

## Dados e limites da demonstração

- Contas, professores, turmas, alunos, casos e resultados são demonstrativos.
- O armazenamento do navegador não sincroniza entre dispositivos.
- Salas demonstrativas funcionam entre abas do mesmo navegador e origem.
- O envio do JSON para Python é manual.
- Cardiologia possui o conteúdo de estudo mais completo; outras especialidades podem apresentar conteúdo em preparação.
- A aplicação não utiliza banco de dados, API ou autenticação de produção.

Os dados de professores, turmas, alunos e casos são fictícios. Cadastros, perfis, preferências e progresso usam localStorage neste navegador. Cardiologia possui conteúdo e questões; as demais especialidades mostram um estado de conteúdo em preparação. O vídeo ainda não está disponível. As salas personalizadas guardam nome, turma, orientações, código e tentativas; podem ser editadas, encerradas, reabertas e excluídas. Funcionam entre abas do mesmo navegador e origem, sem sincronização entre dispositivos. Cada card abre seu próprio contexto fictício. As salas do professor usam o caso de cefaleia. Casos criados em Clinify AI ficam na sessão atual do navegador. O gerador Python usa modelos de texto e regras educacionais, sem um modelo de IA treinado ou sistema de diagnóstico.

## Links Relevantes

- Repositório: https://github.com/anitapalhares/Clinify_1.0
- Deploy informado: https://clinifylxp.vercel.app/

A existência do link de deploy não comprova que as alterações locais mais recentes estejam publicadas.

## Uso de Inteligência Artificial

Uma ferramenta de inteligência artificial foi utilizada como apoio para comparar requisitos, revisar código, organizar arquivos, melhorar acessibilidade e responsividade, testar fluxos e revisar esta documentação. A equipe deve revisar o resultado antes da entrega acadêmica.

A Inteligência Artificial (IA) foi utilizada como ferramenta de apoio durante o desenvolvimento do projeto, auxiliando na comparação dos requisitos da Sprint 3 com o código, organização dos arquivos e componentes, correção de referências e melhorias nas interações e acessibilidade. A IA também auxiliou na preparação e revisão deste README.

As alterações foram acompanhadas de verificações no código e testes de navegação. A IA foi utilizada apenas como suporte ao desenvolvimento, e o agente da simulação não realiza diagnósticos.

O paciente virtual do Clinify utiliza regras locais em JavaScript e não emprega um modelo de inteligência artificial treinado.

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

A interface utiliza landmarks semânticos, hierarquia de títulos, rótulos associados aos campos, navegação por teclado, link para pular ao conteúdo, foco visível, regiões de status e suporte à preferência de redução de movimento. Os layouts foram preparados para celular, tablet e desktop com Grid, Flexbox e media queries mobile first.
