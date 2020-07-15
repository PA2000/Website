class NeuralNetwork{
   constructor(a, b, c, d) {
      if (a instanceof tf.Sequential) {
         this.model = a
         this.inputNodes = b
         this.hiddenNodes = c
         this.outputNodes = d
      } else {
         this.inputNodes = a
         this.hiddenNodes = b
         this.outputNodes = c
         this.model = this.createModel()
      }
   }

   copy() {
      const modelCopy = this.createModel()
      const weights = this.model.getWeights()
      const weightCopies = []
      for (let i = 0; i < weights.length; i++){
         weightCopies[i] = weights[i].clone() 
      }
      modelCopy.setWeights(weightCopies)
      return new NeuralNetwork(modelCopy, this.inputNodes, this.hiddenNodes, this.outputNodes)
   }

   mutate(rate) {
      const weights = this.model.getWeights()
      const mutatedWeights = []
      for (i = 0; i < weights.length; i++){
         let tensor = weights[i]
         let shape = weights[i].shape
         //TENSORS ARE IMMUTABLE, SO WE NEED TO CONVERT THE TENSOR INTO A REGULAR JAVASCRIPT OBJECT
         let values = tensor.dataSync().slice()
         for (let j = 0; j < values.length; j++){
            if (random(1) <= rate) {
               let w = values[j]
               values[j] = w + randomGaussian()
            }
         }
         //NOW THAT WE HAVE MUTATED WEIGHTS, PUT THEM BACK INTO A TESNSOR, WITH THE ORIGINAL SHAPE
         let newTensor = tf.tensor(values, shape)
         mutatedWeights[i] = newTensor
      }
      this.model.setWeights(mutatedWeights)
   }

   predict(inputs) {
      const xs = tf.tensor2d([inputs])
      const ys = this.model.predict(xs)
      const outputs = ys.dataSync()
      //console.log(outputs)
      return outputs
   }

   dispose() {
      //this.
   }

   createModel() {
      const model = tf.sequential({
         layers: [
            tf.layers.dense({ //HIDDEN LAYER
               units: this.hiddenNodes,
               inputShape: [this.inputNodes],
               activation: 'sigmoid'
            }),
            tf.layers.dense({ //OUTPUT LAYER
               units: this.outputNodes,
               activation: 'softmax'
            }),
         ]
      });
      
      return model
   }
}