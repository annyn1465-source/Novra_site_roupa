
/* ==========================
   ELEMENTOS DOS AVISOS
============================ */

const desenvolvimento = document.querySelectorAll(".desenvolvimento");
const aviso = document.getElementById("modal-Aviso");
const fecharAviso = document.getElementById("fecharAviso");
const fundoAviso = document.getElementById("fundo");

/* ==========================
   ABRIR AVISO
============================ */

function avisoDesenvolvimento(evento) {

    evento.preventDefault();

    // Fecha os modais de categorias
    const modalMulherAviso = document.getElementById("tipoMulher");
    const modalHomemAviso = document.getElementById("tipoHomem");
    const modalInfluenciadoresAviso = document.getElementById("tipoInfluenciadores");
    const fundoCategoriasAviso = document.getElementById("fundoCategorias");

    if (modalMulherAviso) {
        modalMulherAviso.style.display = "none";
    }

    if (modalHomemAviso) {
        modalHomemAviso.style.display = "none";
    }

    if (modalInfluenciadoresAviso) {
        modalInfluenciadoresAviso.style.display = "none";
    }

    if (fundoCategoriasAviso) {
        fundoCategoriasAviso.style.display = "none";
    }

    // Abre o fundo e o aviso
    if (fundoAviso) {
        fundoAviso.style.display = "block";
    }

    if (aviso) {
        aviso.style.display = "flex";
    }

}

desenvolvimento.forEach(function (elemento) {

    elemento.addEventListener("click", avisoDesenvolvimento);

});

/* ==========================
   FECHAR AVISO
============================ */

function fecharAvisos() {

    if (aviso) {
        aviso.style.display = "none";
    }

    if (fundoAviso) {
        fundoAviso.style.display = "none";
    }

}

fecharAviso?.addEventListener("click", fecharAvisos);
