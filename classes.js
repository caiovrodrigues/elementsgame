class Card{
    name = "";
    attack = 1;
    defense = 1;

    constructor(name){
        this.name = name;
    }
}

class Aqua extends Card{
    id = 1;
    attack = 24;
    defense = 8;
    agilidade = 49;
    sorte = 99;
    img_url = 'assets/images/card-aqua.png';

    constructor(){
        super("Aqua");
    }
}

class Chamas extends Card{
    id = 2;
    attack = 23;
    defense = 7;
    agilidade = 90;
    sorte = 68;
    img_url = 'assets/images/card-chamas.png';

    constructor(){
        super("Chamas");
    }
}

class Terra extends Card{
    id = 3;
    attack = 4;
    defense = 15;
    agilidade = 87;
    sorte = 78;
    img_url = 'assets/images/card-terra.png';

    constructor(){
        super("Terra");
    }
}

class Ar extends Card{
    id = 4;
    attack = 14;
    defense = 10;
    agilidade = 37;
    sorte = 85;
    img_url = 'assets/images/card-air.png';

    constructor(){
        super("Ar");
    }
}

class Player{
    name = "";
    life = 1;
    maxLife = 1;
    foto = '';

    deck = [];

    constructor(name, life, fotoUrl){
        this.name = name;
        this.life = life;
        this.maxLife = life;
        this.foto = fotoUrl;
    }

    setLife(newLife){
        this.life = this.life <= 0 ? 0 : this.life - newLife;
    }

    setFoto(foto){
        this.foto = foto;
    }
}

const retornaCards = [
    {
        card: (() => {
            return new Aqua();
        })
    },
    {
        card: (() => {
            return new Chamas();
        })
    },
    {
        card: (() => {
            return new Terra();
        })
    },
    {
        card: (() => {
            return new Ar();
        })
    }
]