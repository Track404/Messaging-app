function ScreenSize() {
  return (
    <>
      <div className="absolute bottom-4 left-4 ">
        <span className="sm:hidden">XS</span>
        <span className="hidden sm:block md:hidden">SM</span>
        <span className="hidden md:block lg:hidden">MD</span>
        <span className="hidden lg:block xl:hidden">LG</span>
      </div>
    </>
  );
}

export default ScreenSize;
