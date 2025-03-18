import { css } from 'vite-css-in-js';

const stl = {
  toggle: css`
    display: inline-flex;
    flex-flow: row nowrap;
    border-radius: 4px;
    border: 1px solid var(--level-4);
  `,
  input: css`
    &:checked + label {
      background-color: var(--level-7);
    }
  `,
  side: css`
    display: flex;
  `,
  label: css`
    user-select: none;
    cursor: pointer;
    padding: 4px 8px;
    font-size: 0.8em;
    display: flex;
    align-items: center;
    font-weight: bold;
  `,
};

export function Toggle<T extends string, K extends string>({
  left,
  right,
  value,
  onChange,
  class: className,
}: {
  left: T;
  right: K;
  value: string;
  onChange: (value: T | K) => void;
  class?: string;
}) {
  return (
    <div class={`${stl.toggle} ${className}`}>
      <div class={stl.side}>
        <input
          class={stl.input}
          type="radio"
          id="left"
          name={left}
          checked={value === left}
          onChange={() => onChange(left)}
          hidden
        />
        <label class={stl.label} for="left">
          {left}
        </label>
      </div>
      <div class={stl.side}>
        <input
          class={stl.input}
          type="radio"
          id="right"
          name={right}
          checked={value === right}
          onChange={() => onChange(right)}
          hidden
        />
        <label class={stl.label} for="right">
          {right}
        </label>
      </div>
    </div>
  );
}
