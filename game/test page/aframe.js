var nowFocused = ""; 

// Color red
var color = "#FF0000";

function main() {

  AFRAME.registerComponent('cursor-listener', {
    init: function () {

      this.el.addEventListener('mouseenter', function (evt) {
        this.setAttribute('material', 'opacity', 0.5);
        nowFocused = this.id;
        console.log(nowFocused);
      });

      this.el.addEventListener('mouseleave', function (evt) {
        this.setAttribute('material', 'opacity', 1.0);
        nowFocused = "";
      });
    },

    update: function() {
      var rot = this.el.getAttribute('rotation');
      this.el.addEventListener('click', function (evt) {

        // Delete after rotating 90 backwards
        if (rot.z == 270) {
          this.el.parentNode.removeChild(this.el);
        }
      });
    }
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
   if(nowFocused != ""){
      var focusedObjtect = document.getElementById(nowFocused);
      focusedObjtect.click();
      console.log("click button");
      focusedObjtect.setAttribute("color", color);
      focusedObjtect.innerHTML +="<a-animation attribute='rotation' to='0 0 -90' direction='normal' dur='2000' easing='ease-in'></a-animation>"
      var gunAudio = document.getElementById("gunAudio");
      gunAudio.play();
   }
   else {
        console.log("You are not focus anything");
   }
}

