import { css } from 'vite-css-in-js';

const stl = {
  stateView: css`
  padding: 12px 16px;
  flex: 1;
 `,
};

export function StateView() {
  return <div class={stl.stateView}>State view</div>;
}
