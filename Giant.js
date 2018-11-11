function Giant(){
  this.location = createVector(random(windowWidth), random(windowHeight));
  this.tx = 0;
  this.ty = 1000;
  this.display = function(){
    ellipse(this.location.x, this.location.y, 200, 200);
    noStroke();
    fill(0);
  };

  this.move = function(){
    this.ty += 0.0005;
    this.tx += 0.0001;
    this.i = noise(this.tx);
    this.i = map(this.i, 0, 1, 0, windowWidth);
    this.j = noise(this.ty);
    this.j = map(this.j, 0, 1, 0, windowHeight);
    this.location.x = this.i;
    this.location.y = this.j;
  };
}
