import { css } from 'vite-css-in-js';
import { RegexpIcon } from '../Icons/RegexpIcon';

const stl = {
  search: css`
  display: block;
  display: flex;
  flex-flow: row nowrap;
  color: inherit;
  align-items: center;
`,
  icon: css`
  display: block;
  width: 32px;
  padding-right: 4px;
`,
  input: css`
  width: 100%;
  padding: 12px;
  border: none;
  display: block;
  border-bottom: 1px solid var(--dimm-color);
  background-color: transparent;
  &:focus {
    outline: none;
    background-color: var(--focus-color);
  }
 `,
};

export function Search({ onInput }: { onInput: (value: string) => void }) {
  return (
    <div class={stl.search}>
      <input
        class={stl.input}
        type="search"
        placeholder="Filter events"
        onInput={(e) => onInput(e.currentTarget.value)}
      />
      <button><RegexpIcon/></button>
    </div>
  );
}
