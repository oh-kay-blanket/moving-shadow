# moving-shadow.js
[![npm version](https://badge.fury.io/js/moving-shadow.svg)](https://badge.fury.io/js/moving-shadow)

A JavaScript module, which creates a responsive text shadow based on mouse position (desktop) or device orientation (mobile).

As of iOS 12.2, Safari has disabled `window.getDeviceOrientation`. Until a fix is put in place, moving-shadow will not work on iOS devices.

## Examples
* [Flat text with moving shadow](https://mister-blanket.github.io/moving-shadow/examples/shadow) - ([source](https://github.com/mister-blanket/moving-shadow/blob/master/examples/shadow.html))
* [Fixed raised text with moving shadow](https://mister-blanket.github.io/moving-shadow/examples/shadow-raised) - ([source](https://github.com/mister-blanket/moving-shadow/blob/master/examples/shadow-raised.html))
* [Moving perspective text and box](https://mister-blanket.github.io/moving-shadow/examples/perspective) - ([source](https://github.com/mister-blanket/moving-shadow/blob/master/examples/perspective.html))
* [Moving perspective text with moving shadow](https://mister-blanket.github.io/moving-shadow/examples/perspective-shadow) - ([source](https://github.com/mister-blanket/moving-shadow/blob/master/examples/perspective-shadow.html))
* [Moving perspective box with moving shadow](https://mister-blanket.github.io/moving-shadow/examples/perspective-box-shadow) - ([source](https://github.com/mister-blanket/moving-shadow/blob/master/examples/perspective-box-shadow.html))
* [Drop shadow](https://mister-blanket.github.io/moving-shadow/examples/drop-shadow) - ([source](https://github.com/mister-blanket/moving-shadow/blob/master/examples/drop-shadow.html))


## Quick Start
`npm i moving-shadow`  
then  
`import movingShadow from 'moving-shadow';`  
or  
`<script src="https://unpkg.com/moving-shadow"></script>`  
then  
`movingShadow();`

## Configuration
Options with defaults
```javascript
const settings = {
  shadowType:   "shadow",    // "shadow", "perspective","perspective-shadow", "dropShadow"
  selector:     "h1, h2",    // tag, class, or id to apply shadow to
  angle:        20,          // height of view source. Should be between 10 - 100
  relativeAngle:false,       // false. desktop only, allows for each element to move relative to the mouse
  diffusion:    0,           // blur-radius
  color:        "#333333CC", // shadow-color or perspective color
  altColor:     "#333333CC", // shadow-color (perspective-shadow only)
  shineColor:   "#fff3",     // reflected light (perspective-shadow only)
  fixedShadow:  null,        // "5px 5px #555" to include an optional fixed shadow
  xOffset:      0,           // X offset value, set to max fixedShadow x offset
  yOffset:      0            // Y offset value, set to max fixedShadow y offset
}

movingShadow(settings);
```
