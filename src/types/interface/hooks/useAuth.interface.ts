export interface UseAuthReturnType {
  isAuth: boolean;
  userId: string;
  token: string;
  // eslint-disable-next-line no-unused-vars
  setAuth: (saveData: UseAuthSaveData) => void;
  getNextPath: () => string;
  // eslint-disable-next-line no-unused-vars
  logout: (callback: () => void) => void;
}
export interface UseAuthSaveData {
  userId: string;
  token: string;
}
