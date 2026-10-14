//Procura no HTML o formulário que possui o id forCadastro
const formulário = document.getElementById('formCadastro');

//Procure no HTML a area que possui o id da mensagem 
const mensagem = document.getElementById('mensagem');

//Fica observando o formulário e espere o usuário tentar enviá-lo
formulário.addEventListener('submit', function(evento) {

     //impede que o navegador recarregue a página ao enviar o formulário
     evento.preventDefault();

     //Procura o campo Nome, pega o valor digitado e remove espaços desnecessarios
    const nome = document.getElementById('nome').value.trim();

    //Procura o campo Email, pega o valor digitado e remove espaços desnecessários 
    const email = document.getElementById('email').value.trim();

    //Procurawr o telefone , pega o valor digitado e remove espaços desnecessários
    const telefone = document.getElementById('telefone').value.trim();
    const curso = document.getElementById('moda').value.trim();
    const cidade = document.getElementById('gosto').value.trim();

    //verifica se o campo Nome, Email ou Telefone  esta vazio 
    if (nome === '' || email === '' || telefone === '' || moda === '' || gosto === '') {

        //Mostra uma mensagem pedindo o preenchimento dos campos 
        mensagem.textContent = 'Preencha todos os campos.';

        //Altera a cor da mensagem pra vermelho
        mensagem.style.color = '#b84040';

        //interrompe a excução do restante da função
        return;

    //Finaliza a condição de verificação
    }

    //Mostre uma mensagem personalizada informando que o cadastro foi realizado
    mensagem.textContent = 'Cadastro de $(nome) realizado com sucesso!';

    //Altera a cor da mensagem para verde 
    mensagem.style.color = '#2f855a';

    //Limpa todos os campos depois que o cadastro é realizado
    formulário.reset();

//Finaliza o evento de envio do formulário
});