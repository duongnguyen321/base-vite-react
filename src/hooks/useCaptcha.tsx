import { useCallback } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

function UseCaptcha() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  return useCallback(async () => {
    if (!executeRecaptcha) {
      console.error('Execute recaptcha not yet available');
      return;
    }
    return await executeRecaptcha();
  }, [executeRecaptcha]);
}

export default UseCaptcha;
