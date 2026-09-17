(function () {
    'use strict';

    var CHAVE_FILA = 'atividades-pendentes';
    var CHAVE_HISTORICO = 'historico-atividades';

    function alunoAtual() {
        var sessao = ClinifyUI.ler('sessao:usuario', null);
        if (sessao && sessao.perfil === 'estudante' && sessao.email) {
            return {
                id: sessao.email,
                nome: sessao.nome || 'Estudante Clinify',
                email: sessao.email
            };
        }
        return {
            id: 'estudante-demonstracao',
            nome: 'Estudante de demonstração',
            email: '12345678900@gmail.com'
        };
    }

    function listaLocal(chave) {
        var dados = ClinifyUI.ler(chave, []);
        return Array.isArray(dados) ? dados : [];
    }

    function criarId(prefixo) {
        return prefixo + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    }

    function normalizarAtividade(atividade) {
        var data = new Date().toISOString();
        return {
            id: atividade.id || criarId(atividade.tipo || 'atividade'),
            tipo: atividade.tipo,
            recurso: atividade.recurso,
            titulo: atividade.titulo,
            estado: 'concluida',
            concluida_em: atividade.concluida_em || data,
            duracao_segundos: Math.max(0, Number(atividade.duracao_segundos) || 0),
            pontuacao: Math.max(0, Number(atividade.pontuacao) || 0),
            detalhes: atividade.detalhes && typeof atividade.detalhes === 'object' ? atividade.detalhes : {}
        };
    }

    function guardarLocal(atividade) {
        var historico = listaLocal(CHAVE_HISTORICO);
        historico.push(atividade);
        ClinifyUI.salvar(CHAVE_HISTORICO, historico.slice(-100));

        var fila = listaLocal(CHAVE_FILA);
        if (!fila.some(function (item) { return item.id === atividade.id; })) fila.push(atividade);
        ClinifyUI.salvar(CHAVE_FILA, fila);
    }

    async function sincronizar() {
        var fila = listaLocal(CHAVE_FILA);
        if (!fila.length) return {sincronizadas: 0, pendentes: 0};

        var lote = fila.slice(0, 20);
        var pacote = {
            versao: 1,
            aluno: alunoAtual(),
            atividades: lote
        };

        // O JSON da atividade é produzido no JavaScript e interpretado pelo Python.
        var jsonGeradoPeloJavaScript = JSON.stringify(pacote);

        try {
            var resposta = await fetch('/api/atividades', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: jsonGeradoPeloJavaScript
            });
            if (!resposta.ok) throw new Error('Servidor de atividades indisponível.');
            var retorno = await resposta.json();
            var idsSincronizados = lote.map(function (item) { return item.id; });
            var filaAtual = listaLocal(CHAVE_FILA).filter(function (item) {
                return !idsSincronizados.includes(item.id);
            });
            ClinifyUI.salvar(CHAVE_FILA, filaAtual);
            return {
                sincronizadas: lote.length,
                pendentes: filaAtual.length,
                resumo: retorno.resumo
            };
        } catch (erro) {
            return {sincronizadas: 0, pendentes: fila.length};
        }
    }

    function registrar(atividade) {
        var registro = normalizarAtividade(atividade);
        guardarLocal(registro);
        sincronizar();
        return registro;
    }

    function registrarEstudo(dados) {
        return registrar({
            tipo: 'estudo',
            recurso: dados.especialidade,
            titulo: dados.titulo,
            concluida_em: dados.concluida_em,
            pontuacao: dados.pontuacao,
            detalhes: {
                modulo: dados.modulo,
                acertos: dados.acertos,
                total_questoes: dados.total_questoes
            }
        });
    }

    function registrarSimulado(dados) {
        return registrar({
            id: 'simulado-' + dados.tentativa,
            tipo: 'simulado',
            recurso: dados.caso,
            titulo: dados.titulo,
            concluida_em: dados.concluida_em,
            duracao_segundos: dados.duracao_segundos,
            pontuacao: dados.pontuacao,
            detalhes: {
                respostas: dados.respostas,
                criterios: dados.criterios
            }
        });
    }

    window.ClinifyAtividades = {
        registrarEstudo: registrarEstudo,
        registrarSimulado: registrarSimulado,
        sincronizar: sincronizar,
        listarLocal: function () { return listaLocal(CHAVE_HISTORICO); }
    };

    sincronizar();
})();
