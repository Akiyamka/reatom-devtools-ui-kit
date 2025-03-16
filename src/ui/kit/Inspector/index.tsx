import { css } from 'vite-css-in-js';
import { ReatomLogEvent } from '../ReatomLogEvent';
import { Section } from './Section';
import { Code } from '../Code';
import { TraceRow } from './TraceRow';
import type { ReatomLogRecord } from '../../../entities';
import { Resizable } from '../Resizable';

const stl = {
  inspector: css`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    border-left: 1px solid var(--level-4);
  `,
  controls: css`
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    padding: 4px;
  `,
};

export function Inspector({ record }: { record: ReatomLogRecord | null }) {
  if (!record) {
    return null;
  }
  return (
    <div class={stl.inspector}>
      <Section title={'Trace'}>
        <ReatomLogEvent key={record.name} name={record.name} type={record.type} selected={false} actions={[]} />
        <TraceRow>
          <ReatomLogEvent key={record.name} name={record.name} type={record.type} selected={false} actions={[]} />
        </TraceRow>
        <TraceRow>
          <ReatomLogEvent key={record.name} name={record.name} type={record.type} selected={false} actions={[]} />
        </TraceRow>
        <TraceRow>
          <ReatomLogEvent key={record.name} name={record.name} type={record.type} selected={false} actions={[]} />
        </TraceRow>
        <TraceRow>
          <ReatomLogEvent key={record.name} name={record.name} type={record.type} selected={false} actions={[]} />
        </TraceRow>
        <TraceRow>
          <ReatomLogEvent key={record.name} name={record.name} type={record.type} selected={false} actions={[]} />
        </TraceRow>
        <TraceRow>
          <ReatomLogEvent key={record.name} name={record.name} type={record.type} selected={false} actions={[]} />
        </TraceRow>
      </Section>
      <Resizable direction='top'>
        <Section title={'State'}>
          <Code code={record.payload} />
        </Section>
      </Resizable>
      <Section title={'Changes history'}>
        <Code code={record.payload} />
        <Code code={record.payload} />
        <Code code={record.payload} />
      </Section>
    </div>
  );
}
