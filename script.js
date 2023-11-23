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
    if(idCardEscolhida != null){
        const carta = player2.deck.findIndex((cardObj) => {
            return cardObj.id == idCardEscolhida; //ENVIAR A CARTA ESCOLHIDA PARA A RENDERIZAÇÃO DA LUTA
        });
        stage.doAttack(player1, player2, player1.deck[carta], player2.deck[0]);
        mostrarCenarioDaLuta();
        redenrizarLuta(carta);
        idCardEscolhida = null;
    }
    
    resetBorderDeck();
}

function mostrarCenarioDaLuta(){
    cenarioLuta.style.width = '1000px';
    cenarioLuta.style.height = '750px';
    cenarioLuta.style.padding = '1rem';
}

function redenrizarLuta(carta){
    console.log(carta);
    // cenarioLuta.querySelector('.p1 .card-luta img').src = `${carta.img_url}`;
    setTimeout(() => {
        cenarioLuta.querySelector(".images img").style.display = 'none';
    }, 2000);
}