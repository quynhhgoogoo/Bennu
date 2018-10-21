 var myGamePiece; //initialize object
 var myObstacles = []; //initialize obstacles

 var images = ["img/earth.png", "img/sumu4.jpg", "img/jupiter.jpg", "img/saturn.jpg", "img/uranus.jpg", "img/Neptune.jpg", "img/sun.jpg", "img/sumu1.jpg", "img/sumu2.jpg", "img/sumu3.jpg", "img/sumu5.jpg", "img/sumu6.jpg"];
 var texts = ["Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Sun", "Mercury", "Venus", "Starry Sumu", "Milky Way", "Galaxy"];


 var myScore; //initialize score

 var mySound;
 var myMusic;

 var nextObstacle = 1;
 var imageIndex = 0;

 function startGame() {
     myGameArea.start();
     myGamePiece = new component(64, 44, "img/ship.png", 300, 300, "image");
     //myObstacle = new component(310, 360, "pipe.png", 300, 120, "image");
     myBackground = new component(1200, 580, "img/background.png", 0, 0, "image");
     myScore = new component("30px", "Consolas", "white", 280, 40, "text");
     myText = new component("30px", "Consolas", "white", 100, 100, "text");
     myText.text = "Welcome to " + texts[0];
     //myStatus = new component("30px", "Consolas", "white", 100, 100, "text");

     mySound = new sound("sound/boom.mp3");
     myMusic = new sound("sound/flightsound.mp3");
     myMusic.play();
     myGameArea.start();
 }
 var myGameArea = {
     canvas: document.getElementById("myCanvas"),
     start: function() {
         this.canvas.width = 1200;
         this.canvas.height = 580;
         this.context = this.canvas.getContext("2d");
         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
         this.frameNo = 0; //display score in seperated canvas area
         this.interval = setInterval(updateGameArea, 20);
         window.addEventListener('keydown', function(e) {
             myGameArea.keys = (myGameArea.keys || []);
             myGameArea.keys[e.keyCode] = (e.type == "keydown");
         })
         window.addEventListener('keyup', function(e) {
             myGameArea.keys[e.keyCode] = (e.type == "keydown");
         })
     },
     clear: function() {
         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
     },
     stop: function() {
         //console.log('stop() called.');
     },

 }

 function component(width, height, color, x, y, type) {
     this.type = type;
     if (type == "image") {
         this.image = new Image();
         this.image.src = color;
     }
     this.gamearea = myGameArea;
     this.score = 0;
     this.width = width;
     this.height = height;
     this.speedX = 0;
     this.speedY = 2;
     this.gravity = 4;
     this.gravitySpeed = 0;
     this.x = x;
     this.y = y;
     this.update = function() {
         ctx = myGameArea.context;
         if (type == "image") {
             ctx.drawImage(this.image,
                 this.x,
                 this.y,
                 this.width, this.height);

         } else if (type == "rock") {
             ctx.save();
             ctx.rotate(45 * Math.PI / 180);
             ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
             ctx.restore();
         } else if (this.type == "text") {
             ctx.font = this.width + " " + this.height;
             ctx.fillStyle = color;
             ctx.fillText(this.text, this.x, this.y);
         } else {
             ctx.fillStyle = color;
             ctx.fillRect(this.x, this.y, this.width, this.height);
         }
     }
     this.newPos = function() {
         this.gravitySpeed = this.gravity;
         this.x += this.speedX;
         this.y += this.speedY + this.gravitySpeed;
         this.hitBottom();
     }
     this.hitBottom = function() {
         var rockbottom = myGameArea.canvas.height - this.height;
         if (this.y > rockbottom) {
             this.y = rockbottom;
         }
         if (this.y < 0) {
             this.y = 0;
         }

     }

     this.crashWith = function(otherobj) {
         var crashingDistance = (this.height + otherobj.height) * 0.5;
         var shipCenterX = this.x + (this.width / 2);
         var shipCenterY = this.y + (this.height / 2);
         var rockCenterX = otherobj.x + (otherobj.width / 2);
         var rockCenterY = otherobj.y + (otherobj.height / 2);
         var distanceX = shipCenterX - rockCenterX;
         var distanceY = shipCenterY - rockCenterY;
         var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
         return (distance < crashingDistance);

         var myleft = this.x;
         var myright = this.x + (this.width);
         var mytop = this.y;
         var mybottom = this.y + (this.height);
         var otherleft = otherobj.x;
         var otherright = otherobj.x + (otherobj.width);
         var othertop = otherobj.y;
         var otherbottom = otherobj.y + (otherobj.height);
         var crash = true;
         if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
             crash = false;
         }
         return crash;
     }
 }



 function updateGameArea() {
     var x, height, gap, minHeight, maxHeight, minGap, maxGap;
     for (i = 0; i < myObstacles.length; i += 1) {
         if (myGamePiece.crashWith(myObstacles[i])) {
             document.getElementById("playAgain").style.display = "block";
             //mySound.play();
             myGameArea.stop();
             x
             return;
         }
     }
     myGameArea.clear();
     myBackground.newPos();
     myBackground.update();
     myGameArea.frameNo += 1;
     if (myGameArea.frameNo == nextObstacle) {
         minInt = 230;
         maxInt = 350;
         Int = Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
         nextObstacle += Int;
         x = myGameArea.canvas.width;
         minHeight = 50;
         maxHeight = 138;
         height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
         minGap = 110;
         maxGap = 250;
         gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
         minY = 0;
         maxY = 380;
         y = Math.floor(Math.random() * (maxY - minY + 1) + minY);
         myObstacles.push(new component(200, 200, "img/bennu.png", x, y, "image"));
         //myObstacles.push(new component(150, x - height - gap, "img/meteors.png", x, height + gap, "image"));
     }
     if (myGameArea.frameNo > 0 && everyinterval(1000)) {
         change();

     }
     /*if (myGameArea.frameNo > 0 && everyinterval(400)) {
         changeBackground();
     }*/
     myGamePiece.speedX = 0;
     myGamePiece.speedY = 0;
     if (myGameArea.keys && myGameArea.keys[32]) {
         myGamePiece.speedY = -10;
     }
     for (i = 0; i < myObstacles.length; i += 1) {
         myObstacles[i].x += -1;
         myObstacles[i].update();
     }
     myText.update();
     myScore.text = "SCORE: " + myGameArea.frameNo;
     myScore.update();
     myGamePiece.newPos();
     myGamePiece.update();
 }

 function clearmove() {
     myGamePiece.image.src = "img/bennu_ship.png";
     myGamePiece.image.src = "img/meteors.png"
     myGamePiece.speedX = 0;
     myGamePiece.speedY = 0;
 }

 function everyinterval(n) {
     if ((myGameArea.frameNo / n) % 1 == 0) {
         return true;
     }
     return false;
 }

 function refreshPage() {
     window.location.reload();
 }

 function change() {
     imageIndex++;
     if (imageIndex >= images.length) {
         imageIndex = 0;
     }

     var imgUrl = images[imageIndex];
     var textUrl = texts[imageIndex];
     myBackground.image.src = imgUrl;
     myText.text = "Welcome to the " + textUrl;
     // myText=new component("30px", "Consolas", "white", 0, 0, textUrl, "text");
     // myBackground=new component(1200, 580, imgUrl, 0, 0, "image");
 }