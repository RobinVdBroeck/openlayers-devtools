# Openlayers-devtools

## Usage:

```javascript
// Using es6 modules
import Map from "ol/Map";
import OlDevtools from "@robinvdbroeck/openlayers-devtools";
// or commonjs
const Map = require("ol/map");
const OlDevtools = require("@robinvdbroeck/openlayers-devtools");

const myOlMap = new Map(...);

const devtools = new OlDevtools({
    map: myOlMap,
    target: "id" // ID of an empty dom element, preferably a div
});
```

## Requirements

Any openlayers version more recent than 7.0.0 should work.

Previous versions might also work, but are not tested.
