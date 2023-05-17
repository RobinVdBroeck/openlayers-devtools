import { Show, from, Accessor } from "solid-js";
import type OlView from "ol/View";
import type { Projection } from "ol/proj";
import type { Coordinate } from "ol/coordinate";
import { type Property, toProperty } from "./property";
import { PropertyTable } from "./PropertyTable";
import { trackEvents } from "./events/primitives";
import { EventTable } from "./events/EventTable";

interface ViewData {
  center: Coordinate | undefined;
  projection: Projection;
}

interface ViewProps {
  view: OlView;
}

/**
 * Display information about an ol view
 */
export const ViewInfo = (props: ViewProps) => {
  const events = trackEvents(props.view, ["change"]);
  const data = from<ViewData>((set) => {
    const sync = () =>
      set({
        center: props.view.getCenter(),
        projection: props.view.getProjection(),
      });
    sync();
    props.view.on("change", sync);
    return () => props.view.un("change", sync);
  }) as Accessor<ViewData>;

  const viewProperties = from<Property[]>((set) => {
    const syncProperties = () => {
      const olProps = props.view.getProperties();
      const properties = Object.entries(olProps).map(([key, value]) =>
        toProperty(key, value)
      );
      set(properties);
    };
    syncProperties();
    props.view.on("propertychange", syncProperties);
    return () => props.view.un("propertychange", syncProperties);
  }) as Accessor<Property[]>;

  return (
    <>
      <h2>View</h2>
      <div>
        <div>Coordinate system: {data().projection.getCode()}</div>
        <Show when={data().center}>
          {(center) => <div>Center: ({center().join(", ")})</div>}
        </Show>
        <PropertyTable
          properties={viewProperties()}
          changeProperty={(property) => {
            props.view.setProperties({
              ...props.view.getProperties(),
              [property.name]: property.value,
            });
          }}
        />
        <h3>Events</h3>
        <EventTable events={events} />
      </div>
    </>
  );
};
