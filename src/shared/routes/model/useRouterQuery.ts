import { useLocation } from "react-router-dom";

export const useRouterQuery = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  return {
    query,
  };
};
