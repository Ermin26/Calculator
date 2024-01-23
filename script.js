const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.numbers');
const display = document.querySelector('.display')
const previousKeyType = calculator.dataset.previouskeytype;

const calculate = (n1, operator, n2) => {
    let result = ''
    let a = parseFloat(n1);
    let b = parseFloat(n2);
    if (operator === 'add') {
      result = a + b
    } else if (operator === 'subtraction') {
      result = a - b
    } else if (operator === 'multiply') {
      result = a * b
    } else if (operator === 'divide') {
      result = a / b
    }else if (operator === 'percent') {
        result = a / 100
      }
    
    return result
  }
keys.addEventListener('click', e => {
    if(e.target.matches('button')){
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const actions = ['add', 'subtraction', 'multiply', 'divide']
    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'));
    if(!action){
        if(display.textContent === '0' || calculator.dataset.previouskeytype === 'operator'){
            display.textContent = keyContent;
        }else{
            display.textContent = displayedNum + keyContent;
        }
    }
    if (actions.includes(action)) {
        key.classList.add('is-depressed');
        if(calculator.dataset.firstValue){
          let firstValue = calculator.dataset.firstValue;
          const operator = calculator.dataset.operator;
          const secondValue = displayedNum;
          calculator.dataset.previouskeytype = 'operator';

          display.textContent = calculate(firstValue, operator, secondValue);
          let resultAfter = calculate(firstValue, operator, secondValue);
          console.log(action)
          calculator.dataset.firstValue = resultAfter;
          calculator.dataset.operator = action;
        }else{
          calculator.dataset.previouskeytype = 'operator';
          calculator.dataset.firstValue = displayedNum;
          calculator.dataset.operator = action;
        }
        
      }else if(action === 'percent'){
        display.textContent = parseFloat(displayedNum / 100);
        calculator.dataset.previouskeytype = 'operator';
      }

    if (action === 'decimal') {
      if(displayedNum.includes('.')){

        }else{
            display.textContent = displayedNum + '.'
        }
    }

    if(action === 'undo'){
        display.textContent = display.textContent.slice(0, -1)
    }

    if (action === 'clear') {
        display.textContent = '0';
        calculator.removeAttribute('data-previouskeytype')
        calculator.removeAttribute('data-first-value')
        calculator.removeAttribute('data-operator')
    }

    if (action === 'equal') {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;
        calculator.dataset.previouskeytype = 'operator';
        display.textContent = calculate(firstValue, operator, secondValue);
        calculator.removeAttribute('data-operator')
        calculator.removeAttribute('data-first-value')

      }
    }
})