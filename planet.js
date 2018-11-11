function Planet(){

  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0);
  this.location = createVector(random(windowWidth), random(windowHeight));
  this.r = random(100);
  this.display = function(){
    ellipse(this.location.x, this.location.y, this.r, this.r);
    noStroke();
    fill(255);
  }

  this.move = function(){
    this.l = createVector(windowWidth/2, windowHeight/2);
    this.dir = this.l.sub(this.location);
    this.dir.normalize();
    this.dir.mult(0.5);
    this.acceleration.add(this.dir);
    this.velocity.add(this.acceleration);
    this.velocity.limit(10);
    this.location.add(this.velocity);
  }
}
