import { css } from 'vite-css-in-js';
import { entities } from './entities';
import { Virtuoso } from 'react-virtuoso';
import { ReatomLogEvent } from './ui/kit/ReatomLogEvent';
import { memo } from 'preact/compat';
import { Stack } from './ui/kit/Stack';

const stl = {
  listRoot: css`
    flex: 1;
    overflow: auto;
    box-sizing: border-box;
  `,
};

const Code = memo(function Code({ code }: { code: unknown }) {
  return <code>{JSON.stringify(code, null, 2)}</code>;
});

const actions = [{ label: 'Log to console', onClick: () => console.log('Action clicked') }];
export function ReatomEntitiesList() {
  const items = entities.$filtered.value;
  return (
    <div class={stl.listRoot}>
      <Virtuoso
        style={{ height: '100%' }}
        totalCount={items.length}
        itemContent={(i) => {
          const item = items[i];
          if ('length' in item) {
            return (
              <Stack i={i} title={'8:31:09 PM [607ms]'}>
                {item.map((itm) => (
                  <ReatomLogEvent
                    key={itm.name}
                    name={itm.name}
                    type={itm.type}
                    selected={false}
                    actions={actions}
                    content={<Code code={itm.payload} />}
                  />
                ))}
              </Stack>
            );
          }
          return (
            <ReatomLogEvent
              key={item.name}
              name={item.name}
              type={item.type}
              selected={false}
              actions={actions}
              content={<Code code={item.payload} />}
            />
          );
        }}
      />
    </div>
  );
}
