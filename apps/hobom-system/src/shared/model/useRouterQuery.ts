import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { applyParams, buildPath } from "@/shared/lib";

interface UpdateQueryOptions {
  replace?: boolean;
}

/**
 * URL 쿼리 파라미터를 읽고 업데이트하는 훅.
 *
 * `updateQuery`에서 값이 `undefined`인 키는 쿼리 파라미터에서 삭제된다.
 * `options.replace`가 `true`이면 히스토리를 push 대신 replace한다.
 */
export const useRouterQuery = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search);

  const updateQuery = useCallback(
    (newParams: Record<string, string | undefined>, options: UpdateQueryOptions = {}) => {
      const next = applyParams(new URLSearchParams(search), newParams);

      void navigate(buildPath(pathname, next), { replace: options.replace });
    },
    [search, pathname, navigate],
  );

  return { query, updateQuery };
};
