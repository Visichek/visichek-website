import VideoLargeCard from "./components/videolargecard";
import VideoList from "./components/videolist";
import { BASE_URL } from "@/app/util/api";
import { CategoryApiResponse, Category } from "../types/category";

export const revalidate = 60;

const VideosPage = async () => {
  let categories: Category[] = [];

  try {
    const res = await fetch(`${BASE_URL}/api/v1/articles/content/categories`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch videos");
    }

    const data: CategoryApiResponse = await res.json();

    categories = data.data?.listOfCategories || [];
  } catch (error) {
    console.error("Error fetching videos:", error);
  }

  if (categories.length === 0) {
    return (
      <section className="min-h-screen">
        <VideoLargeCard
          title="Videos"
          imageSrc="/hands_raised.webp"
          imageAlt="Videos header"
        />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-gray-500 text-lg">
            No videos Category available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <VideoLargeCard
        title="Videos"
        imageSrc={categories[0].imageUrl || "/hands_raised.webp"}
        imageAlt={categories[0].slug || "People raising hands"}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <VideoList categories={categories} />
      </div>
    </div>
  );
};

export default VideosPage;
