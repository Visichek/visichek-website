"use client";

import { useState, useEffect, useCallback } from "react";
import { SearchResponse, SearchBlogItem } from "../types/search";
import { BASE_URL } from "@/app/util/api";
import { BiExit } from "react-icons/bi";
import Link from "next/link";
import clsx from "clsx";
import Modal from "./modal";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const SearchModal = ({ open, onClose }: SearchModalProps) => {
  const [visible, setVisible] = useState(open);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchBlogItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) setVisible(true);
    else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const fetchResults = async (value: string) => {
    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${BASE_URL}/api/v1/articles/content/search/?title=${value}&start=0&stop=10`,
        { cache: "no-cache" }
      );
      if (!res.ok) return;
      const data: SearchResponse = await res.json();
      setResults(data.data.blogs);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(fetchResults, 400), []);

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  if (!visible) return null;

  return (
    <Modal open={open}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Search</h2>
        <BiExit
          onClick={onClose}
          className="text-white hover:text-gray-500 cursor-pointer"
          size={23}
        />
      </div>

      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border rounded-md outline-none"
      />

      <div className="mt-4 max-h-[400px] overflow-y-auto">
        {loading && <p className="text-gray-500">Searching...</p>}

        {!loading && results.length === 0 && query.length > 0 && (
          <p className="text-gray-500">No results found.</p>
        )}

        {results.map((blog, index) => (
          <Link
            href={`/blogs/${blog.id}`}
            key={index}
            className={clsx(
              "block border-b py-3 transform transition-all duration-300",
              open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
              `delay-[${index * 75}ms]`
            )}
            onClick={onClose}
          >
            <p className="font-semibold">{blog.title}</p>
            <p className="text-sm text-gray-500">{blog.author.name}</p>
          </Link>
        ))}
      </div>
    </Modal>
  );
};

export default SearchModal;
