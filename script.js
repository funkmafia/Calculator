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

// Keyboard function // added to bottom as functions are already defined // grouped clearly at bottom for own section 

document.addEventListener("keydown", (event) => {
    if (!isNaN(event.key)) {
        handleNumberInput(event.key);
    } else if (['+', '-', '*', '/', '×', '÷'].includes(event.key)) {
        handleOperatorInput(event.key); 
    } else if (event.key === '.') {
        handleDecimal();
    } else if (event.key === '=' || event.key === 'Enter') {
        handleEquals();
    } else if (event.key === 'Backspace' || event.key.toLowerCase() === 'c') {
        resetCalculator();
    }
    }); 

// event.key - checks what key was pressed - located that way to use it to match or pass it into a function 
// if (!NaN(event.key)) - decides if its a number - only want to call handleNumberInput() when valid 
// handleNumberInput(event.key) - calls the function with that key - gives the function that actual number types
// used else if instead of if 
// event.key is always a string 
// document.eventEventListener("keydown", (event) is the code for when a key is pressed !!!!!!! 

// for highlighting keys on the keyboard !! 

document.addEventListener("keypress", (event) => {
    
})