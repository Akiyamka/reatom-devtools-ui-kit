import { $recording } from '#entities';
import { Header } from '../ui/kit/Header/index.tsx';
import { PauseIcon, PlayIcon, SlidersIcon } from '../ui/kit/Icons/index.ts';
import { Switch } from '../ui/kit/Switch/index.tsx';
import { Tab } from '../ui/kit/Tab/index.tsx';

export function ControlsBar() {
  return (
    <Header
      tabs={
        <>
          <Tab label={'Events'} onClick={() => console.log('events tab click')} active={true} />
          <Tab label={'State'} onClick={() => console.log('states tab click')} active={false} />
        </>
      }
      actions={
        <>
          <button type="button" title={'Pause'}>
            <Switch
              enabled={$recording.value}
              onClick={$recording.toggle}
              iconOn={<PauseIcon />}
              iconOff={<PlayIcon />}
              flashing
            />
          </button>
          <button type="button" title={'Settings'}>
            <SlidersIcon />
          </button>
        </>
      }
    />
  );
}
