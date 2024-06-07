import Text from '@components/Text.tsx';
import useLoading from '@context/Loading/hooks/useLoading.tsx';
import useLanguage from '@context/Translation/hooks/useLanguage.tsx';
import useAuth from '@hooks/useAuth.tsx';
import useNavigate from '@hooks/useNavigate.tsx';

function ProfilePage() {
  const { t } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();

  async function handleLogout() {
    if (loading) {
      return;
    }
    setLoading(true);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        logout(() => navigate('/auth/login', true));
        resolve();
      }, 300);
    });
    setLoading(false);
  }

  return (
    <Text
      as={'h1'}
      className={'text-color-900'}
      onClick={handleLogout}
    >
      {t('profile.title')}
    </Text>
  );
}

export default ProfilePage;
