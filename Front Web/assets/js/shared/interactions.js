(function () {
    'use strict';

    function lerLista(chave) {
        var lista = ClinifyUI.ler(chave, []);
        return Array.isArray(lista) ? lista : [];
    }

    function usuarioAtual() {
        var usuario = ClinifyUI.ler('sessao:usuario', {});
        return {
            id: usuario.id || usuario.email || 'visitante',
            nome: usuario.nome || 'Usuário Clinify',
            email: usuario.email || '',
            perfil: usuario.perfil || document.body.dataset.area || 'visitante'
        };
    }

    function chaveInteracoes() {
        return 'historico-interacoes:' + usuarioAtual().id;
    }

    function chaveAtividades() {
        return 'historico-atividades:' + usuarioAtual().id;
    }

    function registrar(tipo, acao) {
        var chave = chaveInteracoes();
        var interacoes = lerLista(chave);
        interacoes.push({
            id: 'interacao-' + Date.now() + '-' + Math.floor(Math.random() * 100000),
            tipo: tipo,
            acao: acao.slice(0, 100),
            pagina: window.location.pathname,
            data: new Date().toISOString()
        });
        ClinifyUI.salvar(chave, interacoes.slice(-200));
    }

    function exportarJSON() {
        registrar('clique', 'Salvar dados');
        var pacote = {
            versao: 1,
            gerado_em: new Date().toISOString(),
            usuario: usuarioAtual(),
            interacoes: lerLista(chaveInteracoes()),
            atividades: lerLista(chaveAtividades())
        };
        var jsonGeradoPeloJavaScript = JSON.stringify(pacote, null, 2);
        var arquivo = new Blob([jsonGeradoPeloJavaScript], {type: 'application/json'});
        var endereco = URL.createObjectURL(arquivo);
        var link = document.createElement('a');
        link.href = endereco;
        link.download = 'clinify_dados.json';
        link.click();
        window.setTimeout(function () { URL.revokeObjectURL(endereco); }, 1000);
        ClinifyUI.mensagem('Dados salvos em clinify_dados.json. Agora importe o arquivo no programa Python.');
    }

    document.addEventListener('click', function (evento) {
        var controle = evento.target.closest('button, a');
        if (!controle || controle.hasAttribute('data-exportar-json')) return;
        var texto = controle.getAttribute('aria-label') || controle.textContent || controle.id || controle.tagName;
        registrar('clique', texto.trim().replace(/\s+/g, ' '));
    });

    document.addEventListener('submit', function (evento) {
        registrar('formulario', evento.target.getAttribute('aria-label') || evento.target.id || 'formulario');
    });

    var voltarLogin = document.querySelector('.sidebar__login');
    if (voltarLogin) {
        var botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'sidebar__link sidebar__export';
        botao.setAttribute('data-exportar-json', '');
        botao.setAttribute('aria-label', 'Salvar dados');
        botao.dataset.label = 'Salvar dados';
        botao.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 17v3h16v-3"/></svg><span class="sidebar__link-text">Salvar dados</span>';
        botao.addEventListener('click', exportarJSON);
        voltarLogin.parentNode.insertBefore(botao, voltarLogin);
    }

    window.ClinifyDados = { exportar: exportarJSON, usuarioAtual: usuarioAtual };

    registrar('navegacao', document.title);
})();
