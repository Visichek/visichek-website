"use client";

import React from "react";
import { IoShareOutline } from "react-icons/io5";
import useWebShare from "react-use-web-share";

interface IShareButtonProps {
  id: string;
  title: string;
  excerpt: string;
}

const ShareButton: React.FC<IShareButtonProps> = ({ id, title, excerpt }) => {
  const { isSupported, share } = useWebShare();

  const handleShare = () => {
    share({
      title: title,
      text: excerpt,
    });
  };

  if (!isSupported) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full border border-[#e8e8e8] bg-white px-4 py-2 text-[13px] font-medium text-[#374151] transition-all duration-200 hover:border-[#d8d8d8] hover:shadow-sm"
      aria-label="Share this article"
    >
      <IoShareOutline size={16} />
      Share
    </button>
  );
};

export default ShareButton;
