#!/usr/bin/env node
import fs from 'fs'
import Map from '../src/Map'

const _combinations = (w, src_chars) =>{
  var n = w.match(/\!/g).length,
      src_chars_n = new Array(),
      r = new Array(),
      c = null;

  for (var i = n; i > 0; i--) {
      src_chars_n.push(src_chars);
  }

  c = src_chars_n.reduce(function(a, b) {
      var c = [];
      a.forEach(function(a) {
          b.forEach(function(b) {
              c.push(a.concat([b]));
          });
      });
      return c;
  }, [[]]);

  for (var i = 0, j = 0; i < c.length; i++, j = 0) {
      r.push(w.replace(/\!/g, function(s, k) {
          return c[i][j++];
      }));
  }

  return r;
}

let output = ''
const mapChars = [Map.CAN_CHAR, Map.EMPTY_CHAR, Map.WALL_CHAR]
const sceneCombos = _combinations('!!!!!', mapChars)

output += `// each location can be either Can (${Map.CAN_CHAR}), Wall (${Map.WALL_CHAR}), or Empty (${Map.EMPTY_CHAR})\n`
output += '// each scene has a "north, east, south, west, and current" assignment\n'
output += 'export default {\n'
let i
for (i=0; i<sceneCombos.length; i++) {
  output += `  "${sceneCombos[i]}": ${i},\n`
}
output += `  length: ${i}\n}`

console.log('writing file "src/allScenarios.js" with chars: ', mapChars)
fs.writeFile('src/allScenarios.js', output)