import { ComponentChildren } from 'preact';
import { css } from 'vite-css-in-js';

const stl = {
  title: css`
  display: flex;
  flex-flow: row nowrap;
  font-weight: bold;
  padding: 10px;
  align-items: center;
  gap: 6px;
  background-color: var(--title-color);
 `,
};

export function PannelHeader({ icon, children }: { icon?: ComponentChildren, children: ComponentChildren } ) {
  return (
    <div class={stl.title}>
      { icon }
      { children }
    </div>
  );
}
