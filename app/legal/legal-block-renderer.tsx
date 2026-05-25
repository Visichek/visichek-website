/* eslint-disable @next/next/no-img-element */
import { Fragment, type ReactNode } from "react";
import type {
  LegalBlock,
  LegalInlineContent,
  LegalInlineLink,
  LegalInlineText,
} from "../util/legal";

interface LegalBlockRendererProps {
  blocks: LegalBlock[];
}

export default function LegalBlockRenderer({
  blocks,
}: LegalBlockRendererProps) {
  return (
    <div className="space-y-5 text-[15.5px] leading-[1.85] text-[#4a4a4a]">
      {renderBlocks(blocks)}
    </div>
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function blockKey(block: LegalBlock, index: number): string {
  return block.id ?? `${block.type}-${index}`;
}

function renderBlocks(blocks: LegalBlock[] = []): ReactNode[] {
  const rendered: ReactNode[] = [];
  let index = 0;

  while (index < blocks.length) {
    const block = blocks[index];
    const key = blockKey(block, index);

    if (block.type === "bulletListItem" || block.type === "numberedListItem") {
      const listType = block.type;
      const listBlocks: LegalBlock[] = [];

      while (blocks[index]?.type === listType) {
        listBlocks.push(blocks[index]);
        index += 1;
      }

      const ListTag = listType === "bulletListItem" ? "ul" : "ol";
      rendered.push(
        <ListTag
          key={key}
          className={
            listType === "bulletListItem"
              ? "my-5 list-disc space-y-2.5 pl-6 marker:text-[#3A9615]"
              : "my-5 list-decimal space-y-2.5 pl-6 marker:text-[#3A9615]"
          }
        >
          {listBlocks.map((item, itemIndex) => (
            <li key={blockKey(item, itemIndex)} className="pl-1">
              {renderInlineContent(item.content)}
              {Array.isArray(item.children) && item.children.length > 0 && (
                <div className="mt-3">{renderBlocks(item.children)}</div>
              )}
            </li>
          ))}
        </ListTag>,
      );
      continue;
    }

    rendered.push(renderBlock(block, key));
    index += 1;
  }

  return rendered;
}

function renderBlock(block: LegalBlock, key: string): ReactNode {
  switch (block.type) {
    case "heading":
      return renderHeading(block, key);
    case "paragraph":
      return (
        <p key={key} className="my-4">
          {renderInlineContent(block.content)}
          {renderChildBlocks(block)}
        </p>
      );
    case "quote":
      return (
        <blockquote
          key={key}
          className="my-6 border-l-4 border-[#3A9615] bg-[#f8fbf8] py-3 pl-5 pr-4 text-[#2a2a2a]"
        >
          {renderInlineContent(block.content)}
          {renderChildBlocks(block)}
        </blockquote>
      );
    case "codeBlock":
      return (
        <pre
          key={key}
          className="my-6 overflow-x-auto rounded-xl border border-[#e8e8e8] bg-[#1a1a1a] p-4 text-[13px] leading-relaxed text-white"
        >
          <code>{plainText(block.content)}</code>
        </pre>
      );
    case "divider":
      return <hr key={key} className="my-10 border-[#e8e8e8]" />;
    case "image":
      return renderImage(block, key);
    case "table":
      return renderTable(block, key);
    default:
      return (
        <div key={key} className="my-4">
          {renderInlineContent(block.content)}
          {renderChildBlocks(block)}
        </div>
      );
  }
}

function renderHeading(block: LegalBlock, key: string): ReactNode {
  const rawLevel = isRecord(block.props) ? block.props.level : null;
  const level = typeof rawLevel === "number" ? rawLevel : 2;
  const content = renderInlineContent(block.content);
  const classes = "mt-10 mb-3 font-serif font-semibold tracking-[-0.01em] text-[#1a1a1a]";

  if (level <= 1) {
    return (
      <h2 key={key} className={`${classes} text-[28px] leading-tight`}>
        {content}
      </h2>
    );
  }
  if (level === 2) {
    return (
      <h2 key={key} className={`${classes} text-[24px] leading-tight`}>
        {content}
      </h2>
    );
  }
  if (level === 3) {
    return (
      <h3 key={key} className={`${classes} text-[20px] leading-snug`}>
        {content}
      </h3>
    );
  }

  return (
    <h4 key={key} className={`${classes} text-[17px] leading-snug`}>
      {content}
    </h4>
  );
}

function renderImage(block: LegalBlock, key: string): ReactNode {
  const props = isRecord(block.props) ? block.props : {};
  const url = typeof props.url === "string" ? props.url : null;
  const caption = typeof props.caption === "string" ? props.caption : null;

  if (!url) return null;

  return (
    <figure key={key} className="my-8">
      <img
        src={url}
        alt={caption ?? ""}
        className="w-full rounded-xl border border-[#e8e8e8] bg-[#fafafa]"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-[12.5px] text-[#6a6a6a]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function renderTable(block: LegalBlock, key: string): ReactNode {
  const rows = getTableRows(block);

  if (rows.length === 0) {
    return (
      <div key={key} className="my-4">
        {renderInlineContent(block.content)}
      </div>
    );
  }

  return (
    <div key={key} className="my-8 overflow-x-auto rounded-xl border border-[#e8e8e8]">
      <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-[#e8e8e8] last:border-b-0">
              {getTableCells(row).map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="align-top border-r border-[#e8e8e8] px-4 py-3 last:border-r-0"
                >
                  {renderTableCell(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderChildBlocks(block: LegalBlock): ReactNode {
  if (!Array.isArray(block.children) || block.children.length === 0) return null;
  return <div className="mt-3">{renderBlocks(block.children)}</div>;
}

function renderInlineContent(
  content: LegalBlock["content"] | LegalInlineContent[] | undefined,
): ReactNode {
  if (typeof content === "string") return renderTextWithBreaks(content);
  if (!Array.isArray(content)) return null;

  return content.map((item, index) => renderInlineNode(item, index));
}

function renderInlineNode(item: LegalInlineContent, index: number): ReactNode {
  if (typeof item === "string") {
    return <Fragment key={index}>{renderTextWithBreaks(item)}</Fragment>;
  }

  if (!isRecord(item)) return null;

  if (item.type === "link") {
    const link = item as LegalInlineLink;
    const href = safeHref(link.href);

    return (
      <a
        key={index}
        href={href}
        className="font-medium text-[#2e7a11] underline decoration-[#3A9615]/30 underline-offset-4 transition-colors hover:text-[#25660e]"
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        {renderInlineContent(link.content)}
      </a>
    );
  }

  if (item.type === "text") {
    const text = item as LegalInlineText;
    return (
      <Fragment key={index}>
        {applyTextStyles(renderTextWithBreaks(text.text), text.styles)}
      </Fragment>
    );
  }

  return null;
}

function applyTextStyles(
  node: ReactNode,
  styles: LegalInlineText["styles"] = {},
): ReactNode {
  let output = node;

  if (styles.code) {
    output = (
      <code className="rounded bg-[#f2f8f0] px-1.5 py-0.5 font-mono text-[0.9em] text-[#1f4d0f]">
        {output}
      </code>
    );
  }
  if (styles.bold) output = <strong className="font-semibold text-[#2a2a2a]">{output}</strong>;
  if (styles.italic) output = <em>{output}</em>;
  if (styles.underline) output = <span className="underline underline-offset-4">{output}</span>;
  if (styles.strike) output = <span className="line-through">{output}</span>;

  return output;
}

function renderTextWithBreaks(text: string): ReactNode {
  const parts = text.split("\n");

  return parts.map((part, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {part}
    </Fragment>
  ));
}

function plainText(content: LegalBlock["content"] | undefined): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";

  return content
    .map((item) => {
      if (typeof item === "string") return item;
      if (!isRecord(item)) return "";
      if (item.type === "text") return typeof item.text === "string" ? item.text : "";
      if (item.type === "link" && Array.isArray(item.content)) {
        return plainText(item.content);
      }
      return "";
    })
    .join("");
}

function safeHref(href: unknown): string {
  if (typeof href !== "string" || !href.trim()) return "#";
  const value = href.trim();

  if (value.startsWith("/") || value.startsWith("#")) return value;

  try {
    const parsed = new URL(value);
    return ["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol)
      ? value
      : "#";
  } catch {
    return "#";
  }
}

function getTableRows(block: LegalBlock): unknown[] {
  const content = block.content;
  const props = block.props;

  if (isRecord(content) && Array.isArray(content.rows)) return content.rows;
  if (Array.isArray(content)) {
    const tableContent = content.find(
      (item) => isRecord(item) && Array.isArray(item.rows),
    );
    if (isRecord(tableContent) && Array.isArray(tableContent.rows)) {
      return tableContent.rows;
    }
  }
  if (isRecord(props) && Array.isArray(props.rows)) return props.rows;

  return [];
}

function getTableCells(row: unknown): unknown[] {
  if (Array.isArray(row)) return row;
  if (!isRecord(row)) return [];
  if (Array.isArray(row.cells)) return row.cells;

  return [];
}

function renderTableCell(cell: unknown): ReactNode {
  if (typeof cell === "string") return cell;
  if (Array.isArray(cell)) return renderInlineContent(cell as LegalInlineContent[]);
  if (!isRecord(cell)) return null;

  if (Array.isArray(cell.content) || typeof cell.content === "string") {
    return renderInlineContent(cell.content as LegalInlineContent[] | string);
  }

  if (Array.isArray(cell.children)) {
    return renderBlocks(cell.children as LegalBlock[]);
  }

  return null;
}
