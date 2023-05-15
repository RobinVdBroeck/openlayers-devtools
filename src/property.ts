import type Map from "ol/Map";

export interface BaseProperty {
  name: string;
}

export interface BoolProperty extends BaseProperty {
  type: "boolean";
  value: boolean;
}

export interface StringProperty extends BaseProperty {
  type: "string";
  value: string;
}

export interface NumberProperty extends BaseProperty {
  type: "number";
  value: number;
}

// Reference an openlayer map, not an js map
export interface MapProperty extends BaseProperty {
  type: "Map";
  value: Map;
}

export interface ObjectProperty extends BaseProperty {
  type: "object";
  value: Partial<Record<string, unknown>>;
}

export interface NullProperty extends BaseProperty {
  type: "null";
  value: null;
}

export interface UndefinedProperty extends BaseProperty {
  type: "undefined";
  value: undefined;
}

export interface UnknownProperty extends BaseProperty {
  type: "unknown";
  value: unknown;
}

export type Property =
  | BoolProperty
  | StringProperty
  | NumberProperty
  | MapProperty
  | ObjectProperty
  | NullProperty
  | UndefinedProperty
  | UnknownProperty;
