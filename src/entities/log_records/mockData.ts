import type { ReatomLogRecord } from './index.ts';

class Observable {}

const data: ReatomLogRecord[][] = [
  [
    {
      name: 'CompanySwitchContext',
      type: 'stateChange',
      payload: {
        company: null,
        onCompanyChange: () => null,
      },
    },
  ],
  [
    {
      name: 'NumberFormatContext',
      type: 'stateChange',
      payload: {
        countryRequest: {
          retry: async () => null,
          data$: new Observable(),
          pending$: new Observable(),
          error$: new Observable(),
          setData: () => null,
          fetchAction: () => null,
          init: () => null,
        },
      },
    },
    {
      name: 'getCurrentUserLazy',
      type: 'actionFired',
      payload: {
        params: [{}],
        payload: Promise.resolve({ controller: new AbortController() }),
      },
    },
    {
      name: 'getCurrentUserLazy.onFulfill',
      type: 'actionFired',
      payload: {
        params: [{}],
        payload: { data: {}, headers: {}, status: 202, statusText: '' },
      },
    },
  ],
  [{ name: 'getCurrentUserLazy.pendingAtom', type: 'stateChange', payload: 1 }],

  ...new Array(5000)
    .fill(null)
    .map((_, i) => ({
      name: `generatedAtom${i}`,
      type: 'stateChange' as const,
      payload: new Date(),
    }))
    .reduce(
      (acc, val) => {
        const last = acc[acc.length - 1];
        if (last.length < 5) {
          last.push(val);
        } else {
          acc.push([val]);
        }
        return acc;
      },
      [[]] as ReatomLogRecord[][],
    ),
];
export default data;
