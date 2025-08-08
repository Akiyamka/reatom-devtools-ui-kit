import { useLayoutEffect, useRef } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';
import { css } from 'vite-css-in-js';
import { VerticalSectionsContext } from './context.ts';
import { createDragHandleDragListener, createSectionStateChangeListener } from './sectionsResizer.ts';

const stl = {
  column: css`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: var(--sec-0, 1fr) var(--sec-1, 1fr) var(--sec-2, 1fr);
    height: 100%;
  `,
  cell: css`
    display: flex;
    flex-flow: column nowrap;
    min-height: 0;
    box-sizing: border-box;
    /* For debug */
    /* box-shadow: inset 0 0 0 2px rgba(255,0,0,.8); */
  `,
  resizeHandle: css`
    position: relative;
    top: 3px;
    width: 100%;
    height: 6px;

    cursor: row-resize;
    flex-shrink: 0;
    user-select: none;
    &:hover {
      background-color: var(--level-5);
    }
  `,
};

export function VerticalSections({
  children,
  minHeight = 100,
}: {
  children: JSX.Element[];
  minHeight?: number;
}) {
  const rootElRef = useRef<HTMLDivElement>(null);
  const cellsRefs = useRef<HTMLDivElement[]>([]);

  // Setup variables
  useLayoutEffect(() => {
    const rootEl = rootElRef.current;
    if (!rootEl) return;
    cellsRefs.current.forEach((cell, i) => {
      requestAnimationFrame(() => {
        const { height } = cell.getBoundingClientRect();
        rootEl.style.setProperty(`--sec-${i}`, `${height}px`);
      });
    });
  }, []);

  return (
    <div class={stl.column} ref={rootElRef}>
      {children.map((child, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={i}
          class={stl.cell}
          ref={(el) => {
            cellsRefs.current[i] = el!;
          }}
        >
          {i !== 0 && (
            <div
              class={stl.resizeHandle}
              onMouseDown={createDragHandleDragListener(rootElRef, i, { minHeight })}
            />
          )}
          <VerticalSectionsContext.Provider value={createSectionStateChangeListener(rootElRef, i, { minHeight })}>
            {child}
          </VerticalSectionsContext.Provider>
        </div>
      ))}
    </div>
  );
}
