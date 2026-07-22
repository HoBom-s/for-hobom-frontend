import * as stylex from "@stylexjs/stylex";
import { useConsoleStaff } from "../model/useConsoleStaff";
import { StaffRoster } from "./StaffRoster";
import { StaffPromoteForm } from "./StaffPromoteForm";
import { styles } from "./ConsoleStaff.styles";

/** §7.6 스태프 관리 — the roster on the left, a promotion request on the right.
 *  Scoped to the staff member's shelter. */
export const ConsoleStaff = ({ shelterId }: { shelterId: string }) => {
  const { members, requestPromotion, promoting } = useConsoleStaff(shelterId);

  return (
    <div {...stylex.props(styles.root)}>
      <h1 {...stylex.props(styles.title)}>스태프 관리</h1>
      <p {...stylex.props(styles.subtitle)}>스태프 목록을 확인하고 새 스태프를 승격 요청해요</p>

      <div {...stylex.props(styles.layout)}>
        <div {...stylex.props(styles.col)}>
          <StaffRoster members={members} />
        </div>
        <div {...stylex.props(styles.col)}>
          <StaffPromoteForm onPromote={requestPromotion} pending={promoting} />
        </div>
      </div>
    </div>
  );
};
