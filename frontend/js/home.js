(function () {
    var STORAGE_KEY = 'clinify:recent-activities';

    // Lista padrão de fallback (caso o usuário acesse pela primeira vez)
    var defaultActivities = [
        {
            id: 'arr-01',
            title: 'Arritmias Cardíacas',
            difficulty: 'Médio',
            timestamp: Date.now() - (2 * 60 * 60 * 1000), // há 2 horas
            thumbUrl: '../assets/arritmias.jpg',
            link: 'simulacao-clinica.html?id=arr-01'
        },
        {
            id: 'hist-02',
            title: 'Histologia Aplicada',
            difficulty: 'Fácil',
            timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000), // há 3 dias
            thumbUrl: '../assets/histologia.jpg',
            link: 'simulacao-clinica.html?id=hist-02'
        }
    ];

    // Recupera do localStorage ou salva o estado inicial
    function getActivities() {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultActivities));
            return defaultActivities;
        }
        try {
            return JSON.parse(stored);
        } catch (e) {
            return defaultActivities;
        }
    }

    // Calcula tempo relativo (ex: há 2 h, há 3 d)
    function formatRelativeTime(timestamp) {
        var diffMs = Date.now() - timestamp;
        var diffMinutes = Math.floor(diffMs / (1000 * 60));
        var diffHours = Math.floor(diffMinutes / 60);
        var diffDays = Math.floor(diffHours / 24);

        if (diffMinutes < 1) return 'agora mesmo';
        if (diffMinutes < 60) return 'há ' + diffMinutes + ' min';
        if (diffHours < 24) return 'há ' + diffHours + ' h';
        return 'há ' + diffDays + ' d';
    }

    // Constrói o HTML de um card
    function createCardElement(item) {
        var anchor = document.createElement('a');
        anchor.className = 'activity-card';
        anchor.href = item.link;
        anchor.dataset.id = item.id;

        anchor.innerHTML =
            '<div class="activity-card__thumb">' +
            '<img src="' + item.thumbUrl + '" alt="' + item.title + '" onerror="this.style.display=\'none\'">' +
            '</div>' +
            '<div class="activity-card__content">' +
            '<span class="activity-card__badge">' + item.difficulty + '</span>' +
            '<h3 class="activity-card__name">' + item.title + '</h3>' +
            '<span class="activity-card__time">' + formatRelativeTime(item.timestamp) + '</span>' +
            '</div>';

        // Atualiza a data do acesso ao clicar no card
        anchor.addEventListener('click', function () {
            registerActivityAccess(item.id);
        });

        return anchor;
    }

    // Renderiza a lista no grid
    function renderActivities() {
        var container = document.getElementById('recentActivityGrid');
        if (!container) return;

        container.innerHTML = '';
        var list = getActivities();

        // Ordena do mais recente para o mais antigo
        list.sort(function (a, b) {
            return b.timestamp - a.timestamp;
        });

        if (list.length === 0) {
            container.innerHTML = '<p style="color: var(--muted); font-size: 13.5px;">Nenhuma atividade recente.</p>';
            return;
        }

        list.forEach(function (item) {
            container.appendChild(createCardElement(item));
        });
    }

    // Função pública para registrar/atualizar uma atividade acessada
    window.registerActivityAccess = function (activityId) {
        var list = getActivities();
        var index = list.findIndex(function (item) { return item.id === activityId; });

        if (index !== -1) {
            list[index].timestamp = Date.now();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        }
    };

    document.addEventListener('DOMContentLoaded', renderActivities);
})();