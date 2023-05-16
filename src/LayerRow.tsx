import { createSignal, onCleanup, For } from "solid-js";
import Map from "ol/Map";
import type BaseLayer from "ol/layer/Base";
import { EditableProperty } from "./EditableProperty";
import type { Property } from "./property";
import Layer from "ol/layer/Layer";

export interface LayerProps {
  layer: BaseLayer;
}

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

export const LayerRow = (props: LayerProps) => {
  const [properties, setProperties] = createSignal(props.layer.getProperties());

  // when openlayer files a property change event, we need to call this again
  const onPropertiesChange = () => {
    setProperties(props.layer.getProperties());
  };
  props.layer.on("propertychange", onPropertiesChange);
  onCleanup(() => props.layer.un("propertychange", onPropertiesChange));

  const mappedProperties = () => {
    const currentProperties = properties();
    if (typeof currentProperties === "undefined") return [];
    return Object.entries(currentProperties).map(([key, value]) =>
      toProperty(key, value)
    );
  };

  return (
    <li>
      <PropertyTable
        properties={mappedProperties()}
        changeProperty={(newValue) => {
          const existingProperties = properties();
          props.layer.setProperties({
            ...existingProperties,
            [newValue.name]: newValue.value,
          });
        }}
      />
    </li>
  );
};

interface PropertyTableProps {
  properties: Property[];
  changeProperty: (newValue: Property) => void;
}

const PropertyTable = (props: PropertyTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <For each={props.properties}>
          {(property) => (
            <tr>
              <td>{property.name}</td>
              <td>
                <EditableProperty
                  property={property}
                  onChange={props.changeProperty}
                />
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};
