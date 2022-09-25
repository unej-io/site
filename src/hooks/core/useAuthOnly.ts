import { useEffect } from "react";

import { useRouter } from "next/router";

import useAuthStore from "~/stores/auth";

type UseAuthOnlyOptions = {
  redirect: string;
  replace?: boolean;
};

function useAuthOnly(options: UseAuthOnlyOptions) {
  const auth = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    if (!auth.user) {
      if (options.replace) {
        router.replace(options.redirect);
      } else {
        router.push(options.redirect);
      }
    }
  }, [JSON.stringify(auth.user), JSON.stringify(options)]);

  return [auth, router] as const;
}

export default useAuthOnly;
