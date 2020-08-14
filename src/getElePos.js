const getElePos = element => {
  var rect = element.getBoundingClientRect();
  rect.centerX = Math.round(rect.x + (rect.width/2));
  rect.centerY = Math.round(rect.y + (rect.height/2));

  return rect;
}

export default getElePos;
