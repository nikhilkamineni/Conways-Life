/**
 * Implementation of Conway's game of Life
 */
/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  //NOTE:  Iterate through Array2D row first then column
  let a = new Array(height);

  for (let i = 0; i < height; i++) {
    a[i] = new Array(width);
  }

  return a;
}

const MODULO = 4;

/**
 * Life class
 */
class Life {
  /**
   * Constructor
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.currentIndex = 0;
    this.buffers = [Array2D(width, height), Array2D(width, height)];

    this.clear();
    // this.randomize();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.buffers[this.currentIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
    for (let row = 0; row < this.height; row++) {
      this.buffers[this.currentIndex][row].fill(0);
    }
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    let buffer = this.buffers[this.currentIndex];

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        buffer[row][col] = Math.floor(Math.random() * MODULO);
      }
    }
  }

  gliders() {
    for (let i = 0; i < 1000; i++) {
      let buffer = this.buffers[this.currentIndex];
      let row = Math.floor(Math.random() * (this.width - 20)) + 10;
      let col = Math.floor(Math.random() * (this.height - 20)) + 10;
      let color = Math.floor(Math.random() * MODULO - 1) + 1;

      buffer[row][col] = color;
      buffer[row][col + 2] = color;
      buffer[row - 1][col + 2] = color;
      buffer[row + 1][col + 1] = color;
      buffer[row + 1][col + 2] = color;
    }
  }

  getVal(x, y) {
    let currentBuffer = this.buffers[this.currentIndex];
    return currentBuffer[x][y];
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    let nextIndex = this.currentIndex === 0 ? 1 : 0;
    let currentBuffer = this.buffers[this.currentIndex];
    let nextBuffer = this.buffers[nextIndex];

    const neighborCounter = (row, col) => {
      let register = [0, 0, 0, 0];
      let counter = 0;

      // West
      if (col > 0) {
        if (currentBuffer[row][col - 1] > 1) {
          register[currentBuffer[row][col - 1]]++;
          counter++;
        }
      }

      // Northwest
      if (col > 0 && row > 0) {
        if (currentBuffer[row - 1][col - 1] > 1) {
          register[currentBuffer[row - 1][col - 1]]++;
          counter++;
        }
      }

      // North
      if (row > 0) {
        if (currentBuffer[row - 1][col] > 1) {
          register[currentBuffer[row - 1][col]]++;
          counter++;
        }
      }

      // Northeast
      if (row > 0 && col < this.width - 1) {
        if (currentBuffer[row - 1][col + 1] > 1) {
          register[currentBuffer[row - 1][col + 1]]++;
          counter++;
        }
      }

      // East
      if (col < this.width - 1) {
        if (currentBuffer[row][col + 1] > 1) {
          register[currentBuffer[row][col + 1]]++;
          counter++;
        }
      }

      // Southeast
      if (col < this.width - 1 && row < this.height - 1) {
        if (currentBuffer[row + 1][col + 1] > 1) {
          register[currentBuffer[row + 1][col + 1]]++;
          counter++;
        }
      }

      // South
      if (row < this.height - 1) {
        if (currentBuffer[row + 1][col] > 1) {
          register[currentBuffer[row + 1][col]]++;
          counter++;
        }
      }

      // Southwest
      if (row < this.height - 1 && col > 0) {
        if (currentBuffer[row + 1][col - 1]) {
          register[currentBuffer[row + 1][col - 1]]++;
          counter++;
        }
      }

      return register;
    };

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        let cell = currentBuffer[row][col];
        // let neighbors = neighborCounter(row, col);
        let neighbors = neighborCounter(row, col)
          .slice(1)
          .reduce((acc, n) => acc + n);
        let color = 0;

        // If cell is alive...
        if (cell === 1) {
          if (neighbors < 1) color = 0;
          else if (neighbors > 1 && neighbors < 5) color = 1;
        } else if (cell === 2) {
          if (neighbors < 1) color = 0;
          else if (neighbors > 1 && neighbors < 5) color = 2;
        } else if (cell === 3) {
          if (neighbors < 1) color = 0;
          else if (neighbors > 1 && neighbors < 4) color = 3;
        }
        // If cell is dead...
        else {
          if (neighbors > 2) color = Math.floor(Math.random() * MODULO - 1) + 1;
          if (neighbors === 3) color = 2
          // else if (neighbors === 3) color = 1;
          // else if (neighbors === 5) color = 2;
          else if (neighbors === 6) color = 3;
          else {
            color = 0;
          }
        }

        nextBuffer[row][col] = color;
      }
    }
    // Switch the current buffer index for the next step
    this.currentIndex = this.currentIndex === 0 ? 1 : 0;
  }
}

export default Life;
