class Obstacle {
   constructor(type) {
      this.x = width
      this.number = type
      switch (this.number) {
         case 0://SMALL CACTUS
            this.w = 40
            this.h = 40
            break;
         case 1://LARGE CACTUS
            this.w = 60
            this.h = 80
            break;
         case 2://MANY SMALL CACTI
            this.w = 110
            this.h = 40
            break;
         default:
            break;
      }
      
      this.y = groundHeight - this.h
   }

   move(speed) {
      this.x -= speed
   }

   isOffscreen() {
      return this.x + this.w < 0
   }

   show() {
      switch (this.number) {
         case 0:
            image(smallCactusImage, this.x, this.y, this.w, this.h)
            break;
         case 1:
            image(largeCactusImage, this.x, this.y, this.w, this.h)
            break;
         case 2:
            image(manyCactiImage, this.x, this.y, this.w, this.h)
            break;
         default:
            break;
      }
      //fill(255, 50)
      //rect(this.x, this.y, this.w, this.h)
   }
}