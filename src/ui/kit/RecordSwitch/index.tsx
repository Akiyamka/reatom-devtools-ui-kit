import { css } from 'vite-css-in-js';
import { PauseIcon } from '../Icons/PauseIcon';
import { PlayIcon } from '../Icons/PlayIcon';

export function RecordSwitch({ enabled, onClick }: { enabled: boolean; onClick: () => void }) {
  return <div onClick={onClick} data-enabled={enabled} class={css`
    &[data-enabled='false'] {
      color: hsl(0, 100%, 50%);
      animation: 0.6s linear 0s infinite alternate flashing;
    }
    `}>{enabled ? <PauseIcon /> : <PlayIcon />}</div>;
}
