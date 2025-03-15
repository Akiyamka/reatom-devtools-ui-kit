import { css } from 'vite-css-in-js';

const stl = {
  tab: css`
    margin-top: 8px;
    border-radius: 4px 4px 0 0;
    padding: 8px 24px;
    opacity: 0.6;
    &[data-active='true'] {
      opacity: 1;
      background-color: var(--level-2);
    }
  `,
  label: css``,
};

export function Tab({ label, onClick, active }: { label: string; onClick: () => void; active: boolean }) {
  return (
    <button class={stl.tab} data-active={active} onClick={onClick}>
      <span class={stl.label}>{label}</span>
    </button>
  );
}
