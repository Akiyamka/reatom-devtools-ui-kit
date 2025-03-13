import { css } from 'vite-css-in-js';
import { entities } from './entities';

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

export function Search() {
  return (
    <div class={stl.search}>
      {/* <img class={stl.icon} src="./logo.svg"></img> */}
      <input
        class={stl.input}
        type="search"
        placeholder="Search"
        onInput={(e) => entities.setFilter(e.currentTarget.value)}
      />
    </div>
  );
}
