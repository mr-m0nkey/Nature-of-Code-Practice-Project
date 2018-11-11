
function setup(){
  createCanvas(windowWidth, windowHeight);
  fishes = [];
  particles = [];
  for(i = 0; i < 5; i++){
    fishes.push(new Fish());
  }
  for(i = 0; i < 5; i++){
    particles.push(new Particle());
  }

  g = new Giant();
}

function draw(){
  background(255);
  for(i = 0; i < fishes.length; i++){
    fishes[i].display();
    fishes[i].move();
  }

  for(i = 0; i < particles.length; i++){
    particles[i].display();
    particles[i].move();
  }

  g.display();
  g.move();
}
