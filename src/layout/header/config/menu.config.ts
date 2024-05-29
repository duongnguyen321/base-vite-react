import mainLanguage from '@translation/vi.json';
import type MenuHeaderData from '../interface/MenuHeaderData.interface.ts';

const sections = mainLanguage.header.sections;

const menu: MenuHeaderData[] = Object.keys(sections)?.map((sectionKey) => ({
  title: `${sectionKey}.title`,
  link: '#',
  // @ts-expect-error: Ignoring possible undefined because 'items' might not exist on all sections
  data: sections[sectionKey]?.items?.map?.((item, i) => ({
    title: `${sectionKey}.items.${i}.name`,
    link: `${sectionKey}.items.${i}.link`,
    desc: `${sectionKey}.items.${i}.description`,
    icon: `${sectionKey}.items.${i}.icon`
  }))
}));

export default menu;
