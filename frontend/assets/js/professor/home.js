(function () {
    if (!window.ClinifyDB) return;

    var turmas = ClinifyDB.turmas.listar();
    var alunos = ClinifyDB.alunos.listar();
    var atividades = ClinifyDB.atividades.listar();
    var simulacoes = turmas.reduce(function (total, turma) {
        return total + turma.simulacoes;
    }, 0);

    var statTurmas = document.getElementById('stat-turmas');
    var statAlunos = document.getElementById('stat-alunos');
    var statSimulacoes = document.getElementById('stat-simulacoes');
    var turmasPreview = document.getElementById('turmas-preview');
    var atividadeRecente = document.getElementById('atividade-recente');

    if (statTurmas) statTurmas.textContent = turmas.length;
    if (statAlunos) statAlunos.textContent = alunos.length;
    if (statSimulacoes) statSimulacoes.textContent = simulacoes;

    if (turmasPreview) {
        turmasPreview.innerHTML = turmas.map(function (turma) {
            return [
                '<article class="stat-card">',
                '<p class="stat-card__label">' + turma.nome + '</p>',
                '<p class="stat-card__value">' + turma.alunos + '</p>',
                '<p class="stat-card__label">alunos matriculados</p>',
                '</article>'
            ].join('');
        }).join('');
    }

    if (atividadeRecente) {
        atividadeRecente.innerHTML = atividades.map(function (atividade) {
            return [
                '<tr>',
                '<td>' + atividade.aluno + '</td>',
                '<td>' + atividade.acao + '</td>',
                '<td>' + atividade.quando + '</td>',
                '</tr>'
            ].join('');
        }).join('');
    }
})();
