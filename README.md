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

<<<<<<< HEAD
A Inteligência Artificial foi utilizada como apoio na revisão dos requisitos da Sprint 3, na organização do código, na correção de referências e na melhoria da acessibilidade, responsividade e consistência visual. As decisões e os resultados foram revisados pela equipe. A simulação clínica é educacional e não realiza diagnóstico médico.
=======
A Inteligência Artificial (IA) foi utilizada como ferramenta de apoio durante o desenvolvimento do projeto, auxiliando na comparação dos requisitos da Sprint 3 com o código, organização dos arquivos e componentes, correção de referências e melhorias nas interações e acessibilidade. A IA também auxiliou na preparação e revisão deste README.

As alterações foram acompanhadas de verificações no código e testes de navegação. A IA foi utilizada apenas como suporte ao desenvolvimento, e o agente da simulação não realiza diagnósticos.

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

## Edge Computing (Backend C++ & Integração Python)

### 1. Visão Geral da Arquitetura
O módulo `Edge_Computing` implementa o motor avaliador clínico em C++ de alta performance utilizando a biblioteca `cpp-httplib` (header-only) e manipulação de payloads via `nlohmann/json`. 
A aplicação web principal consome este serviço via requisições HTTP REST. Nesta primeira etapa de entrega, o serviço C++ está estruturado com `CMakeLists.txt` e `main.cpp`, e o cliente consumidor Python possui modo de contingência mockado para validação das rotas enquanto o ambiente de compilação da infraestrutura local é padronizado.

### 2. Especificação das APIs REST

#### GET /api/saude
Endpoint de verificação de disponibilidade operacional (*health check*).
* **Entrada:** Nenhuma.
* **Saída (200 OK):**
``` json
{
  "servico": "Clinify Edge C++",
  "status": "online",
  "porta": 8080
}
```
## Links da entrega

- Repositório: https://github.com/anitapalhares/Clinify_1.0
- Deploy na Vercel: adicionar a URL pública após vincular este repositório à conta da equipe.
- Conferência acadêmica: docs/SPRINT-3.md

A interface da pasta `Front Web` funciona em hospedagem estática. Configure essa pasta como diretório raiz da publicação. Quando a API Python não estiver disponível, a criação e a avaliação dos casos usam o modo de demonstração local e mantêm o progresso no localStorage. Para testar também a persistência em JSON e os endpoints Python, use a execução local descrita acima.

## Acessibilidade e responsividade

A interface utiliza landmarks semânticos, hierarquia de títulos, rótulos associados aos campos, navegação por teclado, link para pular ao conteúdo, foco visível, regiões de status e suporte à preferência de redução de movimento. Os layouts foram preparados para celular, tablet e desktop com Grid, Flexbox e media queries mobile first.

>>>>>>> 2dd170b1a850d5604d389bfd0cf3cb315ec5831d
