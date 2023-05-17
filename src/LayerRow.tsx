import { createSignal, onCleanup, For } from "solid-js";
import type BaseLayer from "ol/layer/Base";
import { PropertyTable } from "./PropertyTable";
import { toProperty } from "./property";

export interface LayerProps {
  layer: BaseLayer;
}

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
