# moving-shadow
Creates a responsive text shadow based on mouse position.

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
