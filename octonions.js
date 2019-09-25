// A dynamic view of the Venus pentagram
// Semidan Robaina Estevez, 2019

let colors = ["rgb(94, 217, 69)", "rgb(250, 198, 44)", "rgb(246, 113, 71)",
              "rgb(51, 215, 201)", "rgb(217, 69, 189)", "rgb(71, 114, 241)",
              "rgb(132, 22, 242)"];
let trail_color = colors[Math.floor(Math.random() * colors.length)];

document.body.style.setProperty("--fancyColor", trail_color);

let scale_factor = 250;
let offsetAngle, points;
let point_ids = ["e1", "e2", "e3", "e4", "e5", "e6", "e7"];
let id_map = {"e1": "K", "e2": "J", "e3": "I", "e4": "i",
              "e5": "k", "e6": "j", "e7": "E"};
let ncols = nrows = 8;

let initialValues = {"x01": "i", "x02": "j",
                     "x03": "k", "x04": "E",
                     "x05": "I", "x06": "J",
                     "x07": "K", "x10": "i",
                     "x20": "j", "x30": "k",
                     "x40": "E", "x50": "I",
                     "x60": "J", "x70": "K",
                     "x00": "x"};
let restValues = {};
restValues["x11"] = "- 1";
restValues["x12"] = "k";
restValues["x13"] = "- j";
restValues["x14"] = "I";
restValues["x15"] = "- E";
restValues["x16"] = "- K";
restValues["x17"] = "J";

restValues["x21"] = "- k";
restValues["x22"] = "- 1";
restValues["x23"] = "i";
restValues["x24"] = "J";
restValues["x25"] = "K";
restValues["x26"] = "- E";
restValues["x27"] = "- I";

restValues["x31"] = "j";
restValues["x32"] = "- i";
restValues["x33"] = "- 1";
restValues["x34"] = "K";
restValues["x35"] = "- J";
restValues["x36"] = "I";
restValues["x37"] = "- E";

restValues["x41"] = "- I";
restValues["x42"] = "- J";
restValues["x43"] = "- K";
restValues["x44"] = "- 1";
restValues["x45"] = "i";
restValues["x46"] = "j";
restValues["x47"] = "k";

restValues["x51"] = "E";
restValues["x52"] = "- K";
restValues["x53"] = "J";
restValues["x54"] = "- i";
restValues["x55"] = "- 1";
restValues["x56"] = "- k";
restValues["x57"] = "j";

restValues["x61"] = "K";
restValues["x62"] = "E";
restValues["x63"] = "- I";
restValues["x64"] = "- j";
restValues["x65"] = "k";
restValues["x66"] = "- 1";
restValues["x67"] = "- i";

restValues["x71"] = "- J";
restValues["x72"] = "- I";
restValues["x73"] = "E";
restValues["x74"] = "- k";
restValues["x75"] = "- j";
restValues["x76"] = "i";
restValues["x77"] = "- 1";



function setup() {
  cnv = createCanvas(windowWidth, windowHeight / 1.5);
  cnv.parent("canvas_container");
  scale_factor = 0.5 * height;
  angleMode(RADIANS);
  rectMode(CENTER);
  colorMode(RGB);
  textAlign(CENTER);
  textSize(0.15 * scale_factor);
  points = {};
  for (let p of point_ids) {
    points[p] = createVector(0, 0);
  }
  offsetAngle = -0.5 * PI; // rotate triangle
}

function draw() {
  background("black");

  translate(width / 2, height / 1.5);
  noFill();
  stroke("white");

  for (let k=1; k<4; k++) {
    points["e" + k]["x"] = scale_factor * cos(2*PI*k / 3 + offsetAngle);
    points["e" + k]["y"] = scale_factor * sin(2*PI*k / 3 + offsetAngle);
  }

  for (let k=1; k<4; k++) {

    if (k === 3) {
      points["e" + (k+3)]["x"] = 0.5 * (points["e" + k]["x"] + points.e1.x);
      points["e" + (k+3)]["y"] = 0.5 * (points["e" + k]["y"] + points.e1.y);

    } else {
        points["e" + (k+3)]["x"] = 0.5 * (points["e" + k]["x"] + points["e" + (k+1)]["x"]);
        points["e" + (k+3)]["y"] = 0.5 * (points["e" + k]["y"] + points["e" + (k+1)]["y"]);
    }
  }

  // Draw triangle and circle
  ellipse(0,0,scale_factor,scale_factor);
  triangle(points.e1.x,points.e1.y,points.e2.x,points.e2.y,points.e3.x,points.e3.y);

  // Draw interior lines
  line(points.e5.x, points.e5.y, points.e7.x, points.e7.y);
  line(points.e7.x, points.e7.y, points.e1.x, points.e1.y);
  line(points.e6.x, points.e6.y, points.e7.x, points.e7.y);
  line(points.e7.x, points.e7.y, points.e2.x, points.e2.y);
  line(points.e3.x, points.e3.y, points.e7.x, points.e7.y);
  line(points.e7.x, points.e7.y, points.e4.x, points.e4.y);

  // Draw circles at points and text
  for (p of point_ids) {
    let text_x = points[p].x;
    let text_y = points[p].y + 0.06 * scale_factor;
    fill(color(trail_color));
    ellipse(points[p].x, points[p].y, 0.2 * scale_factor, 0.2 * scale_factor);
    fill("white");
    text(id_map[p], text_x, text_y);
  }

  // Add arrow heads
  let d = 0.03;
  fill("white");
  let a0 = p5.Vector.mult(p5.Vector.add(points.e2, points.e5), 0.5);
  drawArrow(a0.x, a0.y, d * scale_factor, angle=2*PI);

  let a1 = p5.Vector.mult(p5.Vector.add(points.e5, points.e3), 0.5);
  drawArrow(a1.x, a1.y, d * scale_factor, angle=2*PI);

  let a2 = p5.Vector.mult(p5.Vector.add(points.e3, points.e6), 0.5);
  drawArrow(a2.x, a2.y, d * scale_factor, angle=2*PI);

  let a3 = p5.Vector.mult(p5.Vector.add(points.e6, points.e1), 0.5);
  drawArrow(a3.x, a3.y, d * scale_factor, angle=2*PI);

  let a4 = p5.Vector.mult(p5.Vector.add(points.e1, points.e4), 0.5);
  drawArrow(a4.x, a4.y, d * scale_factor, angle=2*PI);

  let a5 = p5.Vector.mult(p5.Vector.add(points.e4, points.e2), 0.5);
  drawArrow(a5.x, a5.y, d * scale_factor, angle=2*PI);

  let a6 = p5.Vector.mult(p5.Vector.add(points.e5, points.e7), 0.5);
  drawArrow(a6.x, a6.y, d * scale_factor, angle=0.16*PI);

  let a7 = p5.Vector.mult(p5.Vector.add(points.e7, points.e1), 0.5);
  drawArrow((1-0.4)*a7.x, (1-0.4)*a7.y, d * scale_factor, angle=0.16*PI);

  let a8 = p5.Vector.mult(p5.Vector.add(points.e6, points.e7), 0.5);
  drawArrow(a8.x, a8.y, d * scale_factor, angle=0.16*PI);

  let a9 = p5.Vector.mult(p5.Vector.add(points.e7, points.e2), 0.5);
  drawArrow((1-0.5)*a9.x, (1-0.5)*a9.y, d * scale_factor, angle=0.16*PI);

  let a10 = p5.Vector.mult(p5.Vector.add(points.e4, points.e7), 0.5);
  drawArrow(a10.x, a10.y, d * scale_factor, angle=0.16*PI);

  let a11 = p5.Vector.mult(p5.Vector.add(points.e7, points.e3), 0.5);
  drawArrow(a11.x, (1-0.5)*a11.y, d * scale_factor, angle=0.16*PI);

  let a12 = p5.Vector.mult(p5.Vector.add(points.e7, points.e3), 0.5);
  drawArrow(a12.x, a12.y, d * scale_factor, angle=0.16*PI+1.5*PI);

  let a13 = p5.Vector.mult(p5.Vector.add(points.e7, points.e1), 0.5);
  drawArrow(a13.x, a13.y, d * scale_factor, angle=0.16*PI+1.5*PI);

  let a14 = p5.Vector.mult(p5.Vector.add(points.e7, points.e2), 0.5);
  drawArrow(a14.x, a14.y, d * scale_factor, angle=0.16*PI+1.5*PI);

  noLoop();
}

function drawArrow(x, y, size, angle=0) {
  let tx = [];
  let ty = [];
  for (let k=0; k<3; k++) {
    tx[k] = size * cos(2*PI*k / 3);
    ty[k] = size * sin(2*PI*k / 3);
  }
  push();
  translate(x, y);
  rotate(angle);
  triangle(tx[0], ty[0], tx[1], ty[1], tx[2], ty[2]);
  pop();
}

function displayGrid() {
  let gameGrid = document.getElementById("game_grid");
  gameGrid.style.setProperty("grid-template-columns",
    "repeat(" + ncols + ", auto)");

  for (let i=0; i<ncols; i++) {
    for (let j=0; j<nrows; j++) {

      let smallCell = document.createElement("div");
      smallCell.setAttribute("class", "small-cell");

      smallCell.setAttribute("id", "x" + i + j);
      smallCell.setAttribute("contenteditable", "true");
      smallCell.addEventListener("click", selectCell);
      smallCell.addEventListener("touch", selectCell);

      if (Object.keys(initialValues).includes(smallCell.id)) {
        smallCell.innerHTML = initialValues[smallCell.id];
        smallCell.classList.add("initial-cell");
      }
      if (Object.keys(restValues).includes(smallCell.id)) {
        smallCell.classList.add("empty-cell");
        smallCell.innerHTML = restValues[smallCell.id];
      }

      gameGrid.appendChild(smallCell);
    }
  }

}

// function getGridNumbers(solution) {
//   let grid_numbers = {};
//   let entries = Object.entries(solution);
//
//   for (entry of entries) {
//
//     if (entry[1] === 1) {
//       let id = entry[0].slice(1, 3);
//       let value = parseInt(entry[0].slice(3));
//       grid_numbers[id] = value;
//     }
//   }
//   return grid_numbers
// }


function selectCell(event) {
  selectedCell = event.target;
  removeSelected();
  selectedCell.classList.remove("empty-cell");
  selectedCell.classList.add("selected-cell");
  if (selectedCell.innerHTML === "0") {
    selectedCell.innerHTML = "";
  }
}

function removeSelected() {
  let cells = document.getElementsByClassName("small-cell");
  for (let i=0; i<cells.length; i++) {
    if (cells[i].classList.contains("selected-cell") & cells[i].innerHTML.length === 0) {
      cells[i].classList.remove("selected-cell");
      cells[i].classList.add("empty-cell");
      cells[i].innerHTML = "0";
    }
    if (cells[i].classList.contains("selected-cell")) {
      cells[i].classList.remove("selected-cell");
      cells[i].classList.add("unselected-cell");
    }
  }
}

function reset() {
  selectedCells = [];
  removeSelected();
  let cells = document.getElementsByClassName("small-cell");
  for (let i=0; i<cells.length; i++) {
    cells[i].innerHTML = "0";
    cells[i].classList.remove("unselected-cell", "initial-cell");
    cells[i].classList.add("empty-cell");
  }
}

function getCellNumbers() {
  for (let n=0; n<nrows*ncols; n++) {

    let bigcoor = get2DCoordinates(n, ncols);
    for (let j=0; j<nrows*ncols; j++) {

      let smallcoor = get2DCoordinates(j, ncols);
      let xcoor = (nrows*bigcoor.x + smallcoor.x);
      let ycoor = (ncols*bigcoor.y + smallcoor.y);
      let smallCell = document.getElementById("x" + xcoor + ycoor);
      let initialCondition = smallCell.innerHTML;
      smallCell.classList.add("unselected-cell");

      if (initialCondition !== "0") {
        smallCell.classList.remove("unselected-cell");
        smallCell.classList.add("initial-cell");
        selectedCells.push(smallCell.id + initialCondition);
      }
    }
  }
}

function resizeDiagram() {
  resizeCanvas(windowWidth, windowHeight);
}
