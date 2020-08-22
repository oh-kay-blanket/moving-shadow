const makeShadow = (element, distance, {
  // Destructure settings
  shadowType = 'shadow',
  angle = 20,
  diffusion = 0,
  color = "rgba(51, 51, 51, 0.7)",
  fixedShadow,
  xOffset = 0,
  yOffset = 0
} = {}) => {

  // Determines division factor for furthest point
  const farthestPointFactor = event.type === 'deviceorientation' ? 1 : 1; // settings.type === "dropShadow" ? 40 : event.type === 'deviceorientation' ? 7 : 4

  // Determines furthes mouse point (x or y) from element
  const farthestPoint = Math.round(Math.max(Math.abs(distance.x), Math.abs(distance.y)));

  // Fewer loops for mobile
  const jumpAmount = event.type === 'deviceorientation' ? 1 : 1;

  // Setup shadow array
  let shadowArr = [];

  // If fixed shadow, add to array
  fixedShadow && shadowArr.push(fixedShadow);

  // Shadow
  if (shadowType === "shadow") {

    // Build stacked shadow until farthestPoint
    for (let i = 1; i < farthestPoint; i+=jumpAmount) {
      shadowArr.push(`
        ${i/farthestPoint*(-distance.x)+xOffset}px
        ${i/farthestPoint*(-distance.y)+yOffset}px
        ${diffusion}px
        ${color}
      `);
    }

  // Perspective
  } else if (shadowType === "perspective") {

    // Build stacked shadow until farthestPoint
    for (let i = 1; i < farthestPoint; i+=jumpAmount) {
      shadowArr.push(`
        ${i/farthestPoint*(distance.x)+xOffset}px
        ${i/farthestPoint*(distance.y)+yOffset}px
        ${diffusion}px
        ${color}
      `);
    }

    // Shift element
    element.style.left = `${(-distance.x)+xOffset}px`;
    element.style.top = `${(-distance.y)+yOffset}px`;

  // Drop shadow
  } else if (shadowType === "dropShadow") {
    shadowArr.push(`
      ${(-distance.x)+xOffset}px
      ${(-distance.y)+yOffset}px
      ${diffusion}px
      ${color}
    `);
  }

  // Convert array to string and apply to element style
  // console.log(shadowArr.length);
  element.style.textShadow = shadowArr.join();
}

export default makeShadow;
