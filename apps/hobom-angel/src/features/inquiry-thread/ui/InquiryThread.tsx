import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { SENDER_LABEL } from "@/entities/conversation";
import { ROUTES } from "@/shared/config";
import { useInquiryThread } from "../model/useInquiryThread";
import { formatMessageTime } from "../lib/format-message-time.lib";
import { styles } from "./InquiryThread.styles";

/** 보호소 문의 스레드 — the message conversation for one inquiry. The viewer is
 *  the applicant, so their messages sit on the right; the shelter's on the left. */
export const InquiryThread = ({ inquiryId }: { inquiryId: string }) => {
  const { messages, draft, setDraft, send, sending } = useInquiryThread(inquiryId);

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <Link to={ROUTES.INQUIRIES} {...stylex.props(styles.back)} aria-label="문의 목록으로">
          ←
        </Link>
        <div {...stylex.props(styles.titleBlock)}>
          <span {...stylex.props(styles.kicker)}>
            <span {...stylex.props(styles.kickerDot)} aria-hidden />
            보호소 문의
          </span>
          <h1 {...stylex.props(styles.title)}>문의 대화</h1>
        </div>
      </header>

      <div {...stylex.props(styles.thread)}>
        {messages.length === 0 ? (
          <p {...stylex.props(styles.empty)}>아직 주고받은 메시지가 없어요.</p>
        ) : (
          messages.map((message) => {
            const mine = message.senderRole === "APPLICANT";

            return (
              <div
                key={message.id}
                {...stylex.props(styles.row, mine ? styles.rowMine : styles.rowTheirs)}
              >
                <div {...stylex.props(styles.bubble, mine ? styles.bubbleMine : styles.bubbleTheirs)}>
                  {!mine && (
                    <span {...stylex.props(styles.sender)}>{SENDER_LABEL[message.senderRole]}</span>
                  )}
                  <p {...stylex.props(styles.body)}>{message.body}</p>
                </div>
                <span {...stylex.props(styles.time)}>{formatMessageTime(message.sentAt)}</span>
              </div>
            );
          })
        )}
      </div>

      <form
        {...stylex.props(styles.composer)}
        onSubmit={(event) => {
          event.preventDefault();
          send();
        }}
      >
        <Hb.TextField
          placeholder="메시지를 입력하세요"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          multiline
          minRows={1}
          maxRows={4}
          fullWidth
        />
        <Hb.Button type="submit" variant="primary" disabled={!draft.trim()} loading={sending}>
          보내기
        </Hb.Button>
      </form>
    </div>
  );
};
