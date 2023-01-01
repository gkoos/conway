let density = 0.5;

const buffer = [[], []];
let activeBuffer = 0;

let canvas;
let ctx;
let isRunning = true;

const initializeBuffer = () => {
  for (let i = 0; i < 512; i++) {
    buffer[0][i] = [];
    buffer[1][i] = [];
  }
};

initializeBuffer();

onmessage = (e) => {
  if (e.data.canvas) {
    canvas = e.data.canvas;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";
    randomizeBoard(activeBuffer, density);
  }
  if (e.data.command === "stop") {
    isRunning = false;
  }
  if (e.data.command === "start") {
    isRunning = true;
  }
  if (e.data.command === "reset") {
    density = e.data.density; console.log(density)
    randomizeBoard(activeBuffer, density);
    draw(ctx, activeBuffer);
  }

  function render(time) {
    if (isRunning) {
      draw(ctx, activeBuffer);
      calculateNextState(activeBuffer);
      activeBuffer = activeBuffer === 0 ? 1 : 0;
      requestAnimationFrame(render);
    }
  }

  requestAnimationFrame(render);
};

const randomizeBoard = (activeBuffer, density) => {
  for (let i = 0; i < 512; i++) {
    for (let j = 0; j < 512; j++) {
      buffer[activeBuffer][i][j] = Math.random() < density ? 1 : 0;
    }
  }
};

const draw = (ctx, activeBuffer) => {
  ctx.clearRect(0, 0, 512, 512);
  for (let i = 0; i < 512; i++) {
    for (let j = 0; j < 512; j++) {
      if (buffer[activeBuffer][i][j] === 1) {
        ctx.fillRect(i, j, 1, 1);
      }
    }
  }
};

const calculateNextState = (activeBuffer) => {
  const getNeighbors = (x, y, activeBuffer) => {
    let neighbors = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        const xIndex = (x + i + 512) % 512;
        const yIndex = (y + j + 512) % 512;
        neighbors += buffer[activeBuffer][xIndex][yIndex];
      }
    }
    return neighbors;
  };

  const nextBuffer = activeBuffer === 0 ? 1 : 0;
  for (let i = 0; i < 512; i++) {
    for (let j = 0; j < 512; j++) {
      const neighbors = getNeighbors(i, j, activeBuffer);
      const cell = buffer[activeBuffer][i][j];
      if (cell === 1) {
        if (neighbors < 2 || neighbors > 3) {
          buffer[nextBuffer][i][j] = 0;
        } else {
          buffer[nextBuffer][i][j] = 1;
        }
      } else {
        if (neighbors === 3) {
          buffer[nextBuffer][i][j] = 1;
        } else {
          buffer[nextBuffer][i][j] = 0;
        }
      }
    }
  }
};
