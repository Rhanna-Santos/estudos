function addToDisplay(value){
    document.getElementById("display").value+=value;
}
function clearDisplay() {
    document.getElementById("display").value= '';
}
function calculate() {
    const display = document.getElementById("display")
    let displayValue = display.value;

    displayValue = displayValue.replace(/sin\(/g, "Math.sin(");
    displayValue = displayValue.replace(/cos\(/g, "Math.cos(");
    displayValue = displayValue.replace(/tan\(/g, "Math.tan(");
    displayValue = displayValue.replace(/√\(/g, "Math.sqrt(");
    displayValue = displayValue.replace(/log\(/g, "Math.log(");

    displayValue = displayValue.replace(/e\^([\d.]+)/g, "Math.pow(Math.E, $1)");
    displayValue = displayValue.replace(/(\d+)\^(\d+)/g, "Math.pow($1, $2)");
    
    const openParens = (displayValue.match(/\(/g) || []).length;
    const closeParens = (displayValue.match(/\)/g) || []).length;

    if (openParens !== closeParens) {
        display.value = "Erro: Parênteses não balanceados!";
        return;
    }
    
    try {
        const result = eval(displayValue);
        document.getElementById("display").value = result;
    }catch (error) {
        document.getElementById("display").value = 'Error'
    }
}
function toggleScientific() {
    const scientificButtons = document.querySelector('.buttonScientific');
    
    if(scientificButtons.style.display === "none" || scientificButtons.style.display === "") {
        scientificButtons.style.display = "grid";
    } else {
        scientificButtons.style.display = "none";
    }
}
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        if(value === '=') {
            try{
                display.value = eval(display.value);
            }catch (e) {
                display.value = 'Erro'
            }
        } else if (value === 'c') {
            display.value = '';
        }else {
            display.value += value;
        }
    });
});
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if('0123456789'.includes(key) || '+-*/.'.includes(key)) {
        display.value += key;
    }else if (key === '=' || key === 'Enter'){
        try {
            display.value = eval(display.value);
        } catch (e){
            display.value ='Erro';
        }
    }else if (key === 'C' || key === 'c'){
        display.value = '';
    }else if (key === 'Backspace') {
        display.value = '';
    } else if (key === 'Delete'){
        display.value = '';
    }
});
