import {
  User,
  Users,
  MessageSquareText,
  MessageSquarePlus,
  SendHorizontal,
} from 'lucide-react';
import fakeUsers from '../api/fakeUsers';
import Discussion from '../components/discussion';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../context/createContext';
import { getUserChats } from '../api/user';
import { useQuery } from '@tanstack/react-query';
import { getChatDetails } from '../api/chat';
import { getGroupDetails } from '../api/group';

function MainPage() {
  const userToken = useContext(CurrentUserContext);
  const [allChats, setAllChats] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [lastChat, setLastChat] = useState(null);
  const [sortedChats, setSortedChats] = useState([]);
  const [chatName, setChatName] = useState(null);
  const [, setActiveFilter] = useState('all');
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['chats', userToken],
    queryFn: getUserChats,
    enabled: !!userToken,
  });

  const { data: chatDetails } = useQuery({
    queryKey: ['lastChatDetails', lastChat?.id],
    queryFn: async () => {
      if (lastChat?.chatType === 'chats1' || lastChat?.chatType === 'chats2') {
        // If it's a chat, call the chat details API
        return await getChatDetails(lastChat?.id); // Ensure you're passing lastChat.id to the API function
      } else if (lastChat?.chatType === 'groups') {
        // If it's a group, call the group details API
        return await getGroupDetails(lastChat?.id); // Pass lastChat.id to the group details function
      }
      return null; // Return null if it's neither a chat nor a group (or an invalid lastChat)
    },
    enabled: !!lastChat?.id, // Only run the query if lastChat has a valid id
  });

  useEffect(() => {
    if (data) {
      console.log('Setting Filter Data:', data);

      const userChats = data.data.user;

      // Extract and sort chats once
      const sortedChats = ['chats1', 'chats2', 'groups']
        .flatMap(
          (chatType) =>
            userChats?.[chatType]?.map((chat) => ({
              ...chat,
              chatType,
              lastMessageTime:
                chat.messages?.[0]?.sentAt || '1970-01-01T00:00:00Z',
            })) || []
        )
        .sort(
          (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
        ); // Sort by latest message

      setAllChats(userChats);
      setFilterData(userChats);
      setSortedChats(sortedChats); // Store sorted chats once
      setLastChat(sortedChats[0] || null); // Store only the last chat
    }
  }, [data]);
  const filterChats = (type) => {
    setActiveFilter(type); // Update active filter

    if (type === 'groups') {
      setFilterData({ ...allChats, chats1: [], chats2: [] });
    } else if (type === 'chats') {
      setFilterData({ ...allChats, groups: [] });
    } else {
      setFilterData(allChats); // Show all
    }
  };
  return (
    <>
      <div className="md:flex md:justify-center">
        <div className="h-screen flex flex-col shadow-2xl md:w-[60vw] relative">
          <div className="shadow-md ">
            <h2 className="text-white text-4xl text-left font-semibold p-4 w-full bg-[url(./assets/hive-background.svg)] bg-cover">
              THE HIVE
            </h2>
          </div>
          <div className="h-full  overflow-auto">
            <div>
              {['chats1', 'chats2', 'groups']
                .flatMap(
                  (chatType) =>
                    filterData?.[chatType]?.map((chat) => ({
                      ...chat,
                      chatType,
                      lastMessageTime:
                        chat.messages?.[0]?.sentAt || '1970-01-01T00:00:00Z',
                    })) || []
                )
                .sort(
                  (a, b) =>
                    new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
                ) // Sort by latest message
                .map((chat) => {
                  const name =
                    chat.chatType === 'chats1'
                      ? chat.users2?.name
                      : chat.chatType === 'chats2'
                      ? chat.users1?.name
                      : chat.group?.name;

                  return (
                    <Discussion
                      key={chat.id}
                      name={name}
                      message={chat.messages?.[0]?.content}
                    />
                  );
                })}
            </div>

            <button
              onClick={() => {
                navigate(`/newDiscussion`);
              }}
              className="group/button absolute bottom-32 right-10 cursor-pointer inline-flex items-center justify-center overflow-hidden rounded-md bg-amber-400 backdrop-blur-lg px-3 py-3 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
            >
              <MessageSquarePlus className="w-10 h-10 text-white" />
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                <div className="relative h-full w-10 bg-white/20"></div>
              </div>
            </button>
          </div>
          <div className="flex justify-around items-center border-t-2 h-30 bg-neutral-50">
            <button
              onClick={() => {
                filterChats('all');
              }}
              className="hover:scale-110 cursor-pointer"
            >
              <div className="flex flex-col items-center ">
                <MessageSquareText
                  strokeWidth="1.25"
                  className="w-11 h-11 text-amber-400"
                />
                <p className="font-medium text-lg">All</p>
              </div>
            </button>

            <button
              onClick={() => {
                filterChats('chats');
              }}
              className="hover:scale-110 cursor-pointer"
            >
              <div className="flex flex-col items-center ">
                <User strokeWidth="1.25" className="w-11 h-11 text-amber-400" />
                <p className="font-medium text-lg">Discussion</p>
              </div>
            </button>
            <button
              onClick={() => {
                filterChats('groups');
              }}
              className="hover:scale-110 cursor-pointer"
            >
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
          <div className="bg-white h-auto w-full shadow-3xl border-b-1">
            <Discussion name={chatName} />
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

export default MainPage;
