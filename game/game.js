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
  var colorRed = "#FF0000";

  AFRAME.registerComponent('alien-listener', {
    schema: {
      name: {type: 'string'},
      health: {type: 'number'}
      color: {type: 'string'}
    }

    init: function () {
      var data = this.data;

      this.setAttribute('name', "Alien 1");
      this.setAttribute('health', 2);
      this.setAttribute('material', 'color', "#0000FF");

      this.el.addEventListener('click', function (evt) {
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
      var el = this.el;
      var data = this.data;
      var rot = el.getAttribute('rotation');

      el.addEventListener('click', function (evt) {
        if (data.health > 0) {
          el.setAttribute('health', data.health - 1);
        } else if (data.health == 0) {
          el.setAttribute('material', 'color', colorRed);
          //el.setAttribute('rotation', {direction: 'normal', dur: 3000, easing: 'ease-in', from: '0 0 0', to: '270 0 0', repeat: '0'});
          data.target.emit('alienDeath');
        };
        // Delete after rotating 90 backwards
        if (rot.x == 270) {
          el.parentNode.removeChild(el);
        };

        console.log('Name: ', data.name);
        console.log('Health: ', data.health);
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

function playGunshot() {
  var gunAudio = document.getElementById("gunAudio");
  gunAudio.play();
}
