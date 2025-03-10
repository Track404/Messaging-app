import {
  Users,
  MessageSquarePlus,
  SendHorizontal,
  Undo2,
  Send,
} from 'lucide-react';
import Discussion from '../components/discussion';
import UserCard from '../components/UserCard';

import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../context/createContext';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUsers } from '../api/user';
import { createChat } from '../api/chat';

function NewDisccusionUpgrade() {
  const userToken = useContext(CurrentUserContext);
  const queryClient = useQueryClient();
  const [newMessage, setNewmessage] = useState('');
  const [userSendId, setUserSendId] = useState({ id: '', name: '' });
  const navigate = useNavigate();

  const { data: allUsers } = useQuery({
    queryKey: ['allUsers', userToken],
    queryFn: getAllUsers,
    enabled: !!userToken,
  });

  return (
    <>
      <div className="md:flex md:justify-center h-screen">
        <div className="h-screen flex flex-col shadow-2xl md:w-[60vw] relative">
          <div className="shadow-md ">
            <h2 className="text-white text-4xl text-left font-semibold p-4 w-full bg-[url(./assets/hive-background.svg)] bg-cover">
              NEW DISCUSSION
            </h2>
          </div>
          <div className="border-b-2 text-2xl font-bold p-4">
            <div className="flex items-center gap-2 ">
              <Users className="w-11 h-11 text-amber-400" />
              <h2>New Group</h2>
            </div>
          </div>
          <div className="h-full  overflow-auto">
            <div>
              {allUsers?.data?.user.map((user) => {
                return (
                  <UserCard
                    key={user.id}
                    name={user.name}
                    onClick={() => {
                      setUserSendId({ id: user.id, name: user.name });
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="border-t-2 text-2xl font-bold p-4">
            <div className="flex items-center gap-2 ">
              <Send className="w-11 h-11 text-amber-400" />
              To: {userSendId?.name || 'Select a user'}
            </div>
          </div>
          <div className="flex justify-around items-center border-t-2 h-30 bg-neutral-50 md:hidden">
            <button className="hover:scale-110 cursor-pointer">
              <div className="flex flex-col items-center ">
                <MessageSquarePlus
                  strokeWidth="1.25"
                  className="w-11 h-11 text-amber-400"
                />
                <p className="font-medium text-lg">Create Chat</p>
              </div>
            </button>

            <button
              onClick={() => {
                navigate('/interface');
              }}
              className="hover:scale-110 cursor-pointer"
            >
              <div className="flex flex-col items-center ">
                <Undo2
                  strokeWidth="1.25"
                  className="w-11 h-11 text-amber-400"
                />
                <p className="font-medium text-lg">Go Back</p>
              </div>
            </button>
          </div>
        </div>
        <div className="hidden w-0 md:flex md:flex-col md:w-full md:h-screen">
          <div className="flex flex-col w-full h-screen md:bg-[url(./assets/messageBackgournd.svg)] md:bg-contain">
            <div className="bg-white w-full shadow-3xl border-b-1">
              <Discussion name={`To: ${userSendId?.name}`} />
            </div>

            <div className="flex flex-col-reverse overflow-y-auto w-full flex-grow"></div>

            <div className="w-full bg-white ">
              <form className="flex items-center justify-center w-full p-3 ">
                <input
                  type="text"
                  id="message"
                  name="message"
                  className="block w-full h-10 ml-5 mr-5 bg-white rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800 focus:outline-amber-400 xl:h-11 xl:w-150"
                  value={newMessage}
                  onChange={(e) => setNewmessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="group/button cursor-pointer inline-flex items-center justify-center overflow-hidden rounded-md mr-5 bg-amber-400 backdrop-blur-lg px-3 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
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
  );
}

export default NewDisccusionUpgrade;
