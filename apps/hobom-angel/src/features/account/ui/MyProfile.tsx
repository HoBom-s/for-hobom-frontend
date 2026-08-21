import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { ConfirmDialog, Hb } from "hobom-design-system";
import { ChevronRight } from "hobom-design-system/icons";
import { isOperator, VERIFIED_CHANNEL_LABEL } from "@/entities/user";
import { ROUTES } from "@/shared/config";
import { useOverlay } from "@/shared/model";
import { useMyProfile } from "../model/useMyProfile";
import { useWithdrawAccount } from "../model/useWithdrawAccount";
import { NicknameDialog } from "./NicknameDialog";
import { styles } from "./MyProfile.styles";

interface MyProfileProps {
  /** Session logout, injected by the page (session is a sibling feature). */
  onLogout: () => void;
}

/** 마이페이지: profile summary with a nickname edit, plus logout and withdrawal. */
export const MyProfile = ({ onLogout }: MyProfileProps) => {
  const user = useMyProfile();
  const overlay = useOverlay();
  const withdraw = useWithdrawAccount();

  const editNickname = () =>
    overlay.open(({ close }) => <NicknameDialog current={user.nickname} onClose={close} />);

  const confirmWithdraw = () =>
    overlay.open(({ close }) => (
      <ConfirmDialog
        open
        onClose={close}
        title="정말 탈퇴하시겠어요?"
        description="계정과 활동 내역이 삭제되며 되돌릴 수 없어요."
        confirmLabel="탈퇴하기"
        confirmColor="error"
        isPending={withdraw.isPending}
        onConfirm={() => withdraw.mutate()}
      />
    ));

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <span {...stylex.props(styles.kicker)}>MY PAGE</span>
        <h1 {...stylex.props(styles.title)}>마이페이지</h1>
      </header>

      <div {...stylex.props(styles.profileCard)}>
        <Hb.Avatar
          style={{
            width: 64,
            height: 64,
            fontSize: "1.5rem",
            backgroundColor: "rgba(242,247,242,0.18)",
            color: "var(--hb-color-accent-contrast)",
          }}
        >
          {user.nickname.charAt(0)}
        </Hb.Avatar>
        <div {...stylex.props(styles.identity)}>
          <div {...stylex.props(styles.nameRow)}>
            <h2 {...stylex.props(styles.nickname)}>{user.nickname}</h2>
            <Hb.Chip
              label={`${VERIFIED_CHANNEL_LABEL[user.verifiedChannel]} 완료`}
              size="small"
              variant="soft"
              color="success"
              style={{ backgroundColor: "rgba(242,247,242,0.18)", color: "#F2F7F2" }}
            />
          </div>
          <p {...stylex.props(styles.email)}>{user.email}</p>
        </div>
        <Hb.Button
          variant="ghost"
          style={{ backgroundColor: "rgba(242,247,242,0.16)", color: "#F2F7F2" }}
          onClick={editNickname}
        >
          닉네임 변경
        </Hb.Button>
      </div>

      <section {...stylex.props(styles.section)}>
        <div {...stylex.props(styles.sectionHead)}>
          <span {...stylex.props(styles.accentRule)} aria-hidden="true" />
          <h3 {...stylex.props(styles.sectionTitle)}>내 활동</h3>
        </div>
        <div {...stylex.props(styles.actions)}>
          <Link to={ROUTES.APPLICATIONS} {...stylex.props(styles.actionRow)}>
            내 신청 내역
            <ChevronRight fontSize="small" {...stylex.props(styles.chevron)} />
          </Link>
          <Link to={ROUTES.FAVORITES} {...stylex.props(styles.actionRow)}>
            찜한 동물·팔로우
            <ChevronRight fontSize="small" {...stylex.props(styles.chevron)} />
          </Link>
          <Link to={ROUTES.VOLUNTEER_CERTIFICATES} {...stylex.props(styles.actionRow)}>
            봉사 확인서
            <ChevronRight fontSize="small" {...stylex.props(styles.chevron)} />
          </Link>
          <Link to={ROUTES.SHELTER_REGISTER} {...stylex.props(styles.actionRow)}>
            보호소 등록 신청
            <ChevronRight fontSize="small" {...stylex.props(styles.chevron)} />
          </Link>
          {isOperator(user) && (
            <Link to={ROUTES.OPERATOR_APPROVALS} {...stylex.props(styles.actionRow)}>
              운영자 콘솔
              <ChevronRight fontSize="small" {...stylex.props(styles.chevron)} />
            </Link>
          )}
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <div {...stylex.props(styles.sectionHead)}>
          <span {...stylex.props(styles.accentRule)} aria-hidden="true" />
          <h3 {...stylex.props(styles.sectionTitle)}>계정 관리</h3>
        </div>
        <div {...stylex.props(styles.actions)}>
          <button type="button" {...stylex.props(styles.actionRow)} onClick={onLogout}>
            로그아웃
          </button>
          <button
            type="button"
            {...stylex.props(styles.actionRow, styles.danger)}
            onClick={confirmWithdraw}
          >
            회원 탈퇴
          </button>
        </div>
      </section>
    </div>
  );
};
