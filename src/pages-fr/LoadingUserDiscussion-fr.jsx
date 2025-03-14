import {
  User,
  Users,
  MessageSquareText,
  MessageSquarePlus,
  SendHorizontal,
  Settings,
} from 'lucide-react';
import LoadingCard from '../components/LoadingUser';

import ProtectedPage from '../components/ProtectedRoute';

function LoadingPageFr() {
  const count = 8;
  return (
    <ProtectedPage>
      <>
        <div className="md:flex md:justify-center h-screen">
          <div className="h-screen flex flex-col shadow-2xl md:min-w-[50vw] xl:min-w-[30vw] relative">
            <div className=" flex shadow-md ">
              <h2 className="flex items-center justify-between text-white text-4xl text-left font-semibold p-4 w-full bg-[url(./assets/hive-background.svg)] bg-cover">
                THE HIVE
                <button className="hover:scale-110 active:scale-100">
                  <Settings size={40} />
                </button>
              </h2>
            </div>
            <div className="h-full  overflow-auto">
              <div>
                {Array.from({ length: count }).map((_, index) => (
                  <LoadingCard key={index} />
                ))}
              </div>

              <button className="group/button absolute bottom-32 right-10 cursor-pointer active:scale-105 inline-flex items-center justify-center overflow-hidden rounded-md bg-amber-400 backdrop-blur-lg px-3 py-3 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20">
                <MessageSquarePlus className="w-10 h-10 text-white" />
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/20"></div>
                </div>
              </button>
            </div>
            <div className="flex justify-around items-center border-t-2 h-30 bg-neutral-50">
              <button className="hover:scale-110 active:scale-105 cursor-pointer">
                <div className="flex flex-col items-center ">
                  <MessageSquareText
                    strokeWidth="1.25"
                    className="w-11 h-11 text-amber-400"
                  />
                  <p className="font-medium text-lg">All</p>
                </div>
              </button>

              <button className="hover:scale-110 active:scale-105 cursor-pointer">
                <div className="flex flex-col items-center ">
                  <User
                    strokeWidth="1.25"
                    className="w-11 h-11 text-amber-400"
                  />
                  <p className="font-medium text-lg">Discussion</p>
                </div>
              </button>
              <button className="hover:scale-110 active:scale-105 cursor-pointer">
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
          <div className="hidden w-0 md:flex md:flex-col md:w-full md:h-screen">
            <div className="flex flex-col w-full h-screen md:bg-[url(./assets/messageBackgournd.svg)] md:bg-contain">
              <div className="bg-white w-full shadow-3xl border-b-1">
                <LoadingCard />
              </div>

              <div className="flex  overflow-y-auto w-full flex-grow">
                <div className="flex-col gap-4 w-full flex items-center justify-center">
                  <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin ease-linear rounded-full w-15 h-15 border-t-3 border-b-3 border-amber-400"></div>
                    <div className="animate-spin ease-linear rounded-full w-15 h-15 border-t-3 border-b-3 border-amber-400 ml-3"></div>
                    <div className="animate-spin ease-linear rounded-full w-15 h-15 border-t-3 border-b-3 border-amber-400 ml-3"></div>
                  </div>
                </div>
              </div>

              <div className="w-full bg-white ">
                <form className="flex items-center justify-center w-full p-3 ">
                  <input
                    type="text"
                    id="message"
                    name="message"
                    className="block w-full h-10 ml-5 mr-5 bg-white rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800 focus:outline-amber-400 xl:h-11 xl:w-150"
                  />
                  <button
                    type="submit"
                    className="group/button cursor-pointer inline-flex items-center justify-center overflow-hidden rounded-md mr-5 bg-amber-400 backdrop-blur-lg px-3 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
                    disabled
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
        </div>
      </>
    </ProtectedPage>
  );
}

export default LoadingPageFr;
