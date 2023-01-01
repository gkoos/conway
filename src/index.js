const canvas = document.getElementById("game");
var offscreen = canvas.transferControlToOffscreen();
var worker = new Worker("worker.js");
worker.postMessage({ canvas: offscreen }, [offscreen]);

let isRunning = true;

const controlButton = document.getElementById("control");
controlButton.addEventListener("click", () => {
  if (isRunning) {
    worker.postMessage({ command: "stop" });
    controlButton.innerText = "Start";
  } else {
    worker.postMessage({ command: "start" });
    controlButton.innerText = "Stop";
  }
  isRunning = !isRunning;
});

const densitySlider = document.getElementById("density");
densitySlider.addEventListener("input", () => {
  const densityValue = document.getElementById("density-value");
  densityValue.innerText = densitySlider.value;
});

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
  const density = document.getElementById("density").value / 100;
  worker.postMessage({ command: "reset", density });
});
