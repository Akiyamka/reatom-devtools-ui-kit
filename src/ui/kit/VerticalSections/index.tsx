import { useLayoutEffect, useRef } from 'preact/hooks';
import { type JSX } from 'preact/jsx-runtime';
import { css } from 'vite-css-in-js';

const getSectionVarName = (i: number) => `--sec-${i}`;
const getSectionVarValue = (el: HTMLElement, i: number) => parseInt(el.style.getPropertyValue(getSectionVarName(i)) || '0')
const setSectionVarValue = (el: HTMLElement, i: number, val: number) => el.style.setProperty(getSectionVarName(i), `${val}px`);
const minValue = 37;

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
  `,
  resizeHandle: css`
    width: 100%;
    height: 6px;
    background-color: chocolate;
    cursor: row-resize;
    flex-shrink: 0;
    user-select: none;
  `,
};

function onDragStart(root: { current: HTMLDivElement | null }, index: number) {
  const findClosestNonZeroVar = (startFrom: number) => {
    let i = startFrom
    while (i > 0) {
      const x = getSectionVarValue(root.current, i);
      if (x > minValue) break;
      i--;
    }
    return i
  }
  
  return (event: MouseEvent) => {
    console.log("onDragStart: ", index);
    const rootEl = root.current;
    if (rootEl === null) return;
    const initialY = event.clientY;
    const initialValue = getSectionVarValue(rootEl, index);
    let closestIndex: number;
    let initialClosestValue: number;
    const onMouseMove = (e: MouseEvent) => {
      const shift = initialY - e.clientY;
      const newHeight = initialValue + shift;
      console.assert(index !== 0, 'Top section doesn\'t have a resize handle');
      const newIndex = findClosestNonZeroVar(index - 1);
      if (newIndex !== closestIndex) {
        closestIndex = newIndex;
        initialClosestValue = getSectionVarValue(rootEl, closestIndex) + shift;
      }
      const closestHeight = initialClosestValue - shift
      setSectionVarValue(rootEl, index, Math.max(newHeight, minValue));
      // if (closestHeight <= minValue) {
      //   console.log('closestHeight', closestHeight)
      //   return; // Do not collapse to much, always keep header visible
      // }
      setSectionVarValue(rootEl, closestIndex,  Math.max(closestHeight, minValue) );
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', onMouseMove);
      },
      { once: true }
    );
  };
}

export function VerticalSections({
  children,
  collapseThreshold = 50,
}: {
  children: JSX.Element[];
  collapseThreshold?: number;
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
        <div class={stl.cell} ref={(el) => (cellsRefs.current[i] = el!)}>
          {i !== 0 && <div class={stl.resizeHandle} onMouseDown={onDragStart(rootElRef, i)}></div>}
          {child}
        </div>
      ))}
    </div>
  );
}
