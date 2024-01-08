export default function ModalWrapper({
  status,
  children,
  className
}: {
  status: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute left-0 top-0 w-screen h-screen backdrop-blur-xs flex ${className} ${
        status ? "z-20" : "hidden"
      }`}
    >
      {children}
    </div>
  );
}
