"use client";

import VideoCard from "./videocard";
import { Category } from "@/app/types/category";

const VideoList = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="px-5 lg:px-28 2xl:px-36 mt-6">
      <div className="flex justify-start items-center border-b border-b-gray-300 pt-2 pb-3 sticky top-[78px] lg:top-[70px] z-40 bg-white">
        <p className="text-sm font-semibold text-black">ALL VIDEOS</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {categories.map((category, index) => (
          <VideoCard
            key={index}
            image={category?.imageUrl || "/logo-footer.png"}
            title={category.name}
            href={`/videos/${category.slug}`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
