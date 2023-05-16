import { For } from "solid-js";
import { Property } from "./property";
import { EditableProperty } from "./EditableProperty";

interface PropertyTableProps {
  properties: Property[];
  changeProperty: (newValue: Property) => void;
}

/**
 * Display a table of properties, which you can edit
 */
export const PropertyTable = (props: PropertyTableProps) => {
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
