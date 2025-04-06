import { type Signal, signal } from '@preact/signals';

export type ProFilter = {
  id: number;
  $inverted: Signal<boolean>;
  toggleInvert: () => void;
  $highlighted: Signal<boolean>;
  toggleHighlight: () => void;
  $searchScope: Signal<'name' | 'value'>;
  toggleSearchScope: () => void;
};

let counter = 0;
export function createFilter(): ProFilter {
  const $inverted = signal(false);
  const $highlighted = signal(false);
  const $searchScope = signal<'name' | 'value'>('name');
  return {
    id: counter++,
    $inverted,
    toggleInvert: () => {
      $inverted.value = !$inverted.value;
    },
    $highlighted,
    toggleHighlight: () => {
      $highlighted.value = !$highlighted.value;
    },
    $searchScope,
    toggleSearchScope: () => {
      $searchScope.value = $searchScope.value === 'name' ? 'value' : 'name';
    },
  };
}
