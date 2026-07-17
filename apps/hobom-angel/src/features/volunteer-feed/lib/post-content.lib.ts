import type { PostBlock } from "@/entities/volunteer-post";

/** Image object keys from a post's content blocks, in order. */
export const postImageKeys = (content: PostBlock[]): string[] =>
  content.flatMap((block) =>
    block.type === "IMAGE" && block.imageKey ? [block.imageKey] : [],
  );

/** The post's text, joining its text blocks. */
export const postText = (content: PostBlock[]): string =>
  content
    .flatMap((block) => (block.type === "TEXT" && block.text ? [block.text] : []))
    .join("\n\n");
