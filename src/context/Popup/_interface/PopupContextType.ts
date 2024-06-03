import type { ClassValue } from 'clsx';
import type { ReactNode } from 'react';

type PopupContextType = {
  content: ReactNode;
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  open: (content: ReactNode) => void;
  close: () => void;
  classNames: { wrapper: ClassValue; content: ClassValue };
};

export default PopupContextType;
