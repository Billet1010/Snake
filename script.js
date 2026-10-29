

const blockArray = [];
const snakePosition = [];

const gameArea = document.getElementById("mainGameArea");

let horizontal = 1;
let vertical = 0;

let snakeLength = 5;


function setup(){

    gameArea.innerHTML = "";
    blockArray.length = 0;
    snakePosition.length = 0;
    snakeLength = 5;


    let id = 0;

    for(let i = 0; i < 400; i = 20 + i){

        for(let k = 0; k < 400; k = 20 + k){

            id++;
            
            const newP = document.createElement('p');
            
            [newP.style.top, newP.style.left] = [i + "px", k + "px"];

            newP.classList.add("grass");

            gameArea.appendChild(newP);

            let newArray = [];

            newArray.push(id, i, k, newP, "grass");

            blockArray.push(newArray);

        }

    }

    for(let i = 202; i < 206; i++){

        let currentBlock = blockArray[i][3];
        changeBlock(i, "grass", "snake");
        blockArray[i][4] = "snake";
        snakePosition.push(blockArray[i]);
    }

    changeBlock(216, "grass", "apple");
    blockArray[216][4] = "apple";

}

setup();



// awsd

document.addEventListener("keydown", keyboardCommands);

function keyboardCommands(e){
    if(e.key === "w" && vertical !== 1){
        horizontal = 0;
        vertical = -1;
    }
    if(e.key === "s" && vertical !== -1){
        horizontal = 0;
        vertical = 1;
    }
    if(e.key === "a" && horizontal !== 1){
        horizontal = -1;
        vertical = 0;
    }
    if(e.key === "d" && horizontal !== -1){
        horizontal = 1;
        vertical = 0;
    }
}



const animate = window.requestAnimationFrame(animationLoop);
let count = 0;
let currentBlock = 205;
let nextBlock;
let column
function animationLoop(time){

    if(count % 10 == 0){

        nextBlock = nextBlockId();
        column = currentBlock % 20;

        if(nextBlock > 399 || nextBlock < 0){
            reset();
            window.requestAnimationFrame(animationLoop);
            return;
        }
        
        if(horizontal == 1 && column === 19 || horizontal == -1 && column === 0){
            reset();
            window.requestAnimationFrame(animationLoop);
            return;
        }

        if(blockArray[currentBlock][4] == blockArray[nextBlock][4]){

            horizontal = 1;
            vertical = 0;
            currentBlock = 205;
            nextBlock = nextBlockId();
            setup();


        }

        if(blockArray[nextBlock][4] === "apple"){

            snakeLength++;
            changeBlock(nextBlock, "apple", "snake");
            changeBlockToApple();

        }

        changeBlock(nextBlock, "grass", "snake");

        snakePosition.push(blockArray[nextBlock]);

        if(snakePosition.length > snakeLength){
            const tail = snakePosition;
            tail[0][3].classList.remove("snake");
            tail[0][3].classList.add("grass");
            tail[0][4] = "grass";        
            snakePosition.shift();
        }

        if(Math.random() >= 0.99){
            changeBlockToApple();
        }

        currentBlock = nextBlock;
        count = 0;
    }

    count++;

    window.requestAnimationFrame(animationLoop);

}

function reset(){
    setup();
    currentBlock = 205;
    count = 0;
    horizontal = 1;
    vertical = 0;
}

function changeBlockToApple(){

    let snakeExists = false;

    while(!snakeExists){

        let random = Math.floor(Math.random() * 400);

        if(blockArray[random][4] == "grass"){
            blockArray[random][4] = "apple";
            blockArray[random][3].classList.remove("grass");
            blockArray[random][3].classList.add("apple");
            snakeExists = true;
        }

    }

}

function changeBlock(id, remove, add){
    const pElement = blockArray[id][3];
    pElement.classList.remove(remove);
    pElement.classList.add(add);
    blockArray[id][4] = add;
}

function nextBlockId(){

    nextBlock = currentBlock + horizontal + (vertical * 20);

    return nextBlock;

}