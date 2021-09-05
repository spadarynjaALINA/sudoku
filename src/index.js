const { interfaces } = require("mocha")

module.exports = function solveSudoku(matrix) {
  
  function accumEmptyPlaces(matrix) {
  let emptyPlaces = []
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (matrix[i][j] === 0) {
          emptyPlaces.push([i, j])
        }
      }
    }
    return emptyPlaces
  }

  function checkRow(matrix, row, num) {
    for (let i = 0; i < 9; i++) {
      if (matrix[row][i] === num) {
        return false
      }
    }
    return true
  }
  
  function checkColumn(matrix, col, num) {
    for (let i = 0; i < 9; i++) {
      if (matrix[i][col] === num) {
        return false
      }
    }
    return true
  }
 function checkBox(matrix, row, col, num) {
    var boxSize =3 
    var boxRow = Math.floor( row/boxSize ) * boxSize
    var boxCol = Math.floor( col/boxSize ) * boxSize
    for (let i = boxCol; i < boxCol + boxSize; i++) {
      for (let j = boxRow; j < boxRow + boxSize; j++) {
        if (matrix[i][j] == num) {
          return false
        }
      }
    }
    return true
  }

  function checkNum(matrix, row, col, num) {
   return !!checkRow(matrix, col, num) &&
      checkColumn(matrix, row, num) &&
      checkBox(matrix, row, col, num)
    
  }
  
  let emptyPos = accumEmptyPlaces(matrix)
  for (let i = 0; i < emptyPos.length;) {
      let row = emptyPos[i][0]
      let col = emptyPos[i][1]
      let num = matrix[row][col] + 1
      let fit= 0
      while (!fit && num <= 9) {
        if (checkNum(matrix, col, row, num)) {
          fit = num
          matrix[row][col] = num
          i++
        } else {
          num++
        }
    }
    
    if(!fit) {
      matrix[row][col] = 0
      i--
    }
  }
 
  return matrix
}

