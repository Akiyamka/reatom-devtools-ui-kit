import { useEffect } from 'preact/hooks';
import { css } from 'vite-css-in-js';
import { ReatomEntitiesList } from './ReatomEntitiesList';
import { entities } from './entities';
import './app.css';
import mock from './mocks/mockData';
import { Inspector } from './Inspector';
import { Search } from './Search';
import { Resizable } from './ui/kit/Resizable';

const stl = {
  app: css`
  display: flex;
  flex-flow: row nowrap;
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
};

export function App() {
  useEffect(() => {
    entities.set(mock);
  }, []);

  return (
    <div class={stl.app}>
      <Resizable defaultWith={400} direction="right">
        <div class={stl.aside}>
          <Search />
          <ReatomEntitiesList />
        </div>
      </Resizable>
      <Inspector />
    </div>
  );
}
