const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const clearBtn = document.getElementById("clear-btn");
const colorPicker = document.getElementById("color-picker");
const shapeSelector = document.getElementById("shape-selector");
const penSize = document.getElementById("pen-size");
let shapeStarted = false;
let startX, startY; // Variables to store initial position of the shape

let painting = false;
let currentColor = colorPicker.value;
let currentShape = shapeSelector.value;
let currentSize = penSize.value;

ctx.lineWidth = currentSize;
ctx.lineCap = "round";
ctx.strokeStyle = currentColor;

function startPosition(e) {
  painting = true;
  draw(e);
}

function endPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
    if (!painting) return;
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentSize;
  
    if (currentShape === 'line') {
      // Drawing lines on mouse move (as before)
      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    } else if (currentShape === 'circle' && shapeStarted) {
      // Drawing circles when shapeStarted is true (on mouse move)
      const radius = Math.sqrt(
        Math.pow(e.clientX - canvas.offsetLeft - startX, 2) +
        Math.pow(e.clientY - canvas.offsetTop - startY, 2)
      );
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(startX, startY, radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (currentShape === 'rectangle' && shapeStarted) {
      // Drawing rectangles when shapeStarted is true (on mouse move)
      const width = e.clientX - canvas.offsetLeft - startX;
      const height = e.clientY - canvas.offsetTop - startY;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.rect(startX, startY, width, height);
      ctx.stroke();
    }
  }
  canvas.addEventListener('mousedown', (e) => {
    if (currentShape === 'circle' || currentShape === 'rectangle') {
      shapeStarted = true;
      startX = e.clientX - canvas.offsetLeft;
      startY = e.clientY - canvas.offsetTop;
    } else {
      startPosition(e);
    }
  });

  canvas.addEventListener('mouseup', (e) => {
    if (currentShape === 'circle' || currentShape === 'rectangle') {
      shapeStarted = false;
      draw(e);
      ctx.beginPath();
    } else {
      endPosition();
    }
  });

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

colorPicker.addEventListener("input", () => {
  currentColor = colorPicker.value;
});

shapeSelector.addEventListener("change", () => {
  currentShape = shapeSelector.value;
});

penSize.addEventListener("input", () => {
  currentSize = penSize.value;
});

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);
clearBtn.addEventListener("click", clearCanvas);
