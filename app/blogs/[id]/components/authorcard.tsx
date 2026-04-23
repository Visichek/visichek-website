import { formatDateShort } from "@/app/util/date";
import Image from "next/image";

interface IAuthorCardProps {
  name: string;
  avatarUrl: string;
  affiliation: string;
  date: number;
  readingMinutes?: number;
}

const AuthorCard: React.FC<IAuthorCardProps> = ({
  name,
  avatarUrl,
  affiliation,
  date,
  readingMinutes,
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#e8e8e8] bg-white p-5">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#3A9615]">
        Written by
      </p>
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full ring-1 ring-[#e8e8e8]">
          <Image
            src={avatarUrl}
            alt={name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold text-[#1a1a1a]">
            {name}
          </p>
          <p className="truncate text-[12.5px] text-[#6a6a6a]">{affiliation}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 border-t border-[#f0f0f0] pt-4 text-[12px]">
        <div>
          <p className="uppercase tracking-widest text-[#6a6a6a]">Published</p>
          <p className="mt-1 text-[13px] font-medium text-[#374151]">
            {formatDateShort(date)}
          </p>
        </div>
        {readingMinutes && (
          <div>
            <p className="uppercase tracking-widest text-[#6a6a6a]">Reading</p>
            <p className="mt-1 text-[13px] font-medium text-[#374151]">
              {readingMinutes} min
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorCard;
