"use client";

import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import SearchModal from "./searchmodal";

const SearchBtn = () => {
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    if (openSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openSearch]);

  return (
    <div>
      <div>
        <FiSearch
          onClick={() => setOpenSearch(true)}
          size={24}
          className="text-white cursor-pointer"
        />
      </div>
      <SearchModal open={openSearch} onClose={() => setOpenSearch(false)} />
    </div>
  );
};

export default SearchBtn;
