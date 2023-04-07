const imagens = [
    './img/bobrossparrot.gif',
    './img/explodyparrot.gif',
    './img/fiestaparrot.gif',
    './img/metalparrot.gif',
    './img/revertitparrot.gif',
    './img/tripletsparrot.gif',
    './img/unicornparrot.gif',
];

gerarJogo();

function virarCard(carta){
    //Buscar a frente 
    const carta1 = carta.querySelector('.carta1');
    //rodar ela 
    carta1.classList.toggle("front");
    //Buscar o verso e rodar
    const carta2 = carta.querySelector('.carta2');
    carta2.classList.toggle("back");
}

function gerarJogo(){
    let numCards = Number(prompt('Com quantas cartas você quer jogar? (pares entre 4 e 14)'));
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

    console.log(numCards);
    const game = document.querySelector('.game');
    console.log(game);

    switch(numCards){
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
    
    console.log(game);
    let j = 0;

    const cartas = [];

    for(let i=0; i < numCards; i += 2){
        
        cartas.push(`
        <div onclick="virarCard(this)" class="card flex">
            <div class="carta1 face">
                <img src="./img/back.png">
            </div>
            <div class="carta2 back-face face">
                <img src='${imagens[j]}'></img>
            </div>
        </div>
        `)
        cartas.push(`
        <div onclick="virarCard(this)" class="card flex">
            <div class="carta1 face">
                <img src="./img/back.png">
            </div>
            <div class="carta2 back-face face">
                <img src='${imagens[j]}'></img>
            </div>
        </div>
        `)
        j++;
    }
    console.log(cartas);
    cartas.sort(comparador);
    console.log(cartas);

    for(let j=0;j<cartas.length;j++){
        game.innerHTML += cartas[j];
    }

}

function comparador(){
    return Math.random() - 0.5;
}