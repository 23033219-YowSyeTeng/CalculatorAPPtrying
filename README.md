# CalculatorAPPtrying
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4f4f9;
            font-family: Arial, sans-serif;
            margin: 0;
        }

        .calculator {
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            width: 300px;
            padding: 20px;
        }

        .display {
            background: #e6e6e6;
            border-radius: 5px;
            font-size: 2em;
            padding: 15px;
            text-align: right;
            margin-bottom: 20px;
            overflow: hidden;
            white-space: nowrap;
        }

        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }

        .button {
            background: #007bff;
            color: white;
            font-size: 1.2em;
            border: none;
            border-radius: 5px;
            padding: 15px;
            cursor: pointer;
            transition: background 0.3s ease;
        }

        .button:hover {
            background: #0056b3;
        }

        .button.operation {
            background: #28a745;
        }

        .button.operation:hover {
            background: #1e7e34;
        }

        .button.equal {
            grid-column: span 2;
            background: #dc3545;
        }

        .button.equal:hover {
            background: #bd2130;
        }

        .button.zero {
            grid-column: span 2;
        }
    </style>
</head>
<body>
    <div class="calculator">
        <div id="display" class="display">0</div>
        <div class="buttons">
            <button class="button" onclick="appendNumber('7')">7</button>
            <button class="button" onclick="appendNumber('8')">8</button>
            <button class="button" onclick="appendNumber('9')">9</button>
            <button class="button operation" onclick="chooseOperation('/')">&divide;</button>

            <button class="button" onclick="appendNumber('4')">4</button>
            <button class="button" onclick="appendNumber('5')">5</button>
            <button class="button" onclick="appendNumber('6')">6</button>
            <button class="button operation" onclick="chooseOperation('*')">&times;</button>

            <button class="button" onclick="appendNumber('1')">1</button>
            <button class="button" onclick="appendNumber('2')">2</button>
            <button class="button" onclick="appendNumber('3')">3</button>
            <button class="button operation" onclick="chooseOperation('-')">&minus;</button>

            <button class="button zero" onclick="appendNumber('0')">0</button>
            <button class="button" onclick="appendDot()">.</button>
            <button class="button operation" onclick="chooseOperation('+')">+</button>
            <button class="button equal" onclick="calculate()">=</button>

            <button class="button" onclick="clearDisplay()">C</button>
            <button class="button" onclick="deleteLast()">DEL</button>
        </div>
    </div>

    <script>
        let currentOperand = '';
        let previousOperand = '';
        let operation = undefined;

        const display = document.getElementById('display');

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

            currentOperand = computation;
            operation = undefined;
            previousOperand = '';
            updateDisplay();
        }

        function updateDisplay() {
            display.innerText = currentOperand || '0';
        }

        clearDisplay();
    </script>
</body>
</html>
