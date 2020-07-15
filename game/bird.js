class Bird{
   constructor(type) {
      this.x = width
      this.w = 60
      this.h = 50
      this.birdType = type
      switch (this.birdType) {
         case 0: //LOW BIRD
            this.y = 296 - this.h
            break;
         case 1: //MEDIUM BIRD
            this.y = 246 - this.h
            break;
         case 2: //HIGH BIRD
            this.y = 186 - this.h
            break;
         default:
            break;
      }
      this.flapCount = 0
   }

   move(speed) {
      this.x -= speed
   }

   isOffscreen() {
      return this.x + this.w < 0
   }

   show() {
      if (this.flapCount < 5) {
         image(bird1Image, this.x, this.y, this.w, this.h)
      } else {
         image(bird2Image, this.x, this.y, this.w, this.h)
      }
      this.flapCount++
      if (this.flapCount > 10) {
         this.flapCount = 0
      }
      //fill(255, 50)
      //rect(this.x, this.y, this.w, this.h)
   }

}