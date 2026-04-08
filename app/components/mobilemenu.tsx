"use client";

import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import clsx from "clsx";
import { IMenuItems } from "./header";

interface IMobileMenuProps {
  data: IMenuItems[];
}

const MobileMenu: React.FC<IMobileMenuProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 h-10 w-10 flex lg:hidden items-center justify-center text-white"
        aria-label="Toggle menu"
      >
        <RxHamburgerMenu
          className={clsx(
            "absolute transition-all duration-300",
            isOpen
              ? "opacity-0 rotate-90 scale-50"
              : "opacity-100 rotate-0 scale-100"
          )}
          size={30}
        />
        <IoMdClose
          className={clsx(
            "absolute transition-all duration-300",
            isOpen
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-50"
          )}
          size={30}
        />
      </button>
      <nav
        className={clsx(
          "fixed top-20 bottom-0 left-0 w-full bg-black text-white flex flex-col gap-12 px-8 py-10 transition-transform duration-500 ease-in-out lg:hidden z-40 overflow-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col gap-8 text-2xl font-medium">
          <Link
            href="/videos"
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-300 focus:text-gray-300 transition-colors underline underline-offset-8"
          >
            Videos
          </Link>

          {data.map((item, index) => (
            <React.Fragment key={item.slug ?? index}>
              <Link
                href={`/categories/${item.slug}`}
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-300 focus:text-gray-300 transition-colors underline underline-offset-8"
              >
                {item.name} Article
              </Link>
              <Link
                href={`/videos/${item.slug}`}
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-300 focus:text-gray-300 transition-colors underline underline-offset-8"
              >
                {item.name} Video
              </Link>
            </React.Fragment>
          ))}
        </div>
      </nav>
    </>
  );
};

export default MobileMenu;
