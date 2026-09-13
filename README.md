# Clinify

<p align="left"> <img src="https://skillicons.dev/icons?i=html,css,js,git,github,vscode&theme=light" /> </p>

Projeto acadêmico da FIAP para o Challenge Hospital Moinhos de Vento. A plataforma reúne estudos, questões, simulações clínicas e painéis de estudante, professor e administrador.

Esta versão foi revisada para o escopo da **Sprint 3** de Web Development e Front-End Design: HTML, CSS e JavaScript.

## Tecnologias

HTML5 semântico, CSS3 (Flexbox, Grid e media queries) e JavaScript.

## Como executar

Abra `login.html` no navegador ou utilize a extensão Live Server do VS Code. Também é possível executar com Python:

```bash
python3 -m http.server 8000
```

Depois acesse <http://localhost:8000/login.html>.

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
index.html                 Redireciona para o login
login.html                 Entrada do site
estudante/                 Estudos, questões, casos, desempenho e perfil
professor/                 Turmas, alunos, estudos, desempenho e perfil
administrador/             Painel, professores e perfil
assets/css/                root.css, estrutura.css, acesso.css, estudos.css e simulacao.css
assets/js/shared/          Componentes, comportamento do layout, dados fictícios e perfil
assets/js/                 Interações de cada área
assets/img/                Marca e favicon do projeto
INTEGRANTES.TXT            Integrantes e RMs
```

As variáveis visuais ficam em `root.css`. Menus, rodapé e mensagens de retorno são compartilhados em `components.js`. Os layouts principais começam com uma coluna no celular e se ampliam com media queries para tablet e desktop.

## Como testar

1. Entre como administrador. Busque, cadastre, edite e altere o status de um professor. Recarregue a página para conferir a persistência.
2. Abra Meu perfil, altere o nome e salve. Recarregue para conferir o resultado.
3. Entre como estudante. Teste os filtros e a ordenação dos estudos, inclusive uma busca sem resultados.
4. Abra Cardiologia, responda às questões e finalize o módulo. O progresso é salvo no navegador.
5. Abra Simulação clínica. Teste os filtros e o código `MOINHOS01`, envie uma resposta e finalize a consulta. O último resultado fica salvo.
6. Confira o site em larguras de 375px, 768px e 1440px. Teste o menu no celular e navegue usando Tab e Escape.

## Dados e limites da demonstração

Os dados de professores, turmas, alunos e casos são fictícios. Cadastros, perfis, preferências e progresso usam localStorage neste navegador. Cardiologia possui conteúdo e questões; as demais especialidades mostram um estado de conteúdo em preparação. O vídeo ainda não está disponível. Os cards de casos abrem o mesmo cenário demonstrativo; a pontuação é ilustrativa e o gerador de IA não está integrado a um modelo real.

## Uso de Inteligência Artificial

A Inteligência Artificial (IA) foi utilizada como ferramenta de apoio durante o desenvolvimento do projeto, auxiliando na comparação dos requisitos da Sprint 3 com o código, organização dos arquivos e componentes, correção de referências e melhorias nas interações e acessibilidade. A IA também auxiliou na preparação e revisão deste README.

As alterações foram acompanhadas de verificações no código e testes de navegação. A IA foi utilizada apenas como suporte ao desenvolvimento, e o site não utiliza uma IA real para analisar decisões clínicas ou realizar diagnósticos.
