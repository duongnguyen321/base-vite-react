import AssetsImg from '@components/AssetsImg.tsx';
import Text from '@components/Text.tsx';
import useLanguage from '@context/Translation/hooks/useLanguage.tsx';
import tw from '@helpers/tailwind.helper.ts';
import useNavigate from '@hooks/useNavigate.tsx';
import { NavLink } from 'react-router-dom';
import type MenuHeaderData from '../interface/MenuHeaderData.interface.ts';

function MenuHeader({
  link,
  title,
  data,
  classNames,
  onClick,
}: MenuHeaderData & {
  classNames?: {
    wrapper?: string;
    title?: string;
    data?: string;
    arrowNext?: string;
    wrapText?: string;
  };
  onClick: () => void;
}) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  return (
    <nav className={classNames?.wrapper}>
      <NavLink
        to={link}
        className={tw(
          classNames?.title,
          'flex items-center justify-between gap-1',
        )}
      >
        <Text title={t(`header.sections.${title}`)} />
        {data?.length && (
          <AssetsImg
            type={'icon'}
            size={8}
            className={'w-2 h-2 !object-contain'}
            name='menu.png'
          />
        )}
      </NavLink>
      {data?.length && (
        <div className={classNames?.data}>
          {data?.map(({ link, title, desc, icon }) => (
            <div
              key={title}
              className={tw(
                'h-full w-fit flex flex-col justify-center py-1 md:py-2 px-2 md:px-4',
              )}
              onClick={() => {
                navigate(t(`header.sections.${link}`));
                onClick();
              }}
            >
              <div className={tw('flex items-end', classNames?.wrapText)}>
                {icon && (
                  <AssetsImg
                    type={'icon'}
                    name={t(`header.sections.${icon}`)}
                    size={26}
                    alt={t(`header.sections.${title}`)}
                  />
                )}
                <div className={tw('flex items-center h-fit')}>
                  <NavLink
                    to={t(`header.sections.${link}`)}
                    className={
                      'w-fit leading-none text-md hover:!text-success-500'
                    }
                  >
                    <Text>{t(`header.sections.${title}`)}</Text>
                  </NavLink>
                  <AssetsImg
                    size={20}
                    type={'icon'}
                    className={classNames?.arrowNext}
                    name={'arrow-next.png'}
                  />
                </div>
              </div>
              <Text
                as={'p'}
                className={'!text-[12px] font-normal'}
                title={t(`header.sections.${desc}`)}
              />
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}

export default MenuHeader;
