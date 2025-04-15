import { useSignal } from '@preact/signals';
import type { JSX } from 'preact/jsx-runtime';
import { css } from 'vite-css-in-js';
import { ChevronDownIcon } from '../Icons/index.ts';

const stl = {
  section: css`
    display: flex;
    flex-flow: column nowrap;
    min-height: 0;
    &[data-greedy='true'] {
      flex: 1;
    }
  `,
  sectionTitle: css`
    padding: 4px 8px;
    background-color: var(--level-3);
  `,
  sectionContent: css`
    padding: 2px;
    overflow: auto;
  `,
};

export const SectionTitle = ({ children }: { children: string | (string | JSX.Element)[] | JSX.Element }) => (
  <div class={stl.sectionTitle}>{children}</div>
);

export const SectionContent = ({ children }: { children: JSX.Element[] | JSX.Element }) => (
  <div class={stl.sectionContent}>{children}</div>
);

export function Section({
  children,
  title,
  greedy = false,
}: {
  children: JSX.Element[] | JSX.Element;
  title: string;
  greedy?: boolean;
}) {
  const isOpen = useSignal(true);

  return (
    <div class={stl.section} data-greedy={greedy}>
      <SectionTitle>
        <button
          type="button"
          aria-label="Collapse section"
          onClick={() => {
            isOpen.value = !isOpen.value;
          }}
        >
          <ChevronDownIcon />
        </button>
        {title}
      </SectionTitle>
      {isOpen.value && <SectionContent>{children}</SectionContent>}
    </div>
  );
}
