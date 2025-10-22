const usuarios = JSON.parse(localStorage.getItem('cadastro-usuario')) || [];

const telaLista = document.getElementById("tela-lista");
const telaCadastro = document.getElementById("tela-cadastro");
const telaDetalhes = document.getElementById("tela-detalhes");
const btnAdicionar = document.getElementById("btn-adicionar");
const btnVoltarLista = document.getElementById("btn-voltar-lista");
const Form = document.getElementById("user-form");
const userTableBody = document.getElementById("user-table-body");
const tabelaBody = document.querySelector("#user-table-body");
const searchInput = document.getElementById("search-input");
const btnDownload = document.getElementById("btn-download");
const btnUpload = document.getElementById("btn-upload");

function downloadJSON() {
    const dataStr = JSON.stringify(usuarios, null, 2);

    const blob = new Blob([dataStr], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "usuarios.json"; 
    a.click();

    URL.revokeObjectURL(url);
}

btnDownload.addEventListener("click", downloadJSON);

function filtrarUsuarios() {
    const termoBusca = searchInput.value.toLowerCase(); 
    const usuariosFiltrados = usuarios.filter(user => 
        user.nome.toLowerCase().includes(termoBusca) ||
        user.sobrenome.toLowerCase().includes(termoBusca) ||
        user.email.toLowerCase().includes(termoBusca)
    );


    renderizarUsuarios(usuariosFiltrados);
}

function uploadJSON(event) {
    const file = event.target.files[0];

    if (!file) {
        alert("Nenhum arquivo selecionado.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result); 
            if (Array.isArray(data)) {

                data.forEach(user => {
                    if (!usuarios.some(u => u.id === user.id)) {
                        usuarios.push(user);
                    }
                });

                salvarNoStorage();
                renderizarUsuarios();
                alert("Usuários adicionados com sucesso!");
            } else {
                alert("O arquivo JSON deve conter um array de usuários.");
            }
        } catch (error) {
            alert("Erro ao processar o arquivo JSON. Verifique o formato.");
        }
    };

    reader.readAsText(file);
}

btnUpload.addEventListener("click", () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "application/json";

    inputFile.addEventListener("change", uploadJSON);

    inputFile.click();
});

function irparacadastro(){
    telaCadastro.classList.remove("d-none");
    telaLista.classList.add("d-none");
}

function irparalista(){
    telaCadastro.classList.add("d-none");
    telaLista.classList.remove("d-none");
    renderizarUsuarios();
}



function removerUsuario(id){
    const index = usuarios.findIndex(user => user.id === id);
    if(index !== -1){
        usuarios.splice(index, 1);
        salvarNoStorage();
        renderizarUsuarios();
    }
}


let usuarioEmEdicaoId = null;

function salvarUsuario(event) {
    event.preventDefault(); 

    const id = usuarioEmEdicaoId || Date.now(); 
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
        id,
        nome,
        sobrenome,
        email,
        obs,
        rua,
        numero,
        bairro,
        complemento,
        cidade,
        estado,
        cep,
    };

    if (usuarioEmEdicaoId) {
        const index = usuarios.findIndex(user => user.id === usuarioEmEdicaoId);
        if (index !== -1) {
            usuarios[index] = usuario;
        }
    } else {
        usuarios.push(usuario);
    }

    salvarNoStorage();
    renderizarUsuarios();

    Form.reset();
    usuarioEmEdicaoId = null;
    irparalista();
}

function editarUsuario(id) {
    const user = usuarios.find(user => user.id === id);
    if (user) {
        usuarioEmEdicaoId = id; 
        inputId.value = user.id;
        inputNome.value = user.nome;
        inputSobrenome.value = user.sobrenome;
        inputEmail.value = user.email;
        inputObs.value = user.obs;
        inputRua.value = user.rua;
        inputNumero.value = user.numero;
        inputBairro.value = user.bairro;
        inputComplemento.value = user.complemento;
        inputCidade.value = user.cidade;
        inputEstado.value = user.estado;
        inputCep.value = user.cep;
        irparacadastro();
    }
}

function renderizarUsuarios(listaUsuarios = usuarios) {
    tabelaBody.innerHTML = "";

    if (listaUsuarios.length === 0) {
        tabelaBody.innerHTML = "<tr><td colspan='4'>Nenhum usuário encontrado.</td></tr>";
        return;
    }

    listaUsuarios.forEach(user => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.sobrenome}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn btn-warning" onclick="editarUsuario(${user.id})">Editar</button>
                <button class="btn btn-danger" onclick="removerUsuario(${user.id})">Excluir</button>
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

    renderizarUsuarios();
}
inicializacao();

searchInput.addEventListener("input", filtrarUsuarios);

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
