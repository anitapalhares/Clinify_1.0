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
                window.location.href = 'simulacao.html';
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
        var points = Number(score ? score.textContent : 64);

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
                var text = input ? input.value.trim() : '';
                if (!text) return;
                addMessage('doctor', text);
                addLog('Resposta enviada na consulta simulada.');
                bumpScore(4);
                if (input) input.value = '';
            });
        }

        if (finish) {
            finish.addEventListener('click', function () {
                localStorage.setItem('clinify:last-simulation', 'Caso finalizado com ' + points + ' pontos.');
                if (history) history.textContent = 'Caso finalizado com ' + points + ' pontos neste dispositivo.';
                addLog('Caso finalizado.');
            });
        }

        if (history) {
            history.textContent = localStorage.getItem('clinify:last-simulation') || history.textContent;
        }

        if (timer) {
            window.setInterval(function () {
                seconds += 1;
                var minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
                var rest = (seconds % 60).toString().padStart(2, '0');
                timer.textContent = minutes + ':' + rest;
            }, 1000);
        }
    }
})();
