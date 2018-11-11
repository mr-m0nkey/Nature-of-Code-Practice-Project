function Star(){
  this.location = createVector(windowWidth/2, windowHeight/2);

  this.display = function(){
    fill(250);
    ellipse(this.location.x, this.location.y, 350, 350);
    noStroke();
  }

  this.getCentre = function(){
    return this.location;
  }
}
