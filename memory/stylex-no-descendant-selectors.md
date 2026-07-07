---
name: stylex-no-descendant-selectors
description: StyleX는 descendant/child selector(& h1, & .child) 불가 — pseudo/media만. de-MUI 시 주입 HTML·자식 hover-reveal은 scoped <style>로.
metadata:
  type: reference
---

**StyleX는 atomic이라 descendant/child combinator selector를 지원하지 않는다.** `stylex.create`에서 허용되는 조건부 키는 **pseudo-class(`:hover`, `:focus-within`), pseudo-element(`::before`), media/container query**뿐. `"& h1"`, `"& .move-btn"`, `"& > * + *"` 같은 키는 빌드 시 `@stylexjs/babel-plugin: Invalid pseudo or at-rule`로 **터진다**(tsc는 통과, vite build에서 실패).

**de-MUI 이관 시 sx가 이런 걸 쓰는 두 경우**:
1. **주입 HTML의 prose 스타일** — `dangerouslySetInnerHTML`로 넣은 위키/tiptap 콘텐츠의 `& h1`, `& p`, `& .tiptap` 등.
2. **자식 hover-reveal** — `&:hover .move-btn { opacity: 1 }`(행 hover 시 액션 버튼 노출).

**해결: scoped `<style>` 태그 + 고유 class** (`ColorSchemeVars`가 `<style dangerouslySetInnerHTML>`로 css-vars 주입하는 선례와 동일).
```tsx
const CLS = "wiki-prose-view";
const CSS = `.${CLS} h1 { font-size: 1.75rem; margin-top: 24px; } ...`;
return (<><style href={CLS} precedence="default">{CSS}</style><Hb.Box className={CLS} .../></>);
```
- **리스트에서 여러 번 렌더되는 행**(IssueRow 등)은 `<style href precedence>`(React 19)로 → head-hoist + 자동 dedup(중복 `<style>` 방지). 단일 인스턴스 prose는 어느 쪽이든 무방.
- CSS 문자열은 `var(--hb-color-*)`를 그대로 참조(런타임 주입된 전역 vars와 결합).

⚠️ **주의**: StyleX 동적 색/surface도 여전히 인라인 style로([[design-system-overhaul]] Chip 교훈). 즉 atomic StyleX는 (a)정적 pseudo만, 동적 색·descendant는 각각 인라인·scoped `<style>`. Box 이관(#133)에서 이 셋 다 등장. Stack/Grid/List 이관 때도 동일 대비.
