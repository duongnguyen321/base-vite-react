import type { ClassValue } from 'clsx';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

type PopupContextType = {
  content: ReactNode;
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  open: (content: ReactNode) => void;
  close: () => void;
  classNames: { wrapper: ClassValue; content: ClassValue };
  setClassNames: Dispatch<
    SetStateAction<{ wrapper: ClassValue; content: ClassValue }>
  >;
  contentAction: string;
  setContentAction: Dispatch<SetStateAction<string>>;
  action: {
    current: () => void;
  };
};

export default PopupContextType;
