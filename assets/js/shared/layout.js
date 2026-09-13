(function () {
    var shell = document.querySelector('.app-shell');
    if (!shell) return;

    var collapseToggle = document.querySelector('[data-sidebar-collapse]');
    var mobileToggle = document.querySelector('[data-sidebar-mobile-toggle]');
    var backdrop = document.querySelector('[data-sidebar-backdrop]');
    var ultimoFoco;
    var sidebar = document.querySelector('.sidebar');
    sidebar.id = 'menu-principal';
    if (mobileToggle) { mobileToggle.setAttribute('aria-controls', sidebar.id); mobileToggle.setAttribute('aria-expanded', 'false'); }

    function isMobile() {
        return window.matchMedia('(max-width: 880px)').matches;
    }

    function closeMobile() {
        shell.classList.remove('is-mobile-open');
        document.body.style.overflow = '';
        sidebar.inert = isMobile();
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        if (ultimoFoco) { ultimoFoco.focus(); ultimoFoco = null; }
    }

    function openMobile() {
        shell.classList.add('is-mobile-open');
        document.body.style.overflow = 'hidden';
        ultimoFoco = document.activeElement;
        sidebar.inert = false;
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
        var primeiroLink = sidebar.querySelector('a');
        if (primeiroLink) primeiroLink.focus();
    }

    function toggleCollapse() {
        shell.classList.toggle('is-collapsed');
        ClinifyUI.salvar('sidebar-collapsed', shell.classList.contains('is-collapsed'));
        if (collapseToggle) collapseToggle.setAttribute('aria-expanded', String(!shell.classList.contains('is-collapsed')));
    }

    sidebar.inert = isMobile();
    if (!isMobile() && ClinifyUI.ler('sidebar-collapsed', false)) {
        shell.classList.add('is-collapsed');
    }

    if (collapseToggle) {
        collapseToggle.addEventListener('click', function () {
            if (isMobile()) {
                closeMobile();
                return;
            }
            toggleCollapse();
        });
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            if (shell.classList.contains('is-mobile-open')) {
                closeMobile();
                return;
            }
            openMobile();
        });
    }

    var fecharMenu = document.querySelector('[data-sidebar-mobile-close]');
    if (fecharMenu) fecharMenu.addEventListener('click', closeMobile);
    if (backdrop) {
        backdrop.addEventListener('click', closeMobile);
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && shell.classList.contains('is-mobile-open')) closeMobile();
        if (event.key === 'Tab' && shell.classList.contains('is-mobile-open')) {
            var links = Array.from(sidebar.querySelectorAll('a, button')).filter(function (el) { return el.offsetParent !== null; });
            var primeiro = links[0], ultimo = links[links.length - 1];
            if (event.shiftKey && document.activeElement === primeiro) { event.preventDefault(); ultimo.focus(); }
            else if (!event.shiftKey && document.activeElement === ultimo) { event.preventDefault(); primeiro.focus(); }
        }
    });

    window.addEventListener('resize', function () {
        closeMobile();
    });
})();

(function () {
    var bellBtn = document.getElementById('bell-btn');
    var notifications = document.getElementById('notifications');
    if (!bellBtn || !notifications) return;

    var dot = bellBtn.querySelector('.dot');

    bellBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        notifications.style.display = notifications.style.display === 'block' ? 'none' : 'block';
        if (dot) dot.style.display = 'none';
    });

    document.addEventListener('click', function (event) {
        if (!bellBtn.contains(event.target) && !notifications.contains(event.target)) {
            notifications.style.display = 'none';
        }
    });
})();
