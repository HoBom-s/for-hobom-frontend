import { ROUTES } from "./routes";

interface RouteMeta {
  title: string;
  description?: string;
  /** Keep auth-gated / transient routes out of the search index. */
  noindex?: boolean;
}

const SITE_NAME = "HoBom Angel";
const LANDING_DESCRIPTION =
  "임시보호와 입양으로 한 생명에게 새로운 봄을. 전국 보호소의 강아지·고양이를 만나고, 봉사에 참여하세요.";

/** Per-route document metadata; unknown paths fall back to DEFAULT_META. */
export const ROUTE_META: Record<string, RouteMeta> = {
  [ROUTES.HOME]: { title: SITE_NAME, description: LANDING_DESCRIPTION },
  [ROUTES.LOGIN]: { title: `로그인 · ${SITE_NAME}`, noindex: true },
  [ROUTES.SIGNUP]: { title: `회원가입 · ${SITE_NAME}`, noindex: true },
  [ROUTES.PASSWORD_RESET]: { title: `비밀번호 찾기 · ${SITE_NAME}`, noindex: true },
};

/** 404 and other unmapped routes: titled but kept out of the index. */
export const DEFAULT_META: RouteMeta = { title: SITE_NAME, noindex: true };
