function Fish(){

  this.location = createVector(random(windowWidth), random(windowHeight));
  this.tx = random(10)
  this.ty = random(100)

  this.display = function(){
    ellipse(this.location.x, this.location.y, 50, 50);
    noStroke();
    fill(0);
  };

  this.move = function(){
    this.ty += 0.005;
    this.tx += 0.005;
    this.i = noise(this.tx);
    this.i = map(this.i, 0, 1, 0, windowWidth);
    this.j = noise(this.ty);
    this.j = map(this.j, 0, 1, 0, windowHeight);
    this.location.x = this.i;
    this.location.y = this.j;
  };

}
