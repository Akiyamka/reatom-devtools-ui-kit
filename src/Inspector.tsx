import { css } from 'vite-css-in-js';
// import { entities } from './entities';
// import { EntityIcon } from './EntityIcon';
// import { MetaView } from './MetaView';
// import { StateView } from './StateView';
// import { StateHistoryView } from './StateHistoryView';
// import { Resizable } from './ui/kit/Resizable';
// import { PannelHeader } from './PannelHeader';

const stl = {
  inspector: css`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
`,
  title: css`
  display: flex;
  flex-flow: row nowrap;
  font-weight: bold;
  padding: 10px;
  align-items: center;
  gap: 6px;
  background-color: var(--title-color);
 `,
  scene: css`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  `,
  sceneColumn: css`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  border-right: 1px solid var(--dimm-color);
  `,
  placeholder: css`
  display: flex;
  place-items: center;
  text-align: center;
  justify-content: center;
  margin-bottom: 50vh;
  width: 100%;
  opacity: .5;
  font-size: 1.1em;
 `,
};

export function Inspector() {
  return null;
  // const entity = entities.$current.value;
  // return entity ? (
  //   <div class={stl.inspector}>
  //     <PannelHeader icon={<EntityIcon type={entity.type} />}>
  //       <span>{entity.name}</span>
  //     </PannelHeader>
  //     <div class={stl.scene}>
  //       <div class={stl.sceneColumn}>
  //         <StateView />
  //       </div>
  //       <Resizable defaultWith={280} direction="left">
  //         <MetaView />
  //         <StateHistoryView />
  //       </Resizable>
  //     </div>
  //   </div>
  // ) : (
  //   <div class={stl.placeholder}>Select an entity</div>
  // );
}
