import { css } from 'vite-css-in-js';
import type { JSX } from 'preact/jsx-runtime';

const stl = {
  inspector: css`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    border-left: 1px solid var(--level-4);
  `,
  section: css`
    display: flex;
    flex-flow: column nowrap;
    min-height: 0;
  `,
  sectionTitle: css`
    padding: 4px 8px;
    background-color: var(--level-3);
  `,
  sectionContent: css`
    padding: 2px;
    overflow: auto;
  `,
};

export function Section({ children, title }: { children: JSX.Element[] | JSX.Element; title: string }) {
  return (
    <div class={stl.section}>
      <div class={stl.sectionTitle}>{title}</div>
      <div class={stl.sectionContent}>{children}</div>
    </div>
  );
}
