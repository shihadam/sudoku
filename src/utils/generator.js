function findEmpty(bo) {
    for(let i = 0; i < bo.length; i++) {
      for(let j = 0; j < bo[i].length; j++) {
        if(bo[i][j] === 0)
          return {
              x: j,
              y: i
          };
      }
    }

    return null;
}

function valid(bo, num, pos) {
  //check row
  for(let i = 0; i < bo[pos.y].length; i++) {
    if(bo[pos.y][i] === num)
      return false;
  }

  //check column
  for(let i = 0; i < bo.length; i++) {
    if(bo[i][pos.x] === num)
      return false;
  }

  let x = Math.floor(pos.x / 3) * 3;
  let y = Math.floor(pos.y / 3) * 3;

  //check tile
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      if(bo[y + i][x + j] === num)
        return false;
    }
  }

  return true;
}

//Fisher-Yates shuffle algorithm
//based on code from https://bost.ocks.org/mike/shuffle/

function shuffle() {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let m = nums.length;
    let i, t;

    while(m) {
        i = Math.floor(Math.random() * m--);
        t = nums[m];
        nums[m] = nums[i];
        nums[i] = t;
    }

    return nums;
}

function solve(bo, nums, forbid_index = null, forbid_val = null) {
  let empty = findEmpty(bo);

  //base case
  if(!empty) {
    //console.log('solved');
    return true;
  }

  let row = empty.y;
  let col = empty.x;

  //try nums
  for(let i = 0; i < nums.length; i++) {
    //if forbidden then continue
    if(forbid_index && forbid_val) {
        if((isEqual(empty, forbid_index) && nums[i] === forbid_val[0]) || (empty.x === 8 - forbid_index.x && empty.y === 8 - forbid_index.y && nums[i] === forbid_val[1]))
            continue;
    }

    if(valid(bo, nums[i], empty)) {
      bo[row][col] = nums[i];

      if(solve(bo, nums)) {
        return bo;
      }

      bo[row][col] = 0;
    }
  }

 return false;
}

function isEqual(obj1, obj2) {
    return (obj1.x === obj2.x && obj1.y === obj2.y);
}

function randomIndex() {
    let i = {
        x: Math.floor(Math.random() * 8),
        y: Math.floor(Math.random() * 8)
    };

    return i;
}

function removeCellAt(bo, x, y) {
    let val = [
      bo[y][x],
      bo[8 - y][8 - x],
    ];
    //let val = bo[y][x];
    bo[y][x] = 0;
    bo[8 - y][8 - x] = 0;
    return val;
}

function copy(src) {
    const copy = [];

    for(let i = 0; i < src.length; i++) {
        copy[i] = [...src[i]];
    }

    return copy;
}

function generate(numCellsToRemove) {
    let count = numCellsToRemove;
    let nums = shuffle();
    //start with an empty board
    const board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    //solve board
    solve(board, nums);

    //generate board
    return generator(board, nums, count);
}

function generator(board, nums, count) {
  //try 20 times at given board before returning failure
  const tries = 20; 
  console.log(count);

  //base case
  if(count <= 0) {
    return true;
  }

  for(let i = 0; i < tries; i++) {
    const index = randomIndex();
    if(board[index.y][index.x] !== 0) {
      const orig_val = removeCellAt(board, index.x, index.y);

      //check if unique solution
      //if not solvable with forbidden value that means it
      //is part of a unique solution
      const temp = copy(board);
      if(!solve(temp, nums, index, orig_val)) {
        //recursively generate using backtracking
        if(generator(board, nums, count - 2))
          return board;
      }

      board[index.y][index.x] = orig_val[0];
      board[8 - index.y][8 - index.x] = orig_val[1];
    }
  }

  return false;
}

//generate board and write to datafile
function load_puzzles(difficulty, numPuzzles) {
  const puzzles = {
    data: [

    ],
  };

  for(let i = 0; i < numPuzzles; i++)
    puzzles.data[i] = generate(difficulty);

  return puzzles;
}
const fs = require('fs');
const data = JSON.stringify(load_puzzles(45, 10));
fs.writeFileSync('../data/board_data.json', data);