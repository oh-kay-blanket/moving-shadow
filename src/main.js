import getViewPos from "./getViewPos";
import calculateDistance from "./calculateDistance";
import makeShadow from "./makeShadow";
// import makeDropShadow from "./makeDropShadow";

// Begin app
const movingShadow = settings => {

  // Function to parse settings and apply default values
  const processSettings = (settings) => {
    // Default settings if no params passed
    settings = settings ? settings : {selector:"h1,h2", shadowType:"shadow", inset: false};
    settings.selector = settings.selector ? settings.selector : "h1,h2";
    settings.shadowType = settings.shadowType ? settings.shadowType : "shadow";

    // To determine if element is text or box
    function isText(ele) {
      var textList = ["H1","H2","H3","H4","H5","H6","P","LI","A","TD"];
      return !!textList.find(textEle => ele.nodeName.toUpperCase() === textEle);
    }

    var settingElements = document.querySelectorAll(settings.selector);

    // Set initial fixedShadow before movement
    settings.fixedShadow && settingElements.forEach(element => {
      isText(element) ?
        element.style.textShadow = settings.fixedShadow :
        element.style.boxShadow = settings.fixedShadow;
    });
  }

  // Process settings if aray or obj
  Array.isArray(settings) ? settings.forEach(setting => processSettings(setting)) : processSettings(settings);

  // Build string list of all HTML elements listed in settings
  var elementList = "";
  Array.isArray(settings) && settings.forEach((setting, index) => {
    if (index === 0) {
      elementList = elementList.concat(`${setting.selector}`)
    } else {
      elementList = elementList.concat(`,${setting.selector}`);
    }
  })

  // Create list of all elements
  var elements = Array.isArray(settings) ? document.querySelectorAll(elementList) : document.querySelectorAll(settings.selector);

  // Listen for touch or movement
  window.onmousemove = e => handleMove(e, settings);
  window.ondeviceorientation = e => handleMove(e, settings);


  // Handle mouse or orientation change
  function handleMove(event, settings) {

    // Get view position
    const viewPos = getViewPos(event);

    // Make unique shadow for each element
    elements.forEach(element => {
      var setting;

      if (Array.isArray(settings)) {
        const elName = element.nodeName.toUpperCase();
        const elClass = element.className.toUpperCase();

        setting = settings.find(set => {
          const setName = set.selector.toUpperCase();

          return setName.includes(elName) || elClass != "" && setName.indexOf(elClass) >= 0;
        })
      } else {

        setting = settings;
      }


      // console.log(element.nodeName.toUpperCase(), setting);

      // Calculate distance between view position and element
      const distance = calculateDistance(element, viewPos, setting);

      // Make shadow
      switch(setting.shadowType) {
        case 'shadow':
          makeShadow(element, distance, setting);
          break;
        case 'dropShadow':
          makeShadow(element, distance, setting);
          break;
        case 'perspective':
          element.style.position = 'relative';
          makeShadow(element, distance, setting);
          break;
        case 'perspective-shadow':
          element.style.position = 'relative';
          makeShadow(element, distance, setting);
          break;
        default:
          console.log('Select vaild type')
      }
    })
  }
}

export default movingShadow;
