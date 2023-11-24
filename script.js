const tela = document.querySelector('.tela');
const primeiraParte = document.querySelector('.primeira-tela');
const gameArea = document.querySelector('.game-area');
const attackBtn = document.querySelector('#attackBtn');
const cenarioLuta = document.querySelector('.cenario-luta');

// gameArea.style.display = 'none';
attackBtn.addEventListener('click', atacar);
// primeiraParte.addEventListener('click', introGame);

// function introGame(){
    
//     document.querySelector('#intro').play();
//     document.querySelector('.primeira-tela img').style.animation = 'logo-animation 12s ease-in-out';
//     const textIntro = document.querySelector('.primeira-tela .text-banner');
//     setTimeout(() => {
//         textIntro.style.display = 'flex';
//     }, 3120);
//     setTimeout(() => {
//         primeiraParte.style.display = 'none';
//         gameArea.style.display = 'flex';
//         tela.style.backgroundImage = 'radial-gradient(#e66465, #9198e5)';
//         tela.style.height = '900px';
//     }, 12000);
// }

function atacar(){
    console.log(idCardEscolhida);
    console.log(player2);
    if(idCardEscolhida != null){
        const carta = player2.deck.findIndex((cardObj) => {
            return cardObj.id == idCardEscolhida; //ENVIAR A CARTA ESCOLHIDA PARA A RENDERIZAÇÃO DA LUTA
        });
        mostrarCenarioDaLuta();
        redenrizarLuta(carta);
        console.log(player2.deck[carta]);
        idCardEscolhida = null;
    }
    
    resetBorderDeck();
}

function mostrarCenarioDaLuta(){
    cenarioLuta.style.display = 'block';
    cenarioLuta.style.width = '1000px';
    cenarioLuta.style.height = 'auto';
    cenarioLuta.style.padding = '1rem';
    cenarioLuta.querySelector('.images img').style.display = 'block';
}

function fecharCenarioDaLuta(){
    cenarioLuta.style.width = '0';
    cenarioLuta.style.height = '0';
    cenarioLuta.style.padding = '1rem';
    cenarioLuta.querySelector('.vencedor-area').style.display = 'none';
    setTimeout(() => {
        cenarioLuta.style.display = 'none';
    }, 800);
}

function redenrizarLuta(carta){
    const cardArea = cenarioLuta.querySelector('.p1');

    cardArea.querySelector('img').src = `${player2.deck[carta].img_url}`;
    cardArea.querySelector('p').innerHTML = `${player2.deck[carta].name}`;
    cardArea.querySelector('.status-luta .attack').innerHTML = `${player2.deck[carta].attack}`;
    cardArea.querySelector('.status-luta .defense').innerHTML = `${player2.deck[carta].defense}`;
    cardArea.querySelector('.status-luta .agilidade').innerHTML = `${player2.deck[carta].agilidade}`;
    cardArea.querySelector('.status-luta .sorte').innerHTML = `${player2.deck[carta].sorte}`;

    setTimeout(() => {
        cenarioLuta.querySelector(".images img").style.display = 'none';
    }, 4000);
    setTimeout(() => {
        cenarioLuta.querySelector(".calcula-text").style.display = 'flex';
    }, 4500);
    setTimeout(() => {
        cenarioLuta.querySelector(".calcula-text").style.display = 'none';
        cenarioLuta.querySelector(".vencedor-area").style.display = 'flex';
    }, 6000);
    setTimeout(() => {
        fecharCenarioDaLuta();
        stage.doAttack(player2, player1, player2.deck[carta], player1.deck[0]);
    }, 10000);
}