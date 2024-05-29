import '@styles/global.scss';
import Main from '@App/main.tsx';
import ReactDOM from 'react-dom/client';
import './i18n';

const root = ReactDOM.createRoot(document.body as HTMLElement);
root.render(<Main />);
