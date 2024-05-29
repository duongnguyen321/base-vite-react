interface Location {
  hash: string;
  pathname: string;
  search: string;
}

export default interface DefaultProps {
  location: Location;
  lang: string;
  searchParams: Record<string, string | undefined>;
  params: Record<string, string | undefined>;
  // eslint-disable-next-line no-unused-vars
  notFound: (error: string) => void;
}
