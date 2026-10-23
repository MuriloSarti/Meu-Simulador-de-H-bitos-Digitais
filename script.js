"use strict";

// Base de dados pronta para os alunos usarem no script
const dadosPesquisa = {
  mediaNacionalDiaria: 4, // Média de horas que o brasileiro passa nas redes
  alertaSaude: 6,         // Limite recomendado por especialistas
  sugestoes: [
    { limite: 2, mensagem: "Parabéns! Seu uso está equilibrado. Você tem mais tempo livre para hobbies e descanso." },
    { limite: 5, mensagem: "Atenção. Você está na média nacional, mas já gasta quase um dia inteiro da sua semana olhando para a tela." },
    { limite: 24, mensagem: "Cuidado! Seu uso é considerado muito alto. Isso pode afetar seu sono, foco e saúde mental. Que tal um detox digital?" }
  ]
};

// Captura dos elementos HTML
const campoHoras = document.getElementById("horas");
const botaoCalcular = document.getElementById("calcular");
const resultado = document.getElementById("resultado");

const semanal = document.getElementById("semanal");
const mensal = document.getElementById("mensal");
const progresso = document.getElementById("progresso");

// Formata os números
function formatarNumero(numero) {
    return Number.isInteger(numero)
        ? numero.toString()
        : numero.toLocaleString("pt-BR", {
            maximumFractionDigits: 2
        });
}

// Mostra mensagens de validação
function mostrarMensagem(texto) {
    resultado.replaceChildren();

    const mensagem = document.createElement("p");
    mensagem.className = "result-description";
    mensagem.textContent = texto;

    resultado.appendChild(mensagem);
}

// Evento do botão
botaoCalcular.addEventListener("click", function () {

    // Obtém o valor digitado
    const valorDigitado = campoHoras.value.trim();

    // Verifica se o campo está vazio
    if (valorDigitado === "") {
        mostrarMensagem("Digite quantas horas por dia você passa nas redes sociais.");
        campoHoras.focus();
        return;
    }

    const horasDiarias = Number(valorDigitado);

    // Valida o número de horas
    if (
        !Number.isFinite(horasDiarias) ||
        horasDiarias < 0 ||
        horasDiarias > 24
    ) {
        mostrarMensagem("Digite um valor válido entre 0 e 24 horas.");
        campoHoras.focus();
        return;
    }

    // Calcula o tempo semanal e mensal
    const horasSemanais = horasDiarias * 7;
    const horasMensais = horasDiarias * 30;

    // Compara com a média diária
    let comparacao;

    if (horasDiarias > dadosPesquisa.mediaNacionalDiaria) {
        comparacao =
            `Seu uso está acima da média de referência de ${dadosPesquisa.mediaNacionalDiaria} horas por dia.`;
    } else if (horasDiarias < dadosPesquisa.mediaNacionalDiaria) {
        comparacao =
            `Seu uso está abaixo da média de referência de ${dadosPesquisa.mediaNacionalDiaria} horas por dia.`;
    } else {
        comparacao =
            `Seu uso está exatamente na média de referência de ${dadosPesquisa.mediaNacionalDiaria} horas por dia.`;
    }

    // Seleciona a sugestão de acordo com as horas diárias
    let mensagemReflexiva;

    if (horasDiarias <= dadosPesquisa.sugestoes[0].limite) {
        mensagemReflexiva = dadosPesquisa.sugestoes[0].mensagem;
    } else if (horasDiarias <= dadosPesquisa.sugestoes[1].limite) {
        mensagemReflexiva = dadosPesquisa.sugestoes[1].mensagem;
    } else {
        mensagemReflexiva = dadosPesquisa.sugestoes[2].mensagem;
    }

    // Verifica o limite de alerta
    let alerta = "";

    if (horasDiarias >= dadosPesquisa.alertaSaude) {
        alerta =
            ` Atenção: você atingiu ou ultrapassou o limite de referência de ${dadosPesquisa.alertaSaude} horas definido nesta atividade.`;
    }

    // Atualiza as estatísticas do layout
    semanal.textContent = `${formatarNumero(horasSemanais)} h`;
    mensal.textContent = `${formatarNumero(horasMensais)} h`;

    // Atualiza a barra de progresso
    progresso.style.width = `${(horasDiarias / 24) * 100}%`;

    // Exibe o resultado principal
    resultado.replaceChildren();

    const numero = document.createElement("div");
    numero.className = "result-number";

    numero.appendChild(
        document.createTextNode(`${formatarNumero(horasSemanais)} `)
    );

    const unidade = document.createElement("small");
    unidade.textContent = "HORAS / SEMANA";
    numero.appendChild(unidade);

    const descricao = document.createElement("p");
    descricao.className = "result-description";
    descricao.textContent =
        `${comparacao} ${mensagemReflexiva}${alerta}`;

    const reflexao = document.createElement("p");
    reflexao.className = "result-description";
    reflexao.style.marginTop = "16px";
    reflexao.style.paddingTop = "16px";
    reflexao.style.borderTop = "1px solid #303030";
    reflexao.textContent =
        "Reflexão: se você recuperasse parte desse tempo, o que poderia fazer com ele?";

    resultado.append(numero, descricao, reflexao);
});

// Permite calcular ao pressionar Enter
campoHoras.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        botaoCalcular.click();
    }
});
