import Loading from '@components/Loading.tsx';
import PopupContainer from '@components/PopupContainer.tsx';
import LoadingProvider from '@context/Loading/Loading.provider.tsx';
import PopupProvider from '@context/Popup/Popup.provider.tsx';
import ThemesProvider from '@context/Themes/Themes.provider.tsx';
import LanguageProvider from '@context/Translation/Translation.provider.tsx';
import { MainRouters } from '@router/routers.tsx';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

function Main(): JSX.Element {
  return (
    <StrictMode>
      <LanguageProvider>
        <ThemesProvider>
          <BrowserRouter>
            <LoadingProvider>
              <PopupProvider>
                <MainRouters />
                <PopupContainer />
                <Loading />
                <Toaster
                  richColors
                  position={'top-right'}
                />
              </PopupProvider>
            </LoadingProvider>
          </BrowserRouter>
        </ThemesProvider>
      </LanguageProvider>
    </StrictMode>
  );
}

export default Main;
