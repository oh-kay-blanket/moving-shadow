# moving-shadow
A JavaScript module, which creates a responsive text shadow based on mouse position (desktop) or device orientation (mobile).

## Install

### Local
Download <a href="https://raw.githubusercontent.com/mister-blanket/moving-shadow/master/movingShadow.js" download>movingShadow.js</a>

or

`<script src="https://unpkg.com/moving-shadow"></script>`

## Usage

```javascript
var shadowProp = {
  const fixedColor = "#665200"; // For a repeated fixedShadow
  const settings = {
    selector: "h2, .moving", // Required. Targets tag, class, or id
    shadowType: "shadow", // "shadow", "dropShadow". Default 'shadow'.
    angle: 20, // Sets height of light source. Should be > 10 && < 100. Default 20.
    diffusion: 0, // Blur-radius. Default 0.
    color: "rgba(51, 51, 51, 0.4)", // shadow-color
    xOffset: 7, // X offset value, set to max fixedShadow x offset. Default 0.
    yOffset: 7, // Y offset value, set to max fixedShadow y offset. Default 0.
    fixedShadow: `
      0px 0px ${fixedColor},
      1px 1px ${fixedColor},
      2px 2px ${fixedColor},
      3px 3px ${fixedColor},
      4px 4px ${fixedColor},
      5px 5px ${fixedColor},
      6px 6px ${fixedColor},
      7px 7px ${fixedColor}` // "5px 5px #555" if you want to include an optional fixed shadow
  }
}

movingShadow(shadowProp);
```

## Examples
* [Shadow](https://mister-blanket.github.io/moving-shadow/examples/shadow) - ([source](https://github.com/mister-blanket/moving-shadow/blob/master/examples/shadow.html))
* [Raised text with shadow](https://mister-blanket.github.io/moving-shadow/examples/shadow-raised) - ([source](https://github.com/mister-blanket/moving-shadow/blob/master/examples/shadow-raised.html))
* [Raised text with shadow #2](https://mister-blanket.github.io/moving-shadow/examples/shadow-raised-two) - ([source](https://github.com/mister-blanket/moving-shadow/blob/master/examples/shadow-raised-two.html))
* [Drop shadow](https://mister-blanket.github.io/moving-shadow/examples/drop-shadow) - ([source](https://github.com/mister-blanket/moving-shadow/blob/master/examples/drop-shadow.html))
