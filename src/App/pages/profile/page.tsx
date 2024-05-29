import Text from '@components/Text.tsx';
import useLoading from '@context/Loading/hooks/useLoading.tsx';
import useLanguage from '@context/Translation/hooks/useLanguage.tsx';
import useAuth from '@hooks/useAuth.tsx';

const ProfilePage = () => {
  const { t } = useLanguage();
  const { setAuth, getNextPath } = useAuth();
  const { loading, setLoading } = useLoading();
  const navigate = (path: string) => {
    window.location.href = path;
  };

  async function logout() {
    if (loading) {
      return;
    }
    const nextPath = getNextPath();
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
      setAuth(false);
      navigate(`/auth/login?next=${nextPath}`);
    }).finally(() => setLoading(false));
  }

  return (
    <Text
      as={'h1'}
      className={'text-color-900'}
      onClick={logout}
    >
      {t('profile.title')}
    </Text>
  );
};
export default ProfilePage;
