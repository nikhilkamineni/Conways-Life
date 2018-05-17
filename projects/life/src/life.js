/**
 * Implementation of Conway's game of Life
 */
const MODULO = 8;
/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  //NOTE:  Iterate through Array2D row first then column
  let a = new Array(height);

  for (let i = 0; i < height; i++) {
    a[ i ] = new Array(width);
  }

  return a;
}

/**
 * Life class
 */
class Life {
  /**
   * Constructor
   */
  constructor(width, height) {
    // !!!! IMPLEMENT ME !!!!
    this.width = width;
    this.height = height;

    this.currentIndex = 0;
    this.buffers = [Array2D(width, height), Array2D(width, height)];

    this.randomize();
    // this.clear();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
    return this.buffers[ this.currentIndex ];
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!!
    console.log('CLEAR!!!');
    for (let row = 0; row < this.height; row++) {
      this.buffers[ this.currentIndex ][ row ].fill(0);
    }
    console.log('CLEARED: ', this.buffers);
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    let buffer = this.buffers[ this.currentIndex ];

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        buffer[ row ][ col ] = Math.floor(Math.random() * 2);
      }
    }
    console.log('RANDOMIZED: ', this.buffers);
  }

  // glider() {
  //   let x = Math.floor(Math.random() * (this.width - 6)) + 10
  //   let y = Math.floor(Math.random() * (this.width - 6)) + 6

  // }

  /**
   * Run the simulation for a single step
   */
  step() {
    let nextIndex = this.currentIndex === 0 ? 1 : 0;
    let currentBuffer = this.buffers[ this.currentIndex ];
    let nextBuffer = this.buffers[ nextIndex ];

    const neighborCounter = (row, col) => {
      let counter = 0;

      // West
      if (col > 0) {
        if (currentBuffer[ row ][ col - 1 ] === 1) counter++;
      }

      // Northwest
      if (col > 0 && row > 0) {
        if (currentBuffer[ row - 1 ][ col - 1 ] === 1) counter++;
      }

      // North
      if (row > 0) {
        if (currentBuffer[ row - 1 ][ col ] === 1) counter++;
      }

      // Northeast
      if (row > 0 && col < this.width - 1) {
        if (currentBuffer[ row - 1 ][ col + 1 ] === 1) counter++;
      }

      // East
      if (col < this.width - 1) {
        if (currentBuffer[ row ][ col + 1 ] === 1) counter++;
      }

      // Southeast
      if (col < this.width - 1 && row < this.height - 1) {
        if (currentBuffer[ row + 1 ][ col + 1 ] === 1) counter++;
      }

      // South
      if (row < this.height - 1) {
        if (currentBuffer[ row + 1 ][ col ] === 1) counter++;
      }

      // Southwest
      if (row < this.height - 1 && col > 0) {
        if (currentBuffer[ row + 1 ][ col - 1 ]) counter++;
      }

      return counter;
    };

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {

        let cell = currentBuffer[ row ][ col ];
        let neighbors = neighborCounter(row, col);

        // Decide whether the cell lives or dies on next generation
        if (cell === 1) {
          if (neighbors > 1 && neighbors < 4) {
            nextBuffer[ row ][ col ] = 1;
          } else {
            nextBuffer[ row ][ col ] = 0;
          }
        } else {
          if (neighbors === 3) {
            nextBuffer[ row ][ col ] = 1;
          } else {
            nextBuffer[ row ][ col ] = 0;
          }
        }
      }
    }
    // Switch the current buffer index for the next step
    this.currentIndex = this.currentIndex === 0 ? 1 : 0;
  }
}

export default Life;
