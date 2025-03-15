import { computed, signal } from '@preact/signals';
import { ReatomLogRecord } from './types';

const $all = signal<ReatomLogRecord[][]>([[]]);
const $current = signal<ReatomLogRecord | null>(null);
const $filter = signal<string>('');
const $filtered = computed(() => {
  const filter = $filter.value;
  const all = $all.value;
  return filter.length ? all.flat().filter((x) => x.name.includes(filter)) : all;
});

export const entities = {
  $all,
  $current,
  $filtered,
  set: (entities: ReatomLogRecord[][]) => {
    $all.value = entities;
  },
  add: (entity: ReatomLogRecord[]) => {
    $all.value = [...$all.value, entity];
  },
  select: (entity: ReatomLogRecord) => {
    $current.value = entity;
  },
  // https://english.stackexchange.com/questions/18465/unselect-or-deselect
  deselect: () => {
    $current.value = null;
  },
  setFilter: (filter: string) => {
    $filter.value = filter;
  }
};

export type { ReatomLogRecord } from './types';

export const $recording = signal(true);