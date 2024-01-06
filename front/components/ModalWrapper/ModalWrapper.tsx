export default function ModalWrapper({
  status,
  children
}: {
  status: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute left-0 top-0 w-screen h-screen backdrop-blur-xs flex items-center justify-center ${
        status ? "z-20" : "hidden"
      }`}
    >
      {children}
    </div>
  );
}
