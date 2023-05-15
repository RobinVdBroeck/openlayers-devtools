import { createSignal, onCleanup, For } from "solid-js";
import Map from "ol/Map";
import type BaseLayer from "ol/layer/Base";
import type { ObjectEvent } from "ol/Object";
import { EditableProperty } from "./EditableProperty";
import { Property } from "./property";

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

export const LayerRow = (props: { layer: BaseLayer }) => {
  const layer = props.layer;
  const [properties, setProperties] = createSignal(layer.getProperties());

  // when openlayer files a property change event, we need to call this again
  const onPropertiesChange = () => {
    setProperties(layer.getProperties());
  };
  layer.on("propertychange", onPropertiesChange);
  onCleanup(() => layer.un("propertychange", onPropertiesChange));

  const toProperty = (key: string, value: unknown): Property => {
    if (typeof value === "undefined") {
      return {
        name: key,
        type: "undefined",
        value: undefined,
      };
    }
    if (value === null) {
      return {
        name: key,
        type: "null",
        value: null,
      };
    }
    if (typeof value === "number") {
      return {
        name: key,
        type: "number",
        value: value,
      };
    }
    if (typeof value === "string") {
      return {
        name: key,
        type: "string",
        value: value,
      };
    }
    if (value instanceof Map) {
      return {
        name: key,
        type: "Map",
        value: value,
      };
    }
    if (typeof value === "object") {
      return {
        name: key,
        type: "object",
        value,
      };
    }
    if (typeof value === "boolean") {
      return {
        name: key,
        type: "boolean",
        value,
      };
    }
    return {
      name: key,
      type: "unknown",
      value,
    };
  };

  const mappedProperties = () => {
    const currentProperties = properties();
    if (typeof currentProperties === "undefined") return [];
    return Object.entries(currentProperties).map(([key, value]) =>
      toProperty(key, value)
    );
  };

  return (
    <li>
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <For each={mappedProperties()}>
            {(property) => (
              <tr>
                <td>{property.name}</td>
                <td>
                  <EditableProperty
                    property={property}
                    onChange={(newProperty: Property) => {
                      const existingProperties = properties();
                      layer.setProperties({
                        ...existingProperties,
                        [newProperty.name]: newProperty.value,
                      });
                    }}
                  />
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </li>
  );
};

export default Devtools;
