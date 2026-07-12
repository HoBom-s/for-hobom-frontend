import { useState, type ChangeEvent, type FormEvent } from "react";
import { validateLogin, type LoginErrors } from "../lib/validate-login.lib";

/** Login form state + submit validation. UI stays a pure render of this. */
export const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateLogin({ email, password });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      // TODO: POST /auth/login (§5-2) once the Angel backend is wired.
    }
  };

  return {
    email,
    password,
    rememberMe,
    showPassword,
    errors,
    onEmailChange: (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value),
    onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value),
    toggleRememberMe: () => setRememberMe((value) => !value),
    toggleShowPassword: () => setShowPassword((value) => !value),
    submit,
  };
};
