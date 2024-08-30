let sum = 0;
let count = 0;

function addNumber() {
    const numberInput = document.getElementById('numberInput');
    const sumResult = document.getElementById('sumResult');
    const media = document.getElementById('media');
    const qtdNum = document.getElementById('qtdNum');
    
    const number = parseFloat(numberInput.value);
    
    if (!isNaN(number)) {
        sum += number;
        count++;
        
        sumResult.value = sum;
        media.value = (sum / count).toFixed(2); // Calcula a média com 2 casas decimais
        qtdNum.value = count;
    }
    
    numberInput.value = '';  
    numberInput.focus();    
}
