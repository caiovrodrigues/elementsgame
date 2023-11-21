const tela = document.querySelector('.tela');
const primeiraParte = document.querySelector('.primeira-tela');
const gameArea = document.querySelector('.game-area');
const attackBtn = document.querySelector('#attackBtn');

// gameArea.style.display = 'none';
attackBtn.addEventListener('click', atacar);
primeiraParte.addEventListener('click', introGame);

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
            return cardObj.id == idCardEscolhida;
        });
        stage.doAttack(player1, player2, player1.deck[carta], player2.deck[0]);
        idCardEscolhida = null;
    }

    resetBorderDeck();
}

