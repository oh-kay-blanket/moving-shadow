# moving-shadow
Creates a responsive text shadow based on mouse position.

## Usage

`npm install --save moving-shadow`  
or  
https://unpkg.com/moving-shadow

```javascript
import movingShadow from 'movingShadow';

var shadowProp = {
  selector: ".moving-one", // targets class or id
  angle: 20, // Sets height of light source. Should be > 10 && < 100
  diffusion: 0, // blur-radius
  color: "#5af", // text-color
  type: "shadow" // "shadow", "perspective"
}

movingShadow(shadowProp);
```
