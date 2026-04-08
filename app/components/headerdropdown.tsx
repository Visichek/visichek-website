"use client";

import { useState } from "react";
import Link from "next/link";
import { LuChevronDown } from "react-icons/lu";
import clsx from "clsx";
import { IMenuItems } from "./header";

const HeaderDropdown: React.FC<IMenuItems> = ({ slug, name }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-block hover:cursor-pointer"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <p className="flex items-center gap-1 hover:underline underline-offset-4 transition-all duration-300">
        {name}
        <LuChevronDown
          className={clsx(
            "w-4 h-4 transition-transform duration-300",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </p>
      <div
        className={clsx(
          "absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-md shadow-lg bg-black border border-gray-800 transition-all duration-300 ease-out",
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible"
        )}
      >
        <div className="py-2">
          <Link
            href={`/articles/${slug}`}
            className="block px-6 py-3 text-white hover:bg-zinc-900 transition-colors duration-200 text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            {name} Articles
          </Link>
          <Link
            href={`/videos/${slug}`}
            className="block px-6 py-3 text-white hover:bg-zinc-900 transition-colors duration-200 text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            {name} Videos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderDropdown;
