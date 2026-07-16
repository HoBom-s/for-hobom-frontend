import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { ROUTES } from "@/shared/config";
import { styles } from "./GlobalNav.styles";

/** Global search: submitting routes to the animal list filtered by keyword. */
export const NavSearch = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();

    const query = value.trim();

    void navigate(query ? `${ROUTES.ANIMALS}?q=${encodeURIComponent(query)}` : ROUTES.ANIMALS);
  };

  return (
    <form {...stylex.props(styles.searchForm)} role="search" onSubmit={submit}>
      <input
        {...stylex.props(styles.search)}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="이름·품종·지역 검색"
        aria-label="검색"
      />
    </form>
  );
};
