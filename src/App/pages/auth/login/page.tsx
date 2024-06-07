import Text from '@components/Text.tsx';
import useLoading from '@context/Loading/hooks/useLoading.tsx';
import useLanguage from '@context/Translation/hooks/useLanguage.tsx';
import useAuth from '@hooks/useAuth.tsx';
import useCaptcha from '@hooks/useCaptcha.tsx';
import useNavigate from '@hooks/useNavigate.tsx';
import { toast } from 'sonner';

function LoginPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const getCaptcha = useCaptcha();
  const { setAuth, getNextPath } = useAuth();
  const { loading, setLoading } = useLoading();

  async function login() {
    if (loading) {
      return;
    }
    setLoading(true);
    const nextPath = getNextPath();
    try {
      const token = await getCaptcha();
      if (!token) {
        toast.error(t('errors.code.-10'));
        setLoading(false);
        return;
      }
      setAuth({
        userId: '1',
        token: token,
      });
      toast.success(t('login.success'));
      await new Promise((resolve) => {
        setTimeout(() => resolve(navigate(nextPath, true)), 300);
      });
    } catch {
      toast.error(t('errors.code.-77'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Text
      as={'h1'}
      className={'text-color-900'}
      onClick={login}
    >
      {t('login.title')}
    </Text>
  );
};
export default LoginPage;
