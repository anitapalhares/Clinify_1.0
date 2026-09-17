(function () {
    'use strict';
    var form = document.getElementById('loginForm');
    if (!form) return;
    var contas = {
        'admin@clinify.com': 'administrador/home_a.html',
        'professor@clinify.com': 'professor/home_p.html',
        '12345678900@gmail.com': 'estudante/home_e.html'
    };
    var email = document.getElementById('email');
    var lembrar = document.getElementById('remember');
    var feedback = document.getElementById('login-feedback');
    var salvo = ClinifyUI.ler('email-lembrado', '');
    if (typeof salvo === 'string' && salvo) { email.value = salvo; lembrar.checked = true; }
    document.querySelector('[data-login-help]').addEventListener('click', function () {
        feedback.textContent = 'Para obter ou recuperar seu acesso, entre em contato com o responsável pela sua turma.';
    });
    form.addEventListener('submit', function (evento) {
        evento.preventDefault();
        var endereco = email.value.trim().toLowerCase();
        if (!form.reportValidity()) return;
        if (!contas[endereco] || document.getElementById('password').value !== '123456') {
            feedback.textContent = 'E-mail ou senha incorretos. Confira seus dados e tente novamente.';
            feedback.classList.add('feedback--error');
            feedback.setAttribute('aria-live', 'assertive');
            document.getElementById('password').focus();
            return;
        }
        feedback.classList.remove('feedback--error');
        feedback.setAttribute('aria-live', 'polite');
        ClinifyUI.salvar('email-lembrado', lembrar.checked ? endereco : '');
        ClinifyUI.salvar('sessao:usuario', {id: endereco, email: endereco, perfil: contas[endereco].split('/')[0]});
        window.location.href = contas[endereco];
    });
})();
