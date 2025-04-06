import { css } from 'vite-css-in-js';
import { RegexpIcon } from '../Icons/RegexpIcon';

const stl = {
  root: css`
    display: flex;
    padding: 0 0 0 8px;
    flex-flow: row nowrap;
    color: inherit;
    align-items: center;
    width: 100%;
  `,
  input: css`
    width: 100%;
    padding: 6px 0;
    border: none;
    background-color: transparent;
    &:focus {
      outline: none;
      background-color: var(--focus-color);
    }
  `,
};

export function SimpleFilter({
  placeholder,
  onInput,
}: { placeholder: string; onInput: (value: string) => void }) {
  return (
    <div class={stl.root}>
      <input
        class={stl.input}
        type="search"
        placeholder={placeholder}
        onChange={(e) => onInput(e.currentTarget.value)}
      />
      <button>
        <RegexpIcon />
      </button>
    </div>
  );
}
