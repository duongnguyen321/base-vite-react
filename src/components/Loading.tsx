import { motion } from 'framer-motion';
import useLoading from '@context/Loading/hooks/useLoading.tsx';
import tw from '@helpers/tailwind.helper.ts';

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

  const spinnerVariants = {
    spin: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: 'linear',
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      className={tw(
        'fixed inset-0 flex items-center justify-center bg-primary z-50',
        loading ? 'opacity-30 visible' : 'opacity-0 invisible',
      )}
      initial='hidden'
      animate={loading ? 'visible' : 'hidden'}
      exit='hidden'
    >
      <motion.div
        className='w-10 h-10 border-4 border-primary border-t-white border-l-white rounded-full'
        variants={spinnerVariants}
        animate='spin'
      />
    </motion.div>
  );
}

export default Loading;
