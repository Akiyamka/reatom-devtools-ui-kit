import type { Signal } from '@preact/signals';

interface ActionFiredRecord {
  name: string;
  type: 'actionFired';
  payload: any;
}
interface StateChangeRecord {
  name: string;
  type: 'stateChange';
  payload: any;
}

export type ReatomLogRecord = ActionFiredRecord | StateChangeRecord;
