import { getDate } from '@helpers/date.ts';
import 'moment/locale/en';
import 'moment/locale/vi';
import Text from './Text';

export type Locale = 'vi' | 'en';

/**
 * A React component that displays a human-friendly representation of the time since the given date.
 */
export default function Date({
  date,
  locale = 'vi',
}: {
  date: string | number;
  locale: Locale;
}) {
  return <Text>{getDate(date, locale)}</Text>;
}
