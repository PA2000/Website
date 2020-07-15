class Dino{
   constructor(brain) {
      this.r = 70
      this.x = 50
      this.groundlevel = groundHeight - this.r
      this.y = this.groundlevel
      this.vy = 0
      this.gravity = 1.9
      this.runcount = 0
      this.ducked = false

      //used for breeding in ga.js
      this.localScore = 0
      this.fitness = 0

      brain == true ? this.brain = brain.copy() : this.brain = new NeuralNetwork(6, 8, 3)
   }

   think() {
      let closestObject = null
      let currClosestDist = Infinity
      let berd = false
      for (i = 0; i < obstacles.length; i++){
         let d = obstacles[i].x + obstacles[i].w - this.x
         if (d > 0 && d < currClosestDist) {
            currClosestDist = d
            closestObject = obstacles[i]
         }
      }
      for (i = 0; i < birds.length; i++){
         let d = birds[i].x + birds[i].w - this.x
         if (d > 0 && d < currClosestDist) {
            currClosestDist = d
            closestObject = birds[i]
            berd = true
         }
      }
      let inputs = []
      if (closestObject == null) {
         for (i = 0; i < 6; i++){
            inputs[i] = 0
         }
      } else {
         inputs[0] = currClosestDist
         inputs[1] = closestObject.h
         inputs[2] = closestObject.w
         if (berd == true) {
            closestObject.birdType == 0 ? inputs[3] = 0 : inputs[3] = closestObject.y
         } else {
            inputs[3] = 0
         }
      }
      inputs[4] = this.y
      inputs[5] = speed
      
      let outputs = this.brain.predict(inputs)
      let max = 0
      let maxIndex = 0
      for (i = 0; i < outputs.length; i++){
         if (outputs[i] > max) {
            max = outputs[i]
            maxIndex = i
         }
      }
      switch (maxIndex) {
         case 0:
            return
            break;
         case 1:
            this.jump()
            break;
         case 2:
            this.duck()
            break; 
         default:
            break;
      }
   }

   mutate() {
      this.brain.mutate(0.10)
   }

   jump() {
      if (this.y == this.groundlevel) { 
         this.vy = -25
      }
   }

   duck() {
      this.ducked = true
   }

   collides(obstacle) {
     if (this.ducked == true) {
         this.ducked = false
         //console.log(this.y + ", " + obstacle.y)
         return collideRectRect(this.x, this.y+25, this.r, this.r-25, obstacle.x, obstacle.y, obstacle.w, obstacle.h)
      } else {
         return collideRectRect(this.x, this.y, this.r, this.r, obstacle.x, obstacle.y, obstacle.w, obstacle.h)
      }
      
   }

   isOffscreen() {
      return this.x + this.r < 0
   }
   
   move() {
      this.y += this.vy
      this.vy += this.gravity
      this.y = constrain(this.y, 0, this.groundlevel)
      this.localScore++
   }

   show() {
      if (this.ducked && this.y == this.groundlevel) {
         if (this.runcount < 5) {
            image(dduck1image, this.x, this.y + 25, this.r, this.r - 25)
         } else {
            image(dduck2image, this.x, this.y + 25, this.r, this.r - 25)
         }
      }
      else {
         if (this.y != this.groundlevel) {
            image(djumpimage, this.x, this.y, this.r, this.r)
         } else {
            if (this.runcount < 5) {
               image(drun1image, this.x, this.y, this.r, this.r)
            } else {
               image(drun2image, this.x, this.y, this.r, this.r)
            }
         }
      }
      this.runcount++
      if (this.runcount > 10) {
         this.runcount = 0
      }
      fill(255, 50)
      //this.ducked == false ? rect(this.x, this.y, this.r, this.r) : rect(this.x, this.y+ 25, this.r, this.r - 25)
      //this.ducked = false
   }

   dispose() {
      this.brain.dispose()
   }
}