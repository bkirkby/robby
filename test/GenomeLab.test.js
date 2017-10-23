import GenomeLab from '../src/GenomeLab'
import assert from 'assert'

describe('GenomeLab', () => {
  let lab
  beforeEach(()=>{
    lab = new GenomeLab()
  })
  describe('mutate', () => {
    it('mutates a stategy with factor of 1', () => {
      const strat = 'CCCCCCCCC'
      lab.mutationFactor = 1
      const result = lab.mutate(strat)
      assert.equal(result.length, strat.length)
      assert.notEqual(result, strat)
    })

    it('does not mutate a strategy with factor of 0', () => {
      const strat = 'CCCCCCCC'
      lab.mutationFactor = 0
      const result = lab.mutate(strat)
      assert.equal(result, strat)
    })
  })

  describe('splice', () => {
    it('splices even length strats right in the middle', () => {
      const strat1 = "12345678"
      const strat2 = "abcdefgh"
      const expected = "1234efgh"
      assert.equal(lab.splice(strat1, strat2), expected)
    })
    it('splices odd length strats around the middle', () => {
      const strat1 = "12345"
      const strat2 = "abcde"
      const expected = "12cde"
      const orExpected = "123de"
      const result = lab.splice(strat1, strat2)
      assert.ok(result === expected || result === orExpected)
    })
  })
})