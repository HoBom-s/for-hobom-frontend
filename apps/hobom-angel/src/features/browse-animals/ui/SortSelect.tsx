import { useRef, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { KeyboardArrowDownOutlined } from "hobom-design-system/icons";
import { SORT_LABEL } from "@/entities/animal";
import type { AnimalSort } from "@/entities/animal";
import { styles } from "./AnimalFilters.styles";

const SORTS: AnimalSort[] = ["LATEST", "OLDEST"];

interface SortSelectProps {
  value: AnimalSort;
  onChange: (sort: AnimalSort) => void;
}

/** Sort control built on the design system's Menu (styled options, unlike a
 *  native <select> whose option list can't be themed). */
export const SortSelect = ({ value, onChange }: SortSelectProps) => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        {...stylex.props(styles.sortTrigger)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="정렬"
        onClick={() => setOpen((prev) => !prev)}
      >
        {SORT_LABEL[value]}
        <KeyboardArrowDownOutlined
          {...stylex.props(styles.sortCaret)}
          fontSize="small"
          aria-hidden="true"
        />
      </button>

      <Hb.Menu.Root open={open} anchorEl={anchorRef.current} onClose={() => setOpen(false)}>
        {SORTS.map((sort) => (
          <Hb.Menu.Item key={sort} selected={sort === value} onClick={() => onChange(sort)}>
            {SORT_LABEL[sort]}
          </Hb.Menu.Item>
        ))}
      </Hb.Menu.Root>
    </>
  );
};
