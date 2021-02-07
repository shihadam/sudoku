# Sudoku Web App
This is my Sudoku Web App. Created using JavaScript and using the React library. The maps are pre-generated using the generator algorithm below, and then uploaded to the website. Every puzzle has only one possible solution. The application uses an internal solver using the solver algorithm below in order to provide hints and to check if the user has solved the puzzle.

Check it out here: &nbsp; shihadam.github.io/sudoku

<br />

# Motivation
I created this program mainly to learn how to program for the web. I was able to start learning HTML, CSS, JavaScript and also React. Also, I like algorithms and Sudoku so it was a fun exercise in implementing both!

<br />

# Algorithms
## Solver:
```py
# solves the board if possible using backtracking algorithm
solve(board):
    empty = findEmpty(board)

    if not empty:
        return True

    row = empty.y
    col = empty.x

    for i in range(1, 10):
        if valid(board, i, empty)
            board[row][col] = i

            if solve(board):
                return board
            board[row][col] = 0

    return False
```
## Generator:
```py
# pass a solved board into the generator
generate(numCellsToRemove):
    board = 2D array of all 0
    nums = shuffle()
    solve(board, nums)
    return removeCells(board, nums, numCellsToRemove)

# remove n cells from a solved board
# uses backtracking to create unique solution
removeCells(board, nums, count):
    tries = 20 # arbitrary number to make sure it doesnt run forever

    for i in range(0, tries):
        index = random index
        if board[index.y][index.x] is not empty:
            original_value = value at index
            temp = copy of board
            if solve(temp, nums, index, original_value) == False:
                if removeCells(board, nums, count - 1)
                    return board

            board[index.y][index.x] = original_value

    return False        

# modified solver to use random nums and forbidden index and values
# this is necessary for creating puzzles with only one solution
solve(board, nums, fb_index = null, fb_val = null):
    empty = findEmpty(board)

    if not empty: return True

    row = empty.y
    col = empty.x

    for i in range(0, nums.length):
        if fb_index and fb_val:
            if move is forbidden:
                continue
        
        if valid(board, nums[i], empty):
            board[row][col] = nums[i]
            if solve(board, nums):
                return board
            board[row][col] = 0

    return False

# find the first empty cell on the board
findEmpty(board):
    for i in range(0, board.length):
        for j in range(0, board[i].length):
            if board[i][j] is empty:
                return empty position

# check if a move is valid
valid(board, num, pos):
    # check if num appears in same row
    for i in range(0, board[pos.y].length):
        if board[pos.y][i] == num:
            return False

    # check for column
    for i in range(0, board.length):
        if board[i][pos.x] == num:
            return False

    # check for tile
    x = (pos.x // 3) * 3
    y = (pox.y // 3) * 3

    for i in range(0, 2):
        for j in range(0, 2):
            if board[y + i][x + j] == num:
                return False

    return True

# Fisher-Yates shuffle to randomize number choices
# from https://bost.ocks.org/mike/shuffle/
shuffle():
    nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    m = nums.length

    while(m):
        m -= 1
        i = random() // m
        t = nums[m]
        nums[m] = nums[i]
        nums[i] = t

    return nums
```
