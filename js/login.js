(function () {
    var form = document.getElementById('loginForm');
    if (!form) return;
 
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Aqui entraria a validação/autenticação real (ex: chamada à API).
        // Por enquanto, ao enviar o formulário, seguimos direto para a Home.
        window.location.href = 'home.html';
    });
})();