import allScenarios from './allScenarios'
import Actions from './Actions'

class StrategyGenome {
  constructor({strategy=StrategyGenome.createRandomStrat()}={}) {
    this._strategy = strategy
    this._fitnessScore = undefined
  }

  get strategy() {return this._strategy}
  set strategy(strat) {throw new Error('strategy must be set through constructor')}
  get fitnessScore() {return this._fitnessScore}
  set fitnessScore(strat) {throw new Error('fitness must be calculated through simulation')}

  static createRandomStrat() {
    let ret = ''
    for (let i=0; i<allScenarios.length; i++) {
      ret += (''+Actions.randomAction())
    }
    return ret
  }

  testFitness(map) {

  }
}

export default StrategyGenome