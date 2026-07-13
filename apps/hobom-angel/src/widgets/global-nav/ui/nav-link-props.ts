import * as stylex from "@stylexjs/stylex";

/** NavLink className+style split so a StyleX active style lands on the anchor. */
export const activeLinkProps = (base: stylex.StyleXStyles, active: stylex.StyleXStyles) => ({
  className: ({ isActive }: { isActive: boolean }) =>
    stylex.props(base, isActive && active).className,
  style: ({ isActive }: { isActive: boolean }) => stylex.props(base, isActive && active).style,
});
