/* ==========================
   ELEMENTOS DOS MODAIS
============================ */

// Modal Tipo
const modalTipo = document.getElementById("tipoTipo");
const abrirTipo = document.getElementById("abrirTipo");

/* ==========================
   FUNDO DAS CATEGORIAS
============================ */

const fundoCategorias = document.getElementById("fundoCategorias");

/* ==========================
   ABRIR E FECHAR CATEGORIAS
============================ */

// Abrir o modal
abrirTipo.addEventListener("click", function (evento) {

    evento.preventDefault();

    modalTipo.style.display = "flex";
    fundoCategorias.style.display = "block";

});

// Fechar ao clicar no fundo
fundoCategorias.addEventListener("click", function () {

    modalTipo.style.display = "none";
    fundoCategorias.style.display = "none";

});

// Impedir que o clique dentro do modal feche o fundo
modalTipo.addEventListener("click", function (evento) {

    evento.stopPropagation();

});

