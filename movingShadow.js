(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.movingShadow = factory());
}(this, (function () { 'use strict';

  const getViewPos = event => {
    var eventDoc, doc, body;

    // Get mobile view pos based on devide orientation
    if (event.type === 'deviceorientation') {

      // Get device window specs
      const center = {
        x: Math.round(window.innerWidth/2),
        y: Math.round(window.innerHeight/2)
      };

      // Amplify movement
      const movementFactor = {
        x: event.gamma * 13,

        // Subtract degrees to make Y resting point (20 degrees)
        y: (event.beta - 20) * 13
      };

      // Fix gamma flip on Android
      if (/Android/i.test(navigator.userAgent)) {
        movementFactor.x = event.beta > 90 || event.beta < -90 ? - movementFactor.x : movementFactor.x;
      }

      // Calculate view position
      const viewPos = {
        x: center.x - movementFactor.x,
        y: center.y - movementFactor.y
      };

      return viewPos;

    // Get desktop view position based on mouse location
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
    }
    return distance;
  };

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
    // To determine if element is text or box
    function isText(ele) {
      var textList = ["H1","H2","H3","H4","H5","H6","P","LI","A","TD"];
      return !!textList.find(textEle => ele.nodeName.toUpperCase() === textEle);
    }

    isText(element) ?
      element.style.textShadow = shadowArr.join() :
      element.style.boxShadow = shadowArr.join();
  };

  // import makeDropShadow from "./makeDropShadow";

  const movingShadow = settings => {

    // Default settings if no params passed
    settings = settings ? settings : {selector:"h1,h2", shadowType:"shadow"};
    settings.selector = settings.selector ? settings.selector : "h1,h2";
    settings.shadowType = settings.shadowType ? settings.shadowType : "shadow";

    // Select element
    var elements = document.querySelectorAll(settings.selector);

    // To determine if element is text or box
    function isText(ele) {
      var textList = ["H1","H2","H3","H4","H5","H6","P","LI","A","TD"];
      return !!textList.find(textEle => ele.nodeName.toUpperCase() === textEle);
    }

    // Set initial fixedShadow before movement
    settings.fixedShadow && elements.forEach(element => {
      isText(element) ?
        element.style.textShadow = settings.fixedShadow :
        element.style.boxShadow = settings.fixedShadow;
    });

    // Listen for touch or movement
    window.onmousemove = e => handleMove(e, settings);
    window.ondeviceorientation = e => handleMove(e, settings);


    // Handle mouse or orientation change
    function handleMove(event, settings) {

      // Get view position
      const viewPos = getViewPos(event);

      // Make unique shadow for each element
      elements.forEach(element => {

        // Calculate distance between view position and element
        const distance = calculateDistance(element, viewPos, settings);

        // Make shadow
        switch(settings.shadowType) {
          case 'shadow':
            makeShadow(element, distance, settings);
            break;
          case 'dropShadow':
            makeShadow(element, distance, settings);
            break;
          case 'perspective':
            element.style.position = 'relative';
            makeShadow(element, distance, settings);
            break;
          default:
            console.log('Select vaild type');
        }
      });
    }
  };

  return movingShadow;

})));
