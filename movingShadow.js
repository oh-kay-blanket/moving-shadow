(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.movingShadow = factory());
}(this, (function () { 'use strict';

  const getViewPos = event => {
    var eventDoc, doc, body;

    // Touch event
    if (event.type === 'touchmove') {

      // Use event.pageX / event.pageY
      const viewPos = {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
      };
      return viewPos;

    // Device orientation
    } else if (event.type === 'deviceorientation') {
      // Window specs
      const center = {
        x: Math.round(window.innerWidth/2),
        y: Math.round(window.innerHeight/2)
      };

      // console.log(`x: ${event.gamma}, y: ${event.beta}`)

      const movementFactor = {
        x: event.gamma * 13,
        y: (event.beta - 45) * 13
      };

      const viewPos = {
        x: center.x - movementFactor.x,
        y: center.y - movementFactor.y
      };
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
      };
      return viewPos;
    }
  };

  const getElePos = element => {
    var rect = element.getBoundingClientRect();
    rect.centerX = Math.round(rect.x + (rect.width/2));
    rect.centerY = Math.round(rect.y + (rect.height/2));

    return rect;
  };

  const makeShadow = (element, xDiff, yDiff, farthestPoint, settings) => {
    const { angle, diffusion, color, fixedShadow } = settings;

    let shadowArr = [];

    // If fixed shadow, add
    fixedShadow && shadowArr.push(fixedShadow);

    // Set offset values
    let xOffset = settings.xOffset ? settings.xOffset : 0;
    let yOffset = settings.yOffset ? settings.yOffset : 0;

    const jumpAmount = event.type === 'deviceorientation' ? 2 : 1;

    for (let i = angle; i < (farthestPoint + angle); i+=jumpAmount) {
      shadowArr.push(`${(-xDiff/i)+xOffset}px ${(-yDiff/i)+yOffset}px ${diffusion}px ${color}`);
    }

    element.style.textShadow = shadowArr.join();
  };

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
  };

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
          const farthestPointFactor = settings.type === "dropShadow" ? 40 : event.type === 'deviceorientation' ? 7 : 4;
          const farthestPoint = Math.round(Math.max(Math.abs(xDiff), Math.abs(yDiff))/farthestPointFactor);

          switch(settings.type) {
            case 'shadow':
              makeShadow(element, xDiff, yDiff, farthestPoint, settings);
              break;
            case 'dropShadow':
              makeDropShadow(element, xDiff, yDiff, farthestPoint, settings);
              break;
            case 'perspective':
              console.log('perspective');
              break;
            default:
              console.log('Select type');
          }
        };

        calculateDistance(viewPos, elePos, settings);
      });
    }
  };

  return movingShadow;

})));
