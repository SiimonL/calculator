
const display = document.querySelector('#display');


const currOperation = {
    x: '0',
    y: '',
    operator: ''
}


function truncateNumber(number) {
    let newNum = (number.startsWith('-')) ? number.slice(0, 11) : number.slice(0, 10);
    
    if (newNum !== number) {
        if (newNum.at(-1) === '.') {
            newNum = newNum.slice(0, -1);
        } else if (!newNum.includes('.')) {
            newNum = 'overflow';
        }
    }

    return newNum;
}

function updateDisplay(value) {
    display.textContent = value;
}

function operateBinary(operation) {
    const x = parseFloat(operation.x);
    const y = parseFloat(operation.y);
    
    switch (operation.operator) {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '*':
            return x * y;
        case '/':
            if (y == 0) {
                return 'E';
            }
            return x / y;
        case 'x^y':
            return Math.pow(x, y);
        case 'mod':
            return x % y;
        default:
            return 'E';
    }
}

function operateUrnary(operator, number) {
    const x = parseFloat(number);
    
    switch (operator) {
        case '+/-':
            return (number.startsWith('-')) ? number.slice(1) : `-${number}`;
        case 'sin':
            return Math.sin(x);
        case 'cos':
            return Math.cos(x);
        case 'tan':
            return Math.tan(x);
        case '2^x':
            return Math.pow(2, x);
        case 'sqrt':
            if (x < 0) {
                return 'E';
            }
            return Math.sqrt(x);
        case 'ln':
            if (x <= 0) {
                return 'E';
            }
            return Math.log(x);
        case 'log':
            if (x <= 0) {
                return 'E';
            }
            return Math.log10(x);
        case '1/x':
            if (x == 0)  {
                return 'E';
            }
            return 1/x;
        case '10^x':
            return Math.pow(10, x);
        default:
            return 'E';
    }
}

// Digit buttons
document.querySelectorAll('#number').forEach(btn => {
    btn.addEventListener('click', e => {
        e.target.classList.add('clicked');
        setTimeout(() => {
            e.target.classList.remove('clicked');
        }, 500);
        
        if (currOperation.x === 'E') {
            currOperation.x = '';
        }

        let digit;
        if (currOperation.operator === '') {
            digit = 'x';
        } else {
            digit = 'y';
        }

        
        if (!(e.target.value === '.' && currOperation[digit].includes('.'))) {
            if (currOperation[digit] == '0' && e.target.value !== '.') {
                currOperation[digit] = '';
            }

            currOperation[digit] += e.target.value;
            currOperation[digit] = truncateNumber(currOperation[digit]);
        }

        document.querySelectorAll('#binary').forEach(btn => {btn.classList.remove('clicked')});
        updateDisplay(currOperation[digit]);

    });  
});

// binary operation buttons
document.querySelectorAll('#binary').forEach(btn => {
    btn.addEventListener('click', e => {
        if (currOperation.operator === '' || currOperation.y === '') {
            document.querySelectorAll('#binary').forEach(button => button.classList.remove('selected'));
            btn.classList.add('clicked');

            currOperation.operator = e.target.value;
        }
    });
});

// urnary operation buttons
document.querySelectorAll('#urnary').forEach(btn => {
    btn.addEventListener('click', e => {
        let number;
        if (currOperation.x !== '' && currOperation.operator === '') {
            number = 'x';
        } else if (currOperation.y !== '') {
            number = 'y';
        } else {
            return new Error('umm idk');
        }
        
        e.target.classList.add('clicked');
        setTimeout(() => {
            e.target.classList.remove('clicked');
        }, 500);
        
        const result = truncateNumber(operateUrnary(e.target.value, currOperation[number]).toString());
        updateDisplay(result);
        currOperation[number] = result;
        
    });
});

// equals button
document.querySelector('#equals').addEventListener('click', e => {
    if (currOperation.y !== '') {
        e.target.classList.add('clicked');
        setTimeout(() => {
            e.target.classList.remove('clicked');
        }, 500);

        let result = truncateNumber(operateBinary(currOperation).toString());
        result = result == result ? result : 'Error';
        updateDisplay(result);
        currOperation.x = result;
        currOperation.operator = '';
        currOperation.y = '';
    }
});

// clear button
document.querySelector('#clear').addEventListener('click', e => {
    e.target.classList.add('clicked');
    setTimeout(() => {
        e.target.classList.remove('clicked');
    }, 500);

    updateDisplay('0');
    currOperation.x = '';
    currOperation.operator = '';
    currOperation.y = '';
    document.querySelectorAll('button').forEach(btn => {btn.classList.remove('clicked')});
});


// Extension toggle tab
document.querySelector('#toggle').addEventListener('click', e => {
    document.querySelector('#extension').classList.toggle('shown');
    document.querySelector('#calculator').classList.toggle('extended');
    
    e.target.textContent = e.target.textContent === '+' ? '-' : '+';
});