import { ComponentChild } from 'preact';
import { useLayoutEffect, useRef } from 'preact/hooks';

import { css } from 'vite-css-in-js';

const stl = {
  root: css`
    display: flex;
    position: relative;
    flex-shrink: 0;
    &[data-direction='top'] {
      flex-flow: column nowrap;
      height: var(--resizable-value);
      & > #grip {
        width: 100%;
        height: 6px;
        &:hover {
          cursor: row-resize;
        }
      }
    }
    &[data-direction='right'],
    &[data-direction='left'] {
      flex-flow: row nowrap;
      width: var(--resizable-value);
      & > #grip {
        width: 6px;
        height: 100%;
        &:hover {
          cursor: col-resize;
        }
      }
    }
  `,
  grip: css`
    position: absolute;
    top: 0;
    bottom: 0;
    user-select: none;
    &:hover {
      background-color: var(--level-3);
      cursor: col-resize;
    }
  `,
  left: css`
    left: 0;
  `,
  right: css`
    right: 0;
  `,
  top: css`
    top: 0;
  `,
};

type Direction = 'right' | 'left' | 'top';

function onDragStart(
  el: { current: HTMLDivElement | null },
  settings: { direction: Direction; onCollapse?: () => void; collapseThreshold?: number }
) {
  return (event: MouseEvent) => {
    const initialX = event.clientX;
    const initialWith = parseInt(el.current?.style.getPropertyValue('--resizable-value') ?? '0');
    const onMouseMove = (e: MouseEvent) => {
      const shift = settings.direction === 'right' ? e.clientX - initialX : initialX - e.clientX;
      const result = initialWith + shift;
      el.current?.style.setProperty('--resizable-value', `${result}px`);
      if (settings.collapseThreshold && settings.onCollapse && result < settings.collapseThreshold) {
        settings.onCollapse();
      }
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

type ResizableProps =
  | {
      children: ComponentChild;
      defaultWith?: number;
      direction: Direction;
    }
  | {
      children: ComponentChild;
      defaultWith?: number;
      direction: Direction;
      onCollapse: () => void;
      collapseThreshold: number;
    };

export function Resizable({ children, defaultWith, direction, ...rest }: ResizableProps) {
  const rootElRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!defaultWith) return;
    if ('collapseThreshold' in rest) {
      if (defaultWith > rest.collapseThreshold) {
        rootElRef.current?.style.setProperty('--resizable-value', `${defaultWith}px`);
      } else {
        rootElRef.current?.style.setProperty('--resizable-value', `0px`);
        rest.onCollapse?.();
      }
    } else {
      rootElRef.current?.style.setProperty('--resizable-value', `${defaultWith}px`);
    }
  }, [defaultWith]);
  return (
    <div class={stl.root} data-direction={direction} ref={rootElRef}>
      {children}
      <div id="grip" class={`${stl.grip} ${stl[direction]}`} onMouseDown={onDragStart(rootElRef, { direction, ...rest })}></div>
    </div>
  );
}
