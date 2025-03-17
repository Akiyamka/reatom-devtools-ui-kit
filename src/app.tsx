import { useEffect } from 'preact/hooks';
import { css } from 'vite-css-in-js';
import { ReatomEntitiesList } from './ReatomEntitiesList';
import { $recording, entities } from './entities';
import './app.css';
import mock from './mocks/mockData';
import { Search } from './ui/kit/Search';
import { Resizable } from './ui/kit/Resizable';
import { Header } from './ui/kit/Header';
import { Tab } from './ui/kit/Tab';
import { SlidersIcon } from './ui/kit/Icons/SlidersIcon';
import { RecordSwitch } from './ui/kit/RecordSwitch';
import { Inspector } from './ui/kit/Inspector';

const stl = {
  app: css`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
  `,
  aside: css`
    display: flex;
    flex-flow: column nowrap;
    border-right: 1px solid var(--dimm-color);
    height: 100%;
    width: 100%;
  `,
  view: css`
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    height: 100%;
    background-color: var(--level-2);
    min-height: 0px;
    box-sizing: border-box;
  `,
};

export function App() {
  useEffect(() => {
    entities.set(mock);
  }, []);

  return (
    <div class={stl.app}>
      <Header
        tabs={[
          <>
            <Tab label={'Events'} onClick={() => console.log('events tab click')} active={true} />
            <Tab label={'State'} onClick={() => console.log('states tab click')} active={false} />
          </>,
        ]}
        actions={[
          <>
            <button title={'Pause'}>
              <RecordSwitch enabled={$recording.value} onClick={() => ($recording.value = !$recording.value)} />
            </button>
            <button title={'Settings'}>
              <SlidersIcon />
            </button>
          </>,
        ]}
      />
      <div class={stl.view}>
        <div class={stl.aside}>
          <Search onInput={(value) => entities.setFilter(value)} />
          <ReatomEntitiesList />
        </div>
        {
          entities.$current.value && (
            <Resizable defaultValue={400} direction="left" collapseThreshold={30} onCollapse={() => entities.deselect()}>
              <Inspector record={entities.$current.value} />
            </Resizable>
          )
        }
      </div>
    </div>
  );
}
