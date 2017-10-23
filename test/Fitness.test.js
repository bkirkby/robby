import Fitness  from '../src/Fitness'
import Actions from '../src/Actions'
import Map from '../src/Map'
import allScenarios from '../src/allScenarios'
import {translateMap} from './common'
import assert from 'assert'

const spliceString = (str, start, stringToInsert) => {
  return str.slice(0, start) + stringToInsert + str.slice(start + 1);
}

describe('Fitness', () => {
  describe('testFitness', () => {
    let map, fitness, strategy
    beforeEach(() => {
      fitness = new Fitness()
      map = new Map()
      strategy = Array(allScenarios.length).join(''+Actions.DO_NOTHING)
    })

    it('scores properly wall hits', () => {
      map.field = translateMap('..\n..\n')
      const init_scene = translateMap('-..-.')
      const init_scene_idx = allScenarios[init_scene]
      strategy = spliceString(strategy, init_scene_idx, ''+Actions.MOVE_LEFT)
      assert.equal(fitness.testFitness(strategy, map), fitness.failMoveValue*2)
    })

    it('scores properly missed can picks', () => {
      map.field = translateMap('..\n..\n')
      const init_scene = translateMap('-..-.')
      const init_scene_idx = allScenarios[init_scene]
      strategy = spliceString(strategy, init_scene_idx, ''+Actions.PICK_CAN)
      assert.equal(fitness.testFitness(strategy, map), fitness.pickFailValue*2)
    })

    it('scores properly can pick', () => {
      map.field = translateMap('C.\n..\n')
      const init_scene = translateMap('-..-C')
      const init_scene_idx = allScenarios[init_scene]
      strategy = spliceString(strategy, init_scene_idx, ''+Actions.PICK_CAN)
      assert.equal(fitness.testFitness(strategy, map), fitness.pickValue)
    })

    it('scores properly successful moves', () => {
      const init_scene = translateMap('-..-..')
      const init_scene_idx = allScenarios[init_scene]
      strategy = spliceString(strategy, init_scene_idx, ''+Actions.MOVE_RIGHT)
      assert.equal(fitness.testFitness(strategy, map), 0)
    })

    it('scores properly a smart strat', () => {
      map.field = translateMap('..CC.\n..CC.\n..C..\n')

    })
  })
})