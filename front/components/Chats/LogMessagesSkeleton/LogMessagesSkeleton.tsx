export default function LogMessagesSkeleton() {
  return (
    <div className="flex gap-3 justify-end">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-end">
          <span className="text-sm font-semibold h-4 w-40 bg-gray-300 rounded-lg animate-pulse" />
        </div>

        <div className="px-3 py-2 bg-gray-300 animate-pulse rounded-lg text-white min-w-[200px] h-14" />
      </div>

      <div className="w-11 h-11 bg-gray-300 rounded-full animate-pulse" />
    </div>
  );
}
