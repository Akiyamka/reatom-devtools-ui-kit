import { signal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { css } from 'vite-css-in-js';
import { mockEntities } from '#entities';
import './app.css';

import { ControlsBar } from './ControlsBar';
import { EventsView } from './views/events';
import { StateOverviewView } from './views/state_overview';

const stl = {
  app: css`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
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

enum Views {
  Events = 'Events',
  StateOverview = 'StateOverview',
}

const views = {
  [Views.Events]: <EventsView />,
  [Views.StateOverview]: <StateOverviewView />,
};

const $view = signal(Views.Events);

export function App() {
  useEffect(() => {
    mockEntities();
  }, []);

  return (
    <div class={stl.app}>
      <ControlsBar />
      <div class={stl.view}>{views[$view.value] ?? null}</div>
    </div>
  );
}
