// basic arithmatic functions
function add(a, b){
    a = parseFloat(a);
    b = parseFloat(b);
    return (a+b);
}
function subtract(a, b){
    a = parseFloat(a);
    b = parseFloat(b);
    return (a-b);
}
function multiply(a, b){
    a = parseFloat(a);
    b = parseFloat(b);
    return (a*b);
}
function divide(a, b){
    a = parseFloat(a);
    b = parseFloat(b);
    return (a/b);
}
function operate(a, operator, b){//3 variable operate function
    if (operator == '' || b == '') {return a;};

    if (operator == '+') {return Math.round(add(a, b)*10000)/10000;};

    if (operator == '-') {return Math.round(subtract(a, b)*10000)/10000;};

    if (operator == '*') {return Math.round(multiply(a, b)*10000)/10000;};

    if (operator == '/') {return Math.round(divide(a, b)*10000)/10000;};
}
function getButtonId(e){
    return e.target.id;
}
function isDecimal(str){
    str = str.toString();
    if (str.indexOf('.') == -1){
        return false;
    } else {
        return true;
    }
}
let numOne = '';//initialize variables
let operator = '';
let numTwo = '';
let opSelected = false;
const numButton = document.querySelectorAll('.number');//define number buttons in nodelist
const opButton = document.querySelectorAll('.operator');//define operator buttons in nodelist
const display = document.getElementById('display');
const AC = document.getElementById('AC');
const backSpace = document.getElementById('backSpace');
const decimal = document.getElementById('decimal');

numButton.forEach(button => {//add event listener for each number
    button.addEventListener('click', function(e){
        if (opSelected === false){//if the operator isnt selected, manipulate first number
            numOne += getButtonId(e);
            display.textContent = numOne;
        } else {//if it is, manipulate second
            numTwo += getButtonId(e);
            display.textContent = numOne + operator + numTwo;
        }
    });
});

opButton.forEach(button => {//listen for any operation button
    button.addEventListener('click', function(e){
        if (getButtonId(e) === 'equals'){//call operate if = was clicked
            if (operator == '/' && numTwo == '0') {
                display.textContent = 'Nice try';
                return;
            }
            numOne = operate(numOne, operator, numTwo);
            display.textContent = numOne;
            numTwo = '';
            operator = '';
            opSelected = false;
            return;
        } if(opSelected === true) {
            if (operator == '/' && numTwo == '0') {
                display.textContent = 'Nice try';
                return;
            }
            numOne = operate(numOne, operator, numTwo);
            numTwo = '';
            operator = getButtonId(e);
            display.textContent = numOne + operator;
        } else {//otherwise, define operator and select it
            operator = getButtonId(e);
            opSelected = true;
            display.textContent = numOne + operator + numTwo;
        }

    });
});

AC.addEventListener('click', function() {
    numOne = '';
    numTwo = '';
    operator = '';
    opSelected = false;
    display.textContent = '0';
})

backSpace.addEventListener('click', function() {
    if (opSelected === true && numTwo == ''){//operator with no 2nd num
        operator = operator.slice(0, -1);
        opSelected = false;
        display.textContent = numOne;
        return;
    } if (opSelected === true && numTwo != ''){//operator and 2nd num
        numTwo = numTwo.slice(0, -1);
        display.textContent = numOne + operator + numTwo;
        return;
    } else {//only 1st num
        numOne = numOne.slice(0, -1);
        display.textContent = numOne
        if (numOne === ''){
            display.textContent = 0;
        }
    }
})

decimal.addEventListener('click', function() {
    if (isDecimal(numOne) === false && opSelected === false){
        numOne = numOne + '.';
    } if (isDecimal(numTwo) === false && opSelected === true) {
        numTwo = numTwo + '.';
    }
    display.textContent = numOne + operator + numTwo;
})