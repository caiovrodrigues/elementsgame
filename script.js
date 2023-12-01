const tela = document.querySelector('.tela');
const primeiraParte = document.querySelector('.primeira-tela');
const gameArea = document.querySelector('.game-area');
const attackBtn = document.querySelector('#attackBtn');
const cenarioLuta = document.querySelector('.cenario-luta');
const jogarBtn = document.querySelector('.jogarBtn');
const telaDeCadastro = document.querySelector('.criar-cadastro-tela');

primeiraParte.addEventListener('click', introGame);

function introGame(){
    
    document.querySelector('#intro').play();
    document.querySelector('.primeira-tela img').style.animation = 'logo-animation 12s ease-in-out';
    const textIntro = document.querySelector('.primeira-tela .text-banner');
    setTimeout(() => {
        textIntro.style.display = 'flex';
    }, 3120);
    setTimeout(() => {
        primeiraParte.style.display = 'none';
        gameArea.style.display = 'flex';
        tela.style.backgroundImage = 'radial-gradient(#e66465, #9198e5)';
        tela.style.height = '900px';
        gameArea.style.display = 'none';
        telaDeCadastro.style.display = 'flex';
    }, 12000);
}

attackBtn.addEventListener('click', atacar);
jogarBtn.addEventListener('click', () => {
    const nome = document.querySelector('.nomeInput').value;
    const blobUrl = document.querySelector('.file').files[0];
    console.log(URL.createObjectURL(blobUrl));
    if(nome == ''){
        alert('Você precisa de um nome!');
        return;
    }
    comecarPartida(nome, URL.createObjectURL(blobUrl));
});

function atacar(){
    console.log(idCardEscolhida);
    if(idCardEscolhida != null){
        const carta = stage.p2.deck.findIndex((cardObj) => {
            return cardObj.id == idCardEscolhida; //ENVIAR A CARTA ESCOLHIDA PARA A RENDERIZAÇÃO DA LUTA
        });
        console.log(carta);
        mostrarCenarioDaLuta();
        redenrizarLuta(carta);
        console.log(stage.p2.deck[carta]);
        idCardEscolhida = null;
    }
    
    resetBorderDeck();
}

function redenrizarLuta(carta){
    const cardArea = cenarioLuta.querySelector('.p1');

    cardArea.querySelector('img').src = `${stage.p2.deck[carta].img_url}`;
    cardArea.querySelector('p').innerHTML = `${stage.p2.deck[carta].name}`;
    cardArea.querySelector('.status-luta .attack').innerHTML = `${stage.p2.deck[carta].attack}`;
    cardArea.querySelector('.status-luta .defense').innerHTML = `${stage.p2.deck[carta].defense}`;
    cardArea.querySelector('.status-luta .agilidade').innerHTML = `${stage.p2.deck[carta].agilidade}`;
    cardArea.querySelector('.status-luta .sorte').innerHTML = `${stage.p2.deck[carta].sorte}`;

    const cardArea2 = cenarioLuta.querySelector('.p2');
    let cartaInimigo = Math.ceil(Math.random() * 3);
    console.log("CARTA ESCOLHIDA DO INIMIGO INDEX - ", cartaInimigo);

    cardArea2.querySelector('img').src = `${stage.p1.deck[cartaInimigo].img_url}`;
    cardArea2.querySelector('p').innerHTML = `${stage.p1.deck[cartaInimigo].name}`;
    cardArea2.querySelector('.status-luta .attack').innerHTML = `${stage.p1.deck[cartaInimigo].attack}`;
    cardArea2.querySelector('.status-luta .defense').innerHTML = `${stage.p1.deck[cartaInimigo].defense}`;
    cardArea2.querySelector('.status-luta .agilidade').innerHTML = `${stage.p1.deck[cartaInimigo].agilidade}`;
    cardArea2.querySelector('.status-luta .sorte').innerHTML = `${stage.p1.deck[cartaInimigo].sorte}`;
    let mensagem = {}
    setTimeout(() => {
        cenarioLuta.querySelector(".images img").style.display = 'none';
    }, 4000);
    setTimeout(() => {
        cenarioLuta.querySelector(".calcula-text").style.display = 'flex';
        mensagem = stage.doAttack(stage.p2, stage.p1, stage.p2.deck[carta], stage.p1.deck[0]);
        console.log(mensagem);
        cenarioLuta.querySelector(".vencedor-area h1").innerHTML = mensagem.mensagem;
        cenarioLuta.querySelector(".vencedor-area .attackProb").innerHTML = mensagem.attackProb;
        cenarioLuta.querySelector(".vencedor-area .defenseProb").innerHTML = mensagem.defenseProb;
        cenarioLuta.querySelector(".vencedor-area .nomeAttack").innerHTML = stage.p2.name;
        cenarioLuta.querySelector(".vencedor-area .nomeDefesa").innerHTML = stage.p1.name;
    }, 4500);
    setTimeout(() => {
        cenarioLuta.querySelector(".calcula-text").style.display = 'none';
        cenarioLuta.querySelector(".vencedor-area").style.display = 'flex';
    }, 6000);
    setTimeout(() => {
        fecharCenarioDaLuta();
        console.log(stage.p2, stage.p1, carta, stage.p1.deck[Math.ceil((Math.random() * 3))]);

        let cartaAleatoriaAtaque = stage.p1.deck[Math.ceil((Math.random() * 3))];
        let cartaAleatoriaDefesa = stage.p2.deck[Math.ceil((Math.random() * 3))];
        cartaAleatoriaAtaque = cartaAleatoriaAtaque.attack * (Math.random() * 2);
        cartaAleatoriaDefesa = cartaAleatoriaDefesa.defense * (Math.random() * 2);
        stage.doAttackInimigo(stage.p1, stage.p2, cartaAleatoriaAtaque, cartaAleatoriaDefesa);
    }, 10000);
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