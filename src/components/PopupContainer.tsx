import Button from '@components/Button.tsx';
import usePopup from '@context/Popup/hooks/usePopup.tsx';
import tw from '@helpers/tailwind.helper.ts';
import { motion, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const variants: Variants = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 200,
      duration: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    scale: 0.2,
  },
};

function PopupContainer() {
  const { content, isOpen, close, classNames, action, contentAction } =
    usePopup();
  const { t } = useTranslation();
  return (
    <motion.div
      className={tw(
        'fixed inset-0 w-screen h-screen z-50 flex justify-center items-center',
        classNames.wrapper,
        !isOpen && 'opacity-0 invisible bg-none',
        isOpen && 'bg-black bg-opacity-50',
      )}
      initial='hidden'
      animate={isOpen ? 'visible' : 'hidden'}
      exit='hidden'
      variants={variants}
      onClick={close}
    >
      <motion.div
        className={tw(
          'relative bg-color-50 p-8 rounded-lg min-w-fit min-h-max flex flex-col items-center justify-center',
          classNames.content,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {content}

        <motion.div
          className={tw(
            'w-full flex px-4 md:px-0',
            contentAction ? 'justify-between' : 'justify-center',
          )}
        >
          <Button
            className={tw('mt-4 px-4 py-2 rounded-md min-w-40')}
            onClick={close}
          >
            {t('commons.back')}
          </Button>
          {contentAction && (
            <Button
              variant={'error'}
              className={tw('mt-4 px-4 py-2 rounded-md min-w-40')}
              onClick={action.current}
            >
              {t(contentAction)}
            </Button>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default PopupContainer;
