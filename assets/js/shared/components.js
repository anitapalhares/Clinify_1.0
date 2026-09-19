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
/*
 * Evolução do desempenho — Cardiologia e Anatomia
 * -------------------------------------------------
 * Versão 100% JavaScript puro (sem bibliotecas externas, sem CDN).
 * Desenha os gráficos como SVG, calculado a partir do modelo logístico
 * do projeto (Sprint 3 - Cálculo):
 *
 *   D(t) = L / (1 + A * e^(-k*t))
 *   D'(t) = k * D(t) * (1 - D(t)/L)        -> velocidade
 *   Ponto de inflexão: t* = ln(A) / k, onde D(t*) = L/2
 *
 * Não precisa de nenhum <script> extra além deste arquivo.
 * Basta ter no HTML os três contêineres (divs) com os ids:
 *   #grafico-cardiologia, #grafico-anatomia, #grafico-velocidade
 */
(function () {
    'use strict';

    // ---------- Parâmetros do modelo (ajustados a partir dos dados da aluna) ----------
    var MATERIAS = {
        cardiologia: {
            L: 100,
            A: 3,
            k: 0.6,
            tMax: 9,
            observados: [
                { t: 1, d: 40 },
                { t: 2, d: 50 },
                { t: 4, d: 80 },
                { t: 6, d: 90 },
                { t: 8, d: 100 }
            ]
        },
        anatomia: {
            L: 100,
            A: 4,
            k: 0.3,
            tMax: 9,
            observados: [
                { t: 1, d: 25 },
                { t: 2, d: 30 },
                { t: 5, d: 55 },
                { t: 6, d: 60 },
                { t: 8, d: 75 }
            ]
        }
    };

    // ---------- Funções matemáticas do modelo ----------
    function desempenho(t, A, k, L) {
        return L / (1 + A * Math.exp(-k * t));
    }

    function velocidade(t, A, k, L) {
        var D = desempenho(t, A, k, L);
        return k * D * (1 - D / L);
    }

    function pontoInflexao(A, k, L) {
        return { t: Math.log(A) / k, d: L / 2 };
    }

    // ---------- Cores a partir das variáveis já usadas no site (root.css) ----------
    var estilos = getComputedStyle(document.documentElement);
    function cor(variavel, alternativa) {
        var valor = estilos.getPropertyValue(variavel);
        return valor && valor.trim() ? valor.trim() : alternativa;
    }
    var CORES = {
        primaria: cor('--primary', '#00679E'),
        primariaEscura: cor('--primary-dark', '#045175'),
        accent: cor('--accent', '#0f9488'),
        rose: cor('--rose', '#d6336c'),
        muted: cor('--muted', '#8ea0ae'),
        borda: cor('--border', '#e2e8ee')
    };

    // ---------- Configuração geométrica do SVG ----------
    var LARGURA = 640;
    var ALTURA = 260;
    var MARGEM = { top: 16, right: 16, bottom: 40, left: 42 };
    var LARGURA_UTIL = LARGURA - MARGEM.left - MARGEM.right;
    var ALTURA_UTIL = ALTURA - MARGEM.top - MARGEM.bottom;

    function escX(t, tMax) {
        return MARGEM.left + (t / tMax) * LARGURA_UTIL;
    }
    function escY(valor, valorMax) {
        return MARGEM.top + ALTURA_UTIL - (valor / valorMax) * ALTURA_UTIL;
    }

    function gerarPontosCurva(A, k, L, tMax, passo) {
        var pontos = [];
        for (var t = 0; t <= tMax + 1e-9; t += passo) {
            pontos.push({ t: t, d: desempenho(t, A, k, L) });
        }
        return pontos;
    }

    function gerarPontosVelocidade(A, k, L, tMax, passo) {
        var pontos = [];
        for (var t = 0; t <= tMax + 1e-9; t += passo) {
            pontos.push({ t: t, v: velocidade(t, A, k, L) });
        }
        return pontos;
    }

    function caminhoSvg(pontos, tMax, valorMax, chaveValor) {
        return pontos
            .map(function (p, indice) {
                var x = escX(p.t, tMax).toFixed(1);
                var y = escY(p[chaveValor], valorMax).toFixed(1);
                return (indice === 0 ? 'M' : 'L') + x + ',' + y;
            })
            .join(' ');
    }

    function gradeHorizontal(valores, valorMax, tMax) {
        return valores
            .map(function (valor) {
                var y = escY(valor, valorMax).toFixed(1);
                return (
                    '<line x1="' + MARGEM.left + '" y1="' + y + '" x2="' + (MARGEM.left + LARGURA_UTIL) + '" y2="' + y +
                    '" stroke="' + CORES.borda + '" stroke-width="1" />' +
                    '<text x="' + (MARGEM.left - 8) + '" y="' + y + '" text-anchor="end" dominant-baseline="middle" font-size="11" fill="' + CORES.muted + '">' + valor + '</text>'
                );
            })
            .join('');
    }

    function eixoX(tMax) {
        var marcas = '';
        for (var t = 0; t <= tMax; t += Math.max(1, Math.round(tMax / 6))) {
            var x = escX(t, tMax).toFixed(1);
            marcas +=
                '<text x="' + x + '" y="' + (MARGEM.top + ALTURA_UTIL + 16) + '" text-anchor="middle" font-size="11" fill="' + CORES.muted + '">' + t + '</text>';
        }
        return marcas;
    }

    // ---------- Gráfico individual de uma matéria: D(t) ----------
    function construirGraficoMateria(idContainer, dados, corCurva) {
        var container = document.getElementById(idContainer);
        if (!container) return;

        var curva = gerarPontosCurva(dados.A, dados.k, dados.L, dados.tMax, 0.2);
        var inflexao = pontoInflexao(dados.A, dados.k, dados.L);
        var yAsintota = escY(dados.L, 110).toFixed(1);

        var pontosObservadosSvg = dados.observados
            .map(function (p) {
                var x = escX(p.t, dados.tMax).toFixed(1);
                var y = escY(p.d, 110).toFixed(1);
                return (
                    '<circle cx="' + x + '" cy="' + y + '" r="5" fill="#ffffff" stroke="' + corCurva + '" stroke-width="2">' +
                    '<title>Atividade ' + p.t + ': ' + p.d + '%</title>' +
                    '</circle>'
                );
            })
            .join('');

        var xInflexao = escX(inflexao.t, dados.tMax).toFixed(1);
        var yInflexao = escY(inflexao.d, 110).toFixed(1);
        var marcadorInflexao =
            '<polygon points="' + xInflexao + ',' + (parseFloat(yInflexao) - 7) + ' ' +
            (parseFloat(xInflexao) - 6) + ',' + (parseFloat(yInflexao) + 5) + ' ' +
            (parseFloat(xInflexao) + 6) + ',' + (parseFloat(yInflexao) + 5) + '" fill="' + CORES.rose + '">' +
            '<title>Pico de velocidade em t ≈ ' + inflexao.t.toFixed(1) + ' (desempenho ≈ ' + inflexao.d.toFixed(0) + '%)</title>' +
            '</polygon>';

        var svg =
            '<svg viewBox="0 0 ' + LARGURA + ' ' + ALTURA + '" role="img" aria-label="Curva de desempenho ao longo das atividades" class="grafico-svg">' +
            gradeHorizontal([0, 25, 50, 75, 100], 110, dados.tMax) +
            eixoX(dados.tMax) +
            '<line x1="' + MARGEM.left + '" y1="' + yAsintota + '" x2="' + (MARGEM.left + LARGURA_UTIL) + '" y2="' + yAsintota + '" stroke="' + CORES.muted + '" stroke-width="1" stroke-dasharray="4 4" />' +
            '<path d="' + caminhoSvg(curva, dados.tMax, 110, 'd') + '" fill="none" stroke="' + corCurva + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />' +
            pontosObservadosSvg +
            marcadorInflexao +
            '<text x="' + (LARGURA / 2) + '" y="' + (ALTURA - 6) + '" text-anchor="middle" font-size="10" fill="' + CORES.muted + '">Atividade (t)</text>' +
            '</svg>';

        container.innerHTML = svg;
    }

    // ---------- Gráfico comparativo: velocidade D'(t) de ambas as matérias ----------
    function construirGraficoVelocidade() {
        var container = document.getElementById('grafico-velocidade');
        if (!container) return;

        var card = MATERIAS.cardiologia;
        var anat = MATERIAS.anatomia;
        var tMax = Math.max(card.tMax, anat.tMax);

        var curvaCard = gerarPontosVelocidade(card.A, card.k, card.L, tMax, 0.2);
        var curvaAnat = gerarPontosVelocidade(anat.A, anat.k, anat.L, tMax, 0.2);

        var valorMax = Math.ceil(Math.max(
            Math.max.apply(null, curvaCard.map(function (p) { return p.v; })),
            Math.max.apply(null, curvaAnat.map(function (p) { return p.v; }))
        ) / 5) * 5;

        function caminhoVelocidade(pontos) {
            return pontos
                .map(function (p, indice) {
                    var x = escX(p.t, tMax).toFixed(1);
                    var y = escY(p.v, valorMax).toFixed(1);
                    return (indice === 0 ? 'M' : 'L') + x + ',' + y;
                })
                .join(' ');
        }

        var svg =
            '<svg viewBox="0 0 ' + LARGURA + ' ' + ALTURA + '" role="img" aria-label="Comparativo de velocidade de aprendizado entre Cardiologia e Anatomia" class="grafico-svg">' +
            gradeHorizontal([0, valorMax / 4, valorMax / 2, (3 * valorMax) / 4, valorMax].map(function (v) { return Math.round(v); }), valorMax, tMax) +
            eixoX(tMax) +
            '<path d="' + caminhoVelocidade(curvaCard) + '" fill="none" stroke="' + CORES.primariaEscura + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />' +
            '<path d="' + caminhoVelocidade(curvaAnat) + '" fill="none" stroke="' + CORES.accent + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />' +
            '<text x="' + (LARGURA / 2) + '" y="' + (ALTURA - 2) + '" text-anchor="middle" font-size="10" fill="' + CORES.muted + '">Atividade (t)</text>' +
            '</svg>' +
            '<div class="grafico-legenda">' +
            '<span><i style="background:' + CORES.primariaEscura + '"></i>Cardiologia</span>' +
            '<span><i style="background:' + CORES.accent + '"></i>Anatomia</span>' +
            '</div>';

        container.innerHTML = svg;
    }

    function iniciar() {
        construirGraficoMateria('grafico-cardiologia', MATERIAS.cardiologia, CORES.primaria);
        construirGraficoMateria('grafico-anatomia', MATERIAS.anatomia, CORES.accent);
        construirGraficoVelocidade();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }
})();