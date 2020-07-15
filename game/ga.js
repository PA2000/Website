function nextGeneration() {
   console.log('next generation');
   calculateFitness();
   for (let i = 0; i < populationSize; i++) {
     dinos[i] = pickOne();
   }
   for (let i = 0; i < populationSize; i++) {
     savedDinos[i].dispose();
   }
   savedDinos = [];
}
  
function pickOne() {
   let index = 0
   let r = random(1)
   while (r > 0) {
      r = r - savedDinos[index].fitness
      index++
   }
   index--
   /*let index = 0
   let bestFitness = 0
   for (i = 0; i < savedDinos.length; i++) {
      if (savedDinos[i].fitness > bestFitness) {
         bestFitness = savedDinos[i].fitness
         index = i
      }
   }*/
   let dino = savedDinos[index]
   let child = new Dino(dino.brain)
   child.mutate()
   return child
}
  
function calculateFitness() {
   let sum = 0;
   for (let dino of savedDinos) {
      if (dino.localScore > 0) {
         sum += dino.localScore;
      } else {
         sum += -1 * dino.localScore;
      }
   }
  
   for (let dino of savedDinos) {
      dino.fitness = dino.localScore / sum;
      //console.log(dino.fitness)
   }
}