import Map from '../src/Map'

export const translateMap = (map) => {
  return map.replace(/R/g, Map.ROBBY_CHAR)
     .replace(/\./g, Map.EMPTY_CHAR)
     .replace(/C/g, Map.CAN_CHAR)
     .replace(/-/g, Map.WALL_CHAR)
}