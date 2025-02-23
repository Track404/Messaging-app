function UserPage() {
  return (
    <>
      <div className="h-screen flex flex-col shadow-2xl ">
        <div className="shadow-md ">
          <h2 className="text-white text-4xl text-left font-semibold p-4 w-full bg-[url(./assets/hive-background.svg)] bg-cover">
            THE HIVE
          </h2>
        </div>
        <div className="h-full  overflow-auto"></div>
      </div>
    </>
  );
}

export default UserPage;
