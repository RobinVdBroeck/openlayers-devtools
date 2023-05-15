import { render } from "solid-js/web";
import type Map from "ol/Map";
import { Devtools } from "./Devtools";

export interface Config {
  // Instance of the openlayers map you want to inspect
  map: Map;
  // Target id of the div to render into
  target: string;
}

export default class {
  private map: Map;
  private target: Element;

  constructor({ map, target }: Config) {
    const domElement = document.getElementById(target);
    if (!domElement) {
      throw new Error("No target found");
    }

    this.map = map;
    this.target = domElement;
    this.render();
  }

  render() {
    render(() => <Devtools map={this.map} />, this.target);
  }
}
