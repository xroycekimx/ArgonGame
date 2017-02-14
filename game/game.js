function main() {
  /*
  function getRandColor () {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }
  */

  // Component to change to random color on click.
  // Possible useful functions - init, update, tick

  // Color red
  var color = "#FF0000";

  AFRAME.registerComponent('cursor-listener', {
    init: function () {

      // Changes object from blue to red
      this.el.addEventListener('click', function (evt) {
        this.setAttribute('material', 'color', color);
        console.log('I was clicked at: ', evt.detail.intersection.point);
      });

      this.el.addEventListener('mouseenter', function (evt) {
        this.setAttribute('material', 'opacity', 0.5);
      });

      this.el.addEventListener('mouseleave', function (evt) {
        this.setAttribute('material', 'opacity', 1.0);
      });
    },

    update: function() {
      var rot = this.el.getAttribute('rotation');
      this.el.addEventListener('click', function (evt) {

        /*
        // Rotate on z-axis when clicked
        if (rot.z < 90) {
          rot.z += 5;
        }
        this.setAttribute("rotation", {x: rot.x, y: rot.y, z: rot.z});
        */

        // Delete after rotating 90 backwards
        if (rot.z == 270) {
          this.el.parentNode.removeChild(this.el);
        }
      });
    }
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
