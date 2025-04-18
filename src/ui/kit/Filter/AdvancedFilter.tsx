import { css } from 'vite-css-in-js';
import type { ProFilter } from '#entities'
import { EqualityIcon } from '../Icons/EqualityIcon.tsx';
import { EyeIcon } from '../Icons/EyeIcon.tsx';
import { FilterIcon } from '../Icons/FilterIcon.tsx';
import { HighlighIcon } from '../Icons/HighlighIcon.tsx';
import { NotEqualityIcon } from '../Icons/NotEqualityIcon.tsx';
import { TrashIcon } from '../Icons/TrashIcon.tsx';
import { Switch } from '../Switch/index.tsx';
import { SimpleFilter } from './SimpleFilter.tsx';

const stl = {
  root: css`
    display: flex;
    flex-flow: row nowrap;
    background-color: var(--level-2);
    padding: 2px;
    margin: 4px;
    border-radius: 4px;
    box-sizing: border-box;
    gap: 4px;
  `,
  filterControls: css`
    display: flex;
    flex-flow: row nowrap;
    margin: 2px 0;
    gap: 4px;
    flex: 1;
  `,
  modeBtn: css`
    min-width: 24px;
    background-color: var(--level-4);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  `,
  scopeBtn: css`
    border-radius: 4px;
    min-width: 54px;
    padding: 0 8px;
    cursor: pointer;
  `,
  controlBtn: css`
    width: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  filter: css`
    display: flex;
    flex-flow: row nowrap;
    background-color: var(--level-4);
    border-radius: 4px;
    flex: 1;
  `,
};

export function AdvancedFilter<T extends ProFilter>({
  filter,
  onRemove,
  onToggle,
}: {
  filter: T;
  onRemove: (filter: T) => void;
  onToggle: (filter: T) => void;
}) {
  return (
    <div class={stl.root}>
      <button type="button" class={stl.controlBtn} onClick={() => onToggle(filter)}>
        <EyeIcon />
      </button>
      <div class={stl.filterControls}>
        <Switch
          enabled={filter.$searchScope.value === 'name'}
          onClick={() => filter.toggleSearchScope()}
          iconOn={<div class={`${stl.modeBtn} ${stl.scopeBtn}`}>name</div>}
          iconOff={<div class={`${stl.modeBtn} ${stl.scopeBtn}`}>payload</div>}
        />
        <button type="button" class={stl.modeBtn} onClick={() => filter.toggleInvert()}>
          {filter.$inverted.value ? <NotEqualityIcon /> : <EqualityIcon />}
        </button>
        <div class={stl.filter}>
          <SimpleFilter onInput={console.log} placeholder="Filter" />
        </div>
        <button type="button" class={stl.modeBtn} onClick={() => filter.toggleHighlight()}>
          {filter.$highlighted.value ? <HighlighIcon /> : <FilterIcon />}
        </button>
      </div>
      <button type="button" class={stl.controlBtn} onClick={() => onRemove(filter)}>
        <TrashIcon />
      </button>
    </div>
  );
}
