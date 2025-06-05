import { useLocation, useNavigate } from "react-router-dom";
import { Bom } from "@/packages/bom";

type UpdateQueryOptions = {
  replace?: boolean;
};

export const useRouterQuery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  return {
    query,
    updateQuery: (
      newParams: Record<string, string | undefined>,
      options: UpdateQueryOptions = {},
    ) => {
      const currentParams = new URLSearchParams(location.search);

      Bom.pipe(
        newParams,
        Object.entries,
        Bom.forEach(([key, value]) => {
          if (value === undefined) {
            currentParams.delete(key);
          } else {
            currentParams.set(key, value);
          }
        }),
      );

      const newUrl = `${location.pathname}?${currentParams.toString()}`;

      if (options.replace) {
        navigate(newUrl, { replace: true });
      } else {
        navigate(newUrl);
      }
    },
  };
};
