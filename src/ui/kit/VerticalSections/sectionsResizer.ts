const getSectionVarName = (i: number) => `--sec-${i}`;
const getSectionVarValue = (el: HTMLElement, i: number): number | null => {
  const cssVarVal = el.style.getPropertyValue(getSectionVarName(i));
  if (cssVarVal !== '') return Number.parseInt(cssVarVal);
  return null;
};
const setSectionVarValue = (el: HTMLElement, i: number, val: number) =>
  el.style.setProperty(getSectionVarName(i), `${val}px`);

const getCurrentSectionsHeights = (root: HTMLDivElement) => {
  const initialHeights: number[] = [];
  let section = 0;
  while (true) {
    const initialHeight = getSectionVarValue(root, section);
    if (initialHeight !== null) {
      initialHeights.push(initialHeight);
      section++;
    } else break;
  }
  const totalSections = initialHeights.length;
  return { initialHeights, totalSections };
};

// TODO: recalculate on windows resize
export function createDragHandleDragListener(
  root: { current: HTMLDivElement | null },
  handleIdx: number,
  { minHeight }: { minHeight: number },
) {
  return (event: MouseEvent) => {
    const rootEl = root.current;
    if (rootEl === null) return;
    const initialY = event.clientY;
    console.assert(handleIdx !== 0, "Top section doesn't have a resize handle");
    const setSectionHeight = (sec: number, height: number) => setSectionVarValue(rootEl, sec, height);

    const { initialHeights, totalSections } = getCurrentSectionsHeights(rootEl);

    const onMouseMove = (e: MouseEvent) => {
      const shift = Math.ceil(initialY - e.clientY);
      const changeset: number[] = [];
      let canContinue = true;

      // Apply shift for above panel
      canContinue = (() => {
        let aboveShift = shift;
        let i = handleIdx - 1;
        while (i >= 0) {
          const newHeight = initialHeights[i] - aboveShift;
          if (newHeight < minHeight) {
            changeset[i] = minHeight;
            aboveShift = aboveShift - (initialHeights[i] - minHeight);
            i--;
          } else {
            aboveShift = 0;
            changeset[i] = newHeight;
            break;
          }
        }
        return aboveShift === 0;
      })();
      if (!canContinue) return;

      // Apply shift for below panel
      canContinue = (() => {
        let belowShift = shift;
        let k = handleIdx;
        while (k <= initialHeights.length - 1) {
          const newHeight = initialHeights[k] + belowShift;
          if (newHeight < minHeight) {
            changeset[k] = minHeight;
            belowShift = belowShift + (initialHeights[k] - minHeight);
            k++;
          } else {
            belowShift = 0;
            changeset[k] = newHeight;
            break;
          }
        }
        return belowShift === 0;
      })();
      if (!canContinue) return;

      // Apply changes
      let section = totalSections;
      while (section >= 0) {
        const finalHeight = changeset[section] ?? initialHeights[section];
        setSectionHeight(section, finalHeight);
        section--;
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', onMouseMove);
      },
      { once: true },
    );
  };
}

export function createSectionStateChangeListener(
  root: { current: HTMLDivElement | null },
  sectionIdx: number,
  { minHeight }: { minHeight: number },
) {
  return (isOpen: boolean) => {
    const rootEl = root.current;
    if (rootEl === null) return;
    const setSectionHeight = (sec: number, height: number) => setSectionVarValue(rootEl, sec, height);
    const { initialHeights, totalSections } = getCurrentSectionsHeights(rootEl);
    const newHeights = [];
    const COLLAPSED_SIZE = 30;
    // If closed:
    // - expand next *open* section on the amount of space of collapsed section.
    // - if collapsed section is the last one - expand prev open section
    console.log(sectionIdx, isOpen);
    if (!isOpen) {
      newHeights[sectionIdx] = COLLAPSED_SIZE;
      let freeSpace = initialHeights[sectionIdx];
      let k = sectionIdx + 1;
      while (k < totalSections) {
        if (initialHeights[k] !== COLLAPSED_SIZE) {
          newHeights[k] = initialHeights[k] + freeSpace;
          freeSpace = 0;
          break;
        }
        k++;
      }
      if (k === totalSections && freeSpace > 0) {
        k = sectionIdx - 1;
        while (k < totalSections) {
          if (initialHeights[k] !== COLLAPSED_SIZE) {
            newHeights[k] = initialHeights[k] + freeSpace;
            freeSpace = 0;
            break;
          }
          k--;
        }
      }
      if (freeSpace === 0) {
        console.log(newHeights);
        newHeights.forEach((height, idx) => {
          setSectionHeight(idx, height);
        });
      }
    } else {
      // If opened:
      // set last saved height, or minimal
      // reduce next opened section on this amount util it allowed by minimal size
      // then go next until end
      // If still not enough - go to the prev section (revert direction)
      // If saved size not fit - try again with minimal size
      let needSpace = initialHeights[sectionIdx];
      let k = sectionIdx + 1;
      while (k < totalSections && needSpace > 0) {
        const budget = Math.min(needSpace, initialHeights[k] - minHeight);
        newHeights.push(initialHeights[k] - budget);
        needSpace -= budget;
        k++;
      }
      if (k === totalSections && needSpace > 0) {
        k = sectionIdx - 1;
        while (k >= 0) {
          const budget = Math.min(needSpace, initialHeights[k] - minHeight);
          newHeights.push(initialHeights[k] - budget);
          needSpace -= budget;
          k--;
        }
      }
      if (needSpace === 0) {
        newHeights.forEach((height, idx) => {
          setSectionHeight(idx, height);
        });
      }
    }
  };
}
