const getViewPos = event => {
  var eventDoc, doc, body;

  // Touch event
  if (event.type === 'touchmove') {

    // Use event.pageX / event.pageY
    const viewPos = {
      x: event.touches[0].pageX,
      y: event.touches[0].pageY
    }
    return viewPos;

  // Device orientation
  } else if (event.type === 'deviceorientation') {
    // Window specs
    const center = {
      x: Math.round(window.innerWidth/2),
      y: Math.round(window.innerHeight/2)
    }

    const movementFactor = {
      x: event.gamma * 13,
      y: (event.beta - 45) * 13
    }

    const viewPos = {
      x: center.x - movementFactor.x,
      y: center.y - movementFactor.y
    }
    return viewPos;

  // Mouse event
  } else if (event.type === 'mousemove') {
    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
      eventDoc = (event.target && event.target.ownerDocument) || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;

      event.pageX = event.clientX +
        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY +
        (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
        (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }

    // Use event.pageX / event.pageY
    const viewPos = {
      x: event.pageX,
      y: event.pageY
    }
    return viewPos;
  }
}

export default getViewPos;
