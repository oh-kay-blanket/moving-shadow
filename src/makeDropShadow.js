const makeDropShadow = (element, xDiff, yDiff, farthestPoint, settings) => {
  const { angle, diffusion, color, fixedShadow } = settings;

  let shadowArr = [];

  // If fixed shadow, add
  fixedShadow && shadowArr.push(fixedShadow);

  // Set offset values
  let xOffset = settings.xOffset ? settings.xOffset : 0;
  let yOffset = settings.yOffset ? settings.yOffset : 0;

  shadowArr.push(`${(-xDiff/angle)+xOffset}px ${(-yDiff/angle)+yOffset}px ${diffusion}px ${color}`);

  element.style.textShadow = shadowArr.join();
}

export default makeDropShadow;
