(function () {
    var shell = document.querySelector('.app-shell');
    if (!shell) return;

    var collapseToggle = document.querySelector('[data-sidebar-collapse]');
    var mobileToggle = document.querySelector('[data-sidebar-mobile-toggle]');
    var backdrop = document.querySelector('[data-sidebar-backdrop]');
    var storageKey = 'clinify:sidebar-collapsed';

    function isMobile() {
        return window.matchMedia('(max-width: 880px)').matches;
    }

    function closeMobile() {
        shell.classList.remove('is-mobile-open');
        document.body.style.overflow = '';
    }

    function openMobile() {
        shell.classList.add('is-mobile-open');
        document.body.style.overflow = 'hidden';
    }

    function toggleCollapse() {
        shell.classList.toggle('is-collapsed');
        localStorage.setItem(storageKey, shell.classList.contains('is-collapsed') ? '1' : '0');
    }

    if (!isMobile() && localStorage.getItem(storageKey) === '1') {
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

    if (backdrop) {
        backdrop.addEventListener('click', closeMobile);
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeMobile();
    });

    window.addEventListener('resize', function () {
        if (!isMobile()) closeMobile();
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
