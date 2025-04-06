import { css } from 'vite-css-in-js';
import { MoreVerticalIcon } from '../Icons/MoreVerticalIcon';
import { Action } from './types';

const stl = {
  hiddenBtn: css`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin-right: -6px;
    visibility: hidden;
  `,
};

export function Dropdown({ actions }: { actions: Action[] }) {
  return (
    <div>
      <button class={stl.hiddenBtn}>
        <MoreVerticalIcon />
      </button>
      {/* {actions.map((act) => (
        <button onClick={act.onClick}>{act.label}</button>
      ))} */}
    </div>
  );
}
