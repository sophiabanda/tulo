/*
- game start: all shapes shuffle into place
- there are two of each shape, labeled with classname
- total of 12 shapes
- if click 1 matches click 2, it's a match!
- else, try again to match click 1 and 2
- when all matches are made, you win
- celebration!
*/

// CONTSTANTS

const shapeArray = [
  ` <svg width="200" height="200" class="shape">
                <path class="pentagon" d="M 100 10 L 190 80 L 160 190 L 40 190 L 10 80 " />
            </svg>`,
  `<svg width="200" height="200" class="shape">
                <path class="rhombus" d="M 100 10 L 160 100 L 100 190 L 40 100 z" />
            </svg>`,
  `<svg width="200" height="200" class="shape">
                <path class="hexagon"
                    d="M 50 20 L 150 20 L 190 100 L 150 180 L 50 180L10 100 z " />
            </svg>`,
  `<svg width="200" height="200" class="shape">
                <path class="parallelogram" d="M 80 10 L 200 10 L 120 150 L 0 150 z" />
            </svg>`,
  `<svg width="200" height="200" class="shape">
                <path class="trapezoid"
                    d="M 45 10 L 125 10 L 175 125 L 0 125 Z" />
            </svg>`,
  `<svg width="200" height="200" class="shape">
                <path class="triangle" d="M 100 0 L 200 150 L 0 150 L 100 0" />
            </svg>`,
  `<svg width="200" height="200" class="shape">
                <circle class="circle" cx="75" cy="75" r="70" />
            </svg>`,
  `<svg width="200" height="200" class="shape">
                <rect class="rectangle" x="0" y="0" width="200" height="110" />
            </svg>`,
  `<svg width="200" height="200" class="shape">
                <rect class="square" x="25" y="0" width="130" height="130" />
            </svg>`,
  `<svg width="200" height="200">
                <ellipse class="oval" cx="100" cy="100" rx="100" ry="50" />
            </svg>`,
  `<svg width="200" height="200" class="shape">
                <path class="octagon"
                    d="M 66.66 20L 133.33 20 L 180 66.66 L 180 133.33 L 180 133.33 L 133.33 180 L 66.66 180 L 20 133.33 L 20 66.66 z " />
            </svg>`,
];

const colorOptions = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
];

// STATE VARIABLES
// CACHED ELEMENTS
let totalMatches;
let matchedShapes;
const svgContainer = document.querySelector('svg');
svgContainer.innerHTML = `<svg width="200" height="200" class="shape">
                <rect class="rectangle" x="0" y="0" width="200" height="110" />
            </svg>`;
// EVENT LISTENERS
// FUNCTIONS
