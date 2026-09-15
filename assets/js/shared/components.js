/* Componentes compartilhados da Sprint 3: navegação, rodapé e feedback. */
(function () {
    'use strict';
    var area = document.body.dataset.area || '';
    var pagina = window.location.pathname.split('/').pop() || 'index.html';
    var menus = {
        estudante: [['index.html', 'Início'], ['casos.html', 'Simulação clínica'], ['estudos.html', 'Estudos'], ['desempenho.html', 'Desempenho'], ['perfil.html', 'Meu perfil']],
        professor: [['index.html', 'Início'], ['turmas.html', 'Minhas turmas'], ['alunos.html', 'Alunos'], ['estudo.html', 'Área de estudo'], ['desempenho.html', 'Desempenho'], ['casos.html', 'Salas de simulação'], ['perfil.html', 'Meu perfil']],
        administrador: [['index.html', 'Início'], ['professores.html', 'Professores'], ['perfil.html', 'Meu perfil']]
    };
    function escapar(texto) {
        return String(texto).replace(/[&<>"']/g, function (caractere) {
            return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[caractere];
        });
    }
    var aviso = document.createElement('div');
    aviso.className = 'mensagem-retorno';
    aviso.setAttribute('role', 'status');
    aviso.setAttribute('aria-live', 'polite');
    document.body.appendChild(aviso);
    var tempoAviso;
    function mensagem(texto, erro) {
        var modalAberto = document.querySelector('.modal-overlay:not([hidden]), [data-ai-modal]:not([hidden])');
        (modalAberto || document.body).appendChild(aviso);
        aviso.textContent = texto;
        aviso.classList.toggle('mensagem-retorno--erro', Boolean(erro));
        aviso.classList.add('is-visible');
        clearTimeout(tempoAviso);
        tempoAviso = setTimeout(function () { aviso.classList.remove('is-visible'); }, 6000);
    }
    function ler(chave, padrao) {
        try {
            var texto = localStorage.getItem('clinify:' + chave);
            return texto === null ? padrao : JSON.parse(texto);
        } catch (erro) { return padrao; }
    }
    function salvar(chave, valor) {
        try { localStorage.setItem('clinify:' + chave, JSON.stringify(valor)); return true; }
        catch (erro) { mensagem('Não foi possível salvar. Tente novamente.', true); return false; }
    }
    window.ClinifyUI = { escapar: escapar, mensagem: mensagem, ler: ler, salvar: salvar };
    var lateral = document.querySelector('.sidebar');
    if (lateral) {
        var fecharMenu = document.createElement('button');
        fecharMenu.type = 'button'; fecharMenu.className = 'sidebar__fechar'; fecharMenu.dataset.sidebarMobileClose = ''; fecharMenu.textContent = 'Fechar menu';
        lateral.prepend(fecharMenu);
    }
    document.querySelectorAll('[data-navigation]').forEach(function (alvo) {
        var menu = menus[area] || [];
        alvo.innerHTML = menu.map(function (item) {
            var ativa = pagina === item[0] || (pagina === 'cardiologia.html' && item[0] === 'estudos.html');
            var icone = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 15h5"/></svg>';
            return '<li><a href="' + item[0] + '" class="sidebar__link' + (ativa ? ' is-active' : '') + '"' + (ativa ? ' aria-current="page"' : '') + '>' + icone + '<span class="sidebar__link-text">' + item[1] + '</span></a></li>';
        }).join('');
        var voltar = document.createElement('a');
        voltar.href = '../index.html';
        voltar.className = 'sidebar__link sidebar__login';
        voltar.setAttribute('aria-label', 'Voltar ao login');
        voltar.title = 'Voltar ao login';
        voltar.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 4H4v16h6M14 8l4 4-4 4M8 12h10"/></svg><span class="sidebar__link-text">Voltar ao login</span>';
        if (lateral && lateral.contains(alvo)) lateral.appendChild(voltar);
        else { var itemVoltar = document.createElement('li'); itemVoltar.appendChild(voltar); alvo.appendChild(itemVoltar); }
    });
    var principal = document.querySelector('main');
    if (area === 'estudante' && (pagina === 'index.html' || pagina === 'desempenho.html')) {
        var progresso = document.createElement('section');
        progresso.className = 'resumo-progresso';
        progresso.setAttribute('aria-label', 'Seu progresso salvo');
        var modulo = ler('modulo:cardiologia', null);
        var simulacao = ler('resultado-simulacao', null);
        var titulo = document.createElement('h2'); titulo.textContent = 'Seu progresso';
        var detalhe = document.createElement('p');
        detalhe.textContent = 'Cardiologia: ' + (modulo && modulo.concluido ? 'módulo concluído.' : 'módulo ainda não concluído.') + ' ' + (simulacao && typeof simulacao.pontos === 'number' ? 'Última simulação: ' + simulacao.pontos + ' pontos.' : 'Nenhuma simulação finalizada.');
        progresso.append(titulo, detalhe);
        principal.prepend(progresso);
    }
    if (principal) {
        principal.id = principal.id || 'conteudo-principal';
        principal.tabIndex = -1;
        var pular = document.createElement('a');
        pular.className = 'pular-conteudo';
        pular.href = '#' + principal.id;
        pular.textContent = 'Pular para o conteúdo';
        document.body.prepend(pular);
    }
    if (!document.querySelector('footer')) {
        var rodape = document.createElement('footer');
        rodape.className = 'rodape-compartilhado';
        rodape.textContent = 'Clinify · Hospital Moinhos de Vento';
        (document.querySelector('.app-main') || document.body).appendChild(rodape);
    }
    document.querySelectorAll('svg:not([role="img"])').forEach(function (svg) { svg.setAttribute('aria-hidden', 'true'); });
    document.querySelectorAll('.empty-state, .feedback, [data-case-counter]').forEach(function (alvo) { alvo.setAttribute('role', 'status'); });
    document.querySelectorAll('.topbar__bell:not(#bell-btn)').forEach(function (botao) {
        botao.addEventListener('click', function () { mensagem('Nenhuma nova notificação.'); });
    });
    document.querySelectorAll('.topbar__search').forEach(function (busca) {
        var entrada = busca.querySelector('input');
        if (entrada) entrada.addEventListener('keydown', function (evento) {
            if (evento.key === 'Enter') window.location.href = 'estudos.html?busca=' + encodeURIComponent(entrada.value.trim());
        });
    });
    var iniciar = document.querySelector('.stat-card__cta-btn');
    if (iniciar) iniciar.addEventListener('click', function () { window.location.href = 'casos.html'; });
    /* Foco e Escape em todos os modais, incluindo os abertos por outros scripts. */
    document.querySelectorAll('.modal-overlay, [data-ai-modal]').forEach(function (modal) {
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        var titulo = modal.querySelector('h2, h3');
        if (titulo) { titulo.id = titulo.id || 'titulo-modal'; modal.setAttribute('aria-labelledby', titulo.id); }
        var anterior;
        new MutationObserver(function () {
            if (!modal.hidden) {
                anterior = document.activeElement;
                var primeiro = modal.querySelector('button, input:not([type="hidden"]), select, textarea');
                if (primeiro) primeiro.focus();
            } else if (anterior) anterior.focus();
        }).observe(modal, { attributes: true, attributeFilter: ['hidden'] });
        modal.addEventListener('keydown', function (evento) {
            if (evento.key === 'Escape') modal.hidden = true;
            if (evento.key !== 'Tab') return;
            var itens = Array.from(modal.querySelectorAll('button, input:not([type="hidden"]), select, textarea, a[href]')).filter(function (item) { return !item.disabled; });
            if (!itens.length) return;
            var primeiro = itens[0], ultimo = itens[itens.length - 1];
            if (evento.shiftKey && document.activeElement === primeiro) { evento.preventDefault(); ultimo.focus(); }
            else if (!evento.shiftKey && document.activeElement === ultimo) { evento.preventDefault(); primeiro.focus(); }
        });
    });
})();
