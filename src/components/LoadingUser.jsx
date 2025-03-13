function LoadingCard() {
  return (
    <>
      <div className="flex w-full h-28 pl-5  items-center overflow-hidden shadow-sm ">
        <div className="flex flex-row gap-2">
          <div className="animate-pulse bg-gray-300 w-12 h-12 rounded-full"></div>
          <div className="flex flex-col gap-2">
            <div className="animate-pulse bg-gray-300 w-28 h-5 rounded-full"></div>
            <div className="animate-pulse bg-gray-300 w-36 h-5 rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoadingCard;
