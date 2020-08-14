import './style.scss';
import getMousePos from "./getMousePos";
import getElePos from "./getElePos";
import makeShadow from "./makeShadow";


const settings = {
  // Sets height of light source. Should be > 10 && < 100
  angle: 20,
  diffusion: 0,
  color: "#5af",
  type: "shadow"
}

document.onmousemove = e => handleMouseMove(e, settings);

function handleMouseMove(event, settings) {

  // Select element
  const selector = ".moving";
  var elements = document.querySelectorAll(selector);

  // Get mouse position
  const mousePos = getMousePos(event);

  elements.forEach(element => {
    // Get element position
    const elePos = getElePos(element);

    const calculateDistance = (mousePos, elePos, settings) => {


      // Find difference between mouse & element
      const xDiff = mousePos.x - elePos.centerX;
      const yDiff = mousePos.y - elePos.centerY;

      // Determines furthes mouse point (x or y) from element
      const farthestPoint = Math.round(Math.max(Math.abs(xDiff), Math.abs(yDiff))/4);

      switch(settings.type) {
        case 'shadow':
          makeShadow(element, xDiff, yDiff, farthestPoint, settings);
          break;
        case 'perspective':
          console.log('perspective')
          break;
        default:
          console.log('Select type')
      }
    }

    calculateDistance(mousePos, elePos, settings);
  })


  // Window specs
  // var w = window.innerWidth;
  // var h = window.innerHeight;
}
