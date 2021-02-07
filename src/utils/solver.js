export function findEmpty(bo) {
    for(let i = 0; i < bo.length; i++) {
      for(let j = 0; j < bo[i].length; j++) {
        if(bo[i][j] === 0)
          return [i, j];
      }
    }

    return null;
}

export function valid(bo, num, pos) {
  //check row
  for(let i = 0; i < bo[pos[0]].length; i++) {
    if(bo[pos[0]][i] === num)
      return false;
  }

  //check column
  for(let i = 0; i < bo.length; i++) {
    if(bo[i][pos[1]] === num)
      return false;
  }

  let x = Math.floor(pos[1] / 3) * 3;
  let y = Math.floor(pos[0] / 3) * 3;

  //check tile
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      if(bo[y + i][x + j] === num)
        return false;
    }
  }

  return true;
}

export function solve(bo) {
  let empty = findEmpty(bo);

  //base case
  if(!empty) {
    console.log('solved');
    return true;
  }

  let row = empty[0];
  let col = empty[1];

  for(let i = 1; i < 10; i++) {
    if(valid(bo, i, empty)) {
      bo[row][col] = i;

      if(solve(bo)) {
        return bo;
      }

      bo[row][col] = 0;
    }
 }

 return false;
}