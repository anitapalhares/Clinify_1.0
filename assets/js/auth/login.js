(function () {
    'use strict';
    var form = document.getElementById('loginForm');
    if (!form) return;
    var contas = {
        'admin@clinify.com': 'administrador/index.html',
        'professor@clinify.com': 'professor/index.html',
        '12345678900@gmail.com': 'estudante/index.html'
    };
    var email = document.getElementById('email');
    var lembrar = document.getElementById('remember');
    var feedback = document.getElementById('login-feedback');
    var salvo = ClinifyUI.ler('email-lembrado', '');
    if (typeof salvo === 'string' && salvo) { email.value = salvo; lembrar.checked = true; }
    document.querySelector('[data-login-help]').addEventListener('click', function () {
        feedback.textContent = 'Senha de teste: 123456. E-mails: admin@clinify.com, professor@clinify.com ou 12345678900@gmail.com.';
    });
    form.addEventListener('submit', function (evento) {
        evento.preventDefault();
        var endereco = email.value.trim().toLowerCase();
        if (!form.reportValidity()) return;
        if (!contas[endereco] || document.getElementById('password').value !== '123456') {
            feedback.textContent = 'E-mail ou senha incorretos. Consulte os dados de teste.';
            return;
        }
        ClinifyUI.salvar('email-lembrado', lembrar.checked ? endereco : '');
        window.location.href = contas[endereco];
    });
})();
