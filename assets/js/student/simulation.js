(function () {
    var consultation = document.querySelector('[data-simulation-consultation]');
    if (consultation) {
        initConsultation();
        return;
    }
    initLobby();

    function initLobby() {
        var cases = Array.from(document.querySelectorAll('[data-case]'));
        var search = document.querySelector('[data-filter-search]');
        var difficulty = document.querySelector('[data-filter-difficulty]');
        var clear = document.querySelector('[data-clear-filters]');
        var counter = document.querySelector('[data-case-counter]');
        var empty = document.querySelector('[data-empty-state]');
        var codeForm = document.querySelector('[data-code-form]');
        var modal = document.querySelector('[data-ai-modal]');
        var openModal = document.querySelector('[data-ai-open]');
        var closeModal = document.querySelector('[data-ai-close]');
        var aiForm = document.querySelector('[data-ai-form]');
        var materiaButtons = Array.from(document.querySelectorAll('[data-materia-filter]'));
        var activeMateria = new URLSearchParams(window.location.search).get('materia') || 'all';
        if (!materiaButtons.some(function (button) { return button.dataset.materiaFilter === activeMateria; })) activeMateria = 'all';
        var nomesMaterias = Object.fromEntries(materiaButtons.map(function (button) {
            return [button.dataset.materiaFilter, button.querySelector('strong').textContent];
        }));

        function normalize(text) {
            return (text || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        }

        function render() {
            var query = normalize(search ? search.value : '');
            var selectedDifficulty = difficulty ? difficulty.value : 'all';
            var visible = 0;

            cases.forEach(function (card) {
                var text = normalize(card.textContent);
                var matchesSearch = !query || text.includes(query);
                var matchesDifficulty = selectedDifficulty === 'all' || card.dataset.difficulty === selectedDifficulty;
                var matchesMateria = activeMateria === 'all' || card.dataset.materia === activeMateria;
                var show = matchesSearch && matchesDifficulty && matchesMateria;
                card.hidden = !show;
                if (show) visible += 1;
            });

            if (counter) counter.textContent = visible + (visible === 1 ? ' caso encontrado' : ' casos encontrados');
            if (empty) empty.hidden = visible !== 0;
            if (!visible && empty) {
                var mensagem = empty.querySelector('[data-empty-message]');
                var estudo = empty.querySelector('[data-empty-study-link]');
                if (mensagem) mensagem.textContent = activeMateria === 'all'
                    ? 'Nenhum caso encontrado com esses filtros.'
                    : 'Ainda não há casos para ' + nomesMaterias[activeMateria] + ' com esses filtros.';
                if (estudo) estudo.href = 'estudos.html' + (activeMateria === 'all' ? '' : '?materia=' + encodeURIComponent(activeMateria));
            }
            materiaButtons.forEach(function (button) {
                var selecionado = button.dataset.materiaFilter === activeMateria;
                button.classList.toggle('is-active', selecionado);
                button.setAttribute('aria-pressed', String(selecionado));
            });
        }

        materiaButtons.forEach(function (button) {
            var quantidade = cases.filter(function (card) { return card.dataset.materia === button.dataset.materiaFilter; }).length;
            button.querySelector('small').textContent = quantidade + (quantidade === 1 ? ' caso' : ' casos');
            button.addEventListener('click', function () {
                var value = button.dataset.materiaFilter;
                activeMateria = activeMateria === value ? 'all' : value;
                render();
            });
        });

        if (search) search.addEventListener('input', render);
        if (difficulty) difficulty.addEventListener('change', render);
        if (clear) {
            clear.addEventListener('click', function () {
                if (search) search.value = '';
                if (difficulty) difficulty.value = 'all';
                activeMateria = 'all';
                render();
            });
        }

        if (codeForm) {
            codeForm.addEventListener('submit', function (event) {
                event.preventDefault();
                var codigo = codeForm.querySelector('[name="caseCode"]').value.trim().toUpperCase();
                try {
                    var aluno = codeForm.querySelector('[name="nomeAluno"]').value.trim();
                    var tentativa = ClinifySalas.entrar(codigo, aluno);
                    window.location.href = 'simulacao.html?materia=neurologia&sala=' + encodeURIComponent(codigo) + '&tentativa=' + encodeURIComponent(tentativa.id);
                } catch (erro) { ClinifyUI.mensagem(erro.message, true); }
            });
        }

        if (openModal && modal) {
            openModal.addEventListener('click', function () {
                var seletor = modal.querySelector('[data-ai-specialty]');
                if (seletor && activeMateria !== 'all') seletor.value = activeMateria;
                modal.hidden = false;
            });
        }

        if (closeModal && modal) {
            closeModal.addEventListener('click', function () {
                modal.hidden = true;
            });
        }

        if (modal) {
            modal.addEventListener('click', function (event) {
                if (event.target === modal) modal.hidden = true;
            });
        }

        if (aiForm) {
            aiForm.addEventListener('submit', async function (event) {
                event.preventDefault();
                var botao = aiForm.querySelector('[type="submit"]');
                botao.disabled = true;
                botao.textContent = 'Preparando caso…';
                try {
                    var resposta = await fetch('/api/gerar-caso', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            caracteristicas: aiForm.querySelector('[data-ai-characteristics]').value.trim(),
                            materia: aiForm.querySelector('[data-ai-specialty]').value,
                            dificuldade: aiForm.querySelector('[data-ai-difficulty]').value
                        })
                    });
                    var caso = await resposta.json();
                    if (!resposta.ok) throw new Error(caso.erro || 'Não foi possível preparar o caso.');
                    sessionStorage.setItem('clinify:caso-personalizado', JSON.stringify(caso));
                    window.location.href = 'simulacao.html?caso=' + encodeURIComponent(caso.id) + '&materia=' + encodeURIComponent(caso.materia);
                } catch (erro) {
                    ClinifyUI.mensagem(erro instanceof TypeError ? 'Clinify AI indisponível. Inicie o site com python3 -m backend.ctwp.' : erro.message, true);
                    botao.disabled = false;
                    botao.textContent = 'Gerar e iniciar caso →';
                }
            });
        }

        render();
    }

    function initConsultation() {
        var catalogo = {
            'cardio-dor': {materia: 'cardiologia', area: 'Cardiologia', titulo: 'Dor no peito após exercício', pessoa: 'João, 45 anos', resumo: 'Homem, 45 anos, dor no peito após exercício físico.', fala: 'Sinto dor no peito depois de fazer exercício.'},
            'pneumo-fadiga': {materia: 'pneumologia', area: 'Pneumologia', titulo: 'Fadiga e falta de ar', pessoa: 'Maria, 28 anos', resumo: 'Mulher, 28 anos, fadiga constante e falta de ar.', fala: 'Estou cansada com frequência e sinto falta de ar.'},
            'pediatria-febre': {materia: '', area: 'Pediatria', titulo: 'Febre e manchas na pele', pessoa: 'Paciente, 8 anos', resumo: 'Criança, 8 anos, febre alta, dor de garganta e manchas na pele.', fala: 'Estou com febre e minha garganta dói.'},
            'endo-sede': {materia: 'endocrinologia', area: 'Endocrinologia', titulo: 'Sede e perda de peso', pessoa: 'Paciente, 61 anos', resumo: 'Mulher, 61 anos, muita sede, perda de peso e ferida no pé.', fala: 'Tenho sentido muita sede e perdi peso.'},
            'gineco-dor': {materia: '', area: 'Ginecologia', titulo: 'Dor pélvica e sangramento irregular', pessoa: 'Paciente, 32 anos', resumo: 'Mulher, 32 anos, dor pélvica intensa e sangramento irregular.', fala: 'Estou com dor pélvica e sangramento irregular.'},
            'mental-palpitacoes': {materia: '', area: 'Saúde Mental', titulo: 'Palpitações e medo intenso', pessoa: 'Paciente, 21 anos', resumo: 'Jovem, 21 anos, palpitações, medo intenso e sensação de morte.', fala: 'Estou com palpitações e muito medo.'},
            'emergencia-queda': {materia: '', area: 'Emergência', titulo: 'Queda de bicicleta', pessoa: 'Paciente, 24 anos', resumo: 'Homem, 24 anos, queda de bicicleta, confusão e dor abdominal.', fala: 'Caí de bicicleta e estou com dor abdominal.'},
            'neuro-confusao': {materia: 'neurologia', area: 'Neurologia', titulo: 'Confusão mental súbita', pessoa: 'Paciente, 78 anos', resumo: 'Idosa, 78 anos, confusão mental súbita, febre baixa e queda.', fala: 'Minha família percebeu que fiquei confusa depois de uma queda.'}
        };
        var form = document.querySelector('[data-sim-form]');
        var input = document.querySelector('[data-sim-input]');
        var thread = document.querySelector('[data-chat-thread]');
        var log = document.querySelector('[data-decision-log]');
        var score = document.querySelector('[data-sim-score]');
        var timer = document.querySelector('[data-sim-timer]');
        var finish = document.querySelector('[data-finish-case]');
        var quickResponses = Array.from(document.querySelectorAll('[data-quick-response]'));
        var history = document.querySelector('[data-history-summary]');
        var seconds = 0;
        var finalizado = false;
        var intervalo;
        var points = Number(score ? score.textContent : 64);
        var parametros = new URLSearchParams(window.location.search);
        var idCaso = parametros.get('caso') || 'cefaleia';
        var caso = catalogo[idCaso];
        if (!caso && idCaso.startsWith('personalizado-')) {
            try {
                var guardado = JSON.parse(sessionStorage.getItem('clinify:caso-personalizado') || 'null');
                if (guardado && guardado.id === idCaso && guardado.materia && guardado.resumo) caso = guardado;
            } catch (erro) { caso = null; }
        }
        if (idCaso !== 'cefaleia' && !caso) {
            document.querySelector('main').innerHTML = '<section class="record-card"><h1>Caso não encontrado</h1><a href="casos.html">Voltar aos casos</a></section>';
            return;
        }
        var codigoSala = parametros.get('sala');
        var idTentativa = parametros.get('tentativa');
        var chaveAgente = 'clinify:tentativa-ctwp:' + idCaso;
        var idAgente = idTentativa || sessionStorage.getItem(chaveAgente);
        if (!idAgente) { idAgente = crypto.randomUUID(); sessionStorage.setItem(chaveAgente, idAgente); }
        var enviando = false;
        var enviadas = 0;
        var materia = caso ? caso.materia : 'neurologia';
        if (codigoSala && idCaso !== 'cefaleia') {
            document.querySelector('main').innerHTML = '<section class="record-card"><h1>Caso não disponível nesta sala</h1><a href="casos.html">Voltar aos casos</a></section>';
            return;
        }
        document.querySelectorAll('a[href^="casos.html"]').forEach(function (link) {
            link.href = 'casos.html' + (materia ? '?materia=' + encodeURIComponent(materia) : '');
        });
        if (caso) {
            var prontuario = document.querySelector('.record-card');
            prontuario.querySelector('h1').textContent = caso.pessoa;
            prontuario.querySelectorAll('p')[0].textContent = caso.resumo + ' Este roteiro é fictício e não contém outros dados antes da entrevista.';
            prontuario.querySelectorAll('p')[1].textContent = 'Investigue história, sintomas e contexto durante a conversa. Nenhum diagnóstico ou tratamento é fornecido automaticamente.';
            document.querySelector('.vital-card').hidden = true;
            document.querySelector('.decision-strip').hidden = true;
            document.querySelector('.chat-header h2').textContent = caso.titulo;
            var rotulo = document.querySelector('[data-materia-label]');
            if (rotulo) rotulo.textContent = caso.area + ' · ' + (caso.nivel ? 'dificuldade ' + caso.nivel.toLowerCase() : 'consulta simulada');
            var icone = document.querySelector('.consulta-materia [data-materia-icon]');
            if (icone && materia) {
                icone.className = 'study-icon study-icon--' + ({cardiologia: 'red', pneumologia: 'blue', neurologia: 'purple', endocrinologia: 'orange'}[materia] || 'blue');
                window.ClinifyMaterias.pintar(icone, materia);
                icone.dataset.materiaIcon = materia;
            } else if (icone) icone.remove();
            document.querySelector('.bubble.patient').textContent = caso.fala;
            var objetivos = document.querySelector('.learning-goals ul');
            objetivos.innerHTML = '';
            [caso.objetivo || 'Ouvir a pessoa e organizar a história da queixa.', 'Investigar sinais que exigem atenção.', 'Explicar decisões com clareza e considerar avaliação supervisionada.'].forEach(function (texto) {
                var item = document.createElement('li');
                item.textContent = texto;
                objetivos.appendChild(item);
            });
            document.querySelector('[data-coach-panel] p').textContent = 'Pergunte sobre início, duração, sintomas associados e contexto. Este caso é uma prática educacional.';
            var falasRapidas = [
                ['Quero entender quando os sintomas começaram e o que mais você sentiu.', 'Investigar sintomas'],
                ['Entendo sua preocupação. Vou ouvir com calma e explicar cada passo.', 'Acolher paciente'],
                ['Vou revisar os sinais de alerta e discutir a avaliação com supervisão.', 'Planejar avaliação segura']
            ];
            quickResponses.forEach(function (button, indice) {
                button.dataset.quickResponse = falasRapidas[indice][0];
                button.textContent = falasRapidas[indice][1];
            });
        }
        if (codigoSala) {
            var sala = ClinifySalas.localizar(codigoSala);
            var tentativa = sala && sala.tentativas.find(function (t) { return t.id === idTentativa; });
            if (!sala || sala.status !== 'aberta' || !tentativa || tentativa.estado !== 'em andamento') {
                document.querySelector('main').innerHTML = '<section class="record-card"><h1>Sala indisponível</h1><p>A sala foi encerrada, não existe ou esta tentativa já foi finalizada.</p><a href="casos.html">Voltar e entrar com outro código</a></section>';
                return;
            }
            var convite = document.createElement('section');
            convite.className = 'convite-sala';
            convite.innerHTML = '<strong>' + ClinifyUI.escapar(sala.nome) + '</strong><p>' + ClinifyUI.escapar(sala.turma) + ' · Código ' + ClinifyUI.escapar(sala.codigo) + ' · ' + ClinifyUI.escapar(tentativa.aluno) + '</p>' + (sala.instrucoes ? '<p>' + ClinifyUI.escapar(sala.instrucoes) + '</p>' : '');
            document.querySelector('main').prepend(convite);
            tentativa.respostas.forEach(function (r) { addMessage('doctor', r.texto); });
            enviadas = tentativa.respostas.length;
            points = typeof tentativa.pontos === 'number' ? tentativa.pontos : 64;
            if (score) score.textContent = points;
            seconds = Math.max(0, Math.floor((Date.now() - new Date(tentativa.inicio).getTime()) / 1000));
        }


        function addMessage(className, text) {
            if (!thread) return;
            var article = document.createElement('article');
            article.className = 'bubble ' + className;
            article.textContent = text;
            thread.appendChild(article);
            thread.scrollTop = thread.scrollHeight;
        }

        function addLog(text) {
            if (!log) return;
            var item = document.createElement('li');
            item.textContent = text;
            log.appendChild(item);
        }

        quickResponses.forEach(function (button) {
            button.addEventListener('click', function () {
                if (input) input.value = button.getAttribute('data-quick-response');
                if (input) input.focus();
            });
        });

        async function chamarAgente(rota, corpo) {
            var resposta;
            try {
                resposta = await fetch('/api/' + rota, {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(corpo)
                });
            } catch (erro) { throw new Error('Agente indisponível. Inicie o site com python3 -m backend.ctwp.'); }
            var dados;
            try { dados = await resposta.json(); }
            catch (erro) { throw new Error('Agente indisponível. Inicie o site com python3 -m backend.ctwp.'); }
            if (!resposta.ok) throw new Error(dados.erro || 'Não foi possível analisar esta resposta.');
            return dados;
        }

        if (form) {
            form.addEventListener('submit', async function (event) {
                event.preventDefault();
                if (finalizado || enviando) return;
                var text = input ? input.value.trim() : '';
                if (!text) return;
                enviando = true;
                var enviar = form.querySelector('[type="submit"]');
                if (enviar) enviar.disabled = true;
                try {
                    var analise = await chamarAgente('responder', {tentativa: idAgente, caso: idCaso, codigo_sala: codigoSala || '', fala: text});
                    if (codigoSala) ClinifySalas.responder(codigoSala, idTentativa, text);
                    points = analise.pontos;
                    if (score) score.textContent = points;
                    enviadas = analise.respostas;
                    document.querySelectorAll('[data-criterio]').forEach(function (item) {
                        item.classList.toggle('is-complete', (analise.criterios_total || []).includes(item.dataset.criterio));
                    });
                    [['[data-empathy-score]', 'acolhimento'], ['[data-reasoning-score]', 'anamnese'], ['[data-safety-score]', 'segurança']].forEach(function (item) {
                        var indicador = document.querySelector(item[0]);
                        if (indicador) indicador.textContent = (analise.criterios_total || []).includes(item[1]) ? 'Reconhecido' : 'A avaliar';
                    });
                    addMessage('doctor', text);
                    addLog(analise.criterios.length ? 'Critérios reconhecidos: ' + analise.criterios.join(', ') + '.' : 'Resposta registrada para reflexão.');
                    addMessage('ai-feedback', analise.feedback);
                    if (input) input.value = '';
                } catch (erro) { ClinifyUI.mensagem(erro.message, true); }
                finally { enviando = false; if (enviar && !finalizado) enviar.disabled = false; }
            });
        }

        if (finish) {
            finish.addEventListener('click', async function () {
                if (finalizado || enviando) return;
                if (!enviadas) { ClinifyUI.mensagem('Envie pelo menos uma resposta antes de concluir.', true); return; }
                if (!confirm('Deseja finalizar a simulação e salvar o resultado?')) return;
                enviando = true;
                finish.disabled = true;
                try {
                    var conclusao = await chamarAgente('concluir', {tentativa: idAgente});
                    points = conclusao.pontos;
                    if (score) score.textContent = points;
                    if (codigoSala) ClinifySalas.finalizar(codigoSala, idTentativa, {pontos: points, segundos: seconds});
                    ClinifyUI.salvar('resultado-simulacao', {caso: idCaso, pontos: points, segundos: seconds, data: new Date().toISOString()});
                    finalizado = true;
                    clearInterval(intervalo);
                    if (input) input.disabled = true;
                    if (form) form.querySelector('[type="submit"]').disabled = true;
                    var xpGanho = ClinifyJornada.registrar(codigoSala ? 'sala:' + codigoSala : 'caso:' + idCaso, 'caso');
                    ClinifyUI.mensagem('Simulação concluída. Resultado registrado.' + (xpGanho ? ' +' + xpGanho + ' XP! Confira suas conquistas no perfil.' : ''));
                    if (history) history.textContent = 'Caso finalizado com ' + points + ' pontos.';
                    addLog('Caso finalizado.');
                    if (!codigoSala) sessionStorage.removeItem(chaveAgente);
                } catch (erro) { ClinifyUI.mensagem(erro.message, true); finish.disabled = false; }
                finally { enviando = false; }
            });
        }

        if (codigoSala) window.addEventListener('storage', function (evento) {
            if (evento.key !== 'clinify:salas' && evento.key !== null) return;
            var atual = ClinifySalas.localizar(codigoSala);
            var indisponivel = !atual || atual.status !== 'aberta';
            if (!finalizado) {
                if (input) input.disabled = indisponivel;
                if (form) form.querySelector('[type="submit"]').disabled = indisponivel;
                if (finish) finish.disabled = indisponivel;
                ClinifyUI.mensagem(indisponivel ? 'A sala foi encerrada ou excluída pelo professor.' : 'A sala está aberta novamente.', indisponivel);
            }
        });

        if (history) {
            var resultado = ClinifyUI.ler('resultado-simulacao', null);
            if (resultado && typeof resultado.pontos === 'number') history.textContent = 'Última simulação: ' + resultado.pontos + ' pontos.';
        }

        if (timer) {
            intervalo = window.setInterval(function () {
                seconds += 1;
                var minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
                var rest = (seconds % 60).toString().padStart(2, '0');
                timer.textContent = minutes + ':' + rest;
            }, 1000);
        }
    }
})();
