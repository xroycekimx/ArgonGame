var nowFocused = ""; 
var rotZ = 0;
var scaleNum = 1;
var score = 0;
var alienNum = 15;
var bulletNum = 15;

var secondLocation = [false, false, false];

function main() {

  AFRAME.registerComponent('alien-listener', {
    init: function () {

      this.el.addEventListener('mouseenter', function (evt) {
        // console.log("focus");
        this.setAttribute('material', 'opacity', 0.1);
        nowFocused = this.id;
        rotZ = this.getAttribute('rotation').z;       
      });

      this.el.addEventListener('mouseleave', function (evt) {
        this.setAttribute('material', 'opacity', 1.0);
        nowFocused = "";
      });
    },
  });

  // var arScene = document.querySelector('a-scene');
  // var content = document.querySelector('#game');

  // // the ar-camera has an argon reference frame attached, so when it gets it's first value,
  // // we'll get this event
  // arScene.addEventListener("referenceframe-statuschanged", function () {
  //   var camera = document.querySelector('a-camera');
  //   var vec = camera.object3D.getWorldDirection();
  //   vec.multiplyScalar(-10);
  //   vec.y -= 1;
  //   content.setAttribute("position", {x: vec.x, y: vec.y, z: vec.z});
  // });
}

function playGunshot() {
  var gunAudio = document.getElementById("gunAudio");
  gunAudio.play();

  bulletNum = bulletNum-1;

   if(nowFocused != ""){ 
       var focusedObjtect = document.getElementById(nowFocused);

       if (rotZ == 80){
            console.log(rotZ);
            focusedObjtect.parentNode.removeChild(focusedObjtect);
            alienNum = alienNum -1;
            score = score + 10;

            var pointsAudio = document.getElementById("gotPonitsAudio");
            pointsAudio.play();
        }
        
        else{
            rotZ += 40;
            scaleNum = scaleNum - 0.1;
            console.log("shoot");
           
             // ROTATION   
            focusedObjtect.setAttribute("rotation", {x: 0, y: 0, z: rotZ}); 
            focusedObjtect.setAttribute("scale", {x:scaleNum, y:scaleNum, z:scaleNum}); 
        } 
   }
   else {
        console.log("You are not focus anything");
   }

  updateGUI();
  checkBullets();
  leadNext();
}

function updateGUI(){

  if (score < 10){
    var nodeScore = document.getElementById("scoreArea");
    nodeScore.innerHTML = "<div>00" + score + "</div>"; 
  }
  
  else if (score < 100){
     var nodeScore = document.getElementById("scoreArea");
     nodeScore.innerHTML = "<div>0" + score + "</div>"; 
  }

  else{
    var nodeScore = document.getElementById("scoreArea");
    nodeScore.innerHTML = "<div>" + score + "</div>"; 
  }
  

  var nodeAlien = document.getElementById("alienArea");
  nodeAlien.innerHTML = "<div>" + alienNum+ "/15</div>";

  var nodeBullet = document.getElementById("bulletArea");  
  nodeBullet.innerHTML = "<div>" + bulletNum+ "/15</div>";
  
}

function checkBullets(){
  if (bulletNum <= 0){
        var hideButton = document.getElementById("button");
        hideButton.innerHTML = "";
        console.log("no bullets");
  }
}

function reload(){
  var reloadAudio = document.getElementById("reloadAudio");
  reloadAudio.play();

  bulletNum = 15;
  var showButton = document.getElementById("button");
  showButton.innerHTML = "<img id='bt' src='../../resources/images/button.png' width='50px' height='100px' onclick='playGunshot()'>";
  console.log("reload bullets");

  var nodeBullet = document.getElementById("bulletArea");  
  nodeBullet.innerHTML = "<div>" + bulletNum+ "/20</div>";
}

function leadNext(){
  var alien01 = document.getElementsByClassName("alien01");
  console.log(alien01.length);

  var alien02 = document.getElementsByClassName("alien02");
  console.log(alien02.length);

  var alien03 = document.getElementsByClassName("alien03");
  console.log(alien03.length);

  var alien = [alien01.length, alien02.length, alien03.length];
  var next = ["Student Center.","library","Culc"]

  for (i = 0; i < alien.length; i++) { 
    if (alien[i] == 0) {
      window.alert("Go to " + next[i] +".");
      secondLocation[i] = true;
      }
    }
}
    

function ShowSecond{
  if (secondLocation[0] ==true){
           
  }
}