import { Button } from "@nextui-org/react";

export default function MonthHandlerButton({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      className="min-w-0 p-2 bg-white border-1 shadow h-15 rounded-lg text-[#56616b]"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
