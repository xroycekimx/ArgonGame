var nowFocused = ""; 
var rotZ = 0;

// Color red
var color = "#FF0000";

function main() {

  AFRAME.registerComponent('cursor-listener', {
    init: function () {

      this.el.addEventListener('mouseenter', function (evt) {
        this.setAttribute('material', 'opacity', 0.5);
        nowFocused = this.id;
        rotZ = this.getAttribute('rotation').z;       
      });

      this.el.addEventListener('mouseleave', function (evt) {
        this.setAttribute('material', 'opacity', 1.0);
        nowFocused = "";
      });
    },
  });


  var arScene = document.querySelector('a-scene');
  var content = document.querySelector('#game');

  // the ar-camera has an argon reference frame attached, so when it gets it's first value,
  // we'll get this event
  arScene.addEventListener("referenceframe-statuschanged", function () {
    var camera = document.querySelector('a-camera');
    var vec = camera.object3D.getWorldDirection();
    vec.multiplyScalar(-10);
    vec.y -= 1;
    content.setAttribute("position", {x: vec.x, y: vec.y, z: vec.z});
  });
}


function toggle(){ 
  var gunAudio = document.getElementById("gunAudio");
  gunAudio.play();
  
  if(nowFocused != ""){ 
       var focusedObjtect = document.getElementById(nowFocused);

       if (rotZ == 400){
            console.log(rotZ);
            focusedObjtect.parentNode.removeChild(focusedObjtect);
        }
        
        else{
            rotZ += 100;
            focusedObjtect.setAttribute("color", color);
             // ROTATION   
            focusedObjtect.setAttribute("rotation", {x: 0, y: 0, z: rotZ}); 
        } 
   }
   else {
        console.log("You are not focus anything");
   }
}

