export default function MovieCardSkeleton() {
  return (
    <div className="bg-card animate-pulse rounded-md border">
      <div className="aspect-[2/3] w-full rounded-tl-md rounded-tr-md bg-gray-300 object-cover lg:aspect-auto lg:h-80"></div>

      <div className="p-4">
        <h3 className="h-6 bg-gray-300" />
        <p className="mt-1 h-6 bg-gray-300" />
        <p className="mt-2 h-6 bg-gray-300" />
      </div>
    </div>
  );
}
