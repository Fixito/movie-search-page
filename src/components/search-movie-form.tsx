import { useQueryClient } from "@tanstack/react-query";

interface SearchMovieFormProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function SearchMovieForm({
  searchTerm,
  onSearchChange,
}: SearchMovieFormProps) {
  const queryClient = useQueryClient();

  const handleSubmit = (formdata: FormData) => {
    const newSearchTerm = formdata.get("search") as string;
    onSearchChange(newSearchTerm);
    queryClient.invalidateQueries({ queryKey: ["movies"] });
  };

  return (
    <form id="search-form" action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="search"
          className="text-secondary-foreground block text-sm/6 font-medium"
        >
          Search for a movie
        </label>
        <input
          type="search"
          name="search"
          id="search"
          autoComplete="off"
          className={`bg-card border-border text-secondary-foreground outline-border focus:outline-ring block w-full rounded-md border px-3 py-1.5 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6`}
          defaultValue={searchTerm}
        />
      </div>

      <button
        type="submit"
        // disabled={isPending}
        className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-ring flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {/* {isPending ? "Searching..." : "Search"} */}
        Search
      </button>
    </form>
  );
}
