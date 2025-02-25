import {
  User,
  Users,
  MessageSquareText,
  MessageSquarePlus,
  SendHorizontal,
} from 'lucide-react';
import fakeUsers from '../api/fakeUsers';
import Discussion from '../components/discussion';

function NewDiscussion() {
  return (
    <>
      <div className="md:flex md:justify-center">
        <div className="h-screen flex flex-col shadow-2xl md:w-[60vw] relative">
          <div className="shadow-md ">
            <h2 className="text-white text-4xl text-left font-semibold p-4 w-full bg-[url(./assets/hive-background.svg)] bg-cover">
              NEW DISCUSSION
            </h2>
          </div>
          <div className="border-b-2 text-2xl font-bold p-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-11 h-11 text-amber-400" />
              <h2>New Discussion</h2>
            </div>
            <div className="flex items-center gap-2 ">
              <Users className="w-11 h-11 text-amber-400" />
              <h2>New Group</h2>
            </div>
          </div>
          <div className="border-b-1 p-4 text-2xl font-bold md:hidden">
            <h2>To: Alice Johnson</h2>
          </div>
          <div className="h-full  overflow-auto">
            <div>
              {fakeUsers.map((user) => {
                return <Discussion key={user.id} name={user.name} />;
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
        <div className="hidden w-0 md:flex md:flex-col md:w-full md:h-screen ">
          <div className="border-b-1 p-4 text-2xl font-bold ">
            <h2>To: Alice Johnson</h2>
          </div>
          <div className="h-full w-full relative md:bg-[url(./assets/messageBackgournd.svg)] md:bg-contain">
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

export default NewDiscussion;
