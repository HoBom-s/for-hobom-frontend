import { useLocation, useNavigate } from "react-router-dom";
import { Bom } from "@/packages/bom";

type UpdateQueryOptions = {
  replace?: boolean;
};

/**
 * URL 쿼리 파라미터를 읽고 업데이트하는 훅.
 *
 * `updateQuery`에서 값이 `undefined`인 키는 쿼리 파라미터에서 삭제된다.
 * `options.replace`가 `true`이면 히스토리를 push 대신 replace한다.
 */
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
