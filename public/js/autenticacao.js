
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
   FUNDO DOS MODAIS
============================ */

const fundo = document.getElementById("fundo");

/* ==========================
   TIMER DAS MENSAGENS
============================ */

function desaparecerMensagem(elemento, tempo = 5000) {
    // Cancela o timer anterior, se existir
    clearTimeout(elemento.timerMensagem);

    // Faz a mensagem desaparecer após o tempo definido
    elemento.timerMensagem = setTimeout(() => {
        elemento.textContent = "";
    }, tempo);
}

/* ==========================
   ABRIR E FECHAR LOGIN
============================ */

// Abre o login
abrirLogin?.addEventListener("click", function (evento) {
    evento.preventDefault();

    fundo.style.display = "block";
    login.style.display = "flex";
    cadastro.style.display = "none";
});

// Abre o cadastro a partir do login
abrirCadastro?.addEventListener("click", function (evento) {
    evento.preventDefault();

    login.style.display = "none";
    cadastro.style.display = "flex";
});

// Fecha o login
fecharLogin?.addEventListener("click", function () {
    login.style.display = "none";
    fundo.style.display = "none";
});

// Fecha o cadastro
fecharCadastro?.addEventListener("click", function () {
    cadastro.style.display = "none";
    fundo.style.display = "none";
});

// Volta para o login
voltarLogin?.addEventListener("click", function (evento) {
    evento.preventDefault();

    cadastro.style.display = "none";
    login.style.display = "flex";
});

/* ==========================
   CADASTRO DE USUÁRIOS
============================ */

formCadastro?.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    // Captura os valores dos campos
    const nome = document.getElementById("nomeCadastro").value.trim();
    const email = document.getElementById("emailCadastro").value.trim();
    const senha = document.getElementById("senhaCadastro").value;
    const telefone = document.getElementById("telefoneCadastro").value.trim();
    const pais = document.getElementById("pais").value;

    // Limpa a mensagem anterior e seu timer
    clearTimeout(mensagens.timerMensagem);
    mensagens.textContent = "";

    // Valida os campos vazios
    if (!nome || !email || !senha || !telefone || !pais) {
        mensagens.textContent = "Preencha todos os campos.";
        mensagens.style.color = "#b84040";
        desaparecerMensagem(mensagens);
        return;
    }

    // Valida o nome
    if (nome.length < 3) {
        mensagens.textContent = "Digite um nome com pelo menos 3 caracteres.";
        mensagens.style.color = "#b84040";
        desaparecerMensagem(mensagens);
        return;
    }

    // Valida o e-mail
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        mensagens.textContent = "Digite um e-mail válido.";
        mensagens.style.color = "#b84040";
        desaparecerMensagem(mensagens);
        return;
    }

    // Valida a senha
    if (senha.length < 6) {
        mensagens.textContent = "A senha deve ter pelo menos 6 caracteres.";
        mensagens.style.color = "#b84040";
        desaparecerMensagem(mensagens);
        return;
    }

    // Valida o telefone
    if (telefone.replace(/\D/g, "").length < 8) {
        mensagens.textContent = "Digite um telefone válido.";
        mensagens.style.color = "#b84040";
        desaparecerMensagem(mensagens);
        return;
    }

    // Valida os termos de uso
    if (!termos.checked) {
        mensagens.textContent = "Você precisa aceitar os Termos de Uso.";
        mensagens.style.color = "#b84040";
        desaparecerMensagem(mensagens);
        return;
    }

    // Junta o código do país com o telefone
    const telefoneCompleto = `${pais} ${telefone}`;

    try {
        mensagens.textContent = "Criando sua conta...";
        mensagens.style.color = "#0097ef";

        const resposta = await fetch("/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                telefone: telefoneCompleto,
                senha: senha
            })
        });

        const resultado = await resposta.json();

        // Mostra erros retornados pelo servidor
        if (!resposta.ok) {
            mensagens.textContent = resultado.mensagem ||
                "Não foi possível criar sua conta.";

            mensagens.style.color = "#b84040";
            desaparecerMensagem(mensagens);
            return;
        }

        // Cadastro realizado
        mensagens.textContent = resultado.mensagem;
        mensagens.style.color = "#2f855a";

        desaparecerMensagem(mensagens);

        // Limpa o formulário
        formCadastro.reset();

    } catch (erro) {
        console.error("Erro no cadastro:", erro);

        mensagens.textContent =
            "Não foi possível conectar ao servidor. Tente novamente.";

        mensagens.style.color = "#b84040";
        desaparecerMensagem(mensagens);
    }
});

/* ==========================
   LOGIN DE USUÁRIOS
============================ */

const formLogin = document.getElementById("formLogin");
const emailLogin = document.getElementById("email");
const senhaLogin = document.getElementById("senha");
const erroLogin = document.getElementById("erro");

formLogin?.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const email = emailLogin.value.trim();
    const senha = senhaLogin.value;

    // Limpa a mensagem anterior e seu timer
    clearTimeout(erroLogin.timerMensagem);
    erroLogin.textContent = "";

    // Verifica se os campos estão preenchidos
    if (!email || !senha) {
        erroLogin.textContent = "Preencha o e-mail e a senha.";
        erroLogin.style.color = "#b84040";
        desaparecerMensagem(erroLogin);
        return;
    }

    try {
        erroLogin.textContent = "Verificando seus dados...";
        erroLogin.style.color = "#555";

        const resposta = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });

        const resultado = await resposta.json();

        // Se o login falhar
        if (!resposta.ok) {
            erroLogin.textContent =
                resultado.mensagem || "Não foi possível entrar.";

            erroLogin.style.color = "#b84040";
            desaparecerMensagem(erroLogin);
            return;
        }

        // Se o login funcionar
        erroLogin.textContent = resultado.mensagem;
        erroLogin.style.color = "#2f855a";

        desaparecerMensagem(erroLogin);

        console.log("Usuário conectado:", resultado.usuario);

    } 
    catch (erro) {
        console.error("Erro no login:", erro);

        erroLogin.textContent =
            "Não foi possível conectar ao servidor.";

        erroLogin.style.color = "#b84040";
        desaparecerMensagem(erroLogin);
    }
});
