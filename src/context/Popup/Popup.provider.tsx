import type ProviderProps from '@context/interface/Provider.types.ts';
import { type ReactNode, useState } from 'react';
import PopupContext from 'src/context/Popup/Popup.context.tsx';

interface PopupState {
  content: ReactNode;
  isOpen: boolean;
}

const PopupProvider = ({ children }: ProviderProps) => {
  const [popupState, setPopupState] = useState<PopupState>({
    content: null,
    isOpen: false,
  });

  const openPopup = (content: ReactNode) => {
    setPopupState({ content, isOpen: true });
  };

  const closePopup = () => {
    setPopupState({ content: null, isOpen: false });
  };
  return (
    <PopupContext.Provider
      value={{
        content: popupState.content,
        isOpen: popupState.isOpen,
        open: openPopup,
        close: closePopup,
        classNames: {
          wrapper: '',
          content: '',
        },
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export default PopupProvider;
