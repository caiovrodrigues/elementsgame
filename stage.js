class Stage{

    constructor(p1, p2, p1El, p2El){
        this.p1 = p1;
        this.p2 = p2;
        this.p1El = p1El;
        this.p2El = p2El;
    }

    start(){
        gameArea.style.display = 'flex';
        document.querySelector('.foto-player1 img').src = `${this.p2.foto}`;
        document.querySelector('.foto-player2 img').src = `${this.p1.foto}`;
        this.updateLife();

        const cards = this.p2El.querySelector('.cards');
        for(let i = 0; i < 4; i++){
            const randomNumber = Math.round(Math.random() * 3);
            console.log(randomNumber);
            this.p2.deck.push(retornaCards[randomNumber].card());
        }

        this.p2.deck.forEach(card => {
            const el = document.createElement('div');
            el.setAttribute('class', 'card myCards');
            el.setAttribute('data-key', card.id);
            el.innerHTML = `<img class="background" src="assets/images/frente-carta.png"/> <img class="img-carta" src="${card.img_url}"/>`;
            el.addEventListener('click', chooseCard);
            cards.appendChild(el);
        });

        document.querySelector('.criar-cadastro-tela').style.display = 'none';
    }

    doAttack(attacking, attacked, cardAttacking, cardAttacked){
        const attackProb = cardAttacking.attack * (Math.random() * 2);
        const defenseProb = cardAttacked.defense * (Math.random() * 2);
        console.log("Ataque prob: ", attackProb);
        console.log("Defense prob: ", defenseProb);
        if(attackProb > defenseProb){
            attacked.setLife(attackProb);
            setTimeout(() => {
                this.updateLife();
            }, 5800);
            if(attacked.life <= 0){
                acabouPartida();
            }
            return {
                attackProb: attackProb.toFixed(2),
                defenseProb: defenseProb.toFixed(2),
                mensagem: "Você tirou " + attackProb.toFixed(2) + " de dano do inimigo!"
                };
        }
        return {
            attackProb: attackProb.toFixed(2),
            defenseProb: defenseProb.toFixed(2),
            mensagem: "Seu ataque foi bloqueado pelo inimigo!"
            };
        }

    doAttackInimigo(attacking, attacked, attackProb, defenseProb){
        console.log("INIMIGO: Ataque prob: ", attackProb);
        console.log("VOCÊ: Defense prob: ", defenseProb);
        setTimeout(() => {
        if(attackProb > defenseProb){
            attacked.setLife(attackProb);
            alert(`Ataque Inimigo Prob: ${attackProb.toFixed(2)}\nDefesa Aliada Prob: ${defenseProb.toFixed(2)}\nVocê sofreu ${attackProb.toFixed(2)} de dano do inimigo!`);
            this.updateLife();
            if(attacked.life <= 0){
                acabouPartida(attacking, attacked);
            }
        }else{
            alert(`Ataque Inimigo Prob: ${attackProb.toFixed(2)}\nDefesa Aliada Prob: ${defenseProb.toFixed(2)}\nVocê se defendeu do ataque inimigo`);
            this.updateLife();
        }}, 3000);
    }

    updateLife(){
        let p1LifePct = this.p1.life <= 0 ? 0 : this.p1.life / this.p1.maxLife * 100;
        let p2LifePct = this.p2.life <= 0 ? 0 : this.p2.life / this.p2.maxLife * 100;
        this.p1El.querySelector('.bar').style.width = p1LifePct + '%';
        this.p2El.querySelector('.bar').style.width = p2LifePct + '%';

        this.p1El.querySelector('.bar p').innerHTML = `${this.p1.name} - ${this.p1.life <= 0 ? 0 : this.p1.life.toFixed(1)} HP`;
        this.p2El.querySelector('.bar p').innerHTML = `${this.p2.name} - ${this.p2.life <= 0 ? 0 : this.p2.life.toFixed(1)} HP`;

        if(p1LifePct < 70){
            this.p1El.querySelector('.bar').style.background = "orange";
        }
        if(p1LifePct < 35){
            this.p1El.querySelector('.bar').style.background = "red";
        }
        if(p2LifePct < 70){
            this.p2El.querySelector('.bar').style.background = "orange";
        }
        if(p2LifePct < 35){
            this.p2El.querySelector('.bar').style.background = "red";
        }
    }
}

let idCardEscolhida = null;

function chooseCard(e){
    resetBorderDeck();
    idCardEscolhida = e.currentTarget.getAttribute('data-key');
    e.currentTarget.style.borderColor = 'white';
    const carta = stage.p2.deck.find(carta => carta.id == idCardEscolhida);
    const statusCarta = document.querySelector('.status');

    document.querySelector('.campo .card-player1').innerHTML = `<img src='${carta.img_url}'/>`;

    statusCarta.style.display = 'flex';
    statusCarta.querySelector('h2').innerHTML = `${carta.name}`;
    statusCarta.querySelector('.attack').innerHTML = `${carta.attack}`;
    statusCarta.querySelector('.defesa').innerHTML = `${carta.defense}`;
    statusCarta.querySelector('.agilidade').innerHTML = `${carta.agilidade}`;
    statusCarta.querySelector('.sorte').innerHTML = `${carta.sorte}`;
}

function resetBorderDeck(){
    document.querySelectorAll('.player2 .cards .card').forEach(cardEl => {
        cardEl.style.borderColor = '#f34079';
    });
    document.querySelector('.campo .card-player1').innerHTML = ``;
    document.querySelector('.status').style.display = `none`;
}

function comecarPartida(nome, fotoUrl){
    stage = criarStage(nome, fotoUrl);
    stage.p1.deck.push(new Chamas());
    stage.p1.deck.push(new Ar());
    stage.p1.deck.push(new Terra());
    stage.p1.deck.push(new Terra());
    stage.start();
}

function criarStage(nome, fotoUrl){
    return new Stage(new Player('Monstro', 120, 'assets/images/foto-inimigo.jpg'), new Player(nome, 100, fotoUrl), document.querySelector('.player1'), document.querySelector('.player2'));
}

let stage = null;

function acabouPartida(vencedor, perdedor){
    alert(`PARABÉNS ${vencedor.name} venceu a partida!\nRecebeu 20 moedas, vá melhorar suas cartas`);
}