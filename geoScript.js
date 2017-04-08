
    var skiles = true;
    var library = false;
    var techTower = false;
    var studentCenter = false;
    var culc = false;
    var skilesPos = " -84.395410 33.773619 320";
    var libraryPos = " -84.395396 33.774066 320";
    var techTowerPos = " -84.394792 33.772587 320";
    var studentCenterPos = " -84.398769 33.773983 320";
    var culcPos = " -84.396372 33.775081 320";
    var posTest = "-84.404679 33.779659 320";
    var watchID = navigator.geolocation.watchPosition(function(position) {
      do_something(position.coords.latitude, position.coords.longitude);
    })
    // myElement.setAttribute('visible', false);
