import useLoading from '@context/Loading/hooks/useLoading.tsx';

/**
 * Loading component that utilizes the `useLoading` hook to conditionally render a loading indicator.
 *
 * This component checks the `loading` state returned by the `useLoading` hook. If `loading` is true,
 * it renders a full-page overlay with an animated loading indicator.
 *
 * @returns A JSX element representing a loading state, or null if not loading.
 */
function Loading() {
  const { loading } = useLoading();
  if (loading) {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-primary z-50 opacity-30'>
        <div className='w-10 h-10 border-4 border-t-4 border-white rounded-full animate-spin'></div>
      </div>
    );
  }
  return null;
}

export default Loading;
