import type { JSX } from 'preact/jsx-runtime';
import { css } from 'vite-css-in-js';
const stl = {
  header: css`
    display: block;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    /* border-bottom: 1px solid var(--level-4); */
  `,
  tabs: css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 8px;
  `,
  actions: css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 8px;
  `,
};

export function Header({ tabs, actions }: { tabs: JSX.Element[]; actions: JSX.Element[] }) {
  return (
    <div class={stl.header}>
      <div class={stl.tabs}>{tabs}</div>
      <div class={stl.actions}>{actions}</div>
    </div>
  );
}
