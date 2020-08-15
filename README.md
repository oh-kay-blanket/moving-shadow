# moving-shadow
A JavaScript module, which creates a responsive text shadow based on mouse position (desktop) or device orientation (mobile).

## Install

### Local
Download movingShadow.js

or

https://unpkg.com/moving-shadow

### NPM
`npm install --save moving-shadow`  

``` javascript
import movingShadow from 'movingShadow';
```

## Usage

```javascript
var shadowProp = {
  selector: ".moving-one", // targets class or id
  angle: 20, // Sets height of light source. Should be > 10 && < 100
  diffusion: 0, // blur-radius
  color: "#5af", // text-color
  type: "shadow" // "shadow", "perspective"
}

movingShadow(shadowProp);
```

## Examples
* [Shadow](https://mister-blanket.github.io/moving-shadow/examples/shadow) - ([source](https://github.com/mister-blanket/moving-shadow/blob/master/examples/shadow.html))
* [Raised text with shadow](https://mister-blanket.github.io/moving-shadow/examples/shadow-raised) - ([source](https://github.com/mister-blanket/moving-shadow/blob/master/examples/shadow-raised.html))
* [Drop shadow](https://mister-blanket.github.io/moving-shadow/examples/drop-shadow) - ([source](https://github.com/mister-blanket/moving-shadow/blob/master/examples/drop-shadow.html))
