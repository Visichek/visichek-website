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
    <IoShareOutline
      onClick={handleShare}
      className="text-white cursor-pointer"
      size={30}
    />
  );
};

export default ShareButton;
