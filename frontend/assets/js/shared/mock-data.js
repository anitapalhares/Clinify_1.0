(function () {
    var seed = {
        professores: [
            { id: 'prof-1', nome: 'Prof. Daniel Ribeiro', email: 'daniel.ribeiro@clinify.com', status: 'ativo' },
            { id: 'prof-2', nome: 'Profa. Helena Martins', email: 'helena.martins@clinify.com', status: 'ativo' },
            { id: 'prof-3', nome: 'Prof. Caio Andrade', email: 'caio.andrade@clinify.com', status: 'inativo' }
        ],
        turmas: [
            { id: 'turma-1', nome: 'Medicina 6A', alunos: 42, simulacoes: 18 },
            { id: 'turma-2', nome: 'Medicina 7B', alunos: 37, simulacoes: 21 },
            { id: 'turma-3', nome: 'Internato Clínica', alunos: 29, simulacoes: 16 }
        ],
        alunos: [
            { id: 'aluno-1', nome: 'Ana Costa' },
            { id: 'aluno-2', nome: 'Bruno Lima' },
            { id: 'aluno-3', nome: 'Luiza Nunes' },
            { id: 'aluno-4', nome: 'Rafael Melo' },
            { id: 'aluno-5', nome: 'Sofia Prado' }
        ],
        atividades: [
            { aluno: 'Ana Costa', acao: 'concluiu Cardiologia', quando: 'Hoje' },
            { aluno: 'Bruno Lima', acao: 'iniciou uma simulação', quando: 'Ontem' },
            { aluno: 'Luiza Nunes', acao: 'revisou Pneumologia', quando: '2 dias atrás' }
        ]
    };

    function read(key) {
        var saved = localStorage.getItem('clinify:' + key);
        if (!saved) return seed[key].slice();
        try {
            return JSON.parse(saved);
        } catch (error) {
            return seed[key].slice();
        }
    }

    function write(key, value) {
        localStorage.setItem('clinify:' + key, JSON.stringify(value));
    }

    function uid(prefix) {
        return prefix + '-' + Date.now().toString(36);
    }

    window.ClinifyDB = {
        professores: {
            listar: function () {
                return read('professores');
            },
            cadastrar: function (dados) {
                var professores = read('professores');
                professores.push({ id: uid('prof'), nome: dados.nome, email: dados.email, status: 'ativo' });
                write('professores', professores);
            },
            editar: function (id, dados) {
                var professores = read('professores').map(function (professor) {
                    if (professor.id !== id) return professor;
                    return Object.assign({}, professor, dados);
                });
                write('professores', professores);
            },
            alternarStatus: function (id) {
                var professores = read('professores').map(function (professor) {
                    if (professor.id !== id) return professor;
                    return Object.assign({}, professor, { status: professor.status === 'ativo' ? 'inativo' : 'ativo' });
                });
                write('professores', professores);
            }
        },
        turmas: {
            listar: function () {
                return read('turmas');
            }
        },
        alunos: {
            listar: function () {
                return read('alunos');
            }
        },
        atividades: {
            listar: function () {
                return seed.atividades.slice();
            }
        }
    };
})();
