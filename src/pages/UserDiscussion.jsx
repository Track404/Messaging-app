import {
  User,
  Users,
  MessageSquareText,
  MessageSquarePlus,
  SendHorizontal,
  Undo2,
} from 'lucide-react';
import fakeUsers from '../api/fakeUsers';
import Discussion from '../components/discussion';

function UserDisscussion() {
  return (
    <>
      <div className="md:flex md:justify-center">
        <div className="hidden md:visible h-screen md:flex flex-col shadow-2xl md:w-[60vw] relative ">
          <div className="shadow-md ">
            <h2 className="text-white text-4xl text-left font-semibold p-4 w-full bg-[url(./assets/hive-background.svg)] bg-cover">
              THE HIVE
            </h2>
          </div>
          <div className="h-full  overflow-auto">
            <div>
              {fakeUsers.map((user) => {
                return (
                  <Discussion
                    key={user.id}
                    name={user.name}
                    message={user.message}
                  />
                );
              })}
            </div>

            <button className="group/button absolute bottom-32 right-10 cursor-pointer inline-flex items-center justify-center overflow-hidden rounded-md bg-amber-400 backdrop-blur-lg px-3 py-3 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20">
              <MessageSquarePlus className="w-10 h-10 text-white" />
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                <div className="relative h-full w-10 bg-white/20"></div>
              </div>
            </button>
          </div>
          <div className="flex justify-around items-center border-t-2 h-30 bg-neutral-50">
            <button className="hover:scale-110 cursor-pointer">
              <div className="flex flex-col items-center ">
                <MessageSquareText
                  strokeWidth="1.25"
                  className="w-11 h-11 text-amber-400"
                />
                <p className="font-medium text-lg">All</p>
              </div>
            </button>

            <button className="hover:scale-110 cursor-pointer">
              <div className="flex flex-col items-center ">
                <User strokeWidth="1.25" className="w-11 h-11 text-amber-400" />
                <p className="font-medium text-lg">Discussion</p>
              </div>
            </button>
            <button className="hover:scale-110 cursor-pointer">
              <div className="flex flex-col items-center ">
                <Users
                  strokeWidth="1.25"
                  className="w-11 h-11 text-amber-400"
                />
                <p className="font-medium text-lg">Groups</p>
              </div>
            </button>
          </div>
        </div>
        <div className=" flex flex-col w-full h-screen ">
          <div className="bg-white h-auto w-full shadow-3xl border-b-1 relative">
            <Discussion name={fakeUsers[0].name} />
            <button className="hover:scale-110 cursor-pointer absolute top-8 right-5 md:hidden">
              <div className="flex flex-col items-center ">
                <Undo2
                  strokeWidth="1.25"
                  className="w-11 h-11 text-amber-400"
                />
              </div>
            </button>
          </div>
          <div className="h-full w-full relative bg-[url(./assets/messageBackgournd.svg)] bg-contain">
            <p className="bg-amber-100 m-4 p-2 w-50 shadow-2xl rounded-2xl">
              {fakeUsers[0].message}
            </p>
            <p className="bg-amber-300 m-4 p-2 w-50 shadow-2xl rounded-2xl absolute right-4">
              {fakeUsers[1].message}
            </p>
            <form className="absolute bottom-2  w-full flex items-center justify-center ">
              <input
                type="text"
                id="message"
                name="message"
                className="block w-full h-10 ml-5 mr-5 bg-white rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800 focus:outline-amber-400 xl:h-11 xl:w-150"
              />

              <button
                type="sumbmit"
                className="group/button  cursor-pointer inline-flex items-center justify-center overflow-hidden rounded-md mr-5 bg-amber-400 backdrop-blur-lg px-3  text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
              >
                <SendHorizontal className="w-10 h-10 text-white" />
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/20"></div>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDisscussion;
