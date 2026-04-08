import Image from "next/image";

interface IVideoLargeCard {
  imageSrc: string;
  imageAlt?: string;
  title: string;
}

const VideoLargeCard: React.FC<IVideoLargeCard> = ({
  imageSrc,
  imageAlt,
  title,
}) => {
  return (
    <div className="h-[54dvh] lg:h-dvh max-h-[700px] w-full overflow-hidden">
      <div className="group relative block h-full">
        <Image
          src={imageSrc}
          alt={imageAlt || "Video Image"}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl italic font-bold text-white leading-tight">
              {title}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLargeCard;
