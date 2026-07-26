import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { animalDetailPath } from "@/shared/config";
import { styles } from "./ApplyPlacement.styles";

interface ApplyHeaderProps {
  animalId: string;
  animalName: string;
  currentIndex: number;
  totalSteps: number;
}

/** Back link, title, and the step progress bar. */
export const ApplyHeader = ({ animalId, animalName, currentIndex, totalSteps }: ApplyHeaderProps) => {
  const progress = Math.round(((currentIndex + 1) / totalSteps) * 100);

  return (
    <>
      <div {...stylex.props(styles.header)}>
        <Link to={animalDetailPath(animalId)} {...stylex.props(styles.back)} aria-label="뒤로">
          ←
        </Link>
        <h1 {...stylex.props(styles.title)}>{animalName} 입양 신청</h1>
      </div>

      <div {...stylex.props(styles.progressRow)}>
        <span {...stylex.props(styles.stepLabel)}>
          {currentIndex + 1} / {totalSteps} 단계
        </span>
        <div {...stylex.props(styles.progressTrack)}>
          <div {...stylex.props(styles.progressBar)} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </>
  );
};
