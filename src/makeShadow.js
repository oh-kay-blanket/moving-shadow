const makeShadow = (element, distance, {
    // Destructure settings
    shadowType = 'shadow',
    angle = 20,
    diffusion = 0,
    color = "#333c",
    color2 = "#33333311",
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
  } else if (shadowType === "perspective-shadow") {

    // Perspective
    for (let i = 1; i < farthestPoint; i+=jumpAmount) {
      shadowArr.push(`
        ${i/farthestPoint*(distance.x)+xOffset}px
        ${i/farthestPoint*(distance.y)+yOffset}px
        ${diffusion}px
        ${color}
      `);
    }

    // Normal shadow
    for (let i = 1; i < farthestPoint; i+=jumpAmount) {
      shadowArr.push(`
        ${i/farthestPoint*(-distance.x*1)+xOffset}px
        ${i/farthestPoint*(-distance.y*1)+yOffset}px
        0px
        ${color2}
      `);
    }



    // Reflecting light
    for (let i = 1; i < farthestPoint; i+=4) {
      shadowArr.push(`
        ${i/farthestPoint*(distance.x*2)+xOffset}px
        ${i/farthestPoint*(distance.y*2)+yOffset}px
        10px
        #fff2
      `);
    }

    // Shift element
    element.style.left = `${(-distance.x)+xOffset}px`;
    element.style.top = `${(-distance.y)+yOffset}px`;

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
  // To determine if element is text or box
  function isText(ele) {
    var textList = ["H1","H2","H3","H4","H5","H6","P","LI","A","TD"];
    return !!textList.find(textEle => ele.nodeName.toUpperCase() === textEle);
  }

  isText(element) ?
    element.style.textShadow = shadowArr.join() :
    element.style.boxShadow = shadowArr.join();
}

export default makeShadow;
