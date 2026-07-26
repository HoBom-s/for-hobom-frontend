import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import type { CreateVolunteerEventInput } from "@/entities/volunteer-event";
import { toEventRange } from "../lib/event-format.lib";
import { styles } from "./EventForm.styles";

interface EventFormProps {
  onCreate: (input: CreateVolunteerEventInput) => void;
  submitting: boolean;
}

/** The 봉사 일정 만들기 form — GENERAL events for now (제목·정원·날짜·시간).
 *  해외 이동봉사(출발/도착·항공편·동반 동물) follows in a later PR. */
export const EventForm = ({ onCreate, submitting }: EventFormProps) => {
  const [title, setTitle] = useState("");
  const [capacity, setCapacity] = useState("12");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("13:00");

  const spots = Number(capacity);
  const canSubmit =
    title.trim().length > 0 && spots >= 1 && date !== "" && startTime < endTime && !submitting;

  const submit = () => {
    if (!canSubmit) return;

    const range = toEventRange(date, startTime, endTime);

    onCreate({ title: title.trim(), capacity: spots, ...range });
    setTitle("");
  };

  return (
    <section {...stylex.props(styles.card)}>
      <h2 {...stylex.props(styles.heading)}>봉사 일정 만들기</h2>

      <label {...stylex.props(styles.field)}>
        <span {...stylex.props(styles.label)}>제목</span>
        <input
          {...stylex.props(styles.input)}
          value={title}
          placeholder="유기견 산책 봉사"
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>

      <div {...stylex.props(styles.row)}>
        <label {...stylex.props(styles.field, styles.rowItem)}>
          <span {...stylex.props(styles.label)}>정원</span>
          <input
            {...stylex.props(styles.input)}
            type="number"
            min={1}
            value={capacity}
            onChange={(event) => setCapacity(event.target.value)}
          />
        </label>
        <label {...stylex.props(styles.field, styles.rowItem)}>
          <span {...stylex.props(styles.label)}>날짜</span>
          <input
            {...stylex.props(styles.input)}
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
      </div>

      <div {...stylex.props(styles.row)}>
        <label {...stylex.props(styles.field, styles.rowItem)}>
          <span {...stylex.props(styles.label)}>시작 시간</span>
          <input
            {...stylex.props(styles.input)}
            type="time"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
          />
        </label>
        <label {...stylex.props(styles.field, styles.rowItem)}>
          <span {...stylex.props(styles.label)}>종료 시간</span>
          <input
            {...stylex.props(styles.input)}
            type="time"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
          />
        </label>
      </div>

      <Hb.Button variant="primary" fullWidth disabled={!canSubmit} loading={submitting} onClick={submit}>
        일정 게시
      </Hb.Button>
    </section>
  );
};
