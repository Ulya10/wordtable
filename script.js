const allWordsInit = 'человек время год дело жизнь рука день слово глаз лицо место дом работа друг сторона голова вопрос сила мир случай ребенок город вид страна конец бог';
const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const allWords = allWordsInit.split(' ');
console.log(allWords);
const playground = document.querySelector('.playground');


const amount = 10;

let field = [];
for (let i = 0; i < 10; i++) {
    field[i] = [];
    for (let j = 0; j < 10; j++) {
        field[i][j] = 0;
    }
}

for (let a = 0; a < amount; a++) {

    let number = Math.floor(Math.random() * allWords.length);
    //console.log(number, allWords.length);
    let word = allWords[number];

    let count = 0;

    let repos;

    while (count < 10) {

        repos = false;

        let posI = Math.floor(Math.random() * 10);
        let posJ = Math.floor(Math.random() * 10);
        let direction = Math.floor(Math.random() * 2); //0 - to right, 1 - to bottom

        console.log(posI, posJ, direction, word);

        if (direction == 0) {
            for (let k = posJ; k < posJ + word.length; k++) {
                if (field[posI][k] == undefined || field[posI][k] !== 0) {
                    count++;
                    repos = true; //закончить цикл и поменять позицию
                    console.log(count, repos);
                    break;
                }
            }

            if (repos == false) {
                let posInsert = 0; //позиция вставки символа слова
                for (let k = posJ; k < posJ + word.length; k++) {
                    field[posI][k] = word[posInsert];
                    posInsert++;
                }
                allWords.splice(number, 1); //удаление слова из исходного массива
            }

            for (let i = 0; i < 10; i++) {
                console.log(field[i]);
            }

            if (repos == false) {
                break;
            }
        } else {
            for (let k = posI; k < posI + word.length; k++) {
                if (field[posI][k] == undefined || field[k][posJ] !== 0) {
                    count++;
                    repos = true;
                    console.log(count, repos);
                    break;
                }
            }

            if (repos == false) {
                let posInsert = 0;
                for (let k = posI; k < posI + word.length; k++) {
                    field[k][posJ] = word[posInsert];
                    posInsert++;

                }
                allWords.splice(number, 1); //удаление слова из исходного массива
            }

            for (let i = 0; i < 10; i++) {
                console.log(field[i]);
            }

            if (repos == false) {
                break;
            }

        }
    }

    if (count == 10) {
        allWords.splice(number, 1);
        a--;
    }

    console.log(allWords, allWords.length);

}

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        let block = document.createElement('div');
        block.classList.add('block');
        if (field[i][j]==0){
            block.textContent = alphabet[(Math.floor(Math.random()*alphabet.length))];
        } else {
        block.textContent = field[i][j];    
        }
        playground.append(block);
    }
}