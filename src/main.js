import getViewPos from "./getViewPos";
import calculateDistance from "./calculateDistance";
import makeShadow from "./makeShadow";
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
          console.log('Select vaild type')
      }
    })
  }
}

export default movingShadow;
