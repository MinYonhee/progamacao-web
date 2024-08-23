let sum = 0;

function addNumber() {
    const numberInput = document.getElementById('numberInput');
    const sumResult = document.getElementById('sumResult');
    
    const number = parseFloat(numberInput.value);
    
    if (!isNaN(number)) {
        sum += number;
        sumResult.value = sum;
    }
    
    numberInput.value = '';  
    numberInput.focus();    
}