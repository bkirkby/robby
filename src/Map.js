import Actions from './Actions'

class Map {
  static get CAN_CHAR() {return 'c'}
  static get ROBBY_CHAR() {return 'R'}
  static get EMPTY_CHAR() {return '.'}
  static get WALL_CHAR() {return '-'}

  constructor({width=100, height=50, can_distribution=.25}={}) {
    this._height = height
    this._width = width
    this._robbyPos = {x: Math.floor(width/2), y: Math.floor(height/2)}
    this._field = this._initField(this.height, this.width, can_distribution)
    this._lastAction
    this.actions = new Actions({map: this})
  }

  get width(){return this._width}
  set width(w){throw new Error('width must be set in constructor')}
  get height(){return this._height}
  set height(h){throw new Error('height must be set in constructor')}
  get lastAction(){return this._lastAction}

  moveRobby(x,y) {
    this._robbyPos.x = x
    this._robbyPos.y = y
  }

  get field() {return this._field}
  set field(field_string) {
    this._field = new Array()
    const fieldRows = field_string.split('\n')
    this._height = fieldRows.length
    for (let y=0; y<fieldRows.length; y++) {
      let col = fieldRows[y].split('')
      if (col.length == 0) {
        this._height--
        continue
      }
      this._width = col.length
      this._field[y] = new Array()
      for (let x=0; x<col.length; x++) {
        this._field[y][x] = (col[x] == Map.CAN_CHAR ? Map.CAN_CHAR : Map.EMPTY_CHAR)
      }
    }
    this.moveRobby(0,0)
  }

  pickUpCan() {
    const x = this._robbyPos.x
    const y = this._robbyPos.y
    if (this.field[y][x] == Map.CAN_CHAR) {
      this.field[y][x] = Map.EMPTY_CHAR
      return true
    }
    return false
  }

  moveRight() {
    if (this._robbyPos.x < this.field[0].length-1) {
      this.moveRobby(this._robbyPos.x+1, this._robbyPos.y)
      return true
    }
    return false
  }

  moveLeft() {
    if (this._robbyPos.x > 0) {
      this.moveRobby(this._robbyPos.x-1, this._robbyPos.y)
      return true
    }
    return false
  }

  moveUp() {
    if (this._robbyPos.y > 0) {
      this.moveRobby(this._robbyPos.x, this._robbyPos.y-1)
      return true
    }
    return false
  }

  moveDown() {
    if (this._robbyPos.y < this.field.length-1) {
      this.moveRobby(this._robbyPos.x, this._robbyPos.y+1)
      return true
    }
    return false
  }

  moveRandom() {
    return this.actions.moveRandom()
  }

  get robbyScene() {
    const x = this._robbyPos.x
    const y = this._robbyPos.y
    let ret = ''
    ret += (y > 0 ? this.field[y-1][x] : Map.WALL_CHAR) // north
    ret += (x < this.width-1 ? this.field[y][x+1] : Map.WALL_CHAR) // east
    ret += (y < this.height-1 ? this.field[y+1][x] : Map.WALL_CHAR) // south
    ret += (x > 0 ? this.field[y][x-1] : Map.WALL_CHAR) // west
    ret += this.field[y][x] // current
    return ret
  }

  performAction(action) {
    return this.actions.performAction(action)
  }

  _initField(height, width, random_factor) {
    const ret = new Array()
    for (let y = 0; y<height; y++) {
      ret[y] = new Array()
      for (let x = 0; x<width; x++) {
        ret[y][x] = Math.random() <= random_factor ? Map.CAN_CHAR : Map.EMPTY_CHAR
      }
    }
    return ret
  }

  printMap() {
    let ret = ''
    for (let y = 0; y<this.field.length; y++) {
      let line = ''
      for (let x = 0; x<this.field[y].length; x++) {
        line += (x==this._robbyPos.x && y==this._robbyPos.y) ? Map.ROBBY_CHAR : this.field[y][x]
      }
      ret += line+'\n'
    }
    return ret
  }
}

export default Map