import { env } from "@/config/env";

import type { Movie } from "@/types/movie";

import { formatDate, truncateText } from "@/utils/common";

type MovieCardProps = Pick<
  Movie,
  "id" | "title" | "overview" | "poster_path" | "release_date" | "vote_average"
>;

export default function MovieCard({
  title,
  overview,
  poster_path,
  release_date,
  vote_average,
}: MovieCardProps) {
  const imageUrl = poster_path
    ? `${env.TMDB_IMAGE_BASE_URL}/w500/${poster_path}`
    : "https://placehold.co/500x750";
  const truncatedOverview = truncateText(overview, 150);
  const formattedDate = release_date
    ? formatDate(release_date)
    : "Unknown release date";
  const rating = Math.round(vote_average * 10) / 10;

  return (
    <div className="group bg-card rounded-md border">
      <div className="relative">
        <img
          src={imageUrl}
          alt={`Poster of the movie ${title}`}
          className="bg-background aspect-[2/3] w-full rounded-tl-md rounded-tr-md object-cover group-hover:opacity-75 lg:aspect-auto"
          loading="lazy"
        />
        {vote_average > 0 && (
          <div className="text-primary-foreground absolute top-2 right-2 block rounded-md bg-black/75 px-3 py-1.5 text-sm font-semibold">
            ⭐ {rating}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-secondary-foreground text-base font-medium">
          {title}
        </h3>

        <p className="text-muted-foreground mt-1 text-sm/6 italic">
          {formattedDate}
        </p>

        <p className="text-secondary-foreground mt-2 text-sm/6">
          {truncatedOverview}
        </p>
      </div>
    </div>
  );
}
