class Ground {
   constructor() {
      this.x = width
      this.y = floor(random(300, 320))
      this.w = floor(random(1, 5))
   }

   move(speed) {
      this.x -= speed
   }

   isOffscreen() {
      return this.x + this.w < 0
   }

   show(){
      stroke(0);
      strokeWeight(3);
      line(this.x, this.y, this.x + this.w, this.y);
   }
}