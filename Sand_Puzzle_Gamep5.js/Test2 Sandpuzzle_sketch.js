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
    font = loadFont('norwester/norwester.otf');
    backgroundMuzic = createAudio('sound-k-117217.mp3');
    WinningMuzic = createAudio('tadaa-47995.mp3');
}

function setup() {
    createCanvas(WIDTH, HEIGHT);
    frameRate(60);
    textAlign(CENTER, CENTER);
    textSize(24);
    imageMode(CENTER);
    // Load the winning GIF as an HTML element (Since the GIF is not needed immediately and only shown conditionally, it can be created in setup.)
    winGif = createImg('https://i.pinimg.com/originals/1e/bd/62/1ebd62592ece9c36f32347098a8ddb21.gif');
    winGif.size(WIDTH, HEIGHT);
    winGif.position(0,0);
    winGif.hide(); // Hide the GIF initially
    //record the start time (where you put millis, the millis will start from where)
    startTime = millis();
}

//it is used to execute the function
function draw() {
    image(landscape, width / 2, height / 2, width, height);
    if (newGame) {
        newBoard(); // Initialize a new board
        newGame = false;
    } else {
        drawTubes();
    }

    // Check if the game is won or no
    win = checkVictory(tubeColors);
    if (win) {
        showGif = true; //excute the won animation to the user
        if (winTime === null) { //used to caugth the wintime/ can reset when click the enter key
            winTime = millis() - startTime; // Capture the win time/ Record the wintime
        }
    }


    var elapsedMillis;
    if (winTime !== null) {
        elapsedMillis = winTime; // Use the captured win time
    } else {
        elapsedMillis = millis() - startTime; // Calculate elapsed time
    }
    
    var m = floor(elapsedMillis / 60000); // Convert elapsed time to minutes
    var s = floor((elapsedMillis % 60000) / 1000); // Convert elapsed time to seconds

    if (showGif) {
        winGif.show(); // Show the GIF when the player wins
        backgroundMuzic.stop();
        WinningMuzic.play();
        fill(255);
        text(`🤩 Congratulations! You use ${m}:${s} You Can Press Enter for a new board! 🥳`, width / 2, height / 2);
    } else {
        winGif.hide(); // Hide the GIF otherwise
        backgroundMuzic.loop();
        WinningMuzic.stop();
        fill(255);
        text('Stuck? 😵‍💫 Space -> Restart, Enter -> New Board!', width / 2, 20);
        
        push();
        fill(255);
        textSize(40);
        textStyle(BOLD);
        text(` ${m}:${s} `, width / 2, 70); // Display elapsed time
        console.log(`Current minute: ${m}:${s} `, 10, 60);
        pop();
    
    }

}

function newBoard() {
    tubes = Math.floor(random(10, 15)); // Randomize the number of tubes
    tubeColors = generateStart(); //Generate initial colors
    initialColors = JSON.parse(JSON.stringify(tubeColors)); // Store initial colors for reset
    showGif = false; // Reset the GIF flag
    winGif.hide(); // Hide the GIF when starting a new board
}

// Generate the initial colors for the tubes when start
function generateStart() {
    let tubesColors = [];
    let availableColors = [];
    for (let i = 0; i < tubes; i++) {
        tubesColors.push([]); //Push an empty array into tubesColors to store colors for the current tube.
        if (i < tubes - 2) { //ensure last 2 tube is empty
            for (let j = 0; j < 4; j++) { 
                availableColors.push(i); // make a size of tube first (Add the index of the current tube to availableColors.)
            }
        }
    }
    for (let i = 0; i < tubes - 2; i++) {
        for (let j = 0; j < 4; j++) {
            let color = random(availableColors);  //Randomly select an available color
            tubesColors[i].push(color); // make every tubes have 4 color
            availableColors.splice(availableColors.indexOf(color), 1);  //Remove the selected color from the available colors to prevent reuse. (One color can used for 4 time only)
        }
    }
    return tubesColors; //Return the array containing the color configurations for the tubes.
}

// Draw the tubes and their colors
function drawTubes() {
    tubeRects = [];
    spacing = width / (tubes % 2 === 0 ? tubes / 2 : tubes / 2 + 1); // Calculate spacing
    for (let i = 0; i < tubes; i++) {
        let x = i < tubes / 2 ? spacing * i : spacing * (i - tubes / 2) + spacing / 2;
        let y = i < tubes / 2 ? height / 3 : height * 2 / 3;
        let box = { x: x + 5, y: y - 100, w: 65, h: 200 }; // size and position

        tubeRects.push(box); // put the box into tubeRects
        stroke("white");
        strokeWeight(8);
        noFill();
        rect(box.x, box.y, box.w, box.h, 5); // Draw the tube
        if (selectRect === i) {
            stroke('Teal');
            strokeWeight(15);
            rect(box.x, box.y, box.w, box.h, 5); // Highlight selected tube
        }
        noStroke();
        for (let j = 0; j < tubeColors[i].length; j++) {
            fill(colorChoices[tubeColors[i][j]]);
            rect(box.x, box.y + 200 - (50 * (j + 1)), 65, 50, 3); // Draw the colors in the tube
        }
    }
}

// Calculate the move when a tube is selected
function calcMove(selectedRect, destination) {
    // Calculate the move of colors between tubes
    if (tubeColors[selectedRect].length > 0) { // check the array tube first
        let colorToMove = tubeColors[selectedRect][tubeColors[selectedRect].length - 1];
        let length = 1;
        for (let i = tubeColors[selectedRect].length - 2; i >= 0; i--) {
            if (tubeColors[selectedRect][i] === colorToMove) { //test how many color is same in a tube
                length++;
            } else {
                break; //also stop the (for)
            }
        }
        //this (if) is test which tube is empty, so it can striaght forward change the color
        if (tubeColors[destination].length < 4 && (tubeColors[destination].length === 0 || tubeColors[destination][tubeColors[destination].length - 1] === colorToMove)) {
            for (let i = 0; i < length; i++) {
                if (tubeColors[destination].length < 4) {
                    tubeColors[destination].push(tubeColors[selectedRect].pop()); // Move the color

                }
            }
        }
    }
}

function checkVictory(colors) {
    // Check if all tubes are filled correctly with a single color
    for (let i = 0; i < colors.length; i++) { // check one by one the color in the tube
        if (colors[i].length > 0) {
            if (colors[i].length !== 4 || new Set(colors[i]).size !== 1) {
                return false; // if no, the checkVictory is false
            }
        }
    }
    return true; //checkVictory is true
}

function mousePressed() {
    // Handle mouse click to select and move colors between tubes
    for (let i = 0; i < tubeRects.length; i++) {
        // Check if the mouse position is within the bounds of the current tube rectangle
        if (mouseX > tubeRects[i].x && mouseX < tubeRects[i].x + tubeRects[i].w && mouseY > tubeRects[i].y && mouseY < tubeRects[i].y + tubeRects[i].h) {
            // if we notselected, so it is true, mean we can select another tube
            if (!selected) {
                selected = true; // Set the selected flag to true
                selectRect = i; // Store the index of the selected tube
            } else {
                // If a tube is already selected, attempt to move colors from the selected tube to the current tube with the function calcMove
                calcMove(selectRect, i);
                selected = false; // Deselect the tube after the move
                selectRect = 100; // Reset the selected tube index
            }
        }
    }
}

function keyReleased() {
    // Handle key presses for restarting or generating a new board
    if (key === ' ') {
        // If the space bar is pressed, reset the current game to its initial state
        tubeColors = JSON.parse(JSON.stringify(initialColors)); // Reset tube colors
        winTime = null; //reset the winTime
        startTime = millis(); // Restart the startTime/Timer

    } else if (keyCode === ENTER) {
        newGame = true;
        showGif = false;
        winTime = null;
        startTime = millis();

    }
}
