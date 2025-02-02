describe('Calculator Tests', () => {
    let currentOperand = '';
    let previousOperand = '';
    let operation = undefined;

    // Create a real DOM element for display
    let display;

    beforeEach(() => {
        // Set up a real DOM element for display
        document.body.innerHTML = '<div id="display">0</div>';
        display = document.getElementById('display');
        clearDisplay();
    });

    function clearDisplay() {
        currentOperand = '';
        previousOperand = '';
        operation = undefined;
        updateDisplay();
    }

    function deleteLast() {
        currentOperand = currentOperand.toString().slice(0, -1);
        updateDisplay();
    }

    function appendNumber(number) {
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand = currentOperand.toString() + number.toString();
        updateDisplay();
    }

    function appendDot() {
        appendNumber('.');
    }

    function chooseOperation(op) {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            calculate();
        }
        operation = op;
        previousOperand = currentOperand;
        currentOperand = '';
    }

    function calculate() {
        let computation;
        const prev = parseFloat(previousOperand);
        const curr = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(curr)) return;

        switch (operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            default:
                return;
        }

        currentOperand = computation.toString(); // Convert result to string for consistency
        operation = undefined;
        previousOperand = '';
        updateDisplay();
    }

    function updateDisplay() {
        display.innerText = currentOperand || '0';
    }

    // Tests
    test('Test addition operation', () => {
        appendNumber(3);
        chooseOperation('+');
        appendNumber(2);
        calculate();
        expect(display.innerText).toBe('5');
    });

    test('Test subtraction operation', () => {
        appendNumber(5);
        chooseOperation('-');
        appendNumber(3);
        calculate();
        expect(display.innerText).toBe('2');
    });

    test('Test multiplication operation', () => {
        appendNumber(2);
        chooseOperation('*');
        appendNumber(4);
        calculate();
        expect(display.innerText).toBe('8');
    });

    test('Test division operation', () => {
        appendNumber(6);
        chooseOperation('/');
        appendNumber(3);
        calculate();
        expect(display.innerText).toBe('2');
    });

    test('Test decimal point usage', () => {
        appendNumber(1);
        appendDot();
        appendNumber(5);
        expect(display.innerText).toBe('1.5');
    });

    test('Test delete last number', () => {
        appendNumber(5);
        deleteLast();
        expect(display.innerText).toBe('0');
    });
});
