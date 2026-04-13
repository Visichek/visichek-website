"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

interface IBlockNoteRendererInnerProp {
  content: any;
}

const BlockNoteRendererInner: React.FC<IBlockNoteRendererInnerProp> = ({ content }) => {
  const editor = useCreateBlockNote({
    initialContent: content,
  });

  return (
    <div className="[&_.bn-container]:p-0 [&_.bn-editor]:p-0">
      <BlockNoteView editor={editor} editable={false} theme="light" />
    </div>
  );
};

export default BlockNoteRendererInner;
