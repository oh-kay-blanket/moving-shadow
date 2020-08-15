import getViewPos from "./getViewPos";
import getElePos from "./getElePos";
import makeShadow from "./makeShadow";
import makeDropShadow from "./makeDropShadow";

const movingShadow = settings => {

    // Select element
    var elements = document.querySelectorAll(settings.selector);

    // Set initial fixedShadow
    settings.fixedShadow && elements.forEach(element => {
      element.style.textShadow = settings.fixedShadow;
    });

  // Listen for touch or movement
  window.onmousemove = e => handleMove(e, settings);
  // window.ontouchmove = e => handleMove(e, settings);
  window.ondeviceorientation = e => handleMove(e, settings);


  // Handles any touch or movement changes
  function handleMove(event, settings) {

    // Get mouse position
    const viewPos = getViewPos(event);

    elements.forEach(element => {
      // Get element position
      const elePos = getElePos(element);

      const calculateDistance = (viewPos, elePos, settings) => {

        // Find difference between mouse & element
        const xDiff = viewPos.x - elePos.centerX;
        const yDiff = viewPos.y - elePos.centerY;

        // Determines furthes mouse point (x or y) from element
        const farthestPointFactor = settings.type === "dropShadow" ? 40 : 4;
        const farthestPoint = Math.round(Math.max(Math.abs(xDiff), Math.abs(yDiff))/farthestPointFactor);

        switch(settings.type) {
          case 'shadow':
            makeShadow(element, xDiff, yDiff, farthestPoint, settings);
            break;
          case 'dropShadow':
            makeDropShadow(element, xDiff, yDiff, farthestPoint, settings);
            break;
          case 'perspective':
            console.log('perspective')
            break;
          default:
            console.log('Select type')
        }
      }

      calculateDistance(viewPos, elePos, settings);
    })
  }
}

export default movingShadow;
