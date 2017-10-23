import Map from '../src/Map'
import {translateMap} from './common.js'
import assert from 'assert'

const midPointOf2DArray = (width, height) => {
  let ret = Math.floor(width/2)
  ret += Math.floor(height/2)*width
  return ret
}

const accountForNewLines = (height) => {
  return Math.floor(height/2)
}

describe('Map', () => {
  describe('robbyScene', () => {
    let map
    beforeEach(() => {
      map = new Map({width:3, height:3, can_distribution:1})
    })

    it('should recognize all cans', () => {
      const expected = translateMap('CCCCC')
      assert.equal(map.robbyScene, expected)
    })

    it('should recognize all walls', () => {
      map = new Map({width:1, height:1, can_distribution:1})
      const expected = translateMap('----C')
      assert.equal(map.robbyScene, expected)
    })

    it('should recognize all empty', () => {
      map = new Map({width:3, height:3, can_distribution:0})
      const expected = translateMap('.....')
      assert.equal(map.robbyScene, expected)
    })

    describe('about walls', () => {
      it('should recognize north wall', () => {
        map.moveRobby(1,0)
        const expected = translateMap('-CCCC')
        assert.equal(map.robbyScene, expected)
      })

      it('should recognize east wall', () => {
        map.moveRobby(2,1)
        const expected = translateMap('C-CCC')
        assert.equal(map.robbyScene, expected)
      })

      it('should recognize south wall', () => {
        map.moveRobby(1,2)
        const expected = translateMap('CC-CC')
        assert.equal(map.robbyScene, expected)
      })

      it('should recognize west wall', () => {
        map.moveRobby(0,1)
        const expected = translateMap('CCC-C')
        assert.equal(map.robbyScene, expected)
      })
    })
    describe('about cans', () => {
      const testCan = (field, expected) => {
        map.field = field
        map.moveRobby(1,1)
        assert.equal(map.robbyScene, expected)
      }

      it('should recognize north can', () => {
        const field = translateMap('.C.\n...\n...')
        const expected = translateMap('C....')
        testCan(field, expected)
      })

      it('should recognize east can', () => {
        const field = translateMap('...\n..C\n...')
        const expected = translateMap('.C...')
        testCan(field, expected)
      })

      it('should recognize south can', () => {
        const field = translateMap('...\n...\n.C.')
        const expected = translateMap('..C..')
        testCan(field, expected)
      })

      it('should recognize west can', () => {
        const field = translateMap('...\nC..\n...')
        const expected = translateMap('...C.')
        testCan(field, expected)
      })

      it('should recognize current can', () => {
        const field = translateMap('...\n.C.\n...')
        const expected = translateMap('....C')
        testCan(field, expected)
      })
    })
  })

  describe('init and print', () => {
    it('should print random map', () => {
      const height = 10
      const width = 50
      const map = new Map({width:width,height:height})
      const mapTxt = map.printMap()
      console.log(mapTxt)
      // counts number of lines
      assert.equal(mapTxt.split('\n').length, height+1)
      // finds initial pos of Robby
      assert.equal(mapTxt.split(Map.ROBBY_CHAR)[0].length,
        midPointOf2DArray(width, height) + accountForNewLines(height)
      )
    })
  })

  describe('movement', () => {
    let map
    beforeEach( () => {
      map = new Map({width:2,height:2,can_distribution:0})
    })

    describe('should move', () => {
      it('right when able', () => {
        const expected = translateMap('.R\n..\n')
        map.moveRobby(0,0)
        assert.ok(map.moveRight())
        assert.equal(map.printMap(), expected)
      })

      it('left when able', () => {
        const expected = translateMap('R.\n..\n')
        map.moveRobby(1,0)
        assert.ok(map.moveLeft())
        assert.equal(map.printMap(), expected)
      })

      it('up when able', () => {
        const expected = translateMap('R.\n..\n')
        map.moveRobby(0,1)
        assert.ok(map.moveUp())
        assert.equal(map.printMap(), expected)
      })

      it('down when able', () => {
        const expected = translateMap('..\nR.\n')
        map.moveRobby(0,0)
        assert.ok(map.moveDown())
        assert.equal(map.printMap(), expected)
      })
    })

    describe('should not move', () => {
      it('left when unable', () => {
        const expected = translateMap('R.\n..\n')
        map.moveRobby(0,0)
        assert.ok(!map.moveLeft())
        assert.equal(map.printMap(), expected)
      })
      it('right when unable', () => {
        const expected = translateMap('.R\n..\n')
        map.moveRobby(1,0)
        assert.ok(!map.moveRight())
        assert.equal(map.printMap(), expected)
      })
      it('up when unable', () => {
        const expected = translateMap('.R\n..\n')
        map.moveRobby(1,0)
        assert.ok(!map.moveUp())
        assert.equal(map.printMap(), expected)
      })
      it('down when unable', () => {
        const expected = translateMap('..\n.R\n')
        map.moveRobby(1,1)
        assert.ok(!map.moveDown())
        assert.equal(map.printMap(), expected)
      })
    })

    it('should move when random selected', () => {
      map.field = '...\n...\n...\n'
      const expecteds = [
        translateMap('.R.\n...\n...\n'),
        translateMap('...\n..R\n...\n'),
        translateMap('...\n...\n.R.\n'),
        translateMap('...\nR..\n...\n')
      ]
      map.moveRobby(1,1)
      assert.ok(map.moveRandom())
    })

    describe('of robby over a can', () => {
      it('should display robby over a can', () => {
        const expected = translateMap('RC\nCC\n')
        const startField = translateMap('CC\nCC\n')
        map.field = startField
        map.moveRobby(0,0)
        assert.equal(map.printMap(), expected)
      })

      it('should not erase a can when moving', () => {
        const expected = translateMap('.C\n.R\n')
        const startField = translateMap('.C\n..\n')
        map.field = startField
        map.moveRobby(0,0)
        map.moveRight()
        map.moveDown()
        assert.equal(map.printMap(), expected)
      })

      it('should pick up the can', () => {
        const expected = translateMap('..\n.R\n')
        const startField = translateMap('.C\n..\n')
        map.field = startField
        map.moveRobby(0,0)
        map.moveRight()
        assert.ok(map.pickUpCan())
        map.moveDown()
        assert.equal(map.printMap(), expected)
      })

      it('should fail to pick up non-can', () => {
        const startField = translateMap('..\n..\n')
        map.field = startField
        map.moveRobby(0,0)
        assert.ok(!map.pickUpCan())
      })
    })
  })
})
