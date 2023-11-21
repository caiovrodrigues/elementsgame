class Stage{

    constructor(p1, p2, p1El, p2El){
        this.p1 = p1;
        this.p2 = p2;
        this.p1El = p1El;
        this.p2El = p2El;
    }

    start(){
        this.updateLife();

        const cards = this.p2El.querySelector('.cards');
        for(let i = 0; i < 4; i++){
            const randomNumber = Math.round(Math.random() * 3);
            console.log(randomNumber);
            this.p2.deck.push(retornaCards[randomNumber].card());
        }

        this.p2.deck.forEach(card => {
            const el = document.createElement('div');
            el.setAttribute('class', 'card');
            el.setAttribute('data-key', card.id);
            el.innerHTML = `<img src="${card.img_url}"/>`;
            el.addEventListener('click', chooseCard);
            cards.appendChild(el);
        });
    }

    doAttack(p1, p2, cardP1, cardP2){
        const attackProb = cardP1.attack * (Math.random() * 2);
        const defenseProb = cardP2.defense * (Math.random() * 2);
        if(attackProb > defenseProb){
            p1.setLife(attackProb);
            this.updateLife();
            console.log("Você tirou " + attackProb.toFixed(2) + " de dano do inimigo!");
        }else{
            console.log("Seu ataque foi bloqueado pelo inimigo!");
        }
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
    const carta = player2.deck.find(carta => carta.id == idCardEscolhida);
    const statusCarta = document.querySelector('.status');

    document.querySelector('.campo .card-player1').innerHTML = `<img src='${carta.img_url}'/>`;

    statusCarta.style.display = 'flex';
    statusCarta.querySelector('h2').innerHTML = `${carta.name}`;
    statusCarta.querySelector('.attack t').innerHTML = `${carta.attack}`;
    statusCarta.querySelector('.defense t').innerHTML = `${carta.defense}`;
    statusCarta.querySelector('.life t').innerHTML = `${player2.life}`;
}

function resetBorderDeck(){
    document.querySelectorAll('.player2 .cards .card').forEach(cardEl => {
        cardEl.style.borderColor = '#f34079';
    });
}

let stage = new Stage(player1, player2, document.querySelector('.player1'), document.querySelector('.player2'));

stage.start();
