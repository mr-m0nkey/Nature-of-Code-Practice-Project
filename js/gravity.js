function Attractor(){
  this.mass = 5;
  g = 0.4;
  this.location = createVector(windowWidth/2, windowHeight/2);

  this.display = function(){
    ellipse(this.location.x, this.location.y, this.mass*16, this.mass*16);
  }

  this.attract = function(mover){
    force = createVector(this.location.x, this.location.y);
    force.sub(mover.location);
    distance = force.mag();
    distance = constrain(distance,5,25);
    force.normalize();
    strength = (g * this.mass * mover.mass) / (distance * distance);
    force.mult(strength);
    return force;
  }

}


function Mover(){
  this.location = createVector(random(windowWidth), random(windowHeight));
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  //this.mass = 1 + random(5);
  this.mass = 2;

  this.applyForce = function(force){
    force.div(this.mass);
    this.acceleration.add(force);
  };

  this.update = function(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  };

  this.display = function(){
    stroke(0);
    fill(175);
    ellipse(this.location.x, this.location.y,this.mass*16, this.mass*16);
  };

  this.checkEdges = function(){
    if(this.location.x > windowWidth){
      this.location.x = windowWidth;
      this.velocity.x *= -1;
    }else if(this.location.x < 0){
      this.velocity.x *= -1;
      this.location.x = 0;
    }

    if(this.location.y > windowHeight){
      this.velocity.y *= -1;
      this.location.y = windowHeight;
    }
  };

  this.isInside = function(l){
    if (this.location.x>l.x && this.location.x<l.x+l.w && this.location.y>l.y && this.location.y<l.y+l.h) {
      return true;
    }
    return false;
  }

  this.drag = function(l){
    speed = this.velocity.mag();
    magnitude = l.d * speed * speed;

    drag = createVector(this.velocity.x, this.velocity.y);
    drag.mult(-1);
    drag.normalize();
    drag.mult(magnitude);

    this.applyForce(drag);
  }

};


function setup(){
  createCanvas(windowWidth, windowHeight);
  sun = new Attractor();
  planet = new Mover();
}

function draw(){
  background(255);
  fill(100);

  gravity = sun.attract(planet);
  planet.applyForce(gravity);

  planet.update();

  sun.display();
  planet.display();

}
