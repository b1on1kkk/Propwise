export default function CreateEventInputWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-1 rounded-lg py-2 px-3 shadow text-[#56616b] min-h-10 flex items-center gap-3 dark:border-dark_border">
      {children}
    </div>
  );
}
