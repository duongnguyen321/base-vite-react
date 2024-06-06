import Text from '@components/Text.tsx';
import useLoading from '@context/Loading/hooks/useLoading.tsx';
import useLanguage from '@context/Translation/hooks/useLanguage.tsx';
import useAuth from '@hooks/useAuth.tsx';
import useNavigate from '@hooks/useNavigate.tsx';

function LoginPage() {
  const { t } = useLanguage();
  const { setAuth, getNextPath } = useAuth();
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();

  async function login() {
    if (loading) {
      return;
    }
    setLoading(true);
    const nextPath = getNextPath();
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
      setAuth(true);
      navigate(nextPath, true);
    }).finally(() => setLoading(false));
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
