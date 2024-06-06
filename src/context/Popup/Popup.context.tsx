import { createContext } from 'react';
import type PopupContextType from './_interface/PopupContextType.ts';

const defaultValue: PopupContextType = {
  content: null,
  isOpen: false,
  open: () => {},
  close: () => {},
  classNames: {
    content: '',
    wrapper: '',
  },
  setClassNames: () => {},
  action: {
    current: () => {},
  },
  contentAction: '',
  setContentAction: () => {},
};
const PopupContext = createContext<PopupContextType>(defaultValue);

export default PopupContext;
