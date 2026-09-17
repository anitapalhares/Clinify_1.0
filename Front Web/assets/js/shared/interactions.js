(function () {
    'use strict';

    var CHAVE_FILA = 'interacoes-pendentes';

    function lerFila() {
        var fila = ClinifyUI.ler(CHAVE_FILA, []);
        if (Array.isArray(fila)) return fila;
        return [];
    }

    function usuarioAtual() {
        var usuario = ClinifyUI.ler('sessao:usuario', {});
        return {
            id: usuario.id || usuario.email || 'visitante',
            perfil: usuario.perfil || document.body.dataset.area || 'visitante'
        };
    }

    function textoElemento(elemento) {
        var texto = elemento.getAttribute('aria-label') || elemento.textContent || elemento.id || elemento.tagName;
        return texto.trim().replace(/\s+/g, ' ').slice(0, 100);
    }

    async function sincronizar() {
        var fila = lerFila();
        if (!fila.length) return;
        var lote = fila.slice(0, 30);
        var pacote = {
            versao: 1,
            usuario: usuarioAtual(),
            interacoes: lote
        };

        try {
            var resposta = await fetch('/api/interacoes', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(pacote)
            });
            if (!resposta.ok) return;
            var idsEnviados = [];
            for (var indice = 0; indice < lote.length; indice += 1) {
                idsEnviados.push(lote[indice].id);
            }
            var pendentes = [];
            var filaAtual = lerFila();
            for (var item = 0; item < filaAtual.length; item += 1) {
                if (!idsEnviados.includes(filaAtual[item].id)) pendentes.push(filaAtual[item]);
            }
            ClinifyUI.salvar(CHAVE_FILA, pendentes);
        } catch (erro) {
            return;
        }
    }

    function registrar(tipo, acao) {
        var fila = lerFila();
        fila.push({
            id: 'interacao-' + Date.now() + '-' + Math.floor(Math.random() * 100000),
            tipo: tipo,
            acao: acao,
            pagina: window.location.pathname,
            data: new Date().toISOString()
        });
        ClinifyUI.salvar(CHAVE_FILA, fila.slice(-200));
        sincronizar();
    }

    document.addEventListener('click', function (evento) {
        var controle = evento.target.closest('button, a');
        if (controle) registrar('clique', textoElemento(controle));
    });

    document.addEventListener('submit', function (evento) {
        var nome = evento.target.getAttribute('aria-label') || evento.target.id || 'formulario';
        registrar('formulario', nome.slice(0, 100));
    });

    registrar('navegacao', document.title.slice(0, 100));
    sincronizar();
})();
