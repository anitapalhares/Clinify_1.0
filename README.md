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

O JavaScript registra no navegador as interações, os módulos de estudo e as simulações concluídas pelo estudante. Ao selecionar **Salvar dados**, o site cria um novo arquivo `clinify_dados_DATA_E_HORA.json`. Os arquivos anteriores são preservados.

O Python procura todos os arquivos `.json` dentro de `Computational Thinking With Python/dados`, permite escolher um deles e apresenta um resumo com:

- identificação e perfil do usuário;
- quantidade de interações registradas;
- módulos de estudo concluídos;
- simulações concluídas;
- média das pontuações dos simulados.

A transferência ocorre por arquivo JSON. Não são utilizados API, servidor Python ou banco de dados.

## Como testar passo a passo

### 1. Abra o terminal na raiz do projeto

Os próximos comandos devem ser executados na pasta que contém `Front Web` e `Computational Thinking With Python`.

Para confirmar que está no local correto, execute:

```bash
ls
```

As duas pastas devem aparecer na lista.

### 2. Inicie o Front Web

No primeiro terminal, execute:

```bash
python3 -m http.server 8000 --directory "Front Web/clinify-front-web"
```

Mantenha esse terminal aberto e acesse no navegador:

<http://localhost:8000/index.html>

### 3. Gere atividades para o arquivo

1. Entre com a conta de estudante.
2. Abra **Estudos**, responda às questões e finalize um módulo.
3. Abra **Simulação Clínica**, escolha um caso, converse com o paciente virtual e finalize a simulação.
4. Use outras áreas do site caso queira registrar mais interações.

Essas informações ficam salvas no navegador até serem exportadas.

### 4. Salve o JSON

1. Na barra lateral, selecione **Salvar dados**.
2. Quando o navegador pedir uma pasta, escolha `Computational Thinking With Python/dados`.
3. Confirme que apareceu uma mensagem com o nome do novo arquivo.

Chrome e Edge permitem selecionar a pasta `dados` e gravar diretamente nela. Caso o navegador baixe o JSON em `Downloads`, mova o arquivo manualmente para:

```text
Computational Thinking With Python/dados/
```

Cada uso do botão cria um arquivo novo. O nome contém a data e o horário para evitar que uma exportação substitua outra.

### 5. Confirme que o arquivo está na pasta correta

Em outro terminal, ainda na raiz do projeto, execute:

```bash
ls "Computational Thinking With Python/dados"
```

Deve aparecer pelo menos um arquivo terminado em `.json`.

### 6. Execute o programa Python

Execute:

```bash
python3 "Computational Thinking With Python/main.py"
```

O programa exibirá uma lista semelhante a esta:

```text
Arquivos disponíveis na pasta dados:

1. clinify_dados_2026-09-23T19-15-44-078Z.json
0. Sair
```

Digite o número do arquivo e pressione **Enter**. Para encerrar sem abrir um arquivo, digite `0`.

### 7. Confira o resultado

Após a escolha, o Python informa que o arquivo foi lido e mostra o resumo dos dados. Ao terminar, aparece a mensagem `Leitura concluída. Programa encerrado.`

Se o arquivo não for um JSON válido, o programa apresenta o erro e encerra sem alterar ou apagar nenhum dado.

## Estrutura

```text
Computational Thinking With Python/
├── main.py
└── dados/
```

# Edge Computing

O módulo de Edge Computing implementa um motor local de avaliação clínica em C++17. Ele utiliza `cpp-httplib` para o servidor HTTP e `nlohmann/json` para receber e devolver dados em JSON. Um cliente Python permite validar a comunicação entre as duas linguagens.

## Visão geral da arquitetura

```text
Cliente de teste Python
          │
          │ HTTP REST e JSON — porta 8080
          ▼
Clinify Edge Engine (C++17)
├── servidor HTTP local
├── leitura e criação de JSON
└── avaliação de critérios clínicos
    ├── acolhimento
    ├── anamnese
    ├── sinais de alerta
    └── segurança da conduta
```

O serviço funciona de forma local e independente. O arquivo `cliente_teste.py` demonstra o envio de uma fala clínica para o servidor e a leitura da resposta em JSON.

## Estrutura

```text
backend/Edge Computing/
├── CMakeLists.txt
├── main.cpp
├── cliente_teste.py
├── httplib.h
└── json.hpp
```

## Rotas disponíveis

### `GET /api/saude`

Verifica se o serviço está em execução.

```json
{
  "servico": "Clinify Edge C++",
  "status": "online",
  "porta": 8080
}
```

### `POST /api/avaliar`

Recebe a fala do estudante e os critérios já alcançados na sessão.

Exemplo de entrada:

```json
{
  "fala": "Olá Maria, quando começou essa dor e você teve febre?",
  "criterios_anteriores": []
}
```

Exemplo de resposta:

```json
{
  "feedback": "Investigou o histórico e características da queixa. Atenção adequada aos sinais de alerta graves.",
  "ganho_pontos": 18,
  "novos_criterios": [
    "anamnese",
    "sinais de alerta"
  ]
}
```

Um corpo com JSON inválido recebe o status `400` e uma mensagem de erro.

## Como executar

Pré-requisitos:

- compilador com suporte a C++17;
- CMake 3.15 ou superior;
- Python 3 para executar o cliente de teste.

No Windows com MinGW, abra o terminal na raiz do projeto e compile o serviço:

```cmd
cd "backend\Edge Computing"
mkdir build
cd build
cmake -G "MinGW Makefiles" ..
cmake --build .
```

Inicie o servidor no mesmo diretório:

```cmd
clinify_edge.exe
```

O serviço ficará disponível em `http://127.0.0.1:8080`. Em outro terminal, execute o cliente Python:

```cmd
cd "backend\Edge Computing"
python cliente_teste.py
```

O script consulta a rota de saúde e envia uma avaliação clínica de exemplo, exibindo no terminal as respostas JSON produzidas pelo servidor C++.

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
python3 -m http.server 8000 --directory "Front Web/clinify-front-web"
```

Acesse:

<http://localhost:8000/index.html>

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
├── index.html
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

Protótipo no Figma

- https://www.figma.com/design/5XBp7dz9bmiCKe95phM3xM/Clinify---prototipo?node-id=115-51&t=rlj9wU2Wilee0FHX-1

## Uso de Inteligência Artificial

A Inteligência Artificial (IA) foi utilizada como ferramenta de apoio durante o desenvolvimento do projeto, auxiliando na comparação dos requisitos da Sprint 3 com o código, organização dos arquivos e componentes, correção de referências e melhorias nas interações e acessibilidade. A IA também auxiliou na preparação e revisão deste README.

As alterações foram acompanhadas de verificações no código e testes de navegação. A IA foi utilizada apenas como suporte ao desenvolvimento, e o agente da simulação não realiza diagnósticos.
