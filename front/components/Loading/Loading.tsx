export default function Loading() {
  const fakeArray = new Array(3).fill(0);

  return (
    <div className="w-screen h-screen flex justify-center gap-3 items-center">
      {fakeArray.map((_, idx) => {
        return (
          <div className="w-3 h-3 bg-[#009965] rounded-full" key={idx}>
            <div className="w-3 h-3 bg-[#009965] animate-ping rounded-full"></div>
          </div>
        );
      })}
    </div>
  );
}
