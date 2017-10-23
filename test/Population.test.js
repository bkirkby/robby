import Population from '../src/Population'
import assert from 'assert'

describe('Population', () => {
  let population
  beforeEach(()=> {
    population = new Population()
  })

  it('fails setting of populationSize', () => {
    const expected = 'illegal access to populationSize'
    try {
      const newPopSize = population.populationSize + 1
      population.populationSize = newPopSize
      assert.notEqual(population.populationSize, newPopSize)
    } catch(e) {
      assert(e.message.substring(expected.length), expected)
    }
  })

  it('fails setting of eliteFactor', () => {
    const expected = 'illegal access to eliteFactor'
    try {
      const newEliteFactor = population.eliteFactor + 1
      population.eliteFactor = newEliteFactor
      assert.notEqual(population.eliteFactor, newEliteFactor)
    } catch(e) {
      assert(e.message.substring(expected.length), expected)
    }
  })
})