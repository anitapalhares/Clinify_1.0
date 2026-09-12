(function () {
  var form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Usuários de teste
    if (email === "admin@clinify.com" && password === "123456") {
      // Admin pode escolher qual tela acessar
      const escolha = prompt("Entrar como: admin, professor ou aluno?");
      if (escolha === "admin") {
        window.location.href = "/frontend/pages/admin/dashboard.html";
      } else if (escolha === "professor") {
        window.location.href = "/frontend/pages/professor/home_prof.html";
      } else if (escolha === "aluno") {
        window.location.href = "/frontend/pages/estudante/home_es.html";
      } else {
        alert("Opção inválida.");
      }
    } else if (email === "professor@clinify.com" && password === "123456") {
      window.location.href = "/frontend/pages/professor/home_prof.html";
    } else if (email === "12345678900@gmail.com" && password === "123456") {
      // CPF tratado como string
      window.location.href = "/frontend/pages/estudante/home_es.html";

    } else {
      alert("Credenciais inválidas.");
    }
  });
})();
