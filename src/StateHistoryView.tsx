import { css } from 'vite-css-in-js';
import { PannelHeader } from './PannelHeader';

const stl = {
  historyView: css`
  border-top: 1px solid var(--dimm-color);
 `,
  log: css`
  padding: 8px 16px;
 `,
  recordingBTN: css`
  margin-left: auto;
  color: var(--important-frg);
  background-color: var(--important-bkg);
  padding: 4px 8px;
  `
};

export function StateHistoryView() {
  return (
    <div class={stl.historyView}>
      <PannelHeader >
        <div>State changes log</div><button class={stl.recordingBTN}>Rec: ON</button>
      </PannelHeader>
      <ul class={stl.log}>
        <li>foo</li>
        <li>bar</li>
        <li>baz</li>
      </ul>
    </div>
  );
}
