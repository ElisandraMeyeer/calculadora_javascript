'use strict'; //O strict mode elimina alguns erros silenciosos que passariam batido do JavaScript e os faz emitir erros.Além disso, essa forma corrige alguns erros que tornam o JavaScript difícil de ser otimizado, então algumas vezes os códigos no modo estrito rodam mais otimizados e velozes do que os códigos no ‘modo normal’.

// colocar os id's nos botões que serão utilizados

//textContent serve para obtermos o valor de no TEXT_NODE . Text_node são aqueles que possuem apenas texto. Por exemplo, usar textContent em um h2 , span ou div retorna o conteúdo textual deles.


const display = document.getElementById('display');//criou uma variável para capturar o display
const numeros = document.querySelectorAll('[id*=tecla]');//aqui diz que: selecione todos os elementos que tenham telha ou parte do nome tecla no seu id
const operadores = document.querySelectorAll('[id*=operador]');


let novoNumero = true;//variável criada para as operações 
let operador;//armazena os operadores matemáticos (+-/...)
let numeroAnterior;//armazena o número anterior antes de clicar no operador


const operacaoPendente = () => operador !== undefined;
const calcular = () => {
    if (operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));//troca no display a virgula por ponto para o JS entender e calcular 
        novoNumero = true;//caso contrario ele ficara mostrando o numero anterior no resultado
        //const resultado = eval (${numeroAnterior}${operador}${numeroAtual}');
        // atualizarDisplay(resultado);
        if (operador == '+'){
            atualizarDisplay(numeroAnterior + numeroAtual);
        }else if (operador =='-'){
            atualizarDisplay(numeroAnterior - numeroAtual);
        }else if (operador =='*'){
            atualizarDisplay(numeroAnterior * numeroAtual);
        }else if (operador =='/'){
            atualizarDisplay(numeroAnterior / numeroAtual);
        }
    }
}



//aqui faz com que os número sejam concatenados
//e vai substituindo toda vez que clicar no operador 
const atualizarDisplay = (texto) => {
    if (novoNumero){
        display.textContent = texto.toLocaleString('BR');//troca no display o ponto(padrão JS) por virgula 
        novoNumero = false;//vai concatenar (caso contrário iria sempre substituir)
    }else{
        display.textContent += texto.toLocaleString('BR');//troca no display o ponto(padrão JS) por virgula 
    }
}



//aqui manda para o atualizarDisplay o evento de clicar no numero
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);



//forEach método que varre todos os elementos do nodelist(numeros):
//depois foi criado o evento para que quando clicar em um numero chame a função inserirNumero
numeros.forEach (numero => numero.addEventListener('click', inserirNumero));


const selecionarOperador = (evento) => {
    if (!novoNumero){//faz com que evite de salvar na memoria só o operador por exemplo
        calcular();
        novoNumero = true;//quando clicar em um operador, ele precisa tirar o número digitador anteriormente e colocar no display o número que foi clicado após o operador
        operador = evento.target.textContent;//salva na variável operador o sinal que foi clicado (*-/...)
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));//todar vez que clicar no (*/-...) ele precisa guardar na variável o operador e o número
    }
}


operadores.forEach (operador => operador.addEventListener('click', selecionarOperador));


//para evitar que quando clicar no igual várias vezes ele continue refazendo a operação
const ativarIgual = () => {
    calcular();
    operador = undefined;
}
//operador igual:
document.getElementById('igual').addEventListener('click', ativarIgual);

//limpar display quando clicar no CE:
const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

//limpar calculo (C):
const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
} 
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

//backspace (<<)
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);//slice significa fatiar (neste caso fatiar a String)
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);


//positivo/negativo
const inverterSinal = () => {
    novoNumero = true
    atualizarDisplay (display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal);


//virgula
const existeDecimal = () => display.textContent.indexOf(',') !== -1;//indexOf procura a String que tem no parênteses
const existeValor = () => display.textContent.length > 0;//aqui está validando se o conteúdo no display é maior que zero (porque se o display estiver vazio e clicar direto na vírgula, deve aparecer '0,' no display)
const inserirDecimal = () => {
    if (!existeDecimal()){
        if (existeValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    }
}

document.getElementById('decimal').addEventListener('click',inserirDecimal);


//para vincular o teclado com os botões:

const mapaTeclado = {
    '0'          : 'tecla0',  
    '1'          : 'tecla1',          
    '2'          : 'tecla2',
    '3'          : 'tecla3',
    '4'          : 'tecla4',
    '5'          : 'tecla5',
    '6'          : 'tecla6',
    '7'          : 'tecla7',
    '8'          : 'tecla8',
    '9'          : 'tecla9',
    'c'          : 'limparCalculo',
    'Backspace'  : 'backspace',
    '/'          : 'operadorDividir',
    '*'          : 'operadorMultiplicar',
    '-'          : 'operadoSubtrair',
    '+'          : 'operadorAdicionar',
    'Escape'     : 'limparCalculo',
    ','          : 'decimal',
    'Enter'      : 'igual'       
        
}



const mapearTeclado = (evento) => {
    const tecla = evento.key;

    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown', mapearTeclado);