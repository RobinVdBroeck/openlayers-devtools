import { onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { EventsKey, unlistenByKey } from "ol/events";
import type BaseEvent from "ol/events/Event";

/**
 * Observable interface for ol objects
 */
interface OlObservable {
  on(type: string, subscribe: (event: BaseEvent) => void): EventsKey;
}

/**
 * Track events on an openlayers observable.
 *
 * @return an BaseEvent array that is trackable by solid.
 */
export function trackEvents(observable: OlObservable, types: string[]) {
  const [events, setEvents] = createStore<BaseEvent[]>([]);

  // Listen to events happening
  const keys = types.map((type) => {
    return observable.on(type, (event) => {
      setEvents((prev) => [...prev, event]);
    });
  });
  onCleanup(() => keys.forEach(unlistenByKey));

  return events;
}
