const allWordsInit = 'человек время год дело жизнь рука день слово глаз лицо место дом работа друг сторона голова вопрос сила мир случай ребенок город вид страна конец бог';
const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const allWords = allWordsInit.split(' ');
console.log(allWords);
const playground = document.querySelector('.playground');

const amount = 10; //количество слов
const size = 10; //размер поля в клетках

let field = []; //массив значений в клетках
for (let i = 0; i < size; i++) {
    field[i] = [];
    for (let j = 0; j < size; j++) {
        field[i][j] = 0;
    }
}

for (let a = 0; a < amount; a++) {
    let number = Math.floor(Math.random() * allWords.length); //номер слова из массива
    let word = allWords[number];
    let count = 0; // количество попыток добавления
    let repos; // если слово не удалось вставить и нужно менять координаты

    while (count < 10) {

        repos = false;

        let posI = Math.floor(Math.random() * size);
        let posJ = Math.floor(Math.random() * size);
        let direction = Math.floor(Math.random() * 2); //0 - направо, 1 - вниз

        console.log(posI, posJ, direction, word);

        if (direction == 0) {
            for (let k = posJ; k < posJ + word.length; k++) {
                if (field[posI][k] == undefined || field[posI][k] !== 0) { //почему-то для другого направления такая первая часть условия не работает, пишет cannot read properties of undefined, хотя зачем их читать, если первая часть undefined и дает true
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
                //allWords.splice(number, 1); //удаление слова из исходного массива
                break;
            }

        } else {
            for (let k = posI; k < posI + word.length; k++) {
                if (field[k][posJ] == undefined || field[k][posJ]!== 0) {
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
                //allWords.splice(number, 1); 
                break;
            }
        }
    }

    for (let i = 0; i < size; i++) {
        console.log(field[i]);}

    if (count == 10) {
        a--;
    }

    allWords.splice(number, 1);//удаление слова из исходного массива
    console.log(allWords, allWords.length); //оставшиеся слова
}

for (let i = 0; i < size; i++) {
    console.log(field[i]);
    for (let j = 0; j < size; j++) {
        let block = document.createElement('div');
        block.classList.add('block');
        if (field[i][j]==0){
            block.textContent = alphabet[(Math.floor(Math.random()*alphabet.length))];
        } else {
        block.textContent = field[i][j];
        block.style.color="red";    
        }
        playground.append(block);
    }
}