import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { animalDetailPath } from "@/shared/config";
import { styles } from "./ApplyPlacement.styles";

interface ApplyHeaderProps {
  animalId: string;
  animalName: string;
  shelterName?: string;
  currentIndex: number;
  totalSteps: number;
}

/** Back link, title, and the step progress bar. */
export const ApplyHeader = ({
  animalId,
  animalName,
  shelterName,
  currentIndex,
  totalSteps,
}: ApplyHeaderProps) => {
  return (
    <>
      <div {...stylex.props(styles.header)}>
        <Link to={animalDetailPath(animalId)} {...stylex.props(styles.back)} aria-label="뒤로">
          ←
        </Link>
        <div {...stylex.props(styles.titleBlock)}>
          <span {...stylex.props(styles.kicker)}>입양 신청</span>
          <h1 {...stylex.props(styles.title)}>
            {animalName}
            {shelterName ? ` · ${shelterName}` : ""}
          </h1>
        </div>
      </div>

      <div {...stylex.props(styles.progressRow)}>
        <span {...stylex.props(styles.stepLabel)}>
          <span {...stylex.props(styles.stepNum)}>{currentIndex + 1}</span> / {totalSteps} 단계
        </span>
        <div {...stylex.props(styles.progressTrack)} aria-hidden="true">
          {Array.from({ length: totalSteps }, (_, index) => (
            <span
              key={index}
              {...stylex.props(styles.progressBar, index <= currentIndex && styles.progressBarOn)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
