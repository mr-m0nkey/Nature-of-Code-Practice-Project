function Mover(){
  this.location = createVector(random(windowWidth), random(windowHeight));
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.mass = 1 + random(5);


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

function Liquid(x, y, w, h, d){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.d = d;
  this.display = function(){
    noStroke();
    fill(175);
    rect(this.x, this.y, this.w, this.h);
  }
}


function setup(){
  movers = [];
  createCanvas(windowWidth, windowHeight);
  for(i = 0; i < 100; i ++){
    movers[i] = new Mover();
  }
  oil = new Liquid(0, 190, windowWidth, 400, 0.3);

  //Starting points for the perlin noise function that controls the wind
  tx = 10;
  ty = 100;

}

function draw(){
  background(255);

  oil.display();

  //
  ty += 0.005;
  tx += 0.001;
  k = noise(ty);
  k = map(k, 0, 1, -0.09, 0.09);
  j = noise(tx);
  j = map(j, 0, 1, -0.09, 0.09);


  for(i = 0; i < movers.length; i++){
    wind = createVector(j, k);
    movers[i].applyForce(wind);
    gravity = createVector(0, 0.1 * movers[i].mass);
    friction = createVector(movers[i].velocity.x, movers[i].velocity.y);
    n = 1;
    f = 0.05;
    friction.normalize();
    friction.mult(-1);
    friction.mult(f * n);
    movers[i].applyForce(gravity);
    movers[i].applyForce(friction);
    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
    if(movers[i].isInside(oil)){
      movers[i].drag(oil);
    }
  }



}
