const minutos = document.getElementsByClassName("minutos");
const segundos = document.getElementsByClassName("segundos");
const botaoComecar = document.getElementById("comecar");
const divBotao = document.getElementsByClassName("button");
const botaoParar = document.getElementById("parar");
let segundosCronometro;

function iniciarCronometro() {
    let segundosNumber1 = transformarEmNumero(segundos[1]);
    let segundosNumber0 = transformarEmNumero(segundos[0]);
    let minutosNumber1 = transformarEmNumero(minutos[1]);
    let minutosNumber0 = transformarEmNumero(minutos[0]);
    segundosCronometro = setInterval(function () {
        segundos[1].innerHTML = segundosNumber1 += 1;
        if (segundosNumber1 == 9) {
            segundos[0].innerHTML = segundosNumber0 += 1;
            segundosNumber1 = 0;
        }
        if (segundosNumber0 > 5) {
            segundosNumber0 = 0;
            minutos[1].innerHTML = minutosNumber1 += 1;
        }
        if (minutosNumber1 == 9) {
            minutosNumber1 = 0;
            minutos[0].innerHTML = minutosNumber0 += 1;
        }
        if (minutosNumber0 > 5) {
            segundosNumber1 = 0;
            segundosNumber0 = 0;
            minutosNumber0 = 0;
            minutosNumber1 = 0;
        }
        localStorage.setItem("segundosNumber1", segundosNumber1);
        localStorage.setItem("segundosNumber0", segundosNumber0);
        localStorage.setItem("minutosNumber1", minutosNumber1);
        localStorage.setItem("minutosNumber0", minutosNumber0);
    }, 1000);
}

function carregarCronometro() {
    let segundosNumber1 = localStorage.getItem("segundosNumber1") || 0;
    let segundosNumber0 = localStorage.getItem("segundosNumber0") || 0;
    let minutosNumber1 = localStorage.getItem("minutosNumber1") || 0;
    let minutosNumber0 = localStorage.getItem("minutosNumber0") || 0;

    segundos[1].innerHTML = segundosNumber1;
    segundos[0].innerHTML = segundosNumber0;
    minutos[1].innerHTML = minutosNumber1;
    minutos[0].innerHTML = minutosNumber0;
}

function pararCronometro() {}

function transformarEmNumero(propriedade) {
    return parseInt(propriedade.innerHTML);
}

botaoComecar.addEventListener("click", () => {
    botaoComecar.style.display = "none";
    const img = document.createElement("img");
    const botaoParar = document.createElement("button");
    divBotao[0].appendChild(botaoParar);
    botaoParar.id = "parar";
    botaoParar.textContent = "Parar";
    botaoParar.appendChild(img);
    img.src = "./assets/img/HandPalm, Regular.png";
    img.className = "icone-button";
    botaoParar.style.backgroundColor = "#AB222E";
    botaoParar.style.flexDirection = "row-reverse";

    botaoParar.addEventListener("click", () => {
        pararCronometro();
        botaoParar.remove();
        botaoComecar.style.display = "flex";
    });
});

function pararCronometro() {
    clearInterval(segundosCronometro);
}

window.onload = carregarCronometro();
