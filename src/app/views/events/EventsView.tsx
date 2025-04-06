import { css } from 'vite-css-in-js';
import { entities } from '#entities';
import { Filter, Inspector, Resizable } from '#ui/kit';
import { ReatomEntitiesList } from './ReatomEntitiesList.ts';

const stl = {
  aside: css`
    display: flex;
    flex-flow: column nowrap;
    border-right: 1px solid var(--dimm-color);
    height: 100%;
    width: 100%;
  `,
};

export function EventsView() {
  return (
    <>
      <div class={stl.aside}>
        <Filter onInput={(value) => entities.setFilter(value)} />
        <ReatomEntitiesList />
      </div>
      {entities.$current.value && (
        <Resizable
          defaultValue={400}
          direction="left"
          collapseThreshold={30}
          onCollapse={() => entities.deselect()}
        >
          <Inspector record={entities.$current.value} />
        </Resizable>
      )}
    </>
  );
}
