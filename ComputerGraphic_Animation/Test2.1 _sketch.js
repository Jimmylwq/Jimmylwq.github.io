var q = 50;
var r = 50;
var x = 250;
var y = 605;

// line shadow
var bez1x =430; 
var bez1y = 335;
var bez2x = 549;
var bez2y = 550;
var bez3x = 600; 
var bez3y = 640;
var bez4x = 600;
var bez4y = 640;

//line triangle 1
var bez1x1 = 350; 
var bez1y1 = 190;
var bez2x1 = 340;
var bez2y1 = 210;
var bez3x1 = 210;  
var bez3y1 = 440;
var bez4x1 = 100;
var bez4y1 = 640;

//line triangle12
var bez1x2 = 100; 
var bez1y2 = 640;
var bez2x2 = 150;
var bez2y2 = 640;
var bez3x2 = 300; 
var bez3y2 = 640;
var bez4x2 = 600;
var bez4y2 = 640;

//line triangle3
var bez1x3 = 600; 
var bez1y3 = 640;
var bez2x3 = 550;
var bez2y3 = 540;
var bez3x3 = 440; 
var bez3y3 = 360;
var bez4x3 = 350;
var bez4y3 = 190;

//the smaller triangle
var tri1x = 320;
var tri1y = 240;
var tri2x = 70;
var tri2y = 690;
var tri3x = 570;
var tri3y = 690;

// the line when the ball smaller immedially in the last
//line 1
var line1x = 580;
var line1y = 120;
var line12x = 700;
var line12y = 110;
//line2
var line2x = 510;
var line2y = 210;
var line22x = 480;
var line22y = 240;
//line3
var line3x = 480;
var line3y = 150;
var line33x = 380;
var line33y = 140;

let rotationAngle = 0;
let rotationAngle2 = 0;
let rotationAngle3 = 0;
let rotationAngle4 = 0;
let rotationAngle5 = 0;
let part = 1;
var growing = true;
var move = false;
let runAnimation = true;  // Flag to control animation
let runAnimation2 = true;
let moveLeft = true;
let lineMove = true;
let move2 = true;
let move3 = true;
let move4 = true;
let move5 = false;
let move6 = false;
let move7 = false;
let move8 = false;
let move9 = false;
let move10 = false;
let move11 = false;
let move12 = false;
let move13 = false;
let move14 = false;
let move15 = false;
let move16 = false;
let move17 = false;

let centerX = 400; // Center X for rotation
let centerY = 150; // Center Y for rotation

var sca1 = 1;

let img;

function setup() {
  createCanvas(1280, 720);//1280, 720
  frameRate(100);
  angleMode(DEGREES);
  rectMode(CENTER);
  //drawGrid();
  //preload();
}

function preload() {
  img = loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREsxAWnhlPNKuKbdHRoUoqQYTmzy1yqxFTtQ&s');
}

// function drawGrid() {
//   stroke(200);
//   fill(120);

//   for (let x = 0; x < width; x += 50) {
//     line(x, 0, x, height);
//     text(x, x + 1, 12);
//   }

//   for (let y = 0; y < width; y += 50) {
//     line(0, y, width, y);
//     text(y, y + 1, 12);
//   }
// }

function draw() {
  background(255);
  image(img, width - 80, 10, 50, 50);
  noStroke();
  fill('black'); // Change the text color to red for better contrast
  textSize(9); // Adjust text size if needed
  textAlign(RIGHT, TOP); // Align the text to the top-right corner
  text("Crescendo International College", width - 10, 80);

  
  // fill('red');
  // text("Part 1 deltaTime " + deltaTime,200,200);
  // text("Part 1 frameCount " + frameCount,200,250);
  // text("Part 1 total part " + part,200,300);

  noFill();
  stroke('black');
  strokeWeight(9);

  drawBezier();
  drawCircle();

  console.log("part"+part);
  // decide which part we need to run
  if (part === 1) {
    runPart1();
  } else if (part === 2) {
    runPart2();
  } else if (part === 3) {
    runPart3();
  } else if (part === 4) {
    runPart4();
  } else if (part === 5) {
    runPart5();
  } else if (part === 6) {
    runPart6();
  }
}

function drawCircle(){
  push();
  stroke('#259DF9');
  noFill();
  strokeWeight(15);
  translate(centerX, centerY); // Move the origin to the center
  rotate(rotationAngle3);
  translate(-centerX, -centerY); // Move the origin back
  rotate(rotationAngle4);
  circle(x, y, q, r);//width and height
  pop();
}

// draw a small triangle for the last
function drawTriangle(){
  push();
  noFill();
  strokeWeight(10);
  translate(centerX, centerY); // Move the origin to the center
  rotate(rotationAngle);
  translate(-centerX, -centerY); // Move the origin back
  rotate(rotationAngle4);
  translate(centerX, centerY+110);
  scale(sca1);
  translate(-centerX, -centerY+110);
  triangle(tri1x, tri1y, tri2x, tri2y, tri3x, tri3y); // Use bezierVertex positions
  pop();
}

function drawBezier() {
  
  // the line of shadow
  push();
  translate(centerX, centerY); // Move the origin to the center
  rotate(rotationAngle2);
  translate(-centerX, -centerY); // Move the origin back
  //whole things rotate for it
  rotate(rotationAngle5);
  beginShape();
  vertex(bez1x, bez1y);
  bezierVertex(bez2x, bez2y, bez3x, bez3y, bez4x, bez4y);
  endShape();
  pop();


  // 3 line become a triangle 
  push();
  // rotate with center itself
  translate(centerX, centerY);
  rotate(rotationAngle);
  translate(-centerX, -centerY);
  //whole things rotate for triangle
  rotate(rotationAngle4);
  beginShape();
  vertex(bez1x1, bez1y1);
  bezierVertex(bez2x1, bez2y1, bez3x1, bez3y1, bez4x1, bez4y1);
  endShape();

  beginShape();
  vertex(bez1x2, bez1y2);
  bezierVertex(bez2x2, bez2y2, bez3x2, bez3y2, bez4x2, bez4y2);
  endShape();

  beginShape();
  vertex(bez1x3, bez1y3);
  bezierVertex(bez2x3, bez2y3, bez3x3, bez3y3, bez4x3, bez4y3);
  endShape();
  pop();
}



//The ball bigger and smaller
function runPart1() {
  console.log("x = "+x);
  runAnimation = true;
  if (runAnimation) {
    push();

    if (growing) {
      q = q + 5;
      y = y - 5;
      if (q > 135 && y > 320) {
        growing = false;
      }
    } else {
      q = q - 1.5;
      y = y + 1.5;
      if (q <= 50) {
        growing = true;
        runAnimation = false;
        runAnimation2 = true;
        part = 2;
        //move = true;
      }
    }
    pop();
  }
}



//move to right
function runPart2() {
  if (runAnimation2) {
    move = true;
    if (move) {
      x += 7;
      //to change the line of the triange
      bez1x3 = 433;
      bez1y3 = 340;
      bez2x3 = 380;
      bez2y3 = 240;
      bez3x3 = 365;
      bez3y3 = 220;

      if (x > 550) {
        move = false;
        runAnimation2 = false;
        part = 3;
      }
    }
  }
}



//The ball run quick to the right
function runPart3() {
  push();
  moveLeft = true;
  if (moveLeft) {

    bez1x1 -= 7;
    bez2x1 -= 7;
    bez3x1 -= 7;
    bez4x1 -= 7;

    bez1x2 -= 7;
    bez2x2 -= 7;
    bez3x2 -= 7;
    bez4x2 -= 7;

    bez1x3 -= 7;
    bez2x3 -= 7;
    bez3x3 -= 7;
    bez4x3 -= 7;

    if (bez4x2 < -5) {
      moveLeft = false;
      lineMove = true;
    }
  }

  if (lineMove) {
    bez1x -= 7;
    bez2y = 440;
    bez3y = 640;
    bez4x -= 8;
    //move2 = true;
    if (move2) {
      x -= 5;
      y -= 1.7;
      q++;
      r++;
      if (r > 90) {
        move2 = false;
      }
    }

    if (!moveLeft && !move2 && bez1x < -2 && bez4x < -2) {
      lineMove = false;
      part = 4;
    }
  }
  pop();
}



// This part is the ball boucing back animation
function runPart4() {
  move3 = true;
  push();
  if (move3) {
    //move4 = true;
    if (move4) {
      bez1x += 7;
      // bez2y = 510;
      // bez3y = 600;
      bez2y += 1.29;
      bez4x += 8;

      bez1x1 += 7;
      bez2x1 += 7;
      bez3x1 += 7;
      bez4x1 += 7;

      bez1x2 += 7;
      bez2x2 += 7;
      bez3x2 += 7;
      bez4x2 += 7;

      bez1x3 += 7;
      bez2x3 += 7;
      bez3x3 += 7;
      bez4x3 += 7;
      x-=0.5;
      //if(x<=100)
      q-=0.4;
      r-=0.4;
      console.log(r);
      if (bez4x2 >= 600) {
        move4 = false;
        move5 = true;
        console.log('Part:', part, 'bez4x2:', bez4x2);
      }
    }

    if (move5) {
      console.log(move5);
      console.log("Move5");
      bez1x3 = 600;
      bez1y3 = 640;
      bez2x3 = 550;
      bez2y3 = 540;
      bez3x3 = 440;
      bez3y3 = 360;
      if (bez1x3 >= 600) {
        move5 = false;
        move6 = true;
      }
    }

    //the ball go back
    if (move6) {
      console.log("Move6");
      x -= 8 * (frameCount*0.005);
      
      //y += 3;
      q-=0.3;
      r-=0.3;
      console.log(x);
      //r < 50
      if (x <=200) {
          move6 = false;
          move7 = true;
        }
      }
    }
    //The Inertia back
    if (move7) {
      // Decrease the rotation angle and update position until the threshold
      if (rotationAngle4 > -9) {
        x += 3;//198
        y -= 0.5;
        rotationAngle4 -= 0.3;
        rotationAngle5 -= 0.3;
        console.log("rotationAngle"+rotationAngle);
        console.log("rotationAngle2"+rotationAngle2);
      } else {
        // Once the threshold is reached, start reversing the rotation
        move7 = false;
        move8 = true; // Indicate the next movement phase
      }
    }
    // Inertia again
    if (move8) {
      // Increase the rotation angle and update position in the reverse direction
      if (rotationAngle4 < 0) {
        y+= 3;
        rotationAngle4 += 0.3;
        rotationAngle5 += 0.3;
        console.log("rotationAngle"+rotationAngle);
        console.log("rotationAngle2"+rotationAngle2);
      } else {
        move8 = false; // End the movement
        move3 = false;
        move9 = true;
        part = 5;
      }
    }
  pop();
}


// the ball become large, let the triangle change the size 
function runPart5() {
  push();
  if (move9) {
    q += 2;
    r += 2;
    y -= 1;
    if (q > 120) {
      move9 = false; 
      move10 = true;
    }
  }
  if (move10) {
    q -= 2.2;
    r -= 2.2;
    y += 1;
    console.log(q);
    if (q <= 50) {
      move10 = false; // Stop the incrementing when q exceeds 10
      move11 = true;
    }
  }
  if (move11) {
    console.log(q);
    bez1x = 260; 
    bez1y = 680;
    bez2x = 330;
    bez2y = 680;
    bez3x = 350; 
    bez3y = 680;
    bez4x = 450;
    bez4y = 680;

    //line triangle1 +40
    // bez1x1 =350; 
    bez1y1 = 190;
    bez2x1 = 160;
    bez2y1 = 310;
    bez3x1 = 115;  
    bez3y1 = 440;
    //bez4x1 = 100;
    bez4y1 = 640;

    //line triangle12
    //bez1x2 =100; 
    bez1y2 = 640;
    bez2x2 = 250;
    bez2y2 = 690;
    bez3x2 = 320; 
    bez3y2 = 740;
    //bez4x2 = 600;
    bez4y2 = 640;

    //line triangle3
     //bez1x3 = 600; 
    bez1y3 = 640;
    bez2x3 = 570;
    bez2y3 = 420;
    bez3x3 = 575; 
    bez3y3 = 370;
    //bez4x3 = 350;
    bez4y3 = 190;


    // bigger circle
    x+=3.5;//3.5
    y-=7;//7
    q+=20;
    r+=20;  
    console.log("rotationAngle"+rotationAngle);

    rotationAngle3 -=0.1;
    rotationAngle -=0.1;
    rotationAngle4 -=0.09;
    if(q > 390){
      move11 = false;
      move12 = true;
    }
  }

  if (move12) {
    if(rotationAngle >= -31){

      rotationAngle3 -=0.1;
      rotationAngle -=0.1;
      rotationAngle4 -=0.09;

      bez1x += 1.2; 
      bez4x +=0.85;

    }else{
      move12= false;
      move13= true;
    }
  }

  if(move13){
    q=30;
    console.log(rotationAngle); //-45

    //drawTriangle();

    stroke('#259DF9');
    line(line1x,line1y,line12x,line12y);
    line(line2x,line2y,line22x,line22y);
    line(line3x,line3y,line33x,line33y);
    //rotationAngle = 0;

    //line triangle1 +40
    bez1x1 = 350; 
    bez1y1 = 190;
    bez2x1 = 340;
    bez2y1 = 210;
    bez3x1 = 210;  
    bez3y1 = 440;
    bez4x1 = 100;
    bez4y1 = 640;

    //line triangle12
    bez1x2 = 100; 
    bez1y2 = 640;
    bez2x2 = 150;
    bez2y2 = 640;
    bez3x2 = 300; 
    bez3y2 = 640;
    bez4x2 = 600;
    bez4y2 = 640;

    //line triangle3
    bez1x3 = 600; 
    bez1y3 = 640;
    bez2x3 = 550;
    bez2y3 = 540;
    bez3x3 = 440; 
    bez3y3 = 360;
    bez4x3 = 350;
    bez4y3 = 190;

    // star around the circle
    line1x += 5;
    line1y -=0.1;
    line12x +=0.5;

    line2x -=4;
    line2y +=4;
    line22y +=0.2;

    line3x -= 5;
    line3y += 0.1;
    line33x -= 2;

    rotationAngle += 0.2;
    rotationAngle3 += 0.2;
    rotationAngle4 +=0.1;

    if(rotationAngle3 >= -26){
      move13=false;
      move14 = true;
    }
  } 
  if(move14){
    //+20
    drawTriangle();
    tri1x = 350;
    tri1y = 220;
    tri2x = 310;
    tri2y = 290;
    tri3x = 390;
    tri3y = 290;

    rotationAngle3 +=1;
    rotationAngle +=1;
    rotationAngle4 +=0.3;

    bez1x -=5; 
    bez4x -=5;
    
    if(rotationAngle3 >= 25){
      move14=false; 
      move15 = true;
    }
  } if(move15){
    drawTriangle();
    tri1x = 350;
    tri1y = 220;
    tri2x = 310;
    tri2y = 290;
    tri3x = 390;
    tri3y = 290;

    rotationAngle3 -=3.5;
    rotationAngle -=3.5;
    rotationAngle4 -=0.08;
    console.log(rotationAngle3);
    y +=27;
    x -= 2;
    //line triangle1
    bez1y1 += 27;
    bez2y1 += 27.1;
    bez3y1 += 27.7;
    bez4y1 += 28.3;

    //line triangle12
    bez1y2 += 28.3;
    bez2y2 += 27.7; 
    bez3y2 += 27.1;
    bez4y2 += 27;

    //line triangle3
    bez1y3  += 27;
    bez2y3  += 27;
    bez3y3  += 27;
    bez4y3  += 27;

    bez1x -=5; 
    bez4x -=5;
    
    if(rotationAngle4 <= -10){
      move15=false; 
      move16 = true;
    }
  }
  if (move16) {
    //increase y until it reaches or exceeds 850
    if (y < 700) {
      y += 5;
      console.log("y: " + y);
    } else {
      //if y is 850 or more, start decreasing x
      x -= 5;
      q +=1.5;
      console.log("x: " + x + "and" + q);
    }

    // Stop the movement when x is 250 or less
    if (x <= 250) {
      move16 = false;
      move17 = true;
      part = 6;
    }
  }
  pop();
} 
 

function runPart6(){
    if (move17) {
      // Reset all variables to their initial values
      push();
      frameCount = 0;
      q = 50;
      r = 50;
      x = 250;
      y = 605;
      
      // line shadow
      bez1x =430; 
      bez1y = 335;
      bez2x = 549;
      bez2y = 550;
      bez3x = 600; 
      bez3y = 640;
      bez4x = 600;
      bez4y = 640;

      //line triangle 1
      bez1x1 = 350; 
      bez1y1 = 190;
      bez2x1 = 340;
      bez2y1 = 210;
      bez3x1 = 210;  
      bez3y1 = 440;
      bez4x1 = 100;
      bez4y1 = 640;
  
      //line triangle12
      bez1x2 = 100; 
      bez1y2 = 640;
      bez2x2 = 150;
      bez2y2 = 640;
      bez3x2 = 300; 
      bez3y2 = 640;
      bez4x2 = 600;
      bez4y2 = 640;
  
      //line triangle3
      bez1x3 = 600; 
      bez1y3 = 640;
      bez2x3 = 550;
      bez2y3 = 540;
      bez3x3 = 440; 
      bez3y3 = 360;
      bez4x3 = 350;
      bez4y3 = 190;
      
      // the small triangle
      tri1x = 320;
      tri1y = 240;
      tri2x = 70;
      tri2y = 690;
      tri3x = 570;
      tri3y = 690;
      

      // the line when the ball smaller immedially in the last
      line1x = 580;
      line1y = 120;
      line12x = 700;
      line12y = 110;
      line2x = 510;
      line2y = 210;
      line22x = 480;
      line22y = 240;
      line3x = 480;
      line3y = 150;
      line33x = 380;
      line33y = 140;
      
      // the move and inertia
       rotationAngle = 0;
       rotationAngle2 = 0;
       rotationAngle3 = 0;
       rotationAngle4 = 0;
       rotationAngle5 = 0;

       // Movement/step start and end 
       growing = true;
       move = false;
       runAnimation = true;  // Flag to control animation
       runAnimation2 = true;
       moveLeft = true;
       lineMove = true;
       move2 = true;
       move3 = true;
      move4 = true;
       move5 = false;
       move6 = false;
       move7 = false;
       move8 = false;
       move9 = false;
       move10 = false;
       move11 = false;
       move12 = false;
       move13 = false;
       move14 = false;
       move15 = false;
       move16 = false;
       //move17 = false;
      
       // the point to control the rotate center point
      centerX = 400; // Center X for rotation
      centerY = 150; // Center Y for rotation
       
      sca1 = 1;
      part = 1;
      if(part = 1){
        move17 = false;
      }
    }
    pop();
}

  




