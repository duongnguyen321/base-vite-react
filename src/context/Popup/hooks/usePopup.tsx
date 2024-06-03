import { useContext } from 'react';
import PopupContext from '../Popup.context.tsx';
const usePopup = () => useContext(PopupContext);
export default usePopup;
