import { Link } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { useLoginForm } from "../model/useLoginForm";
import { styles } from "./LoginPage.styles";

export const LoginPage = () => {
  const form = useLoginForm();

  return (
    <div {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.card)}>
        <aside {...stylex.props(styles.brand)}>
          <span {...stylex.props(styles.blob)} aria-hidden="true" />
          <span {...stylex.props(styles.brandLogo)}>
            <span {...stylex.props(styles.brandLogoIcon)} aria-hidden="true">
              🐾
            </span>
            호봄엔젤
          </span>
          <div>
            <h1 {...stylex.props(styles.brandTitle)}>
              작은 생명에게
              <br />
              다시 봄이 오도록.
            </h1>
            <p {...stylex.props(styles.brandLead)}>
              입양·임시보호·봉사로 유기동물의 새로운 시작을 함께 만들어요.
            </p>
          </div>
          <span {...stylex.props(styles.brandStat)}>누적 입양 1,840+ · 함께하는 보호소 96곳</span>
        </aside>

        <form {...stylex.props(styles.form)} onSubmit={form.submit} noValidate>
          <h2 {...stylex.props(styles.title)}>다시 오셨네요</h2>
          <p {...stylex.props(styles.subtitle)}>이메일로 로그인해주세요.</p>

          <div {...stylex.props(styles.fields)}>
            <Hb.TextField
              label="이메일"
              type="email"
              placeholder="hobom@example.com"
              value={form.email}
              onChange={form.onEmailChange}
              error={Boolean(form.errors.email)}
              helperText={form.errors.email}
              fullWidth
            />

            <div>
              <div {...stylex.props(styles.pwLabelRow)}>
                <span {...stylex.props(styles.labelText)}>비밀번호</span>
                <Link to="/reset" {...stylex.props(styles.link)}>
                  비밀번호 찾기
                </Link>
              </div>
              <Hb.TextField
                aria-label="비밀번호"
                type={form.showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={form.onPasswordChange}
                error={Boolean(form.errors.password)}
                helperText={form.errors.password}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <button
                      type="button"
                      {...stylex.props(styles.toggle)}
                      onClick={form.toggleShowPassword}
                    >
                      {form.showPassword ? "숨기기" : "보기"}
                    </button>
                  ),
                }}
              />
            </div>
          </div>

          <label {...stylex.props(styles.remember)}>
            <Hb.Checkbox checked={form.rememberMe} onChange={form.toggleRememberMe} />
            로그인 상태 유지
          </label>

          <Hb.Button type="submit" variant="primary" fullWidth {...stylex.props(styles.submit)}>
            로그인
          </Hb.Button>

          <div {...stylex.props(styles.divider)}>
            <span {...stylex.props(styles.dividerLine)} />
            또는
            <span {...stylex.props(styles.dividerLine)} />
          </div>

          <p {...stylex.props(styles.signup)}>
            아직 회원이 아니신가요?{" "}
            <Link to="/signup" {...stylex.props(styles.signupLink)}>
              이메일로 가입하기
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
