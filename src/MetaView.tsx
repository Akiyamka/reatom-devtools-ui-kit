import { css } from 'vite-css-in-js';
import { entities } from './entities';


const stl = {
  metaView: css`
  padding: 12px 16px;
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
  min-width: 180px;
  `,
};

export function MetaView() {
  const entity = entities.$current.value;
  return entity ? (
    <div class={stl.metaView}>
      <div>Type: {entity.type}</div>
      <ul>
        Subs:
        <li>foo</li>
        <li>bar</li>
        <li>baz</li>
      </ul>
      <ul>
        Pubs:
        <li>foo</li>
        <li>bar</li>
        <li>baz</li>
      </ul>
    </div>
  ) : null;
}
