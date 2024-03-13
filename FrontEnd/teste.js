const Login = document.querySelector(".Login");
const form_Login = Login.querySelector(".form_Login");
const Nome = document.getElementById("Input_Login");

const Chat = document.querySelector(".Chat");
const Digitar = document.querySelector(".Digitar");
const Digitar_texto = document.querySelector(".Digitar_texto");
const chat_mensagem = document.querySelector(".chat_mensagem");

const Usuario = {
    id: "",
    Nome: "",
    Cor: ""
};

const cores = [
    "blue",
    "gold",
    "green",
    "cream",
    "Violet",
    "orange",
    "hotpink"
];

let web;

const Salvar = (event) => {
    event.preventDefault();

    Usuario.id = crypto.randomUUID;
    Usuario.Nome = Nome;
    Usuario.Cor = SelecioandoCor();

    web = new webs("ws://localhost:8080");
    
}

const Processando = ({data}) => {
    const {UsuarioNome, UsuarioCor, UsuarioId, content} = JSON.parse(data);

    const VerificandoMensagem = 
    UsuarioId == Usuario.id
    ? CriandoMinhaMensagem(content)
    : Criando_Mensagem_Outras_Pessoas(content, UsuarioNome, UsuarioCor);

    chat_mensagem.appendChild(VerificandoMensagem);
}

const EnviandoMensagem = (event) =>{
    const Mensagens = {
        UsuarioId: Usuario.id,
        UsuarioNome: Usuario.Nome,
        UsuarioCor: Usuario.cor,
        content: Digitar.value
        
    }
    event.preventDefault();
    Digitar.value = "";
    

}