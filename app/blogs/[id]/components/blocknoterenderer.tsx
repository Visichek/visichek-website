"use client";

import dynamic from "next/dynamic";

interface IBlockNoteRendererProp {
  content: any;
}

const BlockNoteRendererInner = dynamic(() => import("./blocknoterenderer-inner"), {
  ssr: false,
  loading: () => <div className="min-h-[200px]" />,
});

const BlockNoteRenderer: React.FC<IBlockNoteRendererProp> = ({ content }) => {
  return <BlockNoteRendererInner content={content} />;
};

export default BlockNoteRenderer;
