import { type JSX, memo } from 'preact/compat';
import { css } from 'vite-css-in-js';

const stl = {
  stack: css`
    --gap: 8px;
    display: flex;
    flex-flow: row nowrap;
    margin: 4px 0;
  `,
  indicator: css`
    width: 4px;
    margin: var(--gap) 0 var(--gap) var(--gap);
    background-color: var(--level-3);
    border-radius: 4px;
    &[data-odd='true'] {
      background-color: var(--level-6);
    }
  `,
  slot: css`
    flex: 1;
  `,
  title: css`
    font-size: 0.9em;
    padding: var(--gap) var(--gap) 2px var(--gap);
    color: var(--level-15);
  `,
};

export const Stack = memo(function Stack({
  children,
  i,
  title,
}: {
  children: JSX.Element[];
  i: number;
  title?: string;
}) {
  return (
    <div class={stl.stack}>
      <div class={stl.indicator} data-odd={i % 2 === 0} />
      <div class={stl.slot}>
        {title && <div class={stl.title}>{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
});
