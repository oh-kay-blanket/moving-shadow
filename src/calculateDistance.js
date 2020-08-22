import getElePos from "./getElePos";

const calculateDistance = (element, viewPos, { angle=20 } = {}) => {

  let distance = {};

  // Get element position
  const elePos = getElePos(element);

  // Find difference between view position & element
  distance.x = Math.round(viewPos.x - elePos.centerX)/angle;
  distance.y = Math.round(viewPos.y - elePos.centerY)/angle;

  // Limit max difference, to avoid over stretched shadows
  const setDiffMax = (diff, max) => Math.abs(diff) < max ? diff : diff > 0 ? max : -max;

  // Apply diffMax based on device
  // Mobile
  if (event.type === 'deviceorientation') {
    distance.x = setDiffMax(distance.x, 500);
    distance.y = setDiffMax(distance.y, 500);

  // Desktop
  } else {
    distance.x = setDiffMax(distance.x, 650);
    distance.y = setDiffMax(distance.y, 650);
  };

  return distance;
}

export default calculateDistance;
