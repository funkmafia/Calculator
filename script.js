// ===== 1. DOM Elements =====
const display = document.getElementById('result'); // update the screen with output
const numberButton = document.querySelectorAll('[data-number]'); // handle al number clicks
const operatorButton = document.querySelectorAll('[data-operator]'); // handle operator logic +- etc
const equalsButton = document.querySelector('[data-equals]'); // performs calculation 
const decimalButton = document.querySelector('[data-decimal]'); // add a decimal if needed
const clearButton = document.querySelector('[data-clear]'); // reset everything
decimalButton.addEventListener('click', handleDecimal);
clearButton.addEventListener('click', resetCalculator);

// ===== 2. STATE VARIABLES ===== 
let currentInput = ''; 
let previousInput = ''; 
let currentOperator = null; 


// ===== 3. SETTING UP EVENT LISTENERS FOR EACH BUTTON ===== 
numberButton.forEach(button => {
    button.addEventListener('click', () => {
        handleNumberInput(button.textContent);  
    });
}); 

operatorButton.forEach(operator => {
    operator.addEventListener('click', () => {
        handleOperatorInput(operator.textContent);
    });
});

equalsButton.addEventListener('click', () => {
        handleEquals(); 
    });

// ===== 4. CORE FUNCTIONS ===== 
function handleNumberInput (number) {
    currentInput += number; 
    display.textContent = currentInput; 
} 

function handleOperatorInput (operator) {
    if (currentInput === '') return;     // stops users from hitting an op with nothing types in yet 
    previousInput = currentInput; // store the number just types (so can used it later when = is pressed)
    currentOperator = operator;  // saves the operator they selected
    currentInput = ''; // ready for the next number 
    display.textContent = currentOperator; // gives the visual cue of what has been selectied
}

function handleEquals () {
    if (currentInput === '' || previousInput === '' || currentOperator === null) return; 

    const num1 = parseFloat(previousInput); 
    const num2 = parseFloat(currentInput);
    let result = 0; 

if (currentOperator === '+') {
    result = num1 + num2; 
} else if (currentOperator === '-') {
    result = num1 - num2; 
} else if (currentOperator === '×') {
    result = num1 * num2; 
} else if (currentOperator === '÷') {
    result = num2 !== 0 ? num1 / num2: 'Error'; 
}

    display.textContent = result; 
    currentInput = result.toString(); 
    previousInput = ''; 
    currentOperator = null; 
}

function handleDecimal () {
    if (!currentInput.includes ('.')) {
        currentInput += '.';
        display.textContent = currentInput; 
    } return; 
}

function resetCalculator () {
    currentInput = '';
    previousInput = ''; 
    currentOperator = null; 
    display.textContent = '0';
} 
