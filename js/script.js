const imagens = [
    './img/bobrossparrot.gif',
    './img/explodyparrot.gif',
    './img/fiestaparrot.gif',
    './img/metalparrot.gif',
    './img/revertitparrot.gif',
    './img/tripletsparrot.gif',
    './img/unicornparrot.gif',
];

let numCards = 0;

gerarJogo();

let qtdSelecionado = 0;
let primeira = '';
let segunda = '';
let jogadas = 0;
let tempo = 0;
let acertos = 0;


function selecionar(carta){
    if(qtdSelecionado < 2){

        if(qtdSelecionado == 0){
            virarCard(carta);
            qtdSelecionado = 1;
            primeira = carta;
        }
        else if(qtdSelecionado == 1){
            
            if(carta === primeira){
                //selecione outra carta
            }
            else{
                virarCard(carta);
                qtdSelecionado = 2;
                segunda = carta;
            }
        }
    }
    if(qtdSelecionado == 2){

        if(primeira.id == segunda.id){
            acertos++;
            primeira.removeAttribute("onclick");
            segunda.removeAttribute("onclick");
            qtdSelecionado = 0;
        }else if(primeira.id != segunda.id){
            setTimeout(errou, 1000);
            qtdSelecionado = 0;
        }
    }
    jogadas++;
    setTimeout(verificarVitoria, 1000);
}  

function virarCard(carta){
    //Buscar a frente 
    const carta1 = carta.querySelector('.carta1');
    //rodar ela 
    carta1.classList.toggle("front");
    //Buscar o verso e rodar
    const carta2 = carta.querySelector('.carta2');
    carta2.classList.toggle("back");
}

function errou(){
    const carta1 = primeira.querySelector('.carta1');
    carta1.classList.remove("front");
    const carta2 = primeira.querySelector('.carta2');
    carta2.classList.remove("back");
    const carta3 = segunda.querySelector('.carta1');
    carta3.classList.remove("front");
    const carta4 = segunda.querySelector('.carta2');
    carta4.classList.remove("back");
}

function gerarJogo(){
    numCards = Number(prompt('Com quantas cartas você quer jogar? (pares entre 4 e 14)'));
    let valido = 0;
    while(valido != 1){                                  // Estou validando a entrada do usuário
        if(numCards < 4 || numCards > 14){
            numCards = prompt('Por favor digite um número entre 4 e 14');
        }
        else if((numCards % 2) !== 0){
            numCards = prompt('Por favor digite um número par entre 4 e 14');
        }
        else{
            valido = 1;
        }
    }

    const game = document.querySelector('.game'); 

    //ajustando o grid de acordo com o numero de cartas
    switch(Number(numCards)){
        case 4:
            game.classList.add('grid4');
            break;
        case 6:
            game.classList.add('grid6');
            break;
        case 8:
            game.classList.add('grid8');
            break;
        case 10:
            game.classList.add('grid10');
            break;
        case 12:
            game.classList.add('grid12');
            break;
        case 14:
            game.classList.add('grid14');
            break;
    }
    
    let j = 0;

    const cartas = [];

    //gerando as cartas, 2 de cada
    for(let i=0; i < numCards; i += 2){
        
        cartas.push(`
        <div data-test="card" id="carta${i}" onclick="selecionar(this)" class="card flex">
            <div class="carta1 face">
                <img data-test="face-down-image" src="./img/back.png">
            </div>
            <div class="carta2 back-face face">
                <img data-test="face-up-image" class="id" src='${imagens[j]}'></img>
            </div>
        </div>
        `)
        cartas.push(`
        <div data-test="card" id="carta${i}" onclick="selecionar(this)" class="card flex">
            <div class="carta1 face">
                <img data-test="face-down-image" src="./img/back.png">
            </div>
            <div class="carta2 back-face face">
                <img data-test="face-up-image" class="id" src='${imagens[j]}'></img>
            </div>
        </div>
        `)
        j++;
    }
    cartas.sort(comparador); // Embaralhar

    //add as cartas na tela
    for(let j=0;j<cartas.length;j++){
        game.innerHTML += cartas[j];
    }

}

function verificarVitoria(){
    if(acertos == (numCards/2)){
        alert(`Você ganhou em ${jogadas} jogadas!`);
    }
}

function comparador(){
    return Math.random() - 0.5;
}

