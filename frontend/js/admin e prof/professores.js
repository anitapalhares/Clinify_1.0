(function () {
    if (!window.ClinifyDB) return;

    const tbody = document.getElementById('professores-tbody');
    const tableWrap = document.getElementById('professores-table-wrap');
    const emptyState = document.getElementById('professores-empty');
    const searchInput = document.getElementById('professor-search');
    const statusFilter = document.getElementById('status-filter');

    const modal = document.getElementById('modal-professor');
    const modalTitulo = document.getElementById('modal-professor-titulo');
    const btnAdd = document.getElementById('btn-add-professor');
    const btnCancelar = document.getElementById('btn-cancelar-professor');
    const btnSalvar = document.getElementById('btn-salvar-professor');
    const form = document.getElementById('form-professor');
    const inputId = document.getElementById('professor-id');
    const inputNome = document.getElementById('professor-nome');
    const inputEmail = document.getElementById('professor-email');

    function normalize(text) {
        return (text || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    function render() {
        const query = normalize(searchInput ? searchInput.value.trim() : '');
        const status = statusFilter ? statusFilter.value : 'all';

        let professores = ClinifyDB.professores.listar();
        if (status !== 'all') professores = professores.filter((p) => p.status === status);
        if (query) {
            professores = professores.filter((p) =>
                normalize(p.nome).includes(query) || normalize(p.email).includes(query)
            );
        }

        if (professores.length === 0) {
            tableWrap.hidden = true;
            emptyState.hidden = false;
            return;
        }
        tableWrap.hidden = false;
        emptyState.hidden = true;

        tbody.innerHTML = professores.map((p) => `
            <tr>
                <td>${p.nome}</td>
                <td>${p.email}</td>
                <td><span class="badge ${p.status === 'ativo' ? 'badge--ativo' : 'badge--inativo'}">${p.status === 'ativo' ? 'Ativo' : 'Inativo'}</span></td>
                <td class="data-table__actions">
                    <button type="button" class="btn btn--ghost btn--sm" data-editar="${p.id}">Editar</button>
                    <button type="button" class="btn ${p.status === 'ativo' ? 'btn--danger' : 'btn--ghost'} btn--sm" data-alternar="${p.id}">
                        ${p.status === 'ativo' ? 'Desativar' : 'Ativar'}
                    </button>
                </td>
            </tr>
        `).join('');
    }

    function abrirModalCadastro() {
        modalTitulo.textContent = 'Cadastrar professor';
        btnSalvar.textContent = 'Cadastrar';
        inputId.value = '';
        form.reset();
        modal.hidden = false;
    }

    function abrirModalEdicao(id) {
        const professor = ClinifyDB.professores.listar().find((p) => p.id === id);
        if (!professor) return;

        modalTitulo.textContent = 'Editar professor';
        btnSalvar.textContent = 'Salvar alterações';
        inputId.value = professor.id;
        inputNome.value = professor.nome;
        inputEmail.value = professor.email;
        modal.hidden = false;
    }

    function fecharModal() {
        modal.hidden = true;
        form.reset();
    }

    if (searchInput) searchInput.addEventListener('input', render);
    if (statusFilter) statusFilter.addEventListener('change', render);
    if (btnAdd) btnAdd.addEventListener('click', abrirModalCadastro);
    if (btnCancelar) btnCancelar.addEventListener('click', fecharModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) fecharModal();
        });
    }

    if (tbody) {
        tbody.addEventListener('click', (e) => {
            const btnEditar = e.target.closest('[data-editar]');
            const btnAlternar = e.target.closest('[data-alternar]');

            if (btnEditar) {
                abrirModalEdicao(btnEditar.getAttribute('data-editar'));
                return;
            }
            if (btnAlternar) {
                ClinifyDB.professores.alternarStatus(btnAlternar.getAttribute('data-alternar'));
                render();
            }
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = inputNome.value.trim();
            const email = inputEmail.value.trim();
            const id = inputId.value;

            if (id) {
                ClinifyDB.professores.editar(id, { nome, email });
            } else {
                ClinifyDB.professores.cadastrar({ nome, email });
            }

            fecharModal();
            render();
        });
    }

    render();
})();
