import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import MovieCard from "@/components/movie-card";
import MovieCardSkeleton from "@/components/movie-card-skeleton";
import Pagination from "@/components/pagination";
import SearchMovieForm from "@/components/search-movie-form";

import { useMovieSearch } from "@/hooks/use-movies";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useMovieSearch(searchTerm, page);

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setPage(1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => {
      if (prevPage >= (data?.total_pages || 1)) return prevPage;
      return prevPage + 1;
    });
    queryClient.invalidateQueries({ queryKey: ["movies"] });
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => {
      if (prevPage <= 1) return prevPage;
      return prevPage - 1;
    });
    queryClient.invalidateQueries({ queryKey: ["movies"] });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage === page) return;
    setPage(newPage);
    queryClient.invalidateQueries({ queryKey: [{ page: newPage }] });
  };

  const renderContent = () => {
    if (isPending) {
      return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Array.from({ length: 20 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (isError) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      return (
        <div className="mx-auto max-w-2xl">
          <h3 className="text-secondary-foreground text-base font-semibold">
            {errorMessage || "Failed to search movies"}
          </h3>
        </div>
      );
    }

    if (!searchTerm.trim()) {
      return (
        <div className="mx-auto max-w-2xl">
          <p className="text-secondary-foreground text-base/5">
            Enter a movie title in the search box above to find your favorite
            films.
          </p>
        </div>
      );
    }

    if (!data?.results?.length) {
      return (
        <div className="mx-auto max-w-2xl">
          <p className="text-secondary-foreground text-base/5">
            No results found for {searchTerm}. Try searching with a different
            title.
          </p>
        </div>
      );
    }

    return (
      <div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-secondary-foreground text-sm">
              Found <span className="font-medium">{data.total_results}</span>{" "}
              movies for "<span className="font-medium">{searchTerm}</span>"
            </p>
            <p className="text-secondary-foreground text-sm">
              Page <span className="font-medium">{data.page}</span> of{" "}
              <span className="font-medium">{data.total_pages}</span>
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.results.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </div>

        <Pagination
          currentPage={page}
          totalPages={data.total_pages}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          onPageChange={handlePageChange}
        />
      </div>
    );
  };

  return (
    <main className="sapce mx-auto max-w-2xl space-y-8 px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
      <header className="mx-auto max-w-2xl">
        <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
          Movie Search
        </h1>
        <p className="text-secondary-foreground mt-8 text-lg font-medium text-pretty sm:text-xl/8">
          Discover your next favorite movie. Search through thousands of films
          and explore detailed information.
        </p>
      </header>

      <div className="mx-auto max-w-2xl">
        <SearchMovieForm
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          isPending={isPending}
        />
      </div>

      <section>{renderContent()}</section>
    </main>
  );
}
