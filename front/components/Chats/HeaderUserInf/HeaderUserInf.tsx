interface THeaderUserInf {
  name: string;
  lastname: string;
  children: React.ReactNode;
  online_status: "online" | "last seen recently";
}

export default function HeaderUserInf({
  name,
  lastname,
  children,
  online_status
}: THeaderUserInf) {
  return (
    <div className="flex-1 flex gap-5 items-center">
      {/* future avatar here */}
      {children}
      {/*  */}

      <div className="flex flex-col">
        <div className="font-bold dark:text-dark_text">
          {name} {lastname}
        </div>
        <div className="text-[#56616b] text-sm">{online_status}</div>
      </div>
    </div>
  );
}
