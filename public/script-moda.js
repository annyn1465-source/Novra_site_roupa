


/* ==========================
   ELEMENTOS DO LOGIN
============================ */

const abrirLogin = document.getElementById("abrirLogin");
const login = document.getElementById("login");
const fecharLogin = document.getElementById("fecharLogin");


/* ==========================
   ELEMENTOS DO CADASTRO
============================ */

const abrirCadastro = document.getElementById("abrirCadastro");
const cadastro = document.getElementById("cadastro");
const fecharCadastro = document.getElementById("fecharCadastro");
const voltarLogin = document.getElementById("voltarLogin");

const formCadastro = document.getElementById("formCadastro");
const termos = document.getElementById("termos");
const mensagens = document.getElementById("mensagens");


/* ==========================
   FUNDOS DOS MODAIS
============================ */

const fundoCategorias = document.getElementById("fundoCategorias");
const fundo = document.getElementById("fundo");

/* ==========================
   ABRIR E FECHAR LOGIN
============================ */

// Abre o login
abrirLogin.addEventListener("click", function (evento) {

   evento.preventDefault();

   fundo.style.display = "block";
   login.style.display = "flex";
   cadastro.style.display = "none";

});

// Abre o cadastro a partir do login
abrirCadastro.addEventListener("click", function (evento) {
   evento.preventDefault();

   login.style.display = "none";
   cadastro.style.display = "flex";

});

// Fecha o login
fecharLogin.addEventListener("click", function () {

   login.style.display = "none";
   fundo.style.display = "none";

});

// Fecha o cadastro
fecharCadastro.addEventListener("click", function () {
   cadastro.style.display = "none";
   fundo.style.display = "none";

});

// Volta para o login
voltarLogin.addEventListener("click", function (evento) {
   evento.preventDefault();

   cadastro.style.display = "none";
   login.style.display = "flex";

});


/* ==========================
   VALIDAÇÃO DO CADASTRO
============================ */

formCadastro.addEventListener("submit", function (evento) {
   evento.preventDefault();

   // Captura os valores dos campos
   const nome = document.getElementById("nomeCadastro").value.trim();
   const email = document.getElementById("emailCadastro").value.trim();
   const senha = document.getElementById("senhaCadastro").value.trim();
   const telefone = document.getElementById("telefoneCadastro").value.trim();
   const pais = document.getElementById("pais").value;

   // Limpa a mensagem anterior
   mensagens.textContent = "";

   // Valida os campos vazios
   if (nome === "" || email === "" || senha === "" || telefone === "" || pais === "") {

      mensagens.textContent = "Preencha todos os campos.";
      mensagens.style.color = "#b84040";

      return;

   }

   // Valida o nome
   if (nome.length < 3) {

      mensagens.textContent = "Digite um nome com pelo menos 3 caracteres.";
      mensagens.style.color = "#b84040";

      return;

   }

   // Valida o formato básico do e-mail
   if(!email.includes("@") || !email.includes(".")){

      mensagens.textContent = "Digite um e-mail válido. Exemplo: exemplo@gmail.com";
      mensagens.style.color = "#b84040";
      return;

   }

   // Valida a senha
   if (senha.length < 6) {

      mensagens.textContent = "A senha deve ter pelo menos 6 caracteres.";
      mensagens.style.color = "#b84040";

      return;

   }

   if (telefone.length < 8) {

      mensagens.textContent = "Digite um telefone válido.";
      mensagens.style.color = "#b84040";

      return;
   }

   // Valida os termos de uso
   if (!termos.checked) {

      mensagens.textContent = "Você precisa aceitar os Termos de Uso.";
      mensagens.style.color = "#b84040";

      return;
   }

   // Organiza os dados do usuário
   const usuario = {

      nome: nome,
      email: email,
      senha: senha,
      telefone: telefone,
      pais: pais,

   };

   console.log("Usuário:", usuario);

   // Exibe a confirmação
   mensagens.textContent = "Conta criada com sucesso!";
   mensagens.style.color = "#2f855a";

   formCadastro.reset();


});

/* ==========================
   LOGIN DE ADMINISTRAÇÃO
============================ */
const formLogin = document.getElementById("formLogin");
const emailLogin = document.getElementById("email");
const senhaLogin = document.getElementById("senha");
const erroLogin = document.getElementById("erro");

const gmailAdmin = "admin@gmail.com";
const senhaAdmin = "1234";

formLogin.addEventListener("submit", function (evento) {
   evento.preventDefault();

   const email = emailLogin.value.trim();
   const senha = senhaLogin.value.trim();

   if (email === gmailAdmin && senha === senhaAdmin) {
      erroLogin.textContent = "Página de administração em desenvolvimento.";
      erroLogin.style.color = "#b84040";
   } 
   else {
      erroLogin.textContent = "Gmail ou senha incorretos.";
      erroLogin.style.color = "#b84040";
   }
});