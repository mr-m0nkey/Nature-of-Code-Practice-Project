function setup(){

  createCanvas(windowWidth, windowHeight);
  planets = [];
  sun = new Star();
  console.log(sun.location.x);
  for(i = 0; i < 8; i++){
    planets.push(new Planet());
  }
}

function draw(){
  background(100);
  sun.display();
  for(i = 0; i < planets.length; i++){
    planets[i].move();
    planets[i].display();
  }
}
