import { createSignal, onCleanup, For } from "solid-js";
import type Map from "ol/Map";
import type { ObjectEvent } from "ol/Object";
import { LayerRow } from "./LayerRow";

interface DevtoolsProps {
  map: Map;
}

export const Devtools = (props: DevtoolsProps) => {
  const mapLayers = props.map.getLayers();
  const [count, setCount] = createSignal(mapLayers.getLength());
  const onChangeLength = (event: ObjectEvent) => {
    // TODO: test this
    setCount(event.target);
  };
  mapLayers.on("change:length", onChangeLength);
  onCleanup(() => {
    mapLayers.un("change:length", onChangeLength);
  });

  console.log(mapLayers.getArray());
  return (
    <div>
      <h1>Devtools</h1>
      <h2>Layers: {count()}</h2>
      <ul>
        <For each={mapLayers.getArray()}>
          {(layer) => <LayerRow layer={layer} />}
        </For>
      </ul>
    </div>
  );
};

export default Devtools;
