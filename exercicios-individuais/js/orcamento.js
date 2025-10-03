// Requisitos Funcionais (RF)
// Atualização em Tempo Real: O orçamento deve ser recalculado e exibido na tela instantaneamente sempre que o usuário alterar o valor de qualquer campo do formulário (quantidade de páginas, desconto, prazo ou os checkboxes). 
// Cálculo do Subtotal: O valor do subtotal deve ser calculado com base na quantidade de páginas.
// Adicional de Design: Se o checkbox "Incluir Design de UI/UX" estiver marcado, um valor fixo deve ser somado ao cálculo.
// Taxa de Urgência: Uma taxa deve ser aplicada com base no prazo de entrega.
// Cálculo do Desconto: O desconto deve ser calculado com base na porcentagem informada pelo usuário.
// Exibição no Resumo: Todos os valores calculados (subtotal, adicionais, taxas e descontos) devem ser exibidos na seção "Resumo do Orçamento".
// Cálculo Final: O "TOTAL DO PROJETO" (custo único).
// Regras de Negócio (RN)
// Preço por Página: R$ 500,00
// Custo Adicional de Design: R$ 1.000,00
// Taxa de Urgência: 
//    - Se o prazo for menor que 5 dias: 10% sobre o valor base (páginas + design).
//    - Se o prazo for menor que 15 dias: 5% sobre o valor base (páginas + design). 
//    - Se for 15 dias ou mais, a taxa é zero.
// Desconto: O desconto percentual é aplicado sobre a soma de todos os custos únicos (páginas + design + taxa de urgência).


const qtdPaginasInput = document.getElementById("qtd-paginas");
const prazoEntregaInput = document.getElementById("prazo-entrega");
const descontoInput = document.getElementById("desconto");
const incluiDesignCheckbox = document.getElementById("inclui-design");

const resumoSubtotal = document.getElementById("resumo-subtotal");
const resumoAdicional = document.getElementById("resumo-adicional");
const resumoUrgencia = document.getElementById("resumo-urgencia");
const resumoDesconto = document.getElementById("resumo-desconto");
const resumoTotal = document.getElementById("resumo-total");

const PRECO_POR_PAGINA = 500;
const CUSTO_ADICIONAL_DESIGN = 1000;

function calcularOrcamento() {
    const qtdPaginas = parseInt(qtdPaginasInput.value) || 0;
    const prazoEntrega = parseInt(prazoEntregaInput.value) || 0;
    const desconto = parseFloat(descontoInput.value) || 0;
    const incluiDesign = incluiDesignCheckbox.checked;

    const subtotal = qtdPaginas * PRECO_POR_PAGINA;

    const adicionalDesign = incluiDesign ? CUSTO_ADICIONAL_DESIGN : 0;

    let taxaUrgencia = 0;
    if (prazoEntrega < 5) {
        taxaUrgencia = 0.1 * (subtotal + adicionalDesign);
    } else if (prazoEntrega < 15) {
        taxaUrgencia = 0.05 * (subtotal + adicionalDesign);
    }

    const totalSemDesconto = subtotal + adicionalDesign + taxaUrgencia;
    const valorDesconto = (desconto / 100) * totalSemDesconto;

    const total = totalSemDesconto - valorDesconto;

    resumoSubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
    resumoAdicional.textContent = `R$ ${adicionalDesign.toFixed(2)}`;
    resumoUrgencia.textContent = `+ R$ ${taxaUrgencia.toFixed(2)}`;
    resumoDesconto.textContent = `- R$ ${valorDesconto.toFixed(2)}`;
    resumoTotal.textContent = `R$ ${total.toFixed(2)}`;
}

qtdPaginasInput.addEventListener("input", calcularOrcamento);
prazoEntregaInput.addEventListener("input", calcularOrcamento);
descontoInput.addEventListener("input", calcularOrcamento);
incluiDesignCheckbox.addEventListener("change", calcularOrcamento);

calcularOrcamento();