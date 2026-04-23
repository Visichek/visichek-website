import type { Block, TextContent } from "@/app/types/blocknoteblog";

/**
 * Rough reading-time estimate from BlockNote content.
 * Counts words across text nodes and returns a minutes value (>= 1).
 */
export function estimateReadingTime(
  blocks: Block[] | undefined | null,
  wordsPerMinute = 220
): number {
  if (!blocks || blocks.length === 0) return 1;

  let wordCount = 0;
  const walk = (list: Block[]) => {
    for (const block of list) {
      if (Array.isArray(block.content)) {
        for (const node of block.content as TextContent[]) {
          if (node?.type === "text" && typeof node.text === "string") {
            const trimmed = node.text.trim();
            if (trimmed.length > 0) {
              wordCount += trimmed.split(/\s+/).length;
            }
          }
        }
      }
      if (Array.isArray(block.children) && block.children.length > 0) {
        walk(block.children);
      }
    }
  };

  walk(blocks);
  const minutes = Math.max(1, Math.round(wordCount / wordsPerMinute));
  return minutes;
}
