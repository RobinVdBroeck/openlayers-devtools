import { Show, Match, Switch, createSignal } from "solid-js";
import {
  BoolProperty,
  NumberProperty,
  Property,
  StringProperty,
} from "./property";

export const EditableProperty = (props: {
  property: Property;
  onChange: (newValue: Property) => void;
}) => {
  const type = props.property.type;

  return (
    <Switch fallback={<div> Unsported type {type}</div>}>
      <Match when={type === "string"}>
        <EditableStringProperty
          property={props.property as StringProperty}
          onChange={props.onChange}
        />
      </Match>
      <Match when={type === "boolean"}>
        <EditableBooleanProperty
          property={props.property as BoolProperty}
          onChange={props.onChange}
        />
      </Match>
      <Match when={type === "number"}>
        <EditableNumberProperty
          property={props.property as NumberProperty}
          onChange={props.onChange}
        />
      </Match>
    </Switch>
  );
};

export const EditableStringProperty = (props: {
  property: StringProperty;
  onChange: (newValue: Property) => void;
}) => {
  const [editing, setEditing] = createSignal(false);
  const [currentValue, setCurrentValue] = createSignal(props.property.value);

  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      submit();
    }
  };

  const submit = () => {
    setEditing(false);
    props.onChange({
      ...props.property,
      value: currentValue(),
    });
  };

  return (
    <Show
      when={editing()}
      fallback={
        <span onClick={() => setEditing(true)}>{props.property.value}</span>
      }
    >
      <input
        value={currentValue()}
        onKeyPress={onKeyPress}
        onBlur={submit}
        onChange={(event) => {
          setCurrentValue(event.target.value);
        }}
      />
    </Show>
  );
};

export const EditableBooleanProperty = (props: {
  property: BoolProperty;
  onChange: (newValue: Property) => void;
}) => {
  const value = props.property.value;
  return (
    <input
      type="checkbox"
      onClick={() =>
        props.onChange({
          ...props.property,
          value: !value,
        })
      }
      checked={value}
    />
  );
};

export const EditableNumberProperty = (props: {
  property: NumberProperty;
  onChange: (newValue: Property) => void;
}) => {
  const [editing, setEditing] = createSignal(false);
  const [currentValue, setCurrentValue] = createSignal(props.property.value);

  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      submit();
    }
  };

  const submit = () => {
    setEditing(false);
    props.onChange({
      ...props.property,
      value: currentValue(),
    });
  };

  return (
    <Show
      when={editing()}
      fallback={
        <span onClick={() => setEditing(true)}>{props.property.value}</span>
      }
    >
      <input
        type="number"
        value={currentValue()}
        onKeyPress={onKeyPress}
        onChange={(event) => {
          setCurrentValue(event.target.value as any as number);
        }}
        onBlur={submit}
      />
    </Show>
  );
};
