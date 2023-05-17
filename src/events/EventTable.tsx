import { For } from "solid-js";
import type BaseEvent from "ol/events/Event";

export interface EventTableProps {
  events: BaseEvent[];
}

export const EventTable = (props: EventTableProps) => {
  return (
    <ol>
      <For each={props.events}>
        {(event) => {
          return (
            <li>
              {event.type} -{" "}
              <pre>{JSON.stringify(event.target, undefined, 2)}</pre>
            </li>
          );
        }}
      </For>
    </ol>
  );
};
