
const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
};

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result; 

    switch(true){
        case random < 0.33:
            result = 'RETA'
            break;
        case random < 0.66:
            result = 'CURVA'
            break;

        default:
            result = 'CONFRONTO'
            break;
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult}
    + ${attribute} = ${diceResult + attribute}`)
}

async function randomlyDrawWeapon() {
    let random = Math.floor(Math.random() * 1) + 1;
    let typeOfWeapon;

    if( random === 1){
        typeOfWeapon = 'casco';
    }else{
        typeOfWeapon = 'bomba'
    }

    return typeOfWeapon;
}

async function randomlyDrawsBonusItem() {
    let random = Math.floor(Math.random() * 1);
    return random;
}

async function playRaceEngine(character1, character2) {
    for( let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`)

        //sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`)

        //rolar dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de skill
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block == 'RETA'){ 
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        }
        if(block == 'CURVA'){ 
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        }
        if(block == 'CONFRONTO'){ 
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🚨`)

            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);
            let weapon = await randomlyDrawWeapon();
            let item = await randomlyDrawsBonusItem();

            if(powerResult1 > powerResult2 && character2.PONTOS > 0){
                if( weapon === 'casco'){
                    if(item === 0){
                        console.log(`${character1.NOME} venceu o confronto e não ganhou bônus desta vez 🤡! 
                        \n${character2.NOME} perdeu um ponto ao ser atingido por um(a) 🐢 ${weapon}`);
                        character2.PONTOS--;
                    }else if(item === 1){
                        console.log(`${character1.NOME} venceu o confronto e ganhou bônus 🌟! 
                        \n${character2.NOME} perdeu um ponto ao ser atingido por um(a) 🐢 ${weapon}`);
                        character1.PONTOS++;
                        character2.PONTOS--;
                    }
                }else if( weapon === 'bomba' && character2.PONTOS > 1){
                    if(item === 0){
                        console.log(`${character1.NOME} venceu o confronto e não ganhou bônus desta vez 🤡! 
                        \n${character2.NOME} perdeu dois pontos ao ser atingido por um(a) 💣 ${weapon}`);
                        character2.PONTOS-=2;
                    }else if(item === 1){
                        console.log(`${character1.NOME} venceu o confronto e ganhou bônus 🌟! 
                        \n${character2.NOME} perdeu dois pontos ao ser atingido por um(a) 💣 ${weapon}`);
                        character1.PONTOS++;
                        character2.PONTOS-=2;
                    }
                }else if( weapon === 'bomba' && character2.PONTOS === 1){
                    if(item === 0){
                        console.log(`${character1.NOME} venceu o confronto e não ganhou bônus desta vez 🤡! 
                        \n${character2.NOME} perdeu um ponto ao ser atingido por um(a) 💣 ${weapon}`);
                        character2.PONTOS--;
                    }else if(item === 0){
                        console.log(`${character1.NOME} venceu o confronto e ganhou bônus 🌟! 
                        \n${character2.NOME} perdeu um ponto ao ser atingido por um(a) 💣 ${weapon}`);
                        character1.PONTOS++;
                        character2.PONTOS--;
                    }
                }
            }else if(powerResult1 > powerResult2){
                if(item === 0){
                    console.log(`${character1.NOME} venceu o confronto e não ganhou bônus desta vez 🤡! 
                    \n${character2.NOME} não perdeu nenhum ponto pois tem ${character2.PONTOS} pontos`); 

                }else if(item === 1){
                    console.log(`${character1.NOME} venceu o confronto e ganhou bônus 🌟! 
                    \n${character2.NOME} não perdeu nenhum ponto pois tem ${character2.PONTOS} pontos`); 
                    character1.PONTOS++;
                }                    
            }

            if(powerResult2 > powerResult1 && character1.PONTOS > 0){
                if( weapon === 'casco'){
                    if(item === 0){
                        console.log(`${character2.NOME} venceu o confronto e não ganhou bônus desta vez 🤡!
                        \n${character1.NOME} perdeu um ponto ao ser atingido por um(a) 🐢 ${weapon}`);
                        character1.PONTOS--;
                    }else if(item === 1){
                        console.log(`${character2.NOME} venceu o confronto e ganhou bônus 🌟! 
                        \n${character1.NOME} perdeu um ponto ao ser atingido por um(a) 🐢 ${weapon}`);
                        character2.PONTOS++;
                        character1.PONTOS--;
                    }
                }else if( weapon === 'bomba' && character1.PONTOS > 1){
                    if(item === 0){
                        console.log(`${character2.NOME} venceu o confronto e não ganhou bônus desta vez 🤡! 
                        \n${character1.NOME} perdeu dois pontos ao ser atingido por um(a) 💣 ${weapon}`);
                        character1.PONTOS-=2;
                    }else if(item === 1){
                        console.log(`${character2.NOME} venceu o confronto e ganhou bônus 🌟! 
                        \n${character1.NOME} perdeu dois pontos ao ser atingido por um(a) 💣 ${weapon}`);
                        character2.PONTOS++;
                        character1.PONTOS-=2;
                    }
                }else if( weapon === 'bomba' && character1.PONTOS === 1){
                    if(item === 0){
                        console.log(`${character2.NOME} venceu o confronto e não ganhou bônus desta vez 🤡! 
                        \n${character1.NOME} perdeu um ponto ao ser atingido por um(a) 💣 ${weapon}`);
                        character1.PONTOS--;
                    }else if(item === 0){
                        console.log(`${character2.NOME} venceu o confronto e ganhou bônus 🌟! 
                        \n${character1.NOME} perdeu um ponto ao ser atingido por um(a) 💣 ${weapon}`);
                        character2.PONTOS++;
                        character1.PONTOS--;
                    }
                }
            }else if(powerResult2 > powerResult1){
                if(item === 0){
                    console.log(`${character2.NOME} venceu o confronto e não ganhou bônus desta vez 🤡!
                    \n${character1.NOME} não perdeu nenhum ponto pois tem ${character1.PONTOS} pontos`); 

                }else if(item === 1){
                    console.log(`${character2.NOME} venceu o confronto e ganhou bônus 🌟! 
                    \n${character1.NOME} não perdeu nenhum ponto pois tem ${character1.PONTOS} pontos`); 
                    character2.PONTOS++;
                }                    
            }

            console.log(powerResult1 === powerResult2 ? "Confronto empatado! Nenhum ponto foi perdido." : " " )
            
        }

        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto`);
            character1.PONTOS++;
        }else if(totalTestSkill2 > totalTestSkill2){
            console.log(`${character2.NOME} marcou um ponto`);
            character2.PONTOS++;
        }
        console.log("____________________________________________________________________")

    }
}

async function declareWinner(character1, character2) {
    console.log("Resultado final");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);

    }else if(character2.PONTOS > character1.PONTOS){
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);

    }else{
        console.log("A corrida terminou empatada!")
    }
}

(async function main() {
       console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`); 

       await playRaceEngine(player1, player2);
       await declareWinner(player1, player2);
})();