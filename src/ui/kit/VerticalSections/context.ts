import { createContext } from 'preact';

export const VerticalSectionsContext = createContext((_isOpen: boolean): void => {
  throw Error('Use <Section /> only inside <VerticalSections /> ');
});
