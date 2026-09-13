(function () {
    var form = document.getElementById('loginForm');
    if (!form) return;

    var routes = {
        admin: 'administrador/dashboard.html',
        professor: 'professor/home_prof.html',
        aluno: 'estudante/home_es.html'
    };

    function goTo(route) {
        window.location.href = route;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var email = document.getElementById('email').value.trim();
        var password = document.getElementById('password').value;

        if (email === 'admin@clinify.com' && password === '123456') {
            var escolha = prompt('Entrar como: admin, professor ou aluno?');
            if (routes[escolha]) {
                goTo(routes[escolha]);
                return;
            }
            alert('Opção inválida.');
            return;
        }

        if (email === 'professor@clinify.com' && password === '123456') {
            goTo(routes.professor);
            return;
        }

        if (email === '12345678900@gmail.com' && password === '123456') {
            goTo(routes.aluno);
            return;
        }

        alert('Credenciais inválidas.');
    });
})();
