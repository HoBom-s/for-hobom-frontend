import * as stylex from "@stylexjs/stylex";
import { Hb } from "@/shared/ui";

const REACTION_OPTIONS = ["👍", "❤️", "🎉", "😊", "💪", "🔥"];

const styles = stylex.create({
  reaction: {
    fontSize: "1.25rem",
    transition: "transform 0.1s ease",
    ":hover": { transform: "scale(1.2)" },
  },
});

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSelect: (emoji: string) => void;
}

export const DailyTodoReactionPopover = ({ anchorEl, onClose, onSelect }: Props) => (
  <Hb.Popover
    open={Boolean(anchorEl)}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    transformOrigin={{ vertical: "top", horizontal: "center" }}
    style={{ padding: 4, borderRadius: 16 }}
  >
    <Hb.Stack direction="row" spacing={0.25}>
      {REACTION_OPTIONS.map((emoji) => (
        <Hb.Button.Icon
          key={emoji}
          size="small"
          onClick={() => onSelect(emoji)}
          {...stylex.props(styles.reaction)}
        >
          {emoji}
        </Hb.Button.Icon>
      ))}
    </Hb.Stack>
  </Hb.Popover>
);
