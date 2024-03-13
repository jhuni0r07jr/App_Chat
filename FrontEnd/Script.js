const Login = document.querySelector(".Login");
const form_Login = Login.querySelector(".form_Login");
const Nome = document.getElementById("Input_Login");

const Chat = document.querySelector(".Chat");
const Digitar = document.querySelector(".Digitar");
const Digitar_texto = document.querySelector(".Digitar_texto");
const chat_mensagem = document.querySelector(".chat_mensagem");

const Usuario = {
    id: "",
    Name: "",
    cor: ""
}

const Cores = [
    "blue",
    "gold",
    "green",
    "cream",
    "Violet",
    "orange",
    "hotpink"
];

let websocket;

const CriandoMinhaMensagem = (content) =>{
    const div = document.createElement("div");
    
    div.classList.add("Minha_Mensagem");
    div.innerHTML = content;

    return div;
}

const Criando_Mensagem_Outras_Pessoas = (content, sender, senderCor) =>{
    const div = document.createElement("div");
    const span = document.createElement("span");

    div.classList.add("Mensagem_Outras_Pessoas");

    div.classList.add("Minha_Mensagem");
    span.classList.add("Nome_Pessoa")
    span.style = senderCor;

    div.appendChild(span);

    span.innerHTML = sender;
    div.innerHTML += content;
 
    return div;
}

const ProcessandoMensagem = ({data}) =>{
    const {UsuarioId, UsuarioName, UsuarioCor, content} = JSON.parse(data);

    const VerificandoMensagem = 
    UsuarioId == Usuario.id
    ? CriandoMinhaMensagem(content)
    : Criando_Mensagem_Outras_Pessoas(content, UsuarioName, UsuarioCor);

    chat_mensagem.appendChild(VerificandoMensagem);
}

const Salvando = (event) => {
    event.preventDefault();

    Usuario.id = crypto.randomUUID();
    Usuario.Name = Nome.value;
    Usuario.cor = EscolhendoCorAleatoria();
    //Sumindo com a tela de login e mostrando a tela do chat.
    Login.style.display = "none";
    Chat.style.display = "flex";

    websocket = new WebSocket("wss://app-chat-9rmh.onrender.com");
    websocket.onmessage = ProcessandoMensagem;
}

const EnviandoMensagem = (event) => {

    const Mensagem = {
        UsuarioId: Usuario.id,
        UsuarioName: Usuario.Name,
        UsuarioCor: Usuario.cor,
        content: Digitar.value
    }
    event.preventDefault();
    Digitar.value = "";
    websocket.send(JSON.stringify(Mensagem));
}

const EscolhendoCorAleatoria = () =>{
    const SelecionandoCor = Math.floor(Math.random()* Cores.length);

    return Cores[SelecionandoCor];
}

form_Login.addEventListener("submit", Salvando);
Digitar_texto.addEventListener("submit", EnviandoMensagem);