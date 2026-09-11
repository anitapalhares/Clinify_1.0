(function () {
    const grid = document.getElementById('study-grid');
    if (!grid) return;

    const searchInput = document.getElementById('study-search');
    const specialtySelect = document.getElementById('specialty-filter');
    const orderSelect = document.getElementById('order-filter');
    const emptyState = document.getElementById('study-empty');

    const cards = Array.from(grid.querySelectorAll('.study-card'));

    function normalize(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    function applyFilters() {
        const query = normalize(searchInput ? searchInput.value.trim() : '');
        const specialty = specialtySelect ? specialtySelect.value : 'all';

        let visibleCount = 0;

        cards.forEach((card) => {
            const name = normalize(card.dataset.name || '');
            const cardSpecialty = card.dataset.specialty || '';

            const matchesQuery = !query || name.includes(query);
            const matchesSpecialty = specialty === 'all' || cardSpecialty === specialty;

            const isVisible = matchesQuery && matchesSpecialty;
            card.style.display = isVisible ? '' : 'none';

            if (isVisible) visibleCount += 1;
        });

        if (emptyState) {
            emptyState.hidden = visibleCount !== 0;
        }
    }

    function applyOrder() {
        const order = orderSelect ? orderSelect.value : 'default';
        if (order === 'default') return;

        const sorted = [...cards].sort((a, b) => {
            if (order === 'name') {
                return (a.dataset.name || '').localeCompare(b.dataset.name || '', 'pt-BR');
            }
            if (order === 'semester') {
                return Number(a.dataset.semester) - Number(b.dataset.semester);
            }
            if (order === 'questions') {
                return Number(b.dataset.questions) - Number(a.dataset.questions);
            }
            return 0;
        });

        sorted.forEach((card) => grid.appendChild(card));
    }

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (specialtySelect) specialtySelect.addEventListener('change', applyFilters);
    if (orderSelect) orderSelect.addEventListener('change', applyOrder);
})();

