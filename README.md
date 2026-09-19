# Clinify

Clinify é uma plataforma educacional desenvolvida para o Challenge Hospital Moinhos de Vento. A solução reúne estudos, questões, simulações clínicas, acompanhamento de desempenho e áreas específicas para estudantes, professores e administradores.

## Grupo

- Anita Palhares — RM 571264
- Vitória Kereski — RM 569438
- Kauã Coelho — RM 568665
- Carlos Alberto — RM 571841

## Sprint 3

A Sprint 3 apresenta um MVP visual navegável e integra as contribuições das disciplinas no mesmo projeto.

### Computational Thinking With Python

O JavaScript registra interações, estudos e simulados no navegador. O botão **Salvar dados**, localizado na barra lateral, gera `clinify_dados.json`. O arquivo [main.py](<Computational Thinking With Python/main.py>) utiliza somente `os`, `json` e `datetime` para:

- Ler e validar o JSON gerado pelo Front Web.
- Organizar interações e atividades por usuário.
- Evitar registros duplicados.
- Persistir os dados em `dados/dados_alunos.json`.
- Exibir um resumo de estudos, simulados e interações.

Não há API, servidor Python ou dependências externas.

### Differentiated Problem Solving

O documento da Sprint solicita uma análise com limites ou derivadas integrada à interface. O repositório atual não contém um artefato matemático específico desta disciplina.

### Edge Computing & Computer Systems

O documento solicita uma simulação com ESP32 no Wokwi, interface local e leitura de sensores. O link e os arquivos dessa simulação não estão presentes neste repositório.

### Front-End Design

A interface implementa HTML semântico, identidade visual consistente, formulários, cards, painéis, históricos, estatísticas e navegação acessível. Os layouts usam Flexbox, CSS Grid, unidades responsivas, foco visível e media queries para celular, tablet e desktop.

O MVP mantém consistência entre as áreas de estudante, professor e administrador. Não foi fornecido um link público do protótipo no Figma para incluir nesta versão.

### Software & Total Experience Design

O documento solicita dois diagramas de caso de uso criados no Astah e documentados em Word. Esses artefatos não estão presentes neste repositório.

### Web Development

O JavaScript está separado por área e responsabilidade. O projeto inclui:

- Componentes compartilhados de navegação, rodapé e mensagens.
- Manipulação do DOM e eventos de interface.
- Validação de formulários e mensagens de retorno.
- Busca, filtros, cards, modais e estados de interação.
- Persistência de progresso, perfis, salas e preferências com `localStorage`.
- Geração do JSON utilizado pela entrega de Python.

## Tecnologias

- HTML5
- CSS3, Flexbox, Grid e media queries
- JavaScript
- Python 3
- JSON e localStorage
- Git e GitHub

Não há dependências para instalar.

## Estrutura principal

```text
Computational Thinking With Python/
├── main.py
└── dados/
Front Web/
├── login.html
├── estudante/
├── professor/
├── administrador/
└── assets/
INTEGRANTES.TXT
README.md
```

## Como executar e testar

1. Abra `Front Web/login.html` no navegador.
2. Entre com uma das contas de teste.
3. Navegue pelo site, conclua um estudo e finalize um simulado.
4. Clique em **Salvar dados** na parte inferior da barra lateral.
5. Confirme o download de `clinify_dados.json`.
6. Na raiz do projeto, execute:

```bash
python3 "Computational Thinking With Python/main.py"
```

7. Escolha **1** para importar o JSON. Pressione Enter para usar `~/Downloads/clinify_dados.json` ou informe outro caminho.
8. Escolha **2** para conferir o resumo salvo.

## Contas de teste

Todas utilizam a senha `123456`.

| Perfil | E-mail |
| --- | --- |
| Administrador | admin@clinify.com |
| Professor | professor@clinify.com |
| Estudante | 12345678900@gmail.com |

## Links

- Repositório: https://github.com/anitapalhares/Clinify_1.0
- Deploy: https://clinifylxp.vercel.app/

## Uso de Inteligência Artificial

A Inteligência Artificial foi utilizada como apoio na revisão dos requisitos da Sprint 3, na organização do código, na correção de referências e na melhoria da acessibilidade, responsividade e consistência visual. As decisões e os resultados foram revisados pela equipe. A simulação clínica é educacional e não realiza diagnóstico médico.
