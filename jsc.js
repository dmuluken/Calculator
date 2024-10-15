//  These are functions to perform basic operations such as addistion, subtraction, multiplication, division, modulus and power.
function add(x, y) {
    return x + y;
}
function subtract(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    return x / y;
}
function reminder(x, y) {
    return x % y;
}
function power(x, y) {
    return x ** y;
}


// This function gets two numbers and an operating argument. It will call the basic function based on the operant argument and returns the result.

function operation(x, operant, y) {
    x = Number(x);
    y = Number(y);
    let answer;
    switch (operant) {
        case '+':
            answer = add(x, y);
            break;
        case '-':
            answer = subtract(x, y);
            break;
        case '*':
            answer = multiply(x, y);
            break;
        case '/':
            answer = divide(x, y);
            break;
        case '%':
            answer = reminder(x, y);
            break;
        case '^':
            answer = power(x, y);
            break;
    }

    // returns a result that has a maximum of two decimal points.
    if (answer % 1 == 0 || (10 * answer % 1 == 0)) {
        return answer;
    } else {
        answer = answer.toFixed(2);
        return answer;
    }
}

// these variables are quaryselectors to sellect the container, the operation display, the result display and buttons.
const container = document.querySelector(".container");
let displayOperation = document.querySelector("#operation");
let displayResult = document.querySelector("#results");
const button = document.querySelector("button");

/* these variables are: - display for storing the string to be displayed on the operation display
                        - x for the first number to be calculated
                        - y for the second number to be calculated
                        - operator for storing the operant
                        - result for storing the result of the operation that will be displayed on the results display
                        - operatorCount for storing how many times an operant has been used
                        - pointCount to count for a point so that no two points will be accepeted */

let display = "";
let x = "";
let y = "";
let operator = "";
let result = 0;
let operatorCount = 0;
let displayOperatorCount = 0;
let pointCount = 0;
let history = 0;
let operatorHolder = "";

// Main event listner to check which buttons are being clicked.

container.addEventListener("click", (event) => {
    history = result;
    let target = event.target;

    // First set the dimension of the displays to normal
    displayOperation.setAttribute("style", `height:75px; font-size: 65px;`);
    displayResult.setAttribute("style", `height: 25px; font-size:16px`);

    // If the event is from a button proceed.   
    if (target instanceof HTMLButtonElement) {
        // Makes sure that the equal sign is not displayed.
        if (target.textContent != "=") {
            // makes sure that more that one point characted is not displayed.
            if (target.textContent == ".") {
                if (pointCount == 0) {
                    display = display + target.textContent;
                } else {
                    display = display + "";
                }
            } else if (target.textContent == "C") { //If C is pressed it resets all parameters.
                displayOperation.textContent = 0;
                displayResult.textContent = 0;
                display = "";
                x = "";
                y = "";
                operator = "";
                result = 0;
                operatorCount = 0;
                pointCount = 0;
                history = 0;

                return;
            } else if (target.textContent == "D") { // If D is pressed it delets one string character from display.
                display = display.substr(0, display.length - 1);
            }
            else if (!(isNaN(target.textContent))) {// check if the character is a number and add it display
                display = display + target.textContent;
            } else { // if the character is not a number or C and D it means it is an operator
                if (displayOperatorCount == 0) {
                    display = display + " " + target.textContent + " ";
                } else {
                    display = display + "";
                }

            }
        } else {
            // everytime the equal sign is pressed empty the operation display. This will make things easy.
            display = "";
        }

        displayOperation.textContent = display;
        charIdentify(target.textContent);
    }

})

let charIdentify = function (char) {
    //  if the input is a number of a point enter here
    if (!(isNaN(char)) || char == ".") {
        if (char == ".") {
            if (pointCount == 0) {
                if (operatorCount == 0) {
                    x = x + char;
                    displayResult.textContent = x;
                    pointCount++;
                    return;
                } else if (operatorCount == 1) {
                    y = y + char;
                    pointCount++;
                    return;
                }
            } else {
                return;
            }
        }

        if (operatorCount == 0) {
            x = x + char;
            if (x % 1 == 0 || (10 * x % 1 == 0)) {
                displayResult.textContent = x;
            } else {
                x = Number(x).toFixed(2);
                displayResult.textContent = x;
            }

        } else if (operatorCount == 1) {
            y = y + char;
            result = operation(x, operator, y);
            displayResult.textContent = result;
            displayOperatorCount = 0;
            operatorHolder = "";
        }
        pointCount = 0;

    } else if (isNaN(char)) {   // if the input is not a number or a point enter here
        if (operatorCount == 0) {
            if (char == "=") {
                displayResult.textContent = x;
                x = "";
                displayOperation.setAttribute("style", `height:25px; font-size: 16px;`);
                displayResult.setAttribute("style", `height: 75px; font-size:65px`);
            } else if (char == "D") {
                if (operator = "") {
                    x = x.substr(0, display.length - 1);
                } else {
                    operator = operator.substr(0, display.length - 1);
                }
            } else {
                operator = char;
                operatorCount += 1;
                displayOperatorCount += 1;
                operatorHolder = char;
            }

        } else if (operatorCount == 1) {
            if (char == "=") {
                if (y == "") {
                    displayResult.textContent = x;
                    displayOperation.setAttribute("style", `height:25px; font-size: 16px;`);
                    displayResult.setAttribute("style", `height: 75px; font-size:65px`);
                } else {
                    result = operation(x, operator, y);
                    displayResult.textContent = result;
                    displayOperation.setAttribute("style", `height:25px; font-size: 16px;`);
                    displayResult.setAttribute("style", `height: 75px; font-size:65px`);
                }

                x = "";
                y = "";
                operator = "";
                operatorCount = 0;
                displayOperatorCount = 0;
                result = 0;
            } else {
                if (char == "D") {
                    if (y == "") {
                        operator = "";
                        operatorCount--;
                        displayOperatorCount--;
                    } else {
                        y = y.substr(0, display.length - 1);
                    }
                } else {
                    if (operatorHolder != "") {
                        return;
                    }
                    x = result;
                    y = "";
                    operatorCount = 1;
                    displayOperatorCount = 1;
                    operator = char;
                }
            }
        }
    }
}

