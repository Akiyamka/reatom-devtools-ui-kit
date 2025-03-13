import { ComponentChild } from 'preact';
import { useLayoutEffect, useRef } from 'preact/hooks';

import { css } from 'vite-css-in-js';

const stl = {
  root: css`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  width: var(--resizible-width);
  flex-shrink: 0;
  `,
  grip: css`
   width: 6px;
   height: 100%;
   position: absolute;
   top: 0;
   bottom: 0;
   user-select: none;
   &:hover {
    background-color: var(--bkg-color-accent);
    cursor: col-resize;
   }
  `,
  left: css`
    left: 0;
 `,
  right: css`
    right: 0;
 `,
};

type Direction = 'right' | 'left';

function onDragStart(
  el: { current: HTMLDivElement | null },
  settings: { direction: Direction }
) {
  return (event: MouseEvent) => {
    const initialX = event.clientX;
    const initialWith = parseInt(
      el.current?.style.getPropertyValue('--resizible-width') ?? '0'
    );
    const onMouseMove = (e: MouseEvent) => {
      const shift = settings.direction === 'right' ? e.clientX - initialX : initialX - e.clientX;
      el.current?.style.setProperty(
        '--resizible-width',
        `${initialWith + shift}px`
      );
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

export function Resizable({
  children,
  defaultWith,
  direction,
}: {
  children: ComponentChild;
  defaultWith?: number;
  direction: Direction;
}) {
  const rootElRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    defaultWith &&
      rootElRef.current?.style.setProperty(
        '--resizible-width',
        `${defaultWith}px`
      );
  }, [defaultWith]);
  return (
    <div class={stl.root} ref={rootElRef}>
     {children}
      <div
        class={`${stl.grip} ${stl[direction]}`}
        onMouseDown={onDragStart(rootElRef, { direction })}
      ></div>
    </div>
  );
}
