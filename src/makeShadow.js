const makeShadow = (element, xDiff, yDiff, farthestPoint, settings) => {
  const { angle, diffusion, color } = settings;

  let shadowArr = [];

  for (let i = angle; i < (farthestPoint + angle); i++) {
    shadowArr.push(`${-xDiff/i}px ${-yDiff/i}px ${diffusion}px ${color}`);
  }

  element.style.textShadow = shadowArr.join();
}

export default makeShadow;
