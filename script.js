
let shouldReset = false;

let operandOne = "";
let operandTwo = "";
let currentOperator ="";

const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equalsBtn");
const pointBtn = document.querySelector(".pointBtn");
const clearBtn = document.querySelector(".acBtn");
const deleteBtn = document.querySelector(".deleteBtn");
const numBtns = document.querySelectorAll(".num");
const lastDisplay = document.getElementById("lastDisplay");
const currentDisplay = document.getElementById("currentDisplay");

equalsBtn.addEventListener("click",evaluate);
pointBtn.addEventListener("click",addPoint);
clearBtn.addEventListener("click",clear);
deleteBtn.addEventListener("click",del);

numBtns.forEach((button) =>
    button.addEventListener("click",()=> getNum(button.textContent))
);

operatorBtns.forEach((button) => {
    button.addEventListener("click",() => getOperator(button.textContent))
})





function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}


function operate(numOne,operator,numTwo){
    numOne = Number(numOne);
    numTwo = Number(numTwo);
    switch (operator) {
        case "+":
            return add(numOne,numTwo)
        case "-":
            return subtract(numOne,numTwo);
        case "*":
            return multiply(numOne,numTwo)
        case "÷":
            if (numTwo === 0) return "Error"
            else return divide(numOne,numTwo);
        default:
            return null
    }
}
function evaluate(){
    if (shouldReset || currentOperator === "") return;
    operandTwo = currentDisplay.textContent;
    let result = operate(operandOne,currentOperator,operandTwo);
    currentDisplay.textContent = roundResult(result);
    lastDisplay.textContent = `${operandOne} ${currentOperator} ${operandTwo} =`;
    currentOperator = "";
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function reset(){
    currentDisplay.textContent = "";
    shouldReset = false;

}

function getNum(number){
    if (currentDisplay.textContent === "0" || shouldReset) reset();
    if (currentDisplay.textContent.length<= 15)
        currentDisplay.textContent += number;
    
}
function getOperator(operator){
    if (currentOperator != "") evaluate();
    currentOperator = operator;
    operandOne = currentDisplay.textContent;
    lastDisplay.textContent = `${operandOne} ${currentOperator}`;
    shouldReset = true;
}

function addPoint(){
    if (shouldReset) reset();
    if (currentDisplay.textContent === "") currentDisplay.textContent = 0;
    if (currentDisplay.textContent.includes(".")) return;
    currentDisplay.textContent += ".";

}

function clear(){
    currentDisplay.textContent = 0;
    lastDisplay.textContent = "";
    operandOne = "";
    operandTwo = "";
    currentOperator = "";
    operationReady = false;
}
function del(){
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
} 

document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key)) getNum(e.key); // Numbers
    if (["+", "-", "*", "/"].includes(e.key)) getOperator(e.key);
    if (e.key === "Enter") evaluate();
    if (e.key === "Backspace") del();
    if (e.key === "Escape") clear();
    if (e.key === ".") addPoint();
});