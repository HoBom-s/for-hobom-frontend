import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { isShelterAdmin } from "@/entities/shelter";
import type { ShelterStaffMember } from "@/entities/shelter";
import { primaryRoleLabel } from "../lib/staff.lib";
import { styles } from "./ConsoleStaff.styles";

const MemberRow = ({ member }: { member: ShelterStaffMember }) => {
  const admin = isShelterAdmin(member.roles);

  return (
    <div {...stylex.props(styles.member)}>
      <span {...stylex.props(styles.avatar)} aria-hidden>
        {member.nickname.charAt(0)}
      </span>
      <span {...stylex.props(styles.memberMain)}>
        <span {...stylex.props(styles.nameRow)}>
          <span {...stylex.props(styles.nickname)}>{member.nickname}</span>
          {member.status === "SUSPENDED" && (
            <Hb.Chip label="정지" size="small" variant="soft" color="error" />
          )}
        </span>
        <span {...stylex.props(styles.role, admin && styles.roleAdmin)}>
          {primaryRoleLabel(member)}
        </span>
      </span>
    </div>
  );
};

/** The shelter's staff roster — representative first, then staff. */
export const StaffRoster = ({ members }: { members: ShelterStaffMember[] }) => (
  <div>
    <h2 {...stylex.props(styles.count)}>
      스태프 <span {...stylex.props(styles.countNum)}>{members.length}명</span>
    </h2>
    <div {...stylex.props(styles.list)}>
      {members.map((member) => (
        <MemberRow key={member.id} member={member} />
      ))}
    </div>
  </div>
);
