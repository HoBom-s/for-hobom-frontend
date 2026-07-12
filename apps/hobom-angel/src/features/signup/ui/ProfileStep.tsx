import { useState, type FormEvent } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { validateProfile, type ProfileErrors } from "../lib/validate-signup.lib";
import { styles } from "./SignupFunnel.styles";

interface ProfileStepProps {
  onNext: (nickname: string, password: string) => void;
}

export const ProfileStep = ({ onNext }: ProfileStepProps) => {
  const [nickname, setNickname] = useState("");
  const [realName, setRealName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ProfileErrors>({});

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next = validateProfile({ nickname, password });

    setErrors(next);

    if (Object.keys(next).length === 0) onNext(nickname.trim(), password);
  };

  return (
    <form {...stylex.props(styles.step)} onSubmit={submit} noValidate>
      <h2 {...stylex.props(styles.title)}>정보를 입력해주세요</h2>

      <div {...stylex.props(styles.fields)}>
        <div>
          <span {...stylex.props(styles.fieldLabel)}>닉네임 (공개)</span>
          <div {...stylex.props(styles.nickRow)}>
            <Hb.TextField
              aria-label="닉네임"
              placeholder="봄이네"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              error={Boolean(errors.nickname)}
              helperText={errors.nickname}
              fullWidth
            />
            <Hb.Button variant="secondary" type="button">
              중복확인
            </Hb.Button>
          </div>
        </div>

        <div>
          <span {...stylex.props(styles.fieldLabel)}>실명 · 휴대폰 (선택)</span>
          <div {...stylex.props(styles.fields)}>
            <Hb.TextField
              aria-label="실명"
              placeholder="김민수"
              value={realName}
              onChange={(event) => setRealName(event.target.value)}
              fullWidth
            />
            <Hb.TextField
              aria-label="휴대폰"
              type="tel"
              placeholder="010-0000-0000"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              fullWidth
            />
          </div>
        </div>

        <Hb.TextField
          label="비밀번호"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={Boolean(errors.password)}
          helperText={errors.password}
          fullWidth
        />
      </div>

      <Hb.Button type="submit" variant="primary" fullWidth {...stylex.props(styles.submit)}>
        가입 완료
      </Hb.Button>
    </form>
  );
};
