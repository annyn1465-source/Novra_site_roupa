/* ==========================
   ELEMENTOS DOS MODAIS
============================ */

// Modal Mulher
const mulher = document.getElementById("tipoMulher");
const abrirTipoMulher = document.getElementById("abrirTipoMulher");

// Modal Homem
const homem = document.getElementById("tipoHomem");
const abrirTipoHomem = document.getElementById("abrirTipoHomem");

// Modal Influenciadores
const influenciadores = document.getElementById("tipoInfluenciadores");
const abrirTipoInfluenciadores = document.getElementById("abrirTipoInfluenciadores");


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
   ABRIR E FECHAR CATEGORIAS
============================ */

// Fecha os modais ao clicar no fundo
fundoCategorias.addEventListener("click", function () {

   mulher.style.display = "none";
   homem.style.display = "none";
   influenciadores.style.display = "none";

   fundoCategorias.style.display = "none";
});

// Impede que o clique dentro do modal feche o fundo
[mulher, homem, influenciadores].forEach((modal) => {

   modal.addEventListener("click", function (evento) {

      evento.stopPropagation();
      
   });

});

// Abre o modal Mulher
abrirTipoMulher.addEventListener("click", function (evento) {
   evento.preventDefault();

   mulher.style.display = "flex";
   homem.style.display = "none";
   influenciadores.style.display = "none";

   fundoCategorias.style.display = "block";

});

// Abre o modal Homem
abrirTipoHomem.addEventListener("click", function (evento) {
   evento.preventDefault();

   mulher.style.display = "none";
   homem.style.display = "flex";
   influenciadores.style.display = "none";

   fundoCategorias.style.display = "block";

});

// Abre o modal Influenciadores
abrirTipoInfluenciadores.addEventListener("click", function (evento) {

   evento.preventDefault();

   mulher.style.display = "none";
   homem.style.display = "none";
   influenciadores.style.display = "flex";

   fundoCategorias.style.display = "block";

});


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

/* ==========================
   ELEMENTOS DOS CARROSSÉIS
============================ */

const homens = document.getElementById("carrosselHomens");
const mulheres = document.getElementById("carrosselMulher");
const novos = document.getElementById("carrosselNovos");


/* ==========================
   CARROSSEL DE PRODUTOS NOVOS
   DUPLICAÇÃO
============================ */

const produtosOriginais = Array.from(novos.children);
const quantidadeOriginal = produtosOriginais.length;

// Duplica os produtos originais
produtosOriginais.forEach((produto) => {
    const copia = produto.cloneNode(true);
    novos.appendChild(copia);
});


/* ==========================
   MOVIMENTO AUTOMÁTICO
   DOS CARROSSÉIS
============================ */

function moverAutomaticamente(carrossel, velocidade, inverso = false) {
   let pausaArrasto = false;
   let animacao;

   // Inicia o carrossel pela posição inicial adequada
   if (inverso) {
      carrossel.scrollLeft = carrossel.scrollWidth - carrossel.clientWidth;
   }

   function mover() {
      if (!pausaArrasto) {

         // Move para a direita
         if (!inverso) {
            carrossel.scrollLeft += velocidade;

            if (carrossel.scrollLeft >= carrossel.scrollWidth - carrossel.clientWidth) {

               carrossel.scrollLeft = 0;
            }

         }

         // Move para a esquerda
         else {
            carrossel.scrollLeft -= velocidade;

            if (carrossel.scrollLeft <= 0) { 

               carrossel.scrollLeft = carrossel.scrollWidth - carrossel.clientWidth;

            }
         }
      }

      animacao = requestAnimationFrame(mover);
   }

   mover();

   // Permite que a função de arrasto pause e retome o movimento
   return {
      pausar() {
         pausaArrasto = true;
      },

      continuar() {
         pausaArrasto = false;
      }
   };
}


/* ==========================
   ARRASTO COM O MOUSE
============================ */

function ativarArrasto(carrossel, movimento) {
   let arrastando = false;
   let inicioMouse = 0;
   let scrollInicial = 0;

   // Começa o arrasto
   carrossel.addEventListener("mousedown", function (evento) {
      arrastando = true;
      inicioMouse = evento.pageX;
      scrollInicial = carrossel.scrollLeft;

      carrossel.style.cursor = "grabbing";
      movimento.pausar();

      evento.preventDefault();
   });

   // Move o carrossel conforme o mouse
   document.addEventListener("mousemove", function (evento) {
      if (!arrastando) return;

      const distancia = evento.pageX - inicioMouse;

      carrossel.scrollLeft = scrollInicial - distancia;
   });

   // Finaliza o arrasto
   document.addEventListener("mouseup", function () {
      if (!arrastando) return;

      arrastando = false;
      carrossel.style.cursor = "grab";
      movimento.continuar();
   });

   // Evita manter o arrasto ativo se a janela perder o foco
   window.addEventListener("blur", function () {
      if (!arrastando) return;

      arrastando = false;
      carrossel.style.cursor = "grab";
      movimento.continuar();
   });
}


/* ==========================
   ATIVAÇÃO DOS CARROSSÉIS
============================ */

// Produtos novos: movimento para a direita
const movimentoNovos = moverAutomaticamente(novos, 0.7);

// Produtos masculinos: movimento para a direita
const movimentoHomens = moverAutomaticamente(homens, 0.7);

// Produtos femininos: movimento para a esquerda
const movimentoMulheres = moverAutomaticamente(mulheres, 0.7, true);

// Ativa o arrasto independente em cada carrossel
ativarArrasto(novos, movimentoNovos);
ativarArrasto(homens, movimentoHomens);
ativarArrasto(mulheres, movimentoMulheres);
