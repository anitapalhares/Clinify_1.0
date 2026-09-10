

(function () {
    var shell = document.querySelector('.app-shell');
    if (!shell) return;

    var collapseToggle = document.querySelector('[data-sidebar-collapse]');
    var mobileToggle = document.querySelector('[data-sidebar-mobile-toggle]');
    var backdrop = document.querySelector('[data-sidebar-backdrop]');
    var STORAGE_KEY = 'clinify:sidebar-collapsed';

    function isMobile() {
        return window.matchMedia('(max-width: 880px)').matches;
    }

    // Restore collapsed state on desktop
    if (!isMobile() && localStorage.getItem(STORAGE_KEY) === '1') {
        shell.classList.add('is-collapsed');
    }

    function toggleCollapse() {
        shell.classList.toggle('is-collapsed');
        localStorage.setItem(STORAGE_KEY, shell.classList.contains('is-collapsed') ? '1' : '0');
    }

    function openMobile() {
        shell.classList.add('is-mobile-open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobile() {
        shell.classList.remove('is-mobile-open');
        document.body.style.overflow = '';
    }

    if (collapseToggle) {
        collapseToggle.addEventListener('click', function () {
            if (isMobile()) {
                // On mobile the same control just closes the drawer
                closeMobile();
            } else {
                toggleCollapse();
            }
        });
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            if (shell.classList.contains('is-mobile-open')) {
                closeMobile();
            } else {
                openMobile();
            }
        });
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeMobile);
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMobile();
    });

    window.addEventListener('resize', function () {
        if (!isMobile()) closeMobile();
    });
})();