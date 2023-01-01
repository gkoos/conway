# Conway's Game of Life

A simple javascript implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).
This project is a cellular automaton simulation that follows a set of rules to generate patterns and behaviors within a grid of cells.
The game board is a grid of cells that can be either alive or dead. The state of each cell is determined by the states of its neighbors according to the following rules:

* Any live cell with fewer than two live neighbors dies, as if by underpopulation.
* Any live cell with two or three live neighbors lives on to the next generation.
* Any live cell with more than three live neighbors dies, as if by overpopulation.
* Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

## Demo

The code is deployed to firebase and accessible at [https://conway-44473.web.app/](https://conway-44473.web.app/)

## Usage

At startup the board is randomly filled with live cells at 50% density (ie. each pixel has 50% chance to be either dead or alive). The Stop/Start button stops or restarts the calculation and the Reset button regenerates the board with the density set with the Density slider.

## Development

1. Clone the repo.
2. Install the dependencies with `yarn`.
3. Start the development server with `yarn start` (Note that the app uses webworkers, so simply opening index.html in a browser doesn't work because of security restrictions.)

## Credits

Conway's Game of Life was invented by mathematician John Horton Conway in 1970.



