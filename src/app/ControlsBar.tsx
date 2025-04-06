import { Tab } from '../ui/kit/Tab';
import { Switch } from '../ui/kit/Switch';
import { Header } from '../ui/kit/Header';
import { SlidersIcon, PauseIcon, PlayIcon } from '../ui/kit/Icons';
import { $recording } from '#entities';

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
          <button title={'Pause'}>
            <Switch
              enabled={$recording.value}
              onClick={$recording.toggle}
              iconOn={<PauseIcon />}
              iconOff={<PlayIcon />}
              flashing
            />
          </button>
          <button title={'Settings'}>
            <SlidersIcon />
          </button>
        </>
      }
    />
  );
}
