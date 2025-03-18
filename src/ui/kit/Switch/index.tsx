import { css } from 'vite-css-in-js';
import type { JSX } from 'preact/jsx-runtime';

const stl = {
  flashing: css`
    &[data-enabled='false'] {
      color: hsl(0, 100%, 50%);
      animation: 0.6s linear 0s infinite alternate flashing;
    }
  `,
};
export function Switch({
  enabled,
  onClick,
  flashing,
  iconOn,
  iconOff,
}: {
  enabled: boolean;
  onClick: () => void;
  flashing?: boolean;
  iconOn: JSX.Element;
  iconOff: JSX.Element;
}) {
  return (
    <div onClick={onClick} data-enabled={enabled} class={flashing ? stl.flashing : ''}>
      {enabled ? iconOn : iconOff}
    </div>
  );
}
