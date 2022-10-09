import create from "zustand";
import createContext from "zustand/context";
import type { StoreApi } from "zustand";

import type { User } from "firebase/auth";

import { withDevtools } from "./@utilities";

const NAME = "unej-io:auth-store";

type AuthUser = User;

type AuthStoreState = {
  user: AuthUser | null;
  loading: boolean;
};

type AuthStoreAction = {
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
};

type AuthStoreType = AuthStoreState & AuthStoreAction;

const createAuthStore = () => () =>
  create<AuthStoreType>()(
    withDevtools(
      (set) =>
        ({
          user: null,
          loading: true,
          setUser: (user) => {
            set({ user });
          },
          setLoading: (loading) => {
            set({ loading });
          },
        } as AuthStoreType),
      {
        name: NAME,
      }
    )
  );

const { Provider: AuthStoreProvider, useStore: useAuthStore } = createContext<StoreApi<AuthStoreType>>();

export type { AuthUser, AuthStoreState, AuthStoreAction, AuthStoreType };
export { createAuthStore };
export { AuthStoreProvider };
export default useAuthStore;
