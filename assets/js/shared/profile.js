(function () {
    'use strict';
    var nome = document.getElementById('perfil-nome');
    var email = document.getElementById('perfil-email');
    var form = document.querySelector('[data-profile-form]');
    if (!form || !nome || !email) return;
    var chave = 'perfil:' + document.body.dataset.area;
    var salvo = ClinifyUI.ler(chave, null);
    function atualizar() {
        document.querySelector('.profile-name').textContent = nome.value;
        document.querySelector('.profile-email').textContent = email.value;
    }
    if (salvo && typeof salvo.nome === 'string' && typeof salvo.email === 'string') {
        nome.value = salvo.nome; email.value = salvo.email; atualizar();
    }
    form.addEventListener('submit', function (evento) {
        evento.preventDefault();
        nome.value = nome.value.trim();
        if (!form.reportValidity()) return;
        if (ClinifyUI.salvar(chave, {nome: nome.value, email: email.value.trim()})) {
            atualizar(); ClinifyUI.mensagem('Perfil atualizado com sucesso.');
        }
    });
})();
