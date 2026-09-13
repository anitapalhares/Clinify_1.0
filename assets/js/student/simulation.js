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
        var randomButton = document.querySelector('[data-ai-random]');
        var createButton = document.querySelector('[data-ai-case]');
        var specialtyShortcuts = Array.from(document.querySelectorAll('[data-specialty-shortcut]'));
        var activeSpecialty = 'all';

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
                var matchesSpecialty = activeSpecialty === 'all' || card.dataset.specialty === activeSpecialty;
                var show = matchesSearch && matchesDifficulty && matchesSpecialty;
                card.hidden = !show;
                if (show) visible += 1;
            });

            if (counter) counter.textContent = visible + (visible === 1 ? ' caso encontrado' : ' casos encontrados');
            if (empty) empty.hidden = visible !== 0;
        }

        specialtyShortcuts.forEach(function (button) {
            button.addEventListener('click', function () {
                var value = button.getAttribute('data-specialty-shortcut');
                activeSpecialty = activeSpecialty === value ? 'all' : value;
                specialtyShortcuts.forEach(function (item) {
                    item.classList.toggle('is-active', item === button && activeSpecialty !== 'all');
                });
                render();
            });
        });

        if (search) search.addEventListener('input', render);
        if (difficulty) difficulty.addEventListener('change', render);
        if (clear) {
            clear.addEventListener('click', function () {
                if (search) search.value = '';
                if (difficulty) difficulty.value = 'all';
                activeSpecialty = 'all';
                specialtyShortcuts.forEach(function (button) {
                    button.classList.remove('is-active');
                });
                render();
            });
        }

        if (codeForm) {
            codeForm.addEventListener('submit', function (event) {
                event.preventDefault();
                var codigo = codeForm.querySelector('[name="caseCode"]').value.trim().toUpperCase();
                if (codigo === 'MOINHOS01') { window.location.href = 'simulacao.html'; return; }
                try {
                    var aluno = document.getElementById('nomeAluno').value.trim();
                    var tentativa = ClinifySalas.entrar(codigo, aluno);
                    window.location.href = 'simulacao.html?sala=' + encodeURIComponent(codigo) + '&tentativa=' + encodeURIComponent(tentativa.id);
                } catch (erro) { ClinifyUI.mensagem(erro.message, true); }
            });
        }

        if (openModal && modal) {
            openModal.addEventListener('click', function () {
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

        if (randomButton) {
            randomButton.addEventListener('click', function () {
                var specialty = document.querySelector('[data-ai-specialty]');
                var profile = document.querySelector('[data-ai-profile]');
                var features = document.querySelector('[data-ai-features]');
                var aiDifficulty = document.querySelector('[data-ai-difficulty]');
                if (specialty) specialty.value = 'Clínica Médica';
                if (profile) profile.value = 'adulto com queixa aguda';
                if (features) features.value = 'dor intensa, sinais vitais estáveis, necessidade de investigar sinais de alerta';
                if (aiDifficulty) aiDifficulty.value = 'Médio';
            });
        }

        if (createButton) {
            createButton.addEventListener('click', function () {
                window.location.href = 'simulacao.html';
            });
        }

        render();
    }

    function initConsultation() {
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
        var codigoSala = parametros.get('sala');
        var idTentativa = parametros.get('tentativa');
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
            points = Math.min(100, 64 + tentativa.respostas.length * 4);
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

        function bumpScore(amount) {
            points = Math.min(100, points + amount);
            if (score) score.textContent = points;
        }

        quickResponses.forEach(function (button) {
            button.addEventListener('click', function () {
                if (input) input.value = button.getAttribute('data-quick-response');
                if (input) input.focus();
            });
        });

        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                if (finalizado) return;
                var text = input ? input.value.trim() : '';
                if (!text) return;
                if (codigoSala) {
                    try { ClinifySalas.responder(codigoSala, idTentativa, text); }
                    catch (erro) { ClinifyUI.mensagem(erro.message, true); return; }
                }
                addMessage('doctor', text);
                addLog('Resposta enviada na consulta simulada.');
                addMessage('ai-feedback', 'Resposta registrada para revisão pelo professor.');
                bumpScore(4);
                if (input) input.value = '';
            });
        }

        if (finish) {
            finish.addEventListener('click', function () {
                if (finalizado || !confirm('Deseja finalizar a simulação e salvar o resultado?')) return;
                if (codigoSala) {
                    try { ClinifySalas.finalizar(codigoSala, idTentativa, {pontos: points, segundos: seconds}); }
                    catch (erro) { ClinifyUI.mensagem(erro.message, true); return; }
                }
                var salvo = ClinifyUI.salvar('resultado-simulacao', {pontos: points, segundos: seconds, data: new Date().toISOString()});
                if (!salvo && !codigoSala) return;
                finalizado = true;
                clearInterval(intervalo);
                if (input) input.disabled = true;
                if (form) form.querySelector('[type="submit"]').disabled = true;
                finish.disabled = true;
                var xpGanho = ClinifyJornada.registrar(codigoSala ? 'sala:' + codigoSala : 'caso:cefaleia', 'caso');
                ClinifyUI.mensagem('Simulação concluída. Resultado registrado.' + (xpGanho ? ' +' + xpGanho + ' XP! Confira suas conquistas no perfil.' : ''));
                if (history) history.textContent = 'Caso finalizado com ' + points + ' pontos.';
                addLog('Caso finalizado.');
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
