var nowFocused = ""; 
var rotZ = 0;
var scaleNum = 1;
var score = 0;
var alienNum = 15;
var bulletNum = 15;

var secondGo = [false, false, false];

function main() {

  AFRAME.registerComponent('alien-listener', {
    init: function () {

      this.el.addEventListener('mouseenter', function (evt) {
        // console.log("focus");
        this.setAttribute('material', 'opacity', 0.1);
        nowFocused = this.id;
        rotZ = this.getAttribute('rotation').z; 
        scaleNum = this.getAttribute('scale').x;       
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

       if (rotZ == 40){
            // console.log(rotZ);
            focusedObjtect.parentNode.removeChild(focusedObjtect);
            alienNum = alienNum -1;
            score = score + 10;

            var pointsAudio = document.getElementById("gotPonitsAudio");
            pointsAudio.play();
        }
        
        else{
            rotZ += 20;
            scaleNum = scaleNum - 0.1;
            // console.log(rotZ);
           
             // ROTATION   
            focusedObjtect.setAttribute("rotation", {x: 0, y: 0, z: rotZ}); 
            focusedObjtect.setAttribute("scale", {x:scaleNum, y:scaleNum, z:scaleNum}); 
        } 
   }
   else {
        console.log("You are not focus anything");
   }

}

function updateFirstscene(){
  updateScore();
  updateAlien01();
  updateBullets();
  checkBullets();
  leadNext();
}

function updateScore(){

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

}

function updateAlien01(){
    var nodeAlien = document.getElementById("alienArea");
      if (alienNum < 10){
         nodeAlien.innerHTML = "<div>0" + alienNum+ "/15</div>";
      }
      else{
        nodeAlien.innerHTML = "<div>" + alienNum+ "/15</div>";
      }
}

function updateBullets(){
   var nodeBullet = document.getElementById("bulletArea"); 

   if (bulletNum < 10){
         nodeBullet.innerHTML = "<div>0" + bulletNum + "/15</div>";
      }
      else{
        nodeBullet.innerHTML = "<div>" + bulletNum + "/15</div>";
      }
}

function checkBullets(){
  if (bulletNum <= 0){
        var hideButton = document.getElementById("bt");
        hideButton.style.display = "none";
        console.log("no bullets");
  }
}

function reload(){
  var reloadAudio = document.getElementById("reloadAudio");
  reloadAudio.play();

  bulletNum = 15;
  var showButton = document.getElementById("bt");
  showButton.style.display = "block";

  console.log("reload bullets");

  var nodeBullet = document.getElementById("bulletArea");  
  nodeBullet.innerHTML = "<div>" + bulletNum+ "/15</div>";
}

function leadNext(){
  var alien01 = document.getElementsByClassName("alien01");
  // console.log(alien01.length);

  var alien02 = document.getElementsByClassName("alien02");
  // console.log(alien02.length);

  var alien03 = document.getElementsByClassName("alien03");
  // console.log(alien03.length);

  var alien = [alien01.length, alien02.length, alien03.length];
  var next = ["../videos/killnormal1.mp4","../videos/killgood1.mp4","../videos/killbad1.mp4"]

  for (i = 0; i < alien.length; i++) { 
    if (alien[i] == 0) {
      var vid = document.getElementById("myVideo");
      var btn = document.getElementById("videoControl");

      var source = document.createElement('source');
      source.setAttribute('src', next[i]);
      source.setAttribute('type', 'video/mp4');
      vid.appendChild(source);

      vid.style.display = "block";
      btn.style.display = "block";
      vid.play(); 
      secondGo[i] = true;
      ShowSecond();
      }
    }
}

function pauseVid() { 
    var vid = document.getElementById("myVideo"); 
    var btn = document.getElementById("videoControl");

    vid.pause(); 
    vid.style.display = "none";
    btn.style.display = "none";

    vid.innerHTML = "";
} 
    

function ShowSecond(){
  var nextID = ["#alienModel","#alienModel02","#alienModel03"]

  document.getElementById('bt').onclick = function() { 
           playGunshot();
           updateSecondscene();
        };

  alienNum = 5;
  var nodeAlien = document.getElementById("alienArea");
  nodeAlien.innerHTML = "<div>0" + alienNum+ "/05</div>";

  for (i = 0; i < secondGo.length; i++) {
      if (secondGo[i] ==true){
           var secondLocation = document.getElementById('secondScene');
           secondLocation.innerHTML = "<a-entity position='0 0.5 1' alien-listener id='alien16' class='alienSecond' rotation='0 0 0' scale='1.2 1.2 1.2'></a-entity>";
           secondLocation.innerHTML += "<a-entity position='2 0.5 1' alien-listener id='alien17' class='alienSecond' rotation='0 0 0' scale='1.2 1.2 1.2'></a-entity>";
           secondLocation.innerHTML += "<a-entity position='4 0.5 1' alien-listener id='alien18' class='alienSecond' rotation='0 0 0' scale='1.2 1.2 1.2'></a-entity>";
           secondLocation.innerHTML += "<a-entity position='5 0.5 1' alien-listener id='alien19' class='alienSecond' rotation='0 0 0' scale='1.2 1.2 1.2'></a-entity>";
           secondLocation.innerHTML += "<a-entity position='6 0.5 1' alien-listener id='alien20' class='alienSecond' rotation='0 0 0' scale='1.2 1.2 1.2'></a-entity>";
           var alienTag = document.getElementsByClassName('alienSecond');
          
           for (e = 0; e < alienTag.length; e++){
              alienTag[e].setAttribute("collada-model", nextID[i]);
           }           
      }
  }   
}

function updateSecondscene(){
   var nodeAlien = document.getElementById("alienArea");
   nodeAlien.innerHTML = "<div>0" + alienNum+ "/05</div>";
  
  updateScore();
  updateBullets();
  checkBullets();
  leadThird();
} 

function leadThird(){
  var secondVideo = ["../videos/killnormal2.mp4","../videos/killgood2.mp4","../videos/killbad2.mp4"]
  var alienLeft = document.getElementsByClassName("alienSecond");

  if(alienLeft.length == 0){

    for (i = 0; i < secondGo.length; i++) {
      if (secondGo[i] ==true){
          var vid = document.getElementById("myVideo");
          var btn = document.getElementById("videoControl");

          var source = document.createElement('source');
          source.setAttribute('src', secondVideo[i]);
          source.setAttribute('type', 'video/mp4');
          vid.appendChild(source);

          console.log(source);
          console.log(vid);

          vid.style.display = "block";
          btn.style.display = "block";
          vid.play();
      }
    } 

    showThird();   
  }
}

function showThird(){
   
    console.log(secondGo[1]);
    if (secondGo[1] == false){
        setInterval(countdown(2), 5000);

        var nodeAlien = document.getElementById("alienArea");
        nodeAlien.innerHTML = "Boss!!!";

        var thirdLocation = document.getElementById('thirdScene');
        thirdLocation.innerHTML = "<a-entity position='0 0.5 1' alien-listener collada-model='#alienModelBoss' id='alien21' class='alienThird' rotation='0 0 0' scale='1.2 1.2 1.2'></a-entity>";
        thirdLocation.innerHTML += "<a-entity position='1 0.5 1' alien-listener collada-model='#alienModelBoss' id='alien22' class='alienThird' rotation='0 0 0' scale='1.2 1.2 1.2'></a-entity>";
        thirdLocation.innerHTML += "<a-entity position='2 0.5 1' alien-listener collada-model='#alienModelBoss' id='alien22' class='alienThird' rotation='0 0 0' scale='1.2 1.2 1.2'></a-entity>";
        document.getElementById('bt').onclick = function() { 
           playGunshotBoss();
           updateLastscene();
         }
    }

    else{
          var alien01 = document.getElementsByClassName("alien01");
          var alien03 = document.getElementsByClassName("alien03");
          
          alienNum = alien01.length + alien03.length;

          var nodeAlien = document.getElementById("alienArea");

          if (alienNum < 10) {
             nodeAlien.innerHTML = "<div>0" + alienNum+ "/15</div>";
          }

          else{
              nodeAlien.innerHTML = "<div>" + alienNum+ "/15</div>";
          }
         

          document.getElementById('bt').onclick = function() { 
             playGunshot();
             updateScore();
             updateBullets();
             checkBullets(); 
             updateAlien01(); 
             leadForward();        
          }
    }
}


var timeoutHandle;
var mins;
var seconds;

function countdown(minutes) {
     seconds = 60;
     mins = minutes;
    function tick() {
        var counter = document.getElementById("bombArea");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML =
        current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            timeoutHandle=setTimeout(tick, 1000);
        } else {

            if(mins > 1){

               setTimeout(function () { countdown(mins - 1); }, 1000);

            }
        }
       bomb(); 
    }

    tick();
   
}

function bomb(){
  var alienBoss = document.getElementsByClassName("alienThird");
  // console.log(alienBoss.length);
  // console.log(mins+seconds);

  if (alienBoss.length != 0){
    if (mins+seconds == 1){
      var vid = document.getElementById("myVideo");
      var source = document.createElement('source');
      source.setAttribute('src', '../videos/badending.mp4');
      source.setAttribute('type', 'video/mp4');
      vid.appendChild(source);

      vid.style.display = "block";
    }
  }
}


function leadForward(){
   var alien01 = document.getElementsByClassName("alien01");
   var alien03 = document.getElementsByClassName("alien03");

   var alien = [alien01.length, alien03.length];
   var next = ["../videos/killnormal1.mp4","../videos/killbad1.mp4"]
  
    if (alien[0] == 0) {
      var vid = document.getElementById("myVideo");
      var btn = document.getElementById("videoControl");

      var source = document.createElement('source');
      source.setAttribute('src', next[0]);
      source.setAttribute('type', 'video/mp4');
      vid.appendChild(source);

      vid.style.display = "block";
      btn.style.display = "block";
      vid.play(); 
      secondGo[0] = true;
      secondGo[1] = false;
      ShowSecond();
      }
    else if (alien[1] == 0){
      var vid = document.getElementById("myVideo");
      var btn = document.getElementById("videoControl");

      var source = document.createElement('source');
      source.setAttribute('src', next[1]);
      source.setAttribute('type', 'video/mp4');
      vid.appendChild(source);

      vid.style.display = "block";
      btn.style.display = "block";
      vid.play(); 
      secondGo[2] = true;
      secondGo[1] = false;
      ShowSecond();
    }
}


function  playGunshotBoss(){
  var gunAudio = document.getElementById("gunAudio");
  gunAudio.play();

  bulletNum = bulletNum-1;

   if(nowFocused != ""){ 
       var focusedObjtect = document.getElementById(nowFocused);

       if (rotZ == 80){
            console.log(rotZ);
            focusedObjtect.parentNode.removeChild(focusedObjtect);
            alienNum = alienNum -1;
            score = score + 50;

            var pointsAudio = document.getElementById("gotPonitsAudio");
            pointsAudio.play();
        }
        
        else{
            rotZ += 20;
            scaleNum = scaleNum - 0.1;
            console.log(rotZ);
           
             // ROTATION   
            focusedObjtect.setAttribute("rotation", {x: 0, y: 0, z: rotZ}); 
            focusedObjtect.setAttribute("scale", {x:scaleNum, y:scaleNum, z:scaleNum}); 
        } 
   }
   else {
        console.log("You are not focus anything");
   }

}

function updateLastscene(){
   updateScore();
   updateBullets();
   checkBullets();
   leadFinal();        
}

function leadFinal(){
   var alienBoss = document.getElementsByClassName("alienThird");
   if (alienBoss.length == 0){
      var vid = document.getElementById("myVideo");
      var source = document.createElement('source');
      var alien02 = document.getElementsByClassName("alien02");
      console.log(alien02);

      if(alien02.length == 0){
          source.setAttribute('src', '../videos/badending.mp4');
      }

      else if (score > 250 ) {
          source.setAttribute('src', '../videos/bestending.mp4');
      }

      else {
          source.setAttribute('src', '../videos/normalending.mp4');
      }
      
      source.setAttribute('type', 'video/mp4');
      vid.appendChild(source);

      vid.style.display = "block";

      vid.play();
   }

}




