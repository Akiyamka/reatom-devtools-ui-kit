import { memo } from 'preact/compat';

export const Code = memo(function Code({ code }: { code: unknown }) {
  return <code>{JSON.stringify(code, null, 2)}</code>;
});
