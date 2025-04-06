import { css } from 'vite-css-in-js';
import { LogEventTypeIcon } from './LogEventTypeIcon';
import { ReatomLogEventType } from './types';
import type { Action } from '../Dropdown/types';
import { Dropdown } from '../Dropdown';
import type { JSX } from 'preact/jsx-runtime';

const stl = {
  recordRoot: css`
    display: flex;
    flex-direction: column;
    align-items: stretch; 
    margin: var(--gap, 4px);
    font-size: 14px;
    align-items: flex-start;
    border-radius: 4px;
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
    &:hover {
      background-color: var(--level-1);
    }
    &:hover button {
      visibility: visible;
    }
    &[data-active='true'] {
      background-color: var(--level-3);
    }
    & > * {
      width: 100%;
      box-sizing: border-box;
    }
  `,
  recordName: css`
    padding: 0 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  `,
  recordType: css`
    & > svg {
      display: block;
    }
  `,
  recordTitle: css`
    padding: 4px 8px;
    flex: 1;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    background-color: var(--level-2);
  `,
  content: css`
    padding: 4px 8px;
    background-color: var(--level-1);
  `,
};

export function ReatomLogEvent({
  type,
  name,
  actions,
  selected,
  onClick,
  content,
}: {
  type: ReatomLogEventType;
  name: string;
  actions?: Action[];
  selected: boolean;
  onClick?: () => void;
  content?: JSX.Element;
}) {
  return (
    <div class={stl.recordRoot} data-active={selected} onClick={onClick}>
      <div class={stl.recordTitle}>
        <div class={stl.recordType}>
          <LogEventTypeIcon type={type} />
        </div>
        <div class={stl.recordName} title={name}>
          {name}
        </div>
        {actions?.length ? <Dropdown actions={actions} /> : null}
      </div>
      {content ? <div class={stl.content}>{content}</div> : null}
    </div>
  );
}
