let img;
let Animation1;
const m = 0;

function setup() {
  createCanvas(1280, 720);
  frameRate(100);
  angleMode(DEGREES);
  rectMode(CENTER);
  Animation1 = new Animation();
}

function preload() {
  img = loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREsxAWnhlPNKuKbdHRoUoqQYTmzy1yqxFTtQ&s');
}


function draw() {
  if (m == 0){
    Animation1.draw();
  }

}

class Animation {
  constructor() {
    //this.frameCoun = 0;
    this.q = 50;
    this.r = 50;
    this.x = 250;
    this.y = 605;

    this.bezierCoords = {
      shadow: [
        { x: 430, y: 335 }, { x: 549, y: 550 },
        { x: 600, y: 640 }, { x: 600, y: 640 }
      ],
      triangle1: [
        { x: 350, y: 190 }, { x: 340, y: 210 },
        { x: 210, y: 440 }, { x: 100, y: 640 }
      ],
      triangle2: [
        { x: 100, y: 640 }, { x: 150, y: 640 },
        { x: 300, y: 640 }, { x: 600, y: 640 }
      ],
      triangle3: [
        { x: 600, y: 640 }, { x: 550, y: 540 },
        { x: 440, y: 360 }, { x: 350, y: 190 }
      ]
    };

    this.triangleCoords = [
      { x: 320, y: 240 },
      { x: 70, y: 690 },
      { x: 570, y: 690 }
    ];

    this.lineCoords = [
      { startX: 580, startY: 120, endX: 700, endY: 110 },
      { startX: 510, startY: 210, endX: 480, endY: 240 },
      { startX: 480, startY: 150, endX: 380, endY: 140 }
    ];

    this.rotationAngle = 0;
    this.rotationAngle2 = 0;
    this.rotationAngle3 = 0;
    this.rotationAngle4 = 0;
    this.rotationAngle5 = 0;
    this.part = 1;
    this.growing = true;
    this.move = false;
    this.runAnimation = true;
    this.runAnimation2 = true;
    this.moveLeft = true;
    this.lineMove = true;
    this.move2 = true;
    this.move3 = true;
    this.move4 = true;
    this.move5 = false;
    this.move6 = false;
    this.move7 = false;
    this.move8 = false;
    this.move9 = false;
    this.move10 = false;
    this.move11 = false;
    this.move12 = false;
    this.move13 = false;
    this.move14 = false;
    this.move15 = false;
    this.move16 = false;
    this.move17 = false;

    this.centerX = 400;
    this.centerY = 150;

    this.sca1 = 1;
  }

  drawCircle() {
    push();
    stroke('#259DF9');
    noFill();
    strokeWeight(15);
    translate(this.centerX, this.centerY);
    rotate(this.rotationAngle3);
    translate(-this.centerX, -this.centerY);
    rotate(this.rotationAngle4);
    circle(this.x, this.y, this.q, this.r);
    pop();
  }

  drawTriangle() {
    push();
    noFill();
    strokeWeight(10);
    translate(this.centerX, this.centerY);
    rotate(this.rotationAngle);
    translate(-this.centerX, -this.centerY);
    rotate(this.rotationAngle4);
    translate(this.centerX, this.centerY + 110);
    scale(this.sca1);
    translate(-this.centerX, -this.centerY + 110);
    triangle(
      this.triangleCoords[0].x, this.triangleCoords[0].y,
      this.triangleCoords[1].x, this.triangleCoords[1].y,
      this.triangleCoords[2].x, this.triangleCoords[2].y
    );
    pop();
  }

  drawBezier() {
    push();
    translate(this.centerX, this.centerY);
    rotate(this.rotationAngle2);
    translate(-this.centerX, -this.centerY);
    rotate(this.rotationAngle5);
    beginShape();
    vertex(this.bezierCoords.shadow[0].x, this.bezierCoords.shadow[0].y);
    bezierVertex(this.bezierCoords.shadow[1].x, this.bezierCoords.shadow[1].y,
      this.bezierCoords.shadow[2].x, this.bezierCoords.shadow[2].y,
      this.bezierCoords.shadow[3].x, this.bezierCoords.shadow[3].y);
    endShape();
    pop();

    push();
    translate(this.centerX, this.centerY);
    rotate(this.rotationAngle);
    translate(-this.centerX, -this.centerY);
    rotate(this.rotationAngle4);
    beginShape();
    vertex(this.bezierCoords.triangle1[0].x, this.bezierCoords.triangle1[0].y);
    bezierVertex(this.bezierCoords.triangle1[1].x, this.bezierCoords.triangle1[1].y,
      this.bezierCoords.triangle1[2].x, this.bezierCoords.triangle1[2].y,
      this.bezierCoords.triangle1[3].x, this.bezierCoords.triangle1[3].y);
    endShape();

    beginShape();
    vertex(this.bezierCoords.triangle2[0].x, this.bezierCoords.triangle2[0].y);
    bezierVertex(this.bezierCoords.triangle2[1].x, this.bezierCoords.triangle2[1].y,
      this.bezierCoords.triangle2[2].x, this.bezierCoords.triangle2[2].y,
      this.bezierCoords.triangle2[3].x, this.bezierCoords.triangle2[3].y);
    endShape();

    beginShape();
    vertex(this.bezierCoords.triangle3[0].x, this.bezierCoords.triangle3[0].y);
    bezierVertex(this.bezierCoords.triangle3[1].x, this.bezierCoords.triangle3[1].y,
      this.bezierCoords.triangle3[2].x, this.bezierCoords.triangle3[2].y,
      this.bezierCoords.triangle3[3].x, this.bezierCoords.triangle3[3].y);
    endShape();
    pop();
  }

  // draw 3 short line
  drawShortLine(){
    stroke('#259DF9');
    line(this.lineCoords[0].startX,this.lineCoords[0].startY,this.lineCoords[0].endX,this.lineCoords[0].endY);
    line(this.lineCoords[1].startX,this.lineCoords[1].startY,this.lineCoords[1].endX,this.lineCoords[1].endY);
    line(this.lineCoords[2].startX,this.lineCoords[2].startY,this.lineCoords[2].endX,this.lineCoords[2].endY);
  }

  draw() {
    background(255);
    image(img, width - 80, 10, 50, 50);
    noStroke();
    fill('black');
    textSize(9);
    textAlign(RIGHT, TOP);
    text("Crescendo International College", width - 10, 80);

    noFill();
    stroke('black');
    strokeWeight(9);

    this.drawBezier();
    this.drawCircle();

    if (this.part === 1) {
      this.runPart1();
    } else if (this.part === 2) {
      this.runPart2();
    } else if (this.part === 3) {
      this.runPart3();
    } else if (this.part === 4) {
      this.runPart4();
    } else if (this.part === 5) {
      this.runPart5();
    } else if (this.part === 6) {
      this.runPart6();
    }
  }

  runPart1() {
    if (this.runAnimation) {
      push();
      if (this.growing) {
        this.q += 5;
        this.y -= 5;
        if (this.q > 135 && this.y > 320) {
          this.growing = false;
        }
      } else {
        this.q -= 1.5;
        this.y += 1.5;
        if (this.q <= 50) {
          this.growing = true;
          this.runAnimation = false;
          this.runAnimation2 = true;
          this.part = 2;
        }
      }
      pop();
    }
  }

  runPart2() {
    if (this.runAnimation2) {
      this.move = true;
      if (this.move) {
        this.x += 7;
        this.bezierCoords.triangle3[0].x = 433;
        this.bezierCoords.triangle3[0].y = 340;
        this.bezierCoords.triangle3[1].x = 380;
        this.bezierCoords.triangle3[1].y = 240;
        this.bezierCoords.triangle3[2].x = 365;
        this.bezierCoords.triangle3[2].y = 220;

        if (this.x > 550) {
          this.runAnimation2 = false;
          this.runAnimation3 = true;
          this.part = 3;
        }
      }
    }
  }

  runPart3() {
    push();
    console.log("runPart 3") 
    this.moveLeft = true;
    if (this.moveLeft) {
      
      for(let i = 0; i<4;i++){
        this.bezierCoords.triangle1[i].x -= 7;
      }
      for(let i = 0; i<4;i++){
        this.bezierCoords.triangle2[i].x -= 7;
      }
      for(let i = 0; i<4;i++){
        this.bezierCoords.triangle3[i].x -= 7;
      }

  
      if (this.bezierCoords.triangle2[3].x < -5) {
        this.moveLeft = false;
        this.lineMove = true;
      }
    }
  
    if (this.lineMove) {
      this.bezierCoords.shadow[0].x  -= 7;
      this.bezierCoords.shadow[1].y  = 440;
      this.bezierCoords.shadow[2].y  = 640;
      this.bezierCoords.shadow[3].x  -= 8;
      //move2 = true;
      if (this.move2) {
        this.x -= 5;
        this.y -= 1.7;
        this.q++;
        this.r++;
        if (this.r > 90) {
          this.move2 = false;
        }
      }
  
      if (!this.moveLeft && !this.move2 && this.bezierCoords.shadow[0].x < -2 && this.bezierCoords.shadow[3].x < -2) {
        this.lineMove = false;
        this.part = 4;
      }
    }
    pop();
  }
  

  runPart4() {
    console.log("Part4")
    this.move3 = true;
    push();
    if (this.move3) {
      //move4 = true;
      if (this.move4) {
        this.bezierCoords.shadow[0].x += 7;
        this.bezierCoords.shadow[1].y += 1.29;
        this.bezierCoords.shadow[3].x += 8;
        
        for(let i = 0; i<4;i++){
          this.bezierCoords.triangle1[i].x += 7;
        }
        for(let i = 0; i<4;i++){
          this.bezierCoords.triangle2[i].x += 7;
        }
        for(let i = 0; i<4;i++){
          this.bezierCoords.triangle3[i].x += 7;
        }

        this.x-=0.5;
        //if(x<=100)
        this.q-=0.4;
        this.r-=0.4;
        if (this.bezierCoords.triangle2[3].x >= 600) {
          this.move4 = false;
          this.move5 = true;
        }
      }
  
      if (this.move5) {
        this.bezierCoords.triangle3[0].x = 600;
        this.bezierCoords.triangle3[0].y = 640;
        this.bezierCoords.triangle3[1].x = 550;
        this.bezierCoords.triangle3[1].y = 540;
        this.bezierCoords.triangle3[2].x = 440;
        this.bezierCoords.triangle3[2].x = 360;
        if (this.bezierCoords.triangle3[0].x >= 600) {
          this.move5 = false;
          this.move6 = true;
        }
      }
  
      //the ball go back
      if (this.move6) {
        this.x -= 8 * (frameCount*0.005);
        
        //y += 3;
        this.q-=0.3;
        this.r-=0.3;
        //r < 50
        if (this.x <=200) {
          this.move6 = false;
          this.move7 = true;
          }
        }
      }
      //The Inertia back
      if (this.move7) {
        // Decrease the rotation angle and update position until the threshold
        if (this.rotationAngle4 > -9) {
          this.x += 3;//198
          this.y -= 0.5;
          this.rotationAngle4 -= 0.3;
          this.rotationAngle5 -= 0.3;
        } else {
          // Once the threshold is reached, start reversing the rotation
          this.move7 = false;
          this.move8 = true; // Indicate the next movement phase
        }
      }
      // Inertia again
      if (this.move8) {
        // Increase the rotation angle and update position in the reverse direction
        if (this.rotationAngle4 < 0) {
          this.y+= 3;
          this.rotationAngle4 += 0.3;
          this.rotationAngle5 += 0.3;
        } else {
          this.move8 = false; // End the movement
          this.move3 = false;
          this.move9 = true;
          this.part = 5;
        }
      }
    pop();

  }

  runPart5() {
    console.log("Part5")
    push();
    if (this.move9) {
      this.q += 2;
      this.r += 2;
      this.y -= 1;
      if (this.q > 120) {
        this.move9 = false; 
        this.move10 = true;
      }
    }
    if (this.move10) {
      this.q -= 2.2;
      this.r -= 2.2;
      this.y += 1;
      if (this.q <= 50) {
        this.move10 = false; // Stop the incrementing when q exceeds 10
        this.move11 = true;
      }
    }
    if (this.move11) {
      this.bezierCoords.shadow[0].x = 260; 
      this.bezierCoords.shadow[0].y = 680;
      this.bezierCoords.shadow[1].x = 330;
      this.bezierCoords.shadow[1].y = 680;
      this.bezierCoords.shadow[2].x = 350; 
      this.bezierCoords.shadow[2].y = 680;
      this.bezierCoords.shadow[3].x = 450;
      this.bezierCoords.shadow[3].y = 680;
  
      //line triangle1 +40
      // bez1x1 =350; 
      this.bezierCoords.triangle1[0].y = 190;
      this.bezierCoords.triangle1[1].x = 160;
      this.bezierCoords.triangle1[1].y = 310;
      this.bezierCoords.triangle1[2].x = 115;  
      this.bezierCoords.triangle1[2].y = 440;
      //bez4x1 = 100;
      this.bezierCoords.triangle1[3].y = 640;
  
      //line triangle12
      //bez1x2 =100; 
      this.bezierCoords.triangle2[0].y = 640;
      this.bezierCoords.triangle2[1].x = 250;
      this.bezierCoords.triangle2[1].y = 690;
      this.bezierCoords.triangle2[2].x = 320; 
      this.bezierCoords.triangle2[2].y = 740;
      //bez4x2 = 600;
      this.bezierCoords.triangle2[3].y = 640;
  
      //line triangle3
       //bez1x3 = 600; 
      this.bezierCoords.triangle3[0].y = 640;
      this.bezierCoords.triangle3[1].x = 570;
      this.bezierCoords.triangle3[1].y = 420;
      this.bezierCoords.triangle3[2].x = 575; 
      this.bezierCoords.triangle3[2].y = 370;
      //bez4x3 = 350;
      this.bezierCoords.triangle3[3].y = 190;
  
  
      // bigger circle
      this.x+=3.5;//3.5
      this.y-=7;//7
      this.q+=20;
      this.r+=20;  
  
      this.rotationAngle3 -=0.1;
      this.rotationAngle -=0.1;
      this.rotationAngle4 -=0.09;
      if(this.q > 390){
        this.move11 = false;
        this.move12 = true;
      }
    }
  
    if (this.move12) {
      if(this.rotationAngle >= -31){
  
        this.rotationAngle3 -=0.1;
        this.rotationAngle -=0.1;
        this.rotationAngle4 -=0.09;
  
        this.bezierCoords.shadow[0].x += 1.2; 
        this.bezierCoords.shadow[3].x +=0.85;
  
      }else{
        this.move12= false;
        this.move13= true;
      }
    }
  
    if(this.move13){
      this.q=30;
      //console.log(rotationAngle); //-45
  
      //drawTriangle();
  
      //rotationAngle = 0;
  
      //line triangle1 +40
      this.bezierCoords.triangle1[0].x = 350; 
      this.bezierCoords.triangle1[0].y = 190;
      this.bezierCoords.triangle1[1].x = 340;
      this.bezierCoords.triangle1[1].y = 210;
      this.bezierCoords.triangle1[2].x = 210;  
      this.bezierCoords.triangle1[2].y = 440;
      this.bezierCoords.triangle1[3].x = 100;
      this.bezierCoords.triangle1[3].y = 640;
  
      //line triangle12
      this.bezierCoords.triangle2[0].x = 100; 
      this.bezierCoords.triangle2[0].y = 640;
      this.bezierCoords.triangle2[1].x = 150;
      this.bezierCoords.triangle2[1].y = 640;
      this.bezierCoords.triangle2[2].x = 300; 
      this.bezierCoords.triangle2[2].y = 640;
      this.bezierCoords.triangle2[3].x = 600;
      this.bezierCoords.triangle2[3].y = 640;
  
      //line triangle3
      this.bezierCoords.triangle3[0].x = 600; 
      this.bezierCoords.triangle3[0].y = 640;
      this.bezierCoords.triangle3[1].x = 550;
      this.bezierCoords.triangle3[1].y = 540;
      this.bezierCoords.triangle3[2].x = 440; 
      this.bezierCoords.triangle3[2].y = 360;
      this.bezierCoords.triangle3[3].x = 350;
      this.bezierCoords.triangle3[3].y = 190;
  
      // star around the circle
      this.lineCoords[0].startX += 5;
      this.lineCoords[0].startY -=0.1;
      this.lineCoords[0].endX +=0.5;
  
      this.lineCoords[1].startX -=4;
      this.lineCoords[1].startY +=4;
      this.lineCoords[1].endX +=0.2;
  
      this.lineCoords[2].startX -= 5;
      this.lineCoords[2].startY += 0.1;
      this.lineCoords[2].endX -= 2;
  
      this.rotationAngle += 0.2;
      this.rotationAngle3 += 0.2;
      this.rotationAngle4 +=0.1;
  
      if(this.rotationAngle3 >= -26){
        this.move13=false;
        this.move14 = true;
      }
    } 
    if(this.move14){
      //+20
      this.drawTriangle();
      this.triangleCoords[0].x = 350;
      this.triangleCoords[0].y = 220;
      this.triangleCoords[1].x = 310;
      this.triangleCoords[1].y = 290;
      this.triangleCoords[2].x = 390;
      this.triangleCoords[2].y = 290;
  
      this.rotationAngle3 +=1;
      this.rotationAngle +=1;
      this.rotationAngle4 +=0.3;
  
      this.bezierCoords.shadow[0].x  -=5; 
      this.bezierCoords.shadow[3].x  -=5;
      
      if(this.rotationAngle3 >= 25){
        this.move14=false; 
        this.move15 = true;
      }
    } if(this.move15){
      this.drawTriangle();
      this.triangleCoords[0].x = 350;
      this.triangleCoords[0].y = 220;
      this.triangleCoords[1].x = 310;
      this.triangleCoords[1].y = 290;
      this.triangleCoords[2].x = 390;
      this.triangleCoords[2].y = 290;
  
      this.rotationAngle3 -=3.5;
      this.rotationAngle -=3.5;
      this.rotationAngle4 -=0.08;
      this.y +=27;
      this.x -= 2;
      //line triangle1
      this.bezierCoords.triangle1[0].y += 27;
      this.bezierCoords.triangle1[1].y  += 27.1;
      this.bezierCoords.triangle1[2].y  += 27.7;
      this.bezierCoords.triangle1[3].y  += 28.3;
  
      //line triangle12
      this.bezierCoords.triangle2[0].y  += 28.3;
      this.bezierCoords.triangle2[1].y  += 27.7; 
      this.bezierCoords.triangle2[2].y  += 27.1;
      this.bezierCoords.triangle2[3].y  += 27;
  
      //line triangle3
      this.bezierCoords.triangle3[0].y  += 27;
      this.bezierCoords.triangle3[1].y   += 27;
      this.bezierCoords.triangle3[2].y  += 27;
      this.bezierCoords.triangle3[3].y  += 27;
  
      this.bezierCoords.shadow[0].x -=5; 
      this.bezierCoords.shadow[3].x -=5;
      
      if(this.rotationAngle4 <= -10){
        this.move15=false; 
        this.move16 = true;
      }
    }
    if (this.move16) {
      //increase y until it reaches or exceeds 850
      if (this.y < 700) {
        this.y += 5;
        
      } else {
        //if y is 850 or more, start decreasing x
        this.x -= 5;
        this.q +=1.5;
      }
  
      // Stop the movement when x is 250 or less
      if (this.x <= 250) {
        this.move16 = false;
        this.move17 = true;
        this.part = 6;
        console.log("part6");
      }
    }
    pop();
  }

  runPart6() {
    frameCount=0;
    this.q = 50;
    this.r = 50;
    this.x = 250;
    this.y = 605;

    this.bezierCoords = {
      shadow: [
        { x: 430, y: 335 }, { x: 549, y: 550 },
        { x: 600, y: 640 }, { x: 600, y: 640 }
      ],
      triangle1: [
        { x: 350, y: 190 }, { x: 340, y: 210 },
        { x: 210, y: 440 }, { x: 100, y: 640 }
      ],
      triangle2: [
        { x: 100, y: 640 }, { x: 150, y: 640 },
        { x: 300, y: 640 }, { x: 600, y: 640 }
      ],
      triangle3: [
        { x: 600, y: 640 }, { x: 550, y: 540 },
        { x: 440, y: 360 }, { x: 350, y: 190 }
      ]
    };

    this.triangleCoords = [
      { x: 320, y: 240 },
      { x: 70, y: 690 },
      { x: 570, y: 690 }
    ];

    this.lineCoords = [
      { startX: 580, startY: 120, endX: 700, endY: 110 },
      { startX: 510, startY: 210, endX: 480, endY: 240 },
      { startX: 480, startY: 150, endX: 380, endY: 140 }
    ];

    this.rotationAngle = 0;
    this.rotationAngle2 = 0;
    this.rotationAngle3 = 0;
    this.rotationAngle4 = 0;
    this.rotationAngle5 = 0;
    this.part = 1;
    this.growing = true;
    this.move = false;
    this.runAnimation = true;
    this.runAnimation2 = true;
    this.moveLeft = true;
    this.lineMove = true;
    this.move2 = true;
    this.move3 = true;
    this.move4 = true;
    this.move5 = false;
    this.move6 = false;
    this.move7 = false;
    this.move8 = false;
    this.move9 = false;
    this.move10 = false;
    this.move11 = false;
    this.move12 = false;
    this.move13 = false;
    this.move14 = false;
    this.move15 = false;
    this.move16 = false;
    this.move17 = false;

    this.centerX = 400;
    this.centerY = 150;

    this.sca1 = 1;
  }
}


