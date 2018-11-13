//Global Variables

particles = [];

function Particle(x, y){
  noStroke();
  fill(20);
  this.location = createVector(x, y);
  this.velocity = createVector(0, -1.5);
  this.acceleration = createVector(0, 0);
  this.time = 1;
  this.wind = createVector(0, 0);

  this.display = function(){
    if(this.location.x > windowWidth){
      this.location.x = 0;
    }else if(this.location.x < 0){
      this.location.x = windowWidth;;
    }
    if(this.location.y > windowHeight){
      this.location.y = 0;
    }else if(this.location.y < 0){
      this.location.y = windowHeight;
    }
    ellipse(this.location.x, this.location.y, 100, 100);
  };

  this.update = function(){

    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.velocity.limit(5);
    this.acceleration.limit(4);
  };

  this.wind = function(){
    this.time += random(0.005);
    i = noise(this.time);
    i = map(i, 0, 1, 0, windowWidth);
    this.wind.x = i;
    this.location.x = this.wind.x;

  }
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  a = new Particle(900, 230);
}

function draw(){
  background(255);

  a.wind();
  a.update();
  a.display();
}













/*
function Bubble(){
  this.x = random(0, width);
  this.y = random(0, height);
  this.display = function(){
    stroke(255);
    strokeWeight(1);
    noFill();
    ellipse(this.x, this.y, 100, 100);
  }
  this.move = function(){
    this.x = this.x  + random(-1, 1);
    this.y = this.y  + random(-1, 1);
  }
}

/*
fetch('./api/some.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
*/
/*

// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}else{
  // Let us open our database
  var db;
  var request = indexedDB.open("MyTestDatabase");
  console.log("Opening database");
  request.onerror = function(event) {
    alert("Why didn't you allow my web app to use IndexedDB?!");
  };
  request.onsuccess = function(event) {
    db = event.target.result;
  };
}
*/
