// Calculator Class

class Calculator { 
    constructor(prevOutput, mainOutput) {
        this.prevOutput = prevOutput;
        this.mainOutput = mainOutput;
        this.clearScr();
    }

    clearScr() {
        this.mainOutputScreen = '0';
        this.prevOutputScreen = '';
        this.operation = '';
    }

    deleteLastElement() {
        this.mainOutputScreen = this.mainOutputScreen.toString().slice(0, -1);
    }

    addNum(number) {
        if (number === '.' && this.mainOutputScreen.includes('.')) return;
        this.mainOutputScreen = this.mainOutputScreen.toString() + number.toString();
    }

    operationList(operation) {
        if (this.mainOutputScreen === '') {
            return
        }
        if (this.prevOutputScreen !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.prevOutputScreen = this.mainOutputScreen
        this.mainOutputScreen = ''
    }

    calculate() {
        let calculation;
        const prev = parseFloat(this.prevOutputScreen);
        const main = parseFloat(this.mainOutputScreen);
        if (isNaN(prev) || isNaN(main)) {
            return 
        }
        switch(this.operation) {
            case '+':
                calculation = prev + main;
                break;
            case '-':
                calculation = prev - main;
                break;
            case '*': 
                calculation = prev * main;
                break;
            case '÷':
                calculation = prev / main;
                break
            case '^':
                calculation = prev ** main;
                break;
            case '√':
                calculation = Math.sqrt(prev);
                break;
            default:
                return
        }
        this.mainOutputScreen = calculation;
        this.operation = undefined;
        this.prevOutputScreen = '';
        
    }

    getDisplayNumber(number) {
        const strNumber = number.toString()
        const intDigit = parseFloat(strNumber.split('.')[0])
        const decDigit = strNumber.split('.')[1]
        let intDisplay
        if (isNaN(intDigit)) {
          intDisplay = ''
        } else {
          intDisplay = intDigit.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decDigit != null) {
          return `${intDisplay}.${decDigit}`
        } else {
          return intDisplay
        }
      }

    
    displayScr() {
        this.mainOutput.innerText =
          this.getDisplayNumber(this.mainOutputScreen)
        if (this.operation != null) {
          this.prevOutput.innerText =
            `${this.getDisplayNumber(this.prevOutputScreen)} ${this.operation}`
        } else {
          this.prevOutput.innerText = ''
        }
      }
}


// Variables

const numberBtn = document.querySelectorAll(".number");
const operBtn = document.querySelectorAll(".oper");
const equalBtn = document.querySelector(".equal");
const deleteBtn = document.querySelector(".delete");
const allClearBtn = document.querySelector(".all-clear");
const prevOutput = document.querySelector(".prev");
const mainOutput  = document.querySelector(".main");

const calculator = new Calculator(prevOutput, mainOutput);

// EXP

numberBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        calculator.addNum(btn.innerText);
        calculator.displayScr()
    })
})

operBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        calculator.operationList(btn.innerText);
        calculator.displayScr()
    })
})

equalBtn.addEventListener("click", (button) => {
    calculator.calculate();
    calculator.displayScr();
})

allClearBtn.addEventListener("click", (button) => {
    calculator.clearScr();
    calculator.displayScr();
})

deleteBtn.addEventListener("click", () => {
    calculator.deleteLastElement();
    calculator.displayScr();
})



