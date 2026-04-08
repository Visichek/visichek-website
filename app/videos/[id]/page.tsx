import { BASE_URL } from "@/app/util/api";
import VideoSectionOne from "./components/videosectionone";
import { MediaApiResponse, MediaItem } from "@/app/types/video";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const VideoBySlugPage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id || id === "undefined") {
    return notFound();
  }

  console.log("Category ID:", id);

  const categoryUrl = `${BASE_URL}/api/v1/media/by-category/${id}`;
  console.log("Fetching category videos from:", categoryUrl);

  const categoryRes = await fetch(categoryUrl, {
    next: { revalidate: 60 },
  });

  if (!categoryRes.ok) {
    console.error(
      `Failed to fetch category videos for ${id}:`,
      categoryRes.status
    );
    return (
      <section className="py-10 text-center text-gray-500">
        <p>Failed to load videos for category: {id}</p>
      </section>
    );
  }

  let categoryVideos: MediaItem[] = [];

  try {
    const categoryJson: MediaApiResponse = await categoryRes.json();
    categoryVideos = categoryJson.data?.listOfMedia || [];
  } catch (error) {
    console.error("Error parsing category videos JSON:", error);
    return (
      <section className="py-10 text-center text-gray-500">
        <p>Invalid data received for this category.</p>
      </section>
    );
  }

  if (categoryVideos.length === 0) {
    return (
      <section>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-gray-400 text-lg mb-2">📭</div>
          <h3 className="text-white text-xl font-semibold mb-2">
            No Videos found
          </h3>
          <p className="text-gray-400">
            We couldn't find any video matching your criteria.
          </p>
        </div>
      </section>
    );
  }

  return (
    <main className="bg-white">
      <VideoSectionOne videos={categoryVideos} />
    </main>
  );
};

export default VideoBySlugPage;
