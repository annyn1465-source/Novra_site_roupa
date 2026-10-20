
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

// Duplica os produtos originais
if (novos) {

    const produtosOriginais = Array.from(novos.children);

    produtosOriginais.forEach(function (produto) {

        const copia = produto.cloneNode(true);
        novos.appendChild(copia);

    });

}

/* ==========================
   MOVIMENTO AUTOMÁTICO
   DOS CARROSSÉIS
============================ */

function moverAutomaticamente(carrossel, velocidade, inverso = false) {

    let pausaArrasto = false;
    let animacao;

    // Inicia o carrossel pela posição inicial adequada
    if (inverso) {

        carrossel.scrollLeft =
            carrossel.scrollWidth - carrossel.clientWidth;

    }

    function mover() {

        if (!pausaArrasto) {

            // Move para a direita
            if (!inverso) {

                carrossel.scrollLeft += velocidade;

                if (
                    carrossel.scrollLeft >=
                    carrossel.scrollWidth - carrossel.clientWidth
                ) {

                    carrossel.scrollLeft = 0;

                }

            }

            // Move para a esquerda
            else {

                carrossel.scrollLeft -= velocidade;

                if (carrossel.scrollLeft <= 0) {

                    carrossel.scrollLeft =
                        carrossel.scrollWidth - carrossel.clientWidth;

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
if (novos) {

    const movimentoNovos = moverAutomaticamente(novos, 0.7);
    ativarArrasto(novos, movimentoNovos);

}

// Produtos masculinos: movimento para a direita
if (homens) {

    const movimentoHomens = moverAutomaticamente(homens, 0.7);
    ativarArrasto(homens, movimentoHomens);

}

// Produtos femininos: movimento para a esquerda
if (mulheres) {

    const movimentoMulheres = moverAutomaticamente(mulheres, 0.7, true);
    ativarArrasto(mulheres, movimentoMulheres);

}
