import StrategyGenome from '../src/StrategyGenome'
import Actions from '../src/Actions'
import assert from 'assert'

describe('StrategyGenome', () => {
  let strat
  beforeEach(() => {
    strat = new StrategyGenome()
  })

  it('generates a random strat on construction', () => {
    assert.notEqual(strat.strategy, undefined)
  })

  it('has valid actions for each scenario', () => {
    strat.strategy.split('').forEach((c) => {
      assert.ok(c >= 0 && c<Actions.size())
    })
  })

  it('allows setting of strategy through constructor', () => {
    const genome = '0123401234012340123401234'
    strat = new StrategyGenome({strategy: genome})
    assert.equal(strat.strategy, genome)
  })

  it('does not allow setting of strategy outside of constructor', () => {
    const genome = '012340123401234012340123401234'
    const expect = 'strategy must be set through constructor'
    try {
      strat.strategy = genome
      assert.notEqual(strat.strategy, genome)
    } catch(e) {
      assert.equal(e.message, expect)
    }
  })

  it('sets fitnessScore to undefined on construction', () => {
    assert.equal(strat.fitnessScore, undefined)
  })

  it('does not allow setting fitnessScore directly', () => {
    const fitnessScore = 1
    const expect = 'fitness must be calculated through simulation'
    try {
      strat.fitnessScore = fitnessScore
      assert.notEqual(strat.fitnessScore, fitnessScore)
    } catch(e) {
      assert.equal(e.message, expect)
    }
  })
})