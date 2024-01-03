import Link from "next/link";

export default function NotFoud() {
  return (
    <div className="flex flex-col h-full w-full border-l-1 justify-center items-center">
      <span className="text-9xl font-bold">Oops!</span>
      <span className="text-2xl my-7 font-semibold">404 - PAGE NOT FOUND</span>
      <span className="text-center text-md">
        The page you are looking for might have been removed
        <br /> had its name changed or is temporarily unavailable
      </span>
      <Link href={"/home"}>
        <button className="px-11 py-3 rounded-full drop-shadow-md bg-gray-300 text-white font-bold mt-5 hover:bg-[#009965] active:translate-y-0.5 transition-colors duration-200 ease-in">
          GO TO HOMEPAGE
        </button>
      </Link>
    </div>
  );
}
