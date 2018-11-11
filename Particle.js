function Particle(){
  this.location = createVector(random(windowWidth), random(windowHeight));

  this.display = function(){
    ellipse(this.location.x, this.location.y, 15, 15);
    noStroke();
    fill(100);
  }

  this.move = function(){

    this.x = random(3);
    this.y = random(3);

    if(this.x >= 0 && this.x < 1.8){
      this.location.x -= 3;
    }
    else if(this.x >= 1.8 && this.x < 2){
      this.location.x += 2;
    }

    if(this.y >= 0 && this.y < 1.5){
      this.location.y -= 3;
    }
    else if(this.y >= 1.6 && this.y < 2){
      this.location.y += 2;
    }

    if(this.location.x >windowWidth){
      this.location.x = 0;
    }
    else if(this.location.x < 0){
      this.location.x = windowWidth;
    }

    if(this.location.y > windowHeight){
      this.location.y = 0;
    }
    else if(this.location.y < 0){
      this.location.y = windowHeight;
    }
  }
}
