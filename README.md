# Clinify

<p align="left"> <img src="https://skillicons.dev/icons?i=html,css,js,git,github,vscode&theme=light" /> </p>

Projeto acadêmico da FIAP para o Challenge Hospital Moinhos de Vento. A plataforma reúne estudos, questões, simulações clínicas e painéis de estudante, professor e administrador.

Esta versão reúne HTML, CSS, JavaScript e a lógica da Sprint 3 de Computational Thinking With Python.

## Tecnologias

HTML5 semântico, CSS3 (Flexbox, Grid e media queries), JavaScript e Python 3 com biblioteca padrão.

## Como executar

Na pasta do projeto, execute:

```bash
python3 -m backend.ctwp
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
index.html                 Entrada do site
estudante/                 Estudos, questões, casos, desempenho e perfil
professor/                 Turmas, alunos, estudos, desempenho e perfil
administrador/             Painel, professores e perfil
assets/css/                root.css, estrutura.css, acesso.css, estudos.css e simulacao.css
assets/js/shared/          Componentes, comportamento do layout, dados fictícios e perfil
assets/js/                 Interações de cada área
backend/ctwp/              Agente, fluxo, JSON e servidor Python
assets/img/                Marca e favicon do projeto
integrantes.txt            Integrantes e RMs
```

As variáveis visuais ficam em `root.css`. Menus, rodapé e mensagens de retorno são compartilhados em `components.js`. Os layouts principais começam com uma coluna no celular e se ampliam com media queries para tablet e desktop.

## Como testar

1. Entre como administrador. Busque, cadastre, edite e altere o status de um professor. Recarregue a página para conferir a persistência.
2. Abra Meu perfil, altere o nome e salve. Recarregue para conferir o resultado.
3. Entre como estudante. Abra Estudos e use “Ver casos desta matéria”. Na página de casos, alterne entre Cardiologia, Pneumologia, Neurologia, Gastroenterologia, Endocrinologia e Histologia; combine busca e dificuldade.
4. Abra Cardiologia, responda às questões e finalize o módulo. O progresso é salvo no navegador.
5. Abra um caso, envie uma fala e confira o feedback e a pontuação. Em Clinify AI, descreva um cenário, escolha matéria e dificuldade e inicie um caso personalizado. Como professor, crie uma sala e copie o código. Em outra aba do mesmo navegador, entre como estudante, informe seu nome e esse código, finalize e analise as respostas na aba do professor.
6. Confira o site em larguras de 375px, 768px e 1440px. Teste o menu no celular e navegue usando Tab e Escape.

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
