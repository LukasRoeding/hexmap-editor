const canvas = document.getElementById('canvas');

let currentTime = 0;

var output = document.getElementById("output");

const retrievedData = localStorage.getItem('jsonData');
const parsedData = JSON.parse(retrievedData);
console.log(parsedData);

const r = 20;

const closeModal = document.getElementById("close-modal");
closeModal.addEventListener("click", function() {
  const eventModal = document.getElementById("event-modal");
  eventModal.style.display = "none";
});

function init() {
  drawRealGrid();
}
init();

function drawRealGrid() {
  killGrid() 
  const x0 = 0;
  const y0 = 0; // Start at the top of the canvas
  const dx = 3 * r;
  const dy = Math.sqrt(3) * r / 2; // distance between rows in a hexagonal grid

  for (let i = 0; i < parsedData.length; i++) {
      const x = x0 + parsedData[i].x * dx + (parsedData[i].y % 2) * (r*1.5); // offset every other column
      const y = y0 + parsedData[i].y * dy;
      drawHexagon(x, y, parsedData[i].color, parsedData[i].discovered, parsedData[i].event, parsedData[i].eventHeadline);
  }
}

function killGrid() {
  const hexagons = document.querySelectorAll(".hexagon");
  for (let i = 0; i < hexagons.length; i++) {
    hexagons[i].remove();
  }
}

function drawHexagon(x, y, color, discovered, event, eventHeadline) {
  const newHexagon = document.createElement("div");
  if (discovered) {
    newHexagon.style.backgroundColor = color;
  } else {
    newHexagon.style.backgroundColor = shadeColor(color, -80);
  }
  if (event && eventHeadline) {
    newHexagon.style.cursor = "pointer";
    newHexagon.innerHTML =  '!' 
    newHexagon.addEventListener("click", function() {
      const eventModal = document.getElementById("event-modal");
      const eventModalText = document.getElementById("event-modal-text");
      const eventModalHeadline = document.getElementById("event-modal-headline");
      eventModalHeadline.innerHTML = eventHeadline;
      eventModalText.innerHTML = event;
      eventModal.style.display = "block";
    });
  }
  newHexagon.style.width = r * 2  + "px";
  newHexagon.style.height = r * 2  + "px";
  newHexagon.style.lineHeight = r * 2 - 3 + "px";
  newHexagon.style.textAlign = "center";
  newHexagon.style.fontSize = r + 'px';
  newHexagon.style.fontWeight = "bold";
  newHexagon.style.color = "white";
  newHexagon.style.position = "absolute";
  newHexagon.style.left = x + "px";
  newHexagon.style.top = y + "px";
  newHexagon.style.clipPath = "polygon(25% 10%, 75% 10%, 95% 50%, 75% 90%, 25% 90%, 5% 50%)"
  newHexagon.classList.add("hexagon");
  canvas.appendChild(newHexagon);
}

function shadeColor(color, percent) {

  var R = parseInt(color.substring(1,3),16);
  var G = parseInt(color.substring(3,5),16);
  var B = parseInt(color.substring(5,7),16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R<255)?R:255;  
  G = (G<255)?G:255;  
  B = (B<255)?B:255;  

  R = Math.round(R)
  G = Math.round(G)
  B = Math.round(B)

  var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}