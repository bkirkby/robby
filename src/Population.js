import StrategyGenome from './StrategyGenome'

class Population {
  constructor({popsize=100, eliteFactor=.10}={}) {
    this._populationSize = popsize
    this._eliteFactor = eliteFactor
    this.population = []
  }
  get populationSize(){return this._populationSize}
  set populationSize(popSize){throw new Error('illegal access to populationSize. must be presented through constructor')}
  get eliteFactor(){return this._eliteFactor}
  set eliteFactor(eliteFactor){throw new Error('illegal access to eliteFactor. must be presented through constructor')}

  generatePopulation() {
    for (let i=0; i<this.populationSize; i++) {
      this.population.push(new StrategyGenome())
    }
  }
}

export default Population