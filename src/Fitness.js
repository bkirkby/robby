import Actions from './Actions'
import allScenarios from './allScenarios'

class Fitness {
  constructor() {
    this.numberOfSimulations = 20
    this.stepsFactor = .50 // how many steps per simulation to run
    this.pickValue = 1
    this.pickFailValue = -5
    this.failMoveValue = -10
  }

  getActionFromStratAndScene(strategy, scene) {
    const scene_idx = allScenarios[scene]
    return Number(strategy.substring(scene_idx,scene_idx+1))
  }

  // runs one simulation and returns score
  testFitness(strategy, map) {
    const numSteps = Math.floor(map.height*map.width*this.stepsFactor)
    let score = 0
    for (let i = 0; i < numSteps; i++) {
      let action = this.getActionFromStratAndScene(strategy, map.robbyScene)
      switch(action) {
        case Actions.MOVE_UP:
        case Actions.MOVE_DOWN:
        case Actions.MOVE_RIGHT:
        case Actions.MOVE_LEFT: {
          score += (map.performAction(action) ? 0 : this.failMoveValue)
          break
        }
        case Actions.PICK_CAN: {
          score += (map.performAction(action) ? this.pickValue : this.pickFailValue)
          break
        }
        case Actions.DO_NOTHING: {
          break
        }
        default: {
          throw new Error('invalid action: '+action)
        }
      }
    }
    return score
  }

  // runs this.numberOfSimulations times and averages the scores
  averageFitness(strategy, map) {
    let totalScore = 0
    for (let i=0; i<this.numberOfSimulations; i++) {
      totalScore += this.testFitness(strategy, map)
    }
    return totalScore / this.numberOfSimulations
  }
}

export default Fitness