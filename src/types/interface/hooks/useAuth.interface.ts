export interface UseAuthReturnType {
  isAuth: boolean;
  // eslint-disable-next-line no-unused-vars
  setAuth: (authState: boolean) => void;
  getNextPath: () => string;
}
