import { useSuspenseQuery } from "hobom-data";
import { EmptyState, Hb } from "hobom-design-system";
import { NotificationsNoneOutlined } from "hobom-design-system/icons";
import { shelterQueries } from "@/entities/shelter";

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });

/** 공지·소식 tab — the shelter's notices (pinned first), each as a SectionCard. */
export const NoticesTab = ({ shelterId }: { shelterId: string }) => {
  const { data } = useSuspenseQuery(shelterQueries.announcements(shelterId));

  if (data.length === 0) {
    return (
      <EmptyState
        icon={
          <NotificationsNoneOutlined
            style={{ fontSize: 40, color: "var(--hb-color-text-disabled)" }}
          />
        }
        message="아직 등록된 소식이 없어요."
      />
    );
  }

  return (
    <Hb.Stack spacing={2}>
      {data.map((post) => (
        <Hb.SectionCard
          key={post.id}
          title={post.title}
          action={
            post.pinned ? (
              <Hb.Chip label="고정" size="small" variant="soft" color="primary" />
            ) : undefined
          }
        >
          <Hb.Text variant="body2" color="text.secondary" style={{ whiteSpace: "pre-line" }}>
            {post.body}
          </Hb.Text>
          {post.createdAt && (
            <Hb.Text variant="caption" color="text.secondary">
              {formatDate(post.createdAt)}
            </Hb.Text>
          )}
        </Hb.SectionCard>
      ))}
    </Hb.Stack>
  );
};
