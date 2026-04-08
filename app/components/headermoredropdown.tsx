"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LuChevronDown } from "react-icons/lu";
import clsx from "clsx";
import { IMenuItems } from "./header";

interface HeaderMoreDropdownProps {
  items: IMenuItems[];
  label?: string;
}

const HeaderMoreDropdown: React.FC<HeaderMoreDropdownProps> = ({
  items,
  label = "MORE",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center gap-1 hover:underline underline-offset-4 transition-all duration-300 cursor-pointer select-none">
        {label}
        <LuChevronDown
          className={clsx(
            "w-5 h-5 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </div>
      <div
        className={clsx(
          "absolute right-0 top-full mt-3 w-[580px] bg-black rounded-lg shadow-2xl overflow-hidden border border-gray-800 transition-all duration-300 ease-out origin-top",
          isOpen
            ? "opacity-100 scale-y-100 visible"
            : "opacity-0 scale-y-95 invisible"
        )}
      >
        <div className="columns-3 gap-5 p-6">
          <Link
            href="/videos"
            onClick={() => setIsOpen(false)}
            className="block py-2.5 text-sm tracking-wider text-white transition-colors hover:bg-zinc-900"
          >
            Videos
          </Link>
          {items.map((item, index) => (
            <React.Fragment key={item.slug ?? index}>
              <Link
                key={`article-${index}`}
                href={`/articles/${item.slug}`}
                className="block py-2.5 text-sm tracking-wider text-white transition-colors hover:bg-zinc-900"
                onClick={() => setIsOpen(false)}
              >
                {item.name} Article
              </Link>
              <Link
                key={`video-${index}`}
                href={`/videos/${item.slug}`}
                className="block py-2.5 text-sm tracking-wider text-white transition-colors hover:bg-zinc-900"
                onClick={() => setIsOpen(false)}
              >
                {item.name} Video
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderMoreDropdown;
