const usuarios = JSON.parse(localStorage.getItem('cadastro-usuario')) || [];
//Elementos
const telaLista = document.getElementById("tela-lista");
const telaCadastro = document.getElementById("tela-cadastro");
const telaDetalhes = document.getElementById("tela-detalhes");
const btnAdicionar = document.getElementById("btn-adicionar");
const btnVoltarLista = document.getElementById("btn-voltar-lista");
const Form = document.getElementById("user-form");
const userTableBody = document.getElementById("user-table-body");
const tabelaBody = document.querySelector("#user-table-body");

//funções

function irparacadastro(){
    telaCadastro.classList.remove("d-none");
    telaLista.classList.add("d-none");
}

function irparalista(){
    telaCadastro.classList.add("d-none");
    telaLista.classList.remove("d-none");
    renderizarUsuarios();
}

function salvarUsuario(){

    const id = Number(inputId.value);
    const nome = inputNome.value;
    const sobrenome = inputSobrenome.value;
    const email = inputEmail.value;
    const obs = inputObs.value;
    const rua = inputRua.value;
    const numero = inputNumero.value;
    const bairro = inputBairro.value;
    const complemento = inputComplemento.value;
    const cidade = inputCidade.value;
    const estado = inputEstado.value;
    const cep = inputCep.value;

    const usuario = {
        id: id || Date.now(),
        nome: nome,
        sobrenome : sobrenome,
        email: email,
        obs: obs,
        rua: rua,
        numero: numero,
        bairro: bairro,
        complemento: complemento,
        cidade: cidade,
        estado: estado,
        cep: cep
    }

    usuarios.push(usuario);
    console.log(usuario);
    salvarNoStorage();
}

function renderizarUsuarios(){
    tabelaBody.innerHTML = "";
    usuarios.forEach(user => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nome}</td>
            <td>${user.sobrenome}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn btn-warning" data-id="${user.id}">Editar</button>
                <button class="btn btn-danger" data-id="${user.id}">Excluir</button>
            </td>
            `;
        tabelaBody.appendChild(tr);
    });
}

function salvarNoStorage(){
    localStorage.setItem("cadastro-usuario", JSON.stringify(usuarios));
}

function inicializacao(){
    btnAdicionar.addEventListener("click", irparacadastro);
    btnVoltarLista.addEventListener("click", irparalista);
    Form.addEventListener("submit", salvarUsuario);
}
inicializacao();

//inputs usuario
const inputNome = document.getElementById("user-nome");
const inputId = document.getElementById("user-id");
const inputSobrenome = document.getElementById("user-sobrenome");
const inputEmail = document.getElementById("user-email");
const inputObs = document.getElementById("user-obs");
const inputRua = document.getElementById("user-rua");
const inputNumero = document.getElementById("user-numero");
const inputBairro = document.getElementById("user-bairro");
const inputComplemento = document.getElementById("user-complemento");
const inputCidade = document.getElementById("user-cidade");
const inputEstado = document.getElementById("user-estado");
const inputCep = document.getElementById("user-cep");
