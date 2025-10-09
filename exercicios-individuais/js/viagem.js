function calcularLitrosNecessarios(distancia, consumo) {
    return distancia / consumo;
}

function calcularCustoTotalCombustivel(litrosNecessarios, precoCombustivel) {
    return litrosNecessarios * precoCombustivel;
}

function calcularCustoPorPessoa(custoTotal, numViajantes) {
    return custoTotal / numViajantes;
}

function animarNumero(elemento, valorFinal) {
    const duracao = 500;
    const incremento = valorFinal / (duracao / 20); 
    let valorAtual = 0;

    const animacao = setInterval(() => {
        valorAtual += incremento;
        if (valorAtual >= valorFinal) {
            valorAtual = valorFinal;
            clearInterval(animacao);
        }
        elemento.textContent = `R$ ${valorAtual.toFixed(2)}`;
    }, 16);
}

function calcularCustos(animarSomentePorPessoa = false) {
    const distancia = parseFloat(document.getElementById("distancia").value) || 0;
    const consumo = parseFloat(document.getElementById("consumo").value) || 0;
    const precoCombustivel = parseFloat(document.getElementById("precoCombustivel").value) || 0;
    const numViajantes = parseInt(document.getElementById("numViajantes").value) || 1;

    if (distancia <= 0 || consumo <= 0 || precoCombustivel <= 0 || numViajantes <= 0) {
        document.getElementById("custoTotal").textContent = "R$ 0,00";
        document.getElementById("custoPorPessoa").textContent = "R$ 0,00";
        return;
    }

    const litrosNecessarios = calcularLitrosNecessarios(distancia, consumo);
    const custoTotal = calcularCustoTotalCombustivel(litrosNecessarios, precoCombustivel);
    const custoPorPessoa = calcularCustoPorPessoa(custoTotal, numViajantes);

    const custoTotalElemento = document.getElementById("custoTotal");
    const custoPorPessoaElemento = document.getElementById("custoPorPessoa");

    if (animarSomentePorPessoa) {
        animarNumero(custoPorPessoaElemento, custoPorPessoa);
    } else {
        animarNumero(custoTotalElemento, custoTotal);
        animarNumero(custoPorPessoaElemento, custoPorPessoa);
    }
}

document.getElementById("distancia").addEventListener("input", () => calcularCustos());
document.getElementById("consumo").addEventListener("input", () => calcularCustos());
document.getElementById("precoCombustivel").addEventListener("input", () => calcularCustos());
document.getElementById("numViajantes").addEventListener("input", () => calcularCustos(true)); 

calcularCustos();