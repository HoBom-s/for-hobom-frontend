import { useDataLot, useMutation } from "hobom-data";
import {
  bookmarkPatch,
  likePatch,
  patchPost,
  volunteerPostMutations,
  volunteerPostQueries,
} from "@/entities/volunteer-post";
import { useToast } from "@/shared/model";
import type { VolunteerPost, VolunteerPostPage } from "@/entities/volunteer-post";
import type { InfiniteData } from "hobom-data";

type Feed = InfiniteData<VolunteerPostPage>;

/** Like / bookmark posts, patched optimistically into the feed cache so the
 *  count flips instantly; rolls back on error. No refetch — the feed is long
 *  and a reaction shouldn't reload it. */
export const usePostReactions = () => {
  const dataLot = useDataLot();
  const { openErrorToast } = useToast();
  const options = volunteerPostQueries.feed();

  const rollback = (previous: Feed | undefined) => {
    if (previous) dataLot.setQueryData(options.queryKey, previous);
    openErrorToast({ message: "잠시 후 다시 시도해 주세요." });
  };

  const optimistic = (post: VolunteerPost, patch: ReturnType<typeof likePatch>) => {
    void dataLot.cancelQueries(options);
    const previous = dataLot.getQueryData<Feed>(options.queryKey);

    dataLot.setQueryData<Feed>(options.queryKey, (old) =>
      old ? patchPost(old, post.id, patch) : old,
    );

    return { previous };
  };

  const like = useMutation({
    ...volunteerPostMutations.toggleLike(),
    onMutate: (post: VolunteerPost) => optimistic(post, likePatch(post)),
    onError: (_error, _post, context) => rollback(context?.previous),
  });

  const bookmark = useMutation({
    ...volunteerPostMutations.toggleBookmark(),
    onMutate: (post: VolunteerPost) => optimistic(post, bookmarkPatch(post)),
    onError: (_error, _post, context) => rollback(context?.previous),
  });

  return {
    toggleLike: (post: VolunteerPost) => like.mutate(post),
    toggleBookmark: (post: VolunteerPost) => bookmark.mutate(post),
  };
};
