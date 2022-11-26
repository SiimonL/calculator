
const display = document.querySelector('#display');

const currOperation = {
    x: '0',
    y: '',
    operator: ''
}

function updateDisplay(value) {
    display.textContent = value;
}

function operate(operation) {
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
            return x / y;
        default:
            break;
    }
}

// Digit buttons
document.querySelectorAll('#number').forEach(btn => {
    btn.addEventListener('click', e => {
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
        }

        updateDisplay(currOperation[digit]);
    });  
});

// binary operation buttons
document.querySelectorAll('#binary').forEach(btn => {
    btn.addEventListener('click', e => {
        if (currOperation.operator === '' || currOperation.y === '') {
            document.querySelectorAll('#binary').forEach(button => button.classList.remove('selected'));
            btn.classList.add('selected');

            currOperation.operator = e.target.value;
            updateDisplay('');
        }
    });
});

// equals button
document.querySelector('#equals').addEventListener('click', e => {
    if (currOperation.y !== '') {
        const result = operate(currOperation);
        updateDisplay(result);
        currOperation.x = result;
        currOperation.operator = '';
        currOperation.y = '';
    }
});

// clear button
document.querySelector('#clear').addEventListener('click', e => {
    updateDisplay('0');
    currOperation.x = '';
    currOperation.operator = '';
    currOperation.y = '';
});

// back button
document.querySelector('#back').addEventListener('click', e => {
    if (currOperation.operator === '') {
        currOperation.x = currOperation.x.slice(0, -1);
    } else if (currOperation.operator === '') {
        currOperation.x = currOperation.x.slice(0, -1);
    }
});