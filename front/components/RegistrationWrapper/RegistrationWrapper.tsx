export default function RegistrationWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen flex p-5 justify-center text-[#56616b]">
      <div className="w-[700px] rounded-lg py-16 flex flex-col px-36 shadow-xl border-1">
        {children}
      </div>
    </main>
  );
}
