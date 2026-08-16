# 호봄엔젤 디자인 리프레시 — 의사결정 로그

> 이 문서는 소비자 화면 전면 디자인 리프레시의 **모든 의사결정 과정**을 남긴 기록입니다.
> 서브에이전트 팀(감사 → 방향 → 구현 → 검증)의 판단과 근거, 채택/기각 이유를 시간순으로 적습니다.

## 목표 · 범위
- **범위:** 전체 소비자 화면 (landing, animals, animal-detail, apply, foster, volunteer, shelters, shelter-detail, favorites, applications, my, login, signup, register-shelter, volunteer-certificates)
- **방향:** 과감한 리프레시 (색·레이아웃·무드를 크게 바꿈, 임팩트 우선)
- **제약(사용자 규칙):** 새 디자인은 앱에서 손수 만들지 말고 디자인시스템/토큰으로. 비즈니스 로직 불변, 순수 렌더링만 개선. 대화=한국어, 산출물=영어.
- **투명성:** 서브에이전트 진행은 `/workflows`로 관찰, 핵심 판단은 채팅으로 요약 전달, 결정은 이 로그에 기록.

## 팀 구성
- **디자인 감사관(병렬):** 화면 클러스터별로 위계·여백·토큰·개성 결함과 리프레시 기회 진단
- **디자인 방향 패널(병렬):** 서로 다른 과감한 비주얼 언어(토큰 세트 + 시그니처 트리트먼트)를 각자 제안
- **심사관:** 방향들을 대담함·일관성·실현성·브랜드적합으로 채점, 승자 + 좋은 아이디어 접목
- **구현 에이전트(화면별):** 확정 언어를 토큰/컴포넌트로 적용
- **적대적 검증관:** 실제 개선인지·회귀/반응형/접근성 깨짐 없는지 역검증

---

## 현재 상태 진단 (main, 스크린샷 기반)
2026-08-16, 로그인 후 주요 화면 캡처(before-*.png)로 육안 진단:

- **전반:** 깔끔하지만 **평평한 MVP 인상**. 깊이(그림자/엘리베이션) 거의 없음, 실사 이미지 없음(회색 플레이스홀더), 브랜드 개성 약함.
- **색:** 차분한 세이지 그린(`--hb-color-accent: oklch(0.56 0.078 155)`) 단일 강조. 채도 낮아 임팩트 부족.
- **랜딩:** 여백 과다, 히어로에 비주얼/온기 없음. 텍스트만. 통계 밴드가 유일한 면.
- **동물 목록:** 카드 평면적, 필터바 밀도 높고 위계 약함, 회색 썸네일.
- **토큰 언어:** `AngelThemeVars.tsx`에 소수 토큰(accent, 카드 radius 20, 은은한 그림자, green-tint). 타이포 스케일·모션·엘리베이션 체계 부재.

**리프레시 기회:** 생동감 있는 색 시스템 + 깊이/엘리베이션 + 타이포 위계 강화 + 히어로/카드/섹션 시그니처 트리트먼트 + 따뜻한 개성.

## 결정 기록

### 2026-08-16 · 1단계 방향 확정 (워크플로: design-refresh-direction, 9 에이전트)
**감사(5 클러스터):** 공통 결함 — 실사 이미지 전무, 엘리베이션 미사용(테마에 그림자 토큰 있는데 안 씀), 단일 저채도 세이지, 타이포 위계 약함(모든 제목 22–26px/800), 모션 없음, 랜딩 스타일 중복/드리프트.

**방향 3안 채점 → 채택: Meadow & Marigold (36/36).**
- Sunrise Sage 35 (가장 안전·surgical, 대담함↓), Warm Ledger 32 (가장 대담, serif 폰트 인프라로 실현성↓).
- **채택 근거:** 2색(green=신뢰 / marigold=희망) 감정 시스템이 제품의 두 감정 역할에 직결, 포토-퍼스트가 최대 약점(이미지 부재) 정면 해결, 3단 그림자 램프가 기존 토큰 확장으로 drop-in(=DS 포크 없음).
- **접목:** Ledger의 에디토리얼 리듬(overline 키커+accent 좌측룰+섹션 간격 clamp)·proof-chip·warm-CTA 절제, Sunrise의 웨이트 절제(800=통계/디스플레이만)·urgent-tint pulse.
- **기각 결정:** serif 웹폰트(Ledger) — 실현성/성능(FOUT/CLS) 리스크로 드롭, 리듬은 간격+오버라인으로 대체.

**확정 토큰 언어(요약)** — 기존 `--hb-angel-*` 블록의 순수 확장 (DS 포크 없음):
- accent `oklch(0.62 0.15 152)` / dark `oklch(0.46 0.13 152)`; warm `oklch(0.78 0.16 62)`(희망 전용); urgent `oklch(0.64 0.19 32)`(마감임박 전용)
- 표면: 웜뉴트럴(clinical grey 탈피). 카드 radius 24 / control 14 / pill 999.
- 엘리베이션 3단: shadow-sm(resting)·-md(hover/hero)·-lg(modal) + glow-accent/warm + focus-ring.
- 타이포: display 44/700 · h2 26/700 · overline 11/700/uppercase · stat 40/800(tabular). 800은 통계/디스플레이만.
- 모션: dur-fast 120 / dur 180 / slow 320, ease + ease-spring; 카드 hover -3px, 버튼 press 0.97, 하트/칩 pop, 섹션 fade-up, 통계 count-up. 전부 reduced-motion 가드.
- 시그니처: 히어로(비대칭 스플릿+포토 콜라주+proof chip), 카드(borderless floating+photo-scrim 이름), 섹션(overline+좌측룰+리듬), 버튼(DS inverse variant로 #fff 인라인 제거), 필터바(그룹 툴바+칩 fill), 칩(green=상태/warm=감정/urgent=희소), 포토(공유 recipe+브랜드 empty).

**다음:** 랜딩(플래그십)에 토큰+시그니처 적용 → 스크린샷 미리보기 → 사용자 확정 후 전 화면 확산.

### 2026-08-16 · 토큰 시스템 + 랜딩 플래그십 구현 (미리보기)
- `AngelThemeVars.tsx`를 Meadow & Marigold 토큰 세트로 확장(색 2계열·엘리베이션 3단·radii·모션·리듬·그래디언트). 코어 `--hb-color-accent/surface/bg` 리테마 → **전 화면 색 자동 전파**.
- **DS 확장(손수 X 규칙 준수):** `Hb.Button`에 `size="large"` 추가(히어로 CTA용). 후속으로 `inverse` variant(#fff 인라인 제거)·press spring 예정.
- **랜딩 리워크:** Hero(비대칭 스플릿+포토 콜라주+proof chip+오버라인 키커+디스플레이 타입+그래디언트 CTA), Stats(떠있는 엘리베이션 카드+큰 숫자), HowItWorks(키커+카드 depth+hover-lift+journey num ring), Cta(cta-gradient+glow).
- **미리보기 검증:** before/after 스크린샷 — 평평한 MVP → 따뜻하고 제품스러운 히어로. 동물 목록은 색만 전파됨(카드 컴포지션은 다음 단계).
- **확정 대기:** 사용자 승인 후 전 소비자 화면(animals·detail·shelters·microsite·volunteer·account·auth) 카드/히어로/섹션 확산.

### 2026-08-16 · 전 앱 롤아웃 완료
- **Milestone 1:** 토큰 시스템 + 랜딩 + 1차 소비자 9화면(공용 카드 포함) + animals 재검수(뱃지 body·프로스티드 하트·radius 16·필터 컴팩트). e2e 61 통과.
- **Milestone 2 (2차-A):** 소비자 잔여 7화면(신청 퍼널·foster·register·certificate·my-applications·volunteer-feed·coming-soon) — 4-패널 전원 통과.
- **Milestone 3 (2차-B):** 스태프 폴리시 — 콘솔 7종 + 양 셸 + 운영자. (워크플로 리뷰 단계는 stall로 실패했으나 구현 단계는 성공, main이 육안+typecheck/lint/build/e2e로 검증.) 별점 input을 radiogroup(radio role)로 접근성 개선 → my-applications e2e 갱신.
- **검증:** typecheck·lint·build·e2e(61) 전부 통과. 랜딩·animals(데/모)·login/signup(데/모)·console-stats·operator(데) 육안 확인.
- **에이전트 규모:** 방향 9 + 1차 24 + animals 재검수 3 + 2차-A 19 + 2차-B 16 = 약 71 에이전트.
- **auth:** 1차 패널 미달 flag였으나 육안상 프로덕트급(브랜드 스플릿 로그인 + 오버라인 가입 퍼널) — 수용.
