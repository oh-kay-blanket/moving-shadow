# moving-shadow.js
[![npm version](https://badge.fury.io/js/moving-shadow.svg)](https://badge.fury.io/js/moving-shadow)

A JavaScript module, which creates a responsive text shadow based on mouse position (desktop) or device orientation (mobile).

## Examples
* [Shadow](https://mister-blanket.github.io/moving-shadow/examples/shadow) - ([source](https://github.com/mister-blanket/moving-shadow/blob/master/examples/shadow.html))
* [Raised text with shadow](https://mister-blanket.github.io/moving-shadow/examples/shadow-raised) - ([source](https://github.com/mister-blanket/moving-shadow/blob/master/examples/shadow-raised.html))
* [Raised text with shadow #2](https://mister-blanket.github.io/moving-shadow/examples/shadow-raised-two) - ([source](https://github.com/mister-blanket/moving-shadow/blob/master/examples/shadow-raised-two.html))
* [Drop shadow](https://mister-blanket.github.io/moving-shadow/examples/drop-shadow) - ([source](https://github.com/mister-blanket/moving-shadow/blob/master/examples/drop-shadow.html))


## Install

### Local
`<script src="https://unpkg.com/moving-shadow"></script>`  
or  
Download <a href="https://raw.githubusercontent.com/mister-blanket/moving-shadow/master/movingShadow.js" download>movingShadow.js</a>

## Usage
Options with defaults
```javascript
const settings = {
  shadowType:   "shadow", // "shadow", "dropShadow"
  selector:     "h1, h2", // tag, class, or id to apply shadow to
  angle:        20, // height of view source. Should be between 10 - 100
  diffusion:    0, // blur-radius
  color:        "rgba(51, 51, 51, 0.4)", // shadow-color
  fixedShadow:  null,  // "5px 5px #555" to include an optional fixed shadow
  xOffset:      0, // X offset value, set to max fixedShadow x offset
  yOffset:      0 // Y offset value, set to max fixedShadow y offset
}

movingShadow(shadowProp);
```
