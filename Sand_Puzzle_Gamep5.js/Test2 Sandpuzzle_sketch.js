let WIDTH = 1280;
let HEIGHT = 720;
let colorChoices = ['red', 'orange', 'lightblue', 'darkblue', 'darkgreen', 'pink', 'purple', 'darkgray', 'brown', 'lightgreen', 'yellow', 'white'];
let tubeColors = [];
let initialColors = [];
let tubes = 10;
let newGame = true;
let selected = false;
let tubeRects = [];
let selectRect = 100;
let win = false;
let font;
let spacing;

let startTime;
let winTime = null;

let backgroundMuzic;
let WinningMuzic;

let landscape;
let winGif;
let showGif = false;

function preload() {
    landscape = loadImage('https://i.gifer.com/76YS.gif');
    font = loadFont('norwester.otf');
    backgroundMuzic = createAudio('sound-k-117217.mp3');
    WinningMuzic = createAudio('tadaa-47995.mp3');
}

function setup() {
    createCanvas(WIDTH, HEIGHT);
    frameRate(60);
    textAlign(CENTER, CENTER);
    textSize(24);
    //newBoard();
    imageMode(CENTER);
    // Load the winning GIF as an HTML element
    winGif = createImg('https://i.pinimg.com/originals/1e/bd/62/1ebd62592ece9c36f32347098a8ddb21.gif');
    winGif.size(WIDTH, HEIGHT);
    winGif.position(0,0);
    //winGif.position((windowWidth-WIDTH) / 2, (windowHeight) / 2);
    winGif.hide(); // Hide the GIF initially
    //where you put millis, the millis will start from where
    startTime = millis();
}

function draw() {
    image(landscape, width / 2, height / 2, width, height);
    if (newGame) {
        newBoard();
        newGame = false;
    } else {
        drawTubes();
    }

    win = checkVictory(tubeColors);
    if (win) {
        showGif = true;
        if (winTime === null) {
            winTime = millis() - startTime; // Capture the win time
        }
    }

        //var elapsedMillis = millis() - startTime;
    var elapsedMillis;
    if (winTime !== null) {
        elapsedMillis = winTime; // Use the captured win time
    } else {
        elapsedMillis = millis() - startTime; // Calculate elapsed time
    }
    
    var m = floor(elapsedMillis / 60000);
    var s = floor((elapsedMillis % 60000) / 1000);

    if (showGif) {
        winGif.show(); // Show the GIF when the player wins
        backgroundMuzic.stop();
        WinningMuzic.play();
        fill(255);
        text(`🤩 Congratulations! You use ${m}:${s} You Can Press Enter for a new board! 🥳`, width / 2, height / 2);
    } else {
        winGif.hide(); // Hide the GIF otherwise
        //textFont(font);
        backgroundMuzic.play();
        WinningMuzic.stop();
        fill(255);
        text('Stuck? 😵‍💫 Space -> Restart, Enter -> New Board!', width / 2, 20);
        
        push();
        fill(255);
        textSize(40);
        textStyle(BOLD);
        text(` ${m}:${s} `, width / 2, 70);
        console.log(`Current minute: ${m}:${s} `, 10, 60);
        pop();
    
    }

}

function newBoard() {
    tubes = Math.floor(random(10, 15));
    tubeColors = generateStart();
    initialColors = JSON.parse(JSON.stringify(tubeColors));
    showGif = false; // Reset the GIF flag
    winGif.hide(); // Hide the GIF when starting a new board
}

function generateStart() {
    let tubesColors = [];
    let availableColors = [];
    for (let i = 0; i < tubes; i++) {
        tubesColors.push([]);
        if (i < tubes - 2) {
            for (let j = 0; j < 4; j++) {
                availableColors.push(i);
            }
        }
    }
    for (let i = 0; i < tubes - 2; i++) {
        for (let j = 0; j < 4; j++) {
            let color = random(availableColors);
            tubesColors[i].push(color);
            availableColors.splice(availableColors.indexOf(color), 1);
        }
    }
    return tubesColors;
}

function drawTubes() {
    tubeRects = [];
    spacing = width / (tubes % 2 === 0 ? tubes / 2 : tubes / 2 + 1);
    for (let i = 0; i < tubes; i++) {
        let x = i < tubes / 2 ? spacing * i : spacing * (i - tubes / 2) + spacing / 2;
        let y = i < tubes / 2 ? height / 3 : height * 2 / 3;
        let box = { x: x + 5, y: y - 100, w: 65, h: 200 };

        tubeRects.push(box);
        stroke("white");
        strokeWeight(8);
        noFill();
        rect(box.x, box.y, box.w, box.h, 5);
        if (selectRect === i) {
            stroke('Teal');
            strokeWeight(15);
            rect(box.x, box.y, box.w, box.h, 5);
        }
        noStroke();
        for (let j = 0; j < tubeColors[i].length; j++) {
            fill(colorChoices[tubeColors[i][j]]);
            rect(box.x, box.y + 200 - (50 * (j + 1)), 65, 50, 3);
        }
    }
}

function calcMove(selectedRect, destination) {
    if (tubeColors[selectedRect].length > 0) {
        let colorToMove = tubeColors[selectedRect][tubeColors[selectedRect].length - 1];
        let length = 1;
        for (let i = tubeColors[selectedRect].length - 2; i >= 0; i--) {
            if (tubeColors[selectedRect][i] === colorToMove) {
                length++;
            } else {
                break;
            }
        }
        if (tubeColors[destination].length < 4 && (tubeColors[destination].length === 0 || tubeColors[destination][tubeColors[destination].length - 1] === colorToMove)) {
            for (let i = 0; i < length; i++) {
                if (tubeColors[destination].length < 4) {
                    tubeColors[destination].push(tubeColors[selectedRect].pop());
                }
            }
        }
    }
}

function checkVictory(colors) {
    for (let i = 0; i < colors.length; i++) {
        if (colors[i].length > 0) {
            if (colors[i].length !== 4 || new Set(colors[i]).size !== 1) {
                return false;
            }
        }
    }
    return true;
}

function mousePressed() {
    for (let i = 0; i < tubeRects.length; i++) {
        if (mouseX > tubeRects[i].x && mouseX < tubeRects[i].x + tubeRects[i].w && mouseY > tubeRects[i].y && mouseY < tubeRects[i].y + tubeRects[i].h) {
            if (!selected) {
                selected = true;
                selectRect = i;
            } else {
                calcMove(selectRect, i);
                selected = false;
                selectRect = 100;
            }
        }
    }
}

function keyReleased() {
    if (key === ' ') {
        tubeColors = JSON.parse(JSON.stringify(initialColors));
        newGame = true;
        showGif = false;
        winTime = null;
        startTime = millis();

    } else if (keyCode === ENTER) {
        //newGame = true;
        newGame = true;
        showGif = false;
        winTime = null;
        startTime = millis();

    }
}
