import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "hobom-data";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { volunteerEventQueries } from "@/entities/volunteer-event";
import { UploadPurpose } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { useImageUpload } from "@/shared/model";
import type { PostBlockInput } from "@/entities/volunteer-post";
import { useCreatePost } from "../model/useCreatePost";
import { styles } from "./WriteReview.styles";

/** Full-page review composer. A review is shelter-scoped, so it's tied to one of
 *  the viewer's signed-up events (whose shelter it inherits); text and uploaded
 *  images become ordered content blocks. */
export const WriteReview = () => {
  const navigate = useNavigate();
  const { data: signups } = useQuery(volunteerEventQueries.mySignups());
  const events = signups ?? [];

  const [eventId, setEventId] = useState("");
  const [body, setBody] = useState("");
  const upload = useImageUpload(UploadPurpose.SHELTER);

  const backToFeed = () => void navigate(`${ROUTES.VOLUNTEER}?tab=reviews`);
  const mutation = useCreatePost(backToFeed);
  const trimmed = body.trim();
  const selected = events.find((event) => event.id === eventId);
  const canSubmit = Boolean(selected) && trimmed.length > 0 && !upload.uploading;

  const submit = () => {
    if (!selected || !trimmed) return;

    const content: PostBlockInput[] = [
      { type: "TEXT", text: trimmed },
      ...upload.images.map((image) => ({ type: "IMAGE" as const, imageKey: image.objectKey })),
    ];

    mutation.mutate({ shelterId: selected.shelterId, eventId: selected.id, content });
  };

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <span {...stylex.props(styles.kicker)}>당신의 이야기</span>
        <div {...stylex.props(styles.titleRow)}>
          <span {...stylex.props(styles.rule)} aria-hidden />
          <h1 {...stylex.props(styles.title)}>봉사 후기 작성</h1>
        </div>
      </header>

      <div {...stylex.props(styles.field)}>
        <span {...stylex.props(styles.label)}>어떤 봉사에 대한 후기인가요?</span>
        {events.length === 0 ? (
          <span {...stylex.props(styles.hint)}>
            참여한 봉사가 있어야 후기를 쓸 수 있어요. 먼저 봉사에 신청해 보세요.
          </span>
        ) : (
          <div {...stylex.props(styles.options)}>
            {events.map((event) => (
              <button
                key={event.id}
                type="button"
                title={event.title}
                onClick={() => setEventId(event.id)}
                {...stylex.props(styles.chip, eventId === event.id && styles.chipOn)}
              >
                {event.title}
              </button>
            ))}
          </div>
        )}
      </div>

      <Hb.TextField
        label="후기 내용"
        placeholder="봉사 경험을 자유롭게 들려주세요."
        value={body}
        onChange={(event) => setBody(event.target.value)}
        multiline
        minRows={6}
        fullWidth
      />

      <div {...stylex.props(styles.field)}>
        <span {...stylex.props(styles.label)}>사진</span>
        <div {...stylex.props(styles.attachRow)}>
          {upload.images.map((image) => (
            <div key={image.objectKey} {...stylex.props(styles.thumb)}>
              <img src={image.publicUrl} alt="" {...stylex.props(styles.thumbImg)} />
              <button
                type="button"
                aria-label="사진 삭제"
                {...stylex.props(styles.thumbRemove)}
                onClick={() => upload.remove(image.objectKey)}
              >
                ×
              </button>
            </div>
          ))}
          <label {...stylex.props(styles.attachBtn)}>
            {upload.uploading ? "업로드 중…" : "사진 첨부"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              {...stylex.props(styles.hiddenInput)}
              onChange={(event) => {
                const input = event.currentTarget;

                void upload.add(input.files);
                input.value = "";
              }}
            />
          </label>
        </div>
      </div>

      <div {...stylex.props(styles.actions)}>
        <Hb.Button variant="ghost" onClick={backToFeed}>
          취소
        </Hb.Button>
        <Hb.Button
          variant="primary"
          onClick={submit}
          disabled={!canSubmit}
          loading={mutation.isPending}
        >
          등록
        </Hb.Button>
      </div>
    </div>
  );
};
