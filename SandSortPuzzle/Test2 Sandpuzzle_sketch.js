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
let landscape2;
let landscape3;
let winGif;
let showGif = false;
let completeGif;

// pour watar animation
let animating = false;
let animationStart = 0;
let animationDuration = 1000; // 1 second
let animatingTube = null;
let animationSource = null;
let animationDestination = null;
let animationColors = [];
let animationCount = 0;
let animationColorsPoured = false;

let gameState = 'start'; // Add a state variable to track the game state
let selectedBackground = null; // Variable to store the selected background

function preload() {
    landscape = loadImage('IrM.gif');
    landscape2 = loadImage('Lake-night.png');
    landscape3 = loadImage('falling-stars-g12ux36ccv3n6r8b.gif');
    font = loadFont('norwester.otf');
    backgroundMuzic = createAudio('sound-k-117217.mp3');
    WinningMuzic = createAudio('tadaa-47995.mp3');
    completeGif = createImg('d87144f81ac17ad2ccb567ccece776f3.gif'); // Load the GIF
    completeGif.hide();
}

function setup() {
    createCanvas(WIDTH, HEIGHT);
    frameRate(60);
    textAlign(CENTER, CENTER);
    textSize(24);
    imageMode(CENTER);
    // Load the winning GIF as an HTML element (Since the GIF is not needed immediately and only shown conditionally, it can be created in setup.)
    winGif = createImg('Pngtreehappybirthdaycelebrationwithfalling_8519624-ezgif.com-apng-to-gif-converter.gif');
    winGif.size(WIDTH, HEIGHT);
    winGif.position(0,0);
    winGif.hide(); // Hide the GIF initially
    //record the start time (where you put millis, the millis will start from where)
    startTime = millis();
}

//it is used to execute the function
function draw() {
    if (gameState === 'start') {
        drawStartScreen();
    } else if (gameState === 'game') {
        if (selectedBackground) {
            image(selectedBackground, width / 2, height / 2, width, height);
        }
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
                winTime = millis() - startTime;
            }
        }

        var elapsedMillis;
        if (winTime !== null) {
            elapsedMillis = winTime;
        } else {
            elapsedMillis = millis() - startTime;
        }

        var m = floor(elapsedMillis / 60000);
        var s = floor((elapsedMillis % 60000) / 1000);

        if (showGif) {
            winGif.show();
            backgroundMuzic.stop();
            WinningMuzic.play();
            fill(255);
            text(`🤩 Congratulations! You use ${m}:${s}  Press Enter for a new board! 🥳`, width / 2, height / 2);
        } else {
            winGif.hide();
            backgroundMuzic.loop();
            WinningMuzic.stop();
            fill(255);
            text('Stuck? 😵‍💫 Space -> Restart, Enter -> New Board!', width / 2, 20);
            
            push();
            fill(255);
            textSize(40);
            textStyle(BOLD);
            text(` ${m}:${s} `, width / 2, 70);
            pop();
        }
        
        if (animating) {
            let elapsed = millis() - animationStart;
            console.log("elapsed"+elapsed)
            if (elapsed < animationDuration) {
                // First phase: move to above the destination tube
                let progress = map(elapsed, 0, animationDuration, 0, 1);
                let sourceBox = tubeRects[animationSource];
                let destBox = tubeRects[animationDestination];
                let x = lerp(sourceBox.x, destBox.x, progress);
                let y = lerp(sourceBox.y, destBox.y - 50, progress); // Move to above the destination tube
                let angle = lerp(0, PI / 2, progress);
        
                push();
                translate(x + sourceBox.w / 2, y - 40);
                rotate(angle);
                translate(-(sourceBox.w / 2), 40);
                stroke("white");
                strokeWeight(8);
                noFill();
                rect(0, 0, sourceBox.w, sourceBox.h, 5);
        
                // Draw the colors in the original source tube
                let sourceColors = tubeColors[animationSource];
                for (let j = 0; j < sourceColors.length; j++) {
                    fill(colorChoices[sourceColors[j]]);
                    rect(0, 200 - 50 * (j + 1), 65, 50, 3);
                }
                pop();
            } else if (elapsed < 2 * animationDuration) {
                // Second phase: pour the color
                if (!animationColorsPoured) {
                    for (let o = 0; o < animationCount; o++) {
                        tubeColors[animationDestination].push(tubeColors[animationSource].pop());
                    }
                    // Check if the destination tube is now complete
                    if (tubeColors[animationDestination].length === 4 && new Set(tubeColors[animationDestination]).size === 1 && !tubeCompleted[animationDestination]) {
                        tubeCompleted[animationDestination] = true; // Mark the tube as completed
                        let box = tubeRects[animationDestination];
                        showCompleteGif(box.x + box.w / 2, box.y + box.h / 2); // Show the GIF at the center of the tube
                    }
                    animationColorsPoured = true;
                }
                
                //Third phase: move back to the orginal place
                let progress = map(elapsed - animationDuration, 0, animationDuration, 0, 1);
                let sourceBox = tubeRects[animationSource];
                let destBox = tubeRects[animationDestination];
                let x = lerp(destBox.x, sourceBox.x, progress);
                let y = lerp(destBox.y - 50, sourceBox.y, progress); // Move back to the original position
                let angle = lerp(PI / 2, 0, progress);
        
                push();
                translate(x + sourceBox.w / 2, y - 40);
                rotate(angle);
                translate(-(sourceBox.w / 2), 40);
                stroke("white");
                strokeWeight(8);
                noFill();
                rect(0, 0, sourceBox.w, sourceBox.h, 5);
        
                // Draw the colors in the original source tube
                let sourceColors = tubeColors[animationSource];
                for (let j = 0; j < sourceColors.length; j++) {
                    fill(colorChoices[sourceColors[j]]);
                    rect(0, 200 - 50 * (j + 1), 65, 50, 3);
                }
                pop();
            } else {
                animating = false;
                selected = false;
                selectRect = 100;
                animationColorsPoured = false;
            }
        }                 
    }
}

// create a button at the first page, to let the user albe to select the background
function drawStartScreen() {
    background(120);
    push();
    fill(255);
    textFont(font);
    textSize(40);
    text('Welcome To', width / 2, (height / 4)-50);
    text('Sand Puzzle Sort', width / 2, height / 4);
    text('Select a Background to Start the Game', width / 2, (height / 4)+100);
    pop();

    //BUTTON 1
    var button1 = createButton('Landscape 1');
    button1.style('border', '2px solid #000000');
    button1.position((width / 3 - button1.width / 2)-60, height / 2);
    button1.mouseOver(() => button1.style('border', '6px solid #b24d52'));
    button1.mouseOut(() => button1.style('border', '2px solid #000000'));
    button1.mousePressed(() => selectBackground(landscape));
    button1.touchStarted(() => selectBackground(landscape));
    button1.size(200, 50);

    //BUTTON 2
    var button2 = createButton('landscape2');
    button2.style('border', '2px solid #000000');
    button2.position((width / 2 - button2.width / 2)-60, height / 2);
    button2.mouseOver(() => button2.style('border', '6px solid #b24d52'));
    button2.mouseOut(() => button2.style('border', '2px solid #000000'));
    button2.mousePressed(() => selectBackground(landscape2));
    button2.touchStarted(() => selectBackground(landscape2));
    button2.size(200, 50);

    //BUTTON 3
    var button3 = createButton('landscape3');
    button3.style('border', '2px solid #000000');
    button3.position((2 * width / 3 - button3.width / 2)-60, height / 2);
    button3.mouseOver(
        function() {
            button3.style('border', '6px solid #b24d52'); // Change border color on mouseover
        }
    );
    button3.mouseOut(
        function() {
            button3.style('border', '2px solid #000000'); // Restore border color on mouseout
        }
    );
    button3.mousePressed(() => selectBackground(landscape3));
    button3.touchStarted(() => selectBackground(landscape3));
    button3.size(200, 50);
}

// used to ensure which background we selected and set the variable to specific background
function selectBackground(bg) {
    selectedBackground = bg;
    gameState = 'game'; // Switch to the game state
    startTime = millis(); // Reset the timer
    // Remove the buttons after selection
    let buttons = selectAll('button');
    buttons.forEach(button => button.remove());
}

// random the color and count the total of tube
function newBoard() {
    tubes = Math.floor(random(10, 15)); // Randomize the number of tubes
    tubeColors = generateStart(); //Generate initial colors
    initialColors = JSON.parse(JSON.stringify(tubeColors)); // Store initial colors for reset
    showGif = false; // Reset the GIF flag
    winGif.hide(); // Hide the GIF when starting a new board
    tubeCompleted = new Array(tubes).fill(false); // Initialize the tubeCompleted array
}

// Generate the initial colors for the tubes when start (array the color)
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
        var box = { x: x + 5, y: y - 100, w: 65, h: 200 }; // size and position

        tubeRects.push(box); // put the box into tubeRects
        if (animating && (i === animationSource)) {
            continue; // Skip drawing the original tubes that are being animated
        }
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
    // Check if already animating
    if (animating) return;
    // Prevent animating when the same tube is clicked (Return Early)
    if (selectedRect === destination) return;
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
            // for (let i = 0; i < length; i++) {
            //     if (tubeColors[destination].length < 4) {
            //         tubeColors[destination].push(tubeColors[selectedRect].pop()); // Move the color

            //     }
            // }
            animating = true;
            animationStart = millis();
            animationSource = selectedRect;
            animationDestination = destination;
            animationColors = tubeColors[selectedRect].slice(-length);
            animationCount = Math.min(length, 4 - tubeColors[destination].length);
            animationProgress = 0;
            animationTube = {...tubeRects[selectedRect]};


        }
    }
}

// when we finish a tube of the color
function showCompleteGif(x, y) {
    completeGif.position(x - completeGif.width / 2, y - completeGif.height / 2); // Position the GIF
    completeGif.show(); // Show the GIF
    setTimeout(() => {
        completeGif.hide(); // Hide the GIF after 2 seconds
    }, 2000);
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

// detect which tube we are clicking
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

// enter and space key
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
