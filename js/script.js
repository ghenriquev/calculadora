const calculadora = document.querySelector("#calculadora");
const teclas = document.querySelector(".teclas");
const display = document.querySelector(".display");

teclas.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.innerHTML;
    const displayedNum = display.innerHTML;
    let isNumber = !action;
    let isDecimal = action === "decimal";
    let isOperator =
      action === "somar" ||
      action === "subtrair" ||
      action === "multiplicar" ||
      action === "dividir";
    let isAC = action === "limpar";
    let isDelete = action === "deletar";
    let isEqual = action === "calcular";
    const lastNumRemoved = displayedNum.slice(0, -1);
    const buttonArray = Array.from(key.parentNode.children);
    const previousKeyType = calculadora.dataset.previousKeyType;
    let operadores = document.getElementsByClassName('operador');

    const calcular = (n1, operator, n2) => {
      let result = "";

      if (operator === "somar") {
        result = parseFloat(n1) + parseFloat(n2);
      } else if (operator === "subtrair") {
        result = parseFloat(n1) - parseFloat(n2);
      } else if (operator === "multiplicar") {
        result = parseFloat(n1) * parseFloat(n2);
      } else if (operator === "dividir") {
        result = parseFloat(n1) / parseFloat(n2);
      }

      return result;
    };

    if (isNumber) {
      if (displayedNum === "0" || previousKeyType === "operador") {
        display.innerHTML = keyContent;
        calculadora.dataset.previousKeyType = "number";
      } else {
        display.innerHTML = displayedNum + keyContent;
      }

      for (button of buttonArray) {
        button.classList.remove("pressionada");
      }
    }
    if (isOperator) {
      let operadorArray = [];
      let contemPressionada;
      for (op of operadores){
        operadorArray.push(op.classList.contains('pressionada'));
        if(operadorArray.indexOf(true) !== -1){
          contemPressionada = true;
        } else {
          contemPressionada = false;
        }
      }
      if (displayedNum !== "0" && contemPressionada === false) {
        
        key.classList.add("pressionada");
        
        calculadora.dataset.previousKeyType = "operador";
        calculadora.dataset.firstValue = displayedNum;
        calculadora.dataset.operator = action;
      } else if (displayedNum !== "0" && contemPressionada === true){
        for (op of operadores){
          op.classList.remove('pressionada');
        }
        key.classList.add("pressionada");
        
        calculadora.dataset.previousKeyType = "operador";
        calculadora.dataset.firstValue = displayedNum;
        calculadora.dataset.operator = action;
        
      }
    }

    if (isDecimal) {
      if (!displayedNum.includes(".") && previousKeyType != "operador") {
        display.innerHTML = displayedNum + ".";
      } else if (previousKeyType === "operador") {
        display.innerHTML = "0.";
      }

      calculadora.dataset.previousKeyType = "decimal";

      for (button of buttonArray) {
        button.classList.remove("pressionada");
      }
    }
    if (isAC) {
      display.innerHTML = "0";
      calculadora.dataset.previousKeyType = "ac";
      calculadora.dataset.firstValue = '0'
      for (button of buttonArray) {
        button.classList.remove("pressionada");
      }
    }
    if (isDelete) {
      if (displayedNum !== "0" && displayedNum.length > 1) {
        display.innerHTML = lastNumRemoved;
      } else if (displayedNum.length === 1) {
        display.innerHTML = "0";
      }
      for (button of buttonArray) {
        button.classList.remove("pressionada");
      }

      calculadora.dataset.previousKeyType = "delete";
    }
    if (isEqual) {
      for (button of buttonArray) {
        button.classList.remove("pressionada");
      }
      const firstValue = calculadora.dataset.firstValue;
      const operator = calculadora.dataset.operator;
      const secondValue = displayedNum;
      if (firstValue && operator && previousKeyType !== "operador") {
        const calcValue = calcular(firstValue, operator, secondValue);
        display.innerHTML = calcValue;

        calculadora.dataset.firstValue = calcValue;
      } else {
        calculadora.dataset.firstValue = displayedNum;
      }
      calculadora.dataset.previousKeyType = "igual";
    }
  }
});
