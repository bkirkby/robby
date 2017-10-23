import Map from './Map'

class Actions {
  static get MOVE_UP(){return 0}
  static get MOVE_RIGHT(){return 1}
  static get MOVE_DOWN(){return 2}
  static get MOVE_LEFT(){return 3}
  static get PICK_CAN(){return 4}
  static get DO_NOTHING(){return 5}
  static get RANDOM_MOVE(){return 6}
  static size() {
    return 7
  }
  static randomAction() { 
    return Math.floor(Math.random()*Actions.size())
  }
  constructor({map: map}) {
    this._map = map
    this._actionFunctions = {
      0: map.moveUp.bind(map),
      1: map.moveRight.bind(map),
      2: map.moveDown.bind(map),
      3: map.moveLeft.bind(map),
      4: map.pickUpCan.bind(map),
      5: () => {return true},
      6: this.moveRandom
    }
  }
  get actionFunctions() {
    return this._actionFunctions
  }
  size(){return Object.keys(this._actionFunctions).length}
  get length(){return this.size()}
  performAction(action) {
    return this._actionFunctions[action]()
  }
  moveRandom() {
    let action = Math.floor(Math.random()*4)
    return this.performAction(action)
  }
}

export default Actions