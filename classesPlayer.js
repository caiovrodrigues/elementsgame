let player1 = new Player("Caio", 120);
let player2 = new Player("Teste", 100);

player1.deck.push(new Aqua());
player1.deck.push(new Chamas());
player1.deck.push(new Aqua());
player1.deck.push(new Chamas());

console.log(player1);
console.log(player2);

console.log("Player 1: " + player1.life);
console.log("Player 2: " + player2.life);

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