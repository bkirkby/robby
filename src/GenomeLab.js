import Actions from './Actions'

class GenomeLab {
  contructor() {
    this._mutationFactor = .05
  }

  get mutationFactor () {
    return this._mutationFactor
  }
  set mutationFactor (factor) {
    this._mutationFactor = factor
  }

  _getBalancedMid = (str) => {
    let mid = Math.floor(str.length/2)
    if (str.length % 2 !== 0 && Math.random() >= .5) {
      mid += 1
    }
    return mid
  }
  
  splice = (strat1, strat2) => {
    const mid = this._getBalancedMid(strat1)
    let ret = strat1.substring(0,mid)
    ret += strat2.substring(mid)
    return ret
  }

  mutate = (strat) => {
    return strat.split('').map((c) => {
      if (Math.random()<=this.mutationFactor) {
        return Actions.randomAction()
      } else {
        return c
      }
    }).join().replace(/,/g,'')
  }
}

export default GenomeLab