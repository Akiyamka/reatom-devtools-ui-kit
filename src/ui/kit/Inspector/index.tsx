import { css } from 'vite-css-in-js';
import type { ReatomLogRecord } from '#entities';
import { Code } from '../Code/index.tsx';
import { ReatomLogEvent } from '../ReatomLogEvent/index.tsx';
import { VerticalSections } from '../VerticalSections/index.tsx';
import { Section } from './Section.tsx';
import { TraceRow } from './TraceRow.tsx';

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
      <VerticalSections>
        <Section title={'Trace'}>
          <ReatomLogEvent
            key={record.name}
            name={record.name}
            type={record.type}
            selected={false}
            actions={[]}
          />
          <TraceRow>
            <ReatomLogEvent
              key={record.name}
              name={record.name}
              type={record.type}
              selected={false}
              actions={[]}
            />
          </TraceRow>
          <TraceRow>
            <ReatomLogEvent
              key={record.name}
              name={record.name}
              type={record.type}
              selected={false}
              actions={[]}
            />
          </TraceRow>
          <TraceRow>
            <ReatomLogEvent
              key={record.name}
              name={record.name}
              type={record.type}
              selected={false}
              actions={[]}
            />
          </TraceRow>
          <TraceRow>
            <ReatomLogEvent
              key={record.name}
              name={record.name}
              type={record.type}
              selected={false}
              actions={[]}
            />
          </TraceRow>
          <TraceRow>
            <ReatomLogEvent
              key={record.name}
              name={record.name}
              type={record.type}
              selected={false}
              actions={[]}
            />
          </TraceRow>
          <TraceRow>
            <ReatomLogEvent
              key={record.name}
              name={record.name}
              type={record.type}
              selected={false}
              actions={[]}
            />
          </TraceRow>
        </Section>
        <Section title={'State'}>
          <Code code={record.payload} />
        </Section>
        <Section title="Changes history">
          <Code code={record.payload} />
          <Code code={record.payload} />
          <Code code={record.payload} />
        </Section>
      </VerticalSections>
    </div>
  );
}
