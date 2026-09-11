(function () {
    const specialty = getSpecialtyFromUrl();

    document.title = 'Clinify | Conteúdo — ' + specialty.name;

    const iconEl = document.getElementById('content-icon');
    iconEl.className = 'content-icon study-icon--' + specialty.color;
    iconEl.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
        specialty.icon +
        '</svg>';

    document.getElementById('content-title').textContent = specialty.name;
    document.getElementById('content-subtitle').textContent = 'Módulos de conteúdo';

    /* Estrutura genérica de módulos. Quando existir conteúdo real
       por especialidade, troque este array por dados vindos do
       backend (um endpoint tipo /especialidades/{esp}/modulos). */
    const modules = [
        { title: 'Introdução e conceitos-chave', status: 'done' },
        { title: 'Fisiopatologia', status: 'done' },
        { title: 'Diagnóstico e exames complementares', status: 'current' },
        { title: 'Tratamento e conduta', status: 'todo' },
        { title: 'Casos clínicos comentados', status: 'todo' }
    ];

    const icons = {
        done: '<polyline points="4 8 7 11 12 4"/>',
        current: '<circle cx="8" cy="8" r="3"/>',
        todo: '<circle cx="8" cy="8" r="6"/>'
    };

    const labels = {
        done: 'Concluído',
        current: 'Em andamento',
        todo: 'Não iniciado'
    };

    const container = document.getElementById('content-modules');

    modules.forEach((mod) => {
        const item = document.createElement('a');
        item.href = '#';
        item.className = 'content-module' + (mod.status === 'done' ? ' is-done' : mod.status === 'current' ? ' is-current' : '');

        item.innerHTML =
            '<span class="content-module__status"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + icons[mod.status] + '</svg></span>' +
            '<span class="content-module__body"><h3>' + mod.title + '</h3><span>' + labels[mod.status] + '</span></span>' +
            '<svg class="content-module__arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>';

        container.appendChild(item);
    });
})();