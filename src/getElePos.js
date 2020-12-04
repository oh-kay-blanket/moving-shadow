const getElePos = element => {

  // Use same shadow for mobile
  if (event.type === 'deviceorientation') {
    // Get device window specs
    const rect = {
      centerX: Math.round(window.innerWidth/2),
      centerY: Math.round(window.innerHeight/2)
    }
    return rect;

  // Create different shadows for desktop
  } else {
    var rect = element.getBoundingClientRect();
    rect.centerX = Math.round(rect.x + (rect.width/2));
    rect.centerY = Math.round(rect.y + (rect.height/2));

    return rect;
  }
}

export default getElePos;
