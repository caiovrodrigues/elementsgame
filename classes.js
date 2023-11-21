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
    attack = 15;
    defense = 9;
    img_url = 'assets/images/card-aqua.png';

    constructor(){
        super("Aqua");
    }
}

class Chamas extends Card{
    id = 2;
    attack = 7;
    defense = 7;
    img_url = 'assets/images/card-chamas.png';

    constructor(){
        super("Chamas");
    }
}

class Terra extends Card{
    id = 3;
    attack = 3;
    defense = 20;
    img_url = 'assets/images/card-terra.png';

    constructor(){
        super("Terra");
    }
}

class Ar extends Card{
    id = 4;
    attack = 17;
    defense = 1;
    img_url = 'assets/images/card-air.png';

    constructor(){
        super("Ar");
    }
}

class Player{
    name = "";
    life = 1;
    maxLife = 1;

    deck = [];

    constructor(name, life){
        this.name = name;
        this.life = life;
        this.maxLife = life;
    }

    setLife(newLife){
        this.life = this.life <= 0 ? 0 : this.life - newLife;
    }
}