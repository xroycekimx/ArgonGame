var nowFocused = ""; 
var rotZ = 0;
var scaleNum = 1;
var score = 0;
var alienNum = 20;
var bulletNum = 20;

function main() {

  AFRAME.registerComponent('alien-listener', {
    init: function () {

      this.el.addEventListener('mouseenter', function (evt) {
        console.log("focus");
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


  var arScene = document.querySelector('ar-scene');
  var content = document.querySelector('#game');

  // the ar-camera has an argon reference frame attached, so when it gets it's first value,
  // we'll get this event
  arScene.addEventListener("referenceframe-statuschanged", function () {
    var camera = document.querySelector('ar-camera');
    var vec = camera.object3D.getWorldDirection();
    vec.multiplyScalar(-10);
    vec.y -= 1;
    content.setAttribute("position", {x: vec.x, y: vec.y, z: vec.z});
  });
}

function playGunshot() {
  var gunAudio = document.getElementById("gunAudio");
  gunAudio.play();

  bulletNum = bulletNum-1;

   if(nowFocused != ""){ 
       var focusedObjtect = document.getElementById(nowFocused);

       if (rotZ == 200){
            console.log(rotZ);
            focusedObjtect.parentNode.removeChild(focusedObjtect);
            alienNum = alienNum -1;
            score += 100;
        }
        
        else{
            rotZ += 100;
            scaleNum = scaleNum - 0.2;
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

}

function updateGUI(){
  
  var nodeScore = document.getElementById("scoreArea");
  nodeScore.innerHTML = "<div>" + score + "</div>"; 

  var nodeAlien = document.getElementById("alienArea");
  nodeAlien.innerHTML = "<div>" + alienNum+ "/20</div>";

  var nodeBullet = document.getElementById("bulletArea");  
  nodeBullet.innerHTML = "<div>" + bulletNum+ "/20</div>";
  
}