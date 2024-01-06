import type { TBlockInf } from "@/interfaces/interfaces";

export default function BlockInf({ icon, text }: TBlockInf) {
  return (
    <div className="flex items-center gap-2">
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  );
}
