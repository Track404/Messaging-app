import {
  User,
  Users,
  MessageSquareText,
  MessageSquarePlus,
  SendHorizontal,
  Settings,
} from 'lucide-react';
import Discussion from '../components/Discussion';
import ChatName from '../components/ChatName';
import LoadingPage from './LoadingPage';
import ProtectedPage from '../components/ProtectedRoute';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

import { getUserChats } from '../api/user';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../context/createAuthContext';
import { getChatDetails } from '../api/chat';
import { getGroupDetails } from '../api/group';
import { postMessageChat } from '../api/chat';

function MainPage() {
  const { userToken } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [allChats, setAllChats] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [lastChat, setLastChat] = useState(null);
  const [, setSortedChats] = useState([]);
  const [, setActiveFilter] = useState('all');
  const [newMessage, setNewmessage] = useState('');
  const navigate = useNavigate();

  const { data, isLoading: chatLoading } = useQuery({
    queryKey: ['chats', userToken],
    queryFn: getUserChats,
    enabled: !!userToken,
  });

  const { data: chatDetails, isLoading: chatDetailsLoading } = useQuery({
    queryKey: ['lastChatDetails', lastChat?.id],
    queryFn: async () => {
      if (lastChat?.chatType === 'chats1' || lastChat?.chatType === 'chats2') {
        // If it's a chat, call the chat details API
        return await getChatDetails(lastChat?.id); // Ensure you're passing lastChat.id to the API function
      } else if (lastChat?.chatType === 'groups') {
        // If it's a group, call the group details API
        return await getGroupDetails(lastChat?.groupId); // Pass lastChat.id to the group details function
      }
      return null; // Return null if it's neither a chat nor a group (or an invalid lastChat)
    },
    enabled: !!lastChat?.id, // Only run the query if lastChat has a valid id
  });
  const { mutate: addUserMutation } = useMutation({
    mutationFn: ({ data, chatId, userId }) =>
      postMessageChat({ data, chatId, userId }),

    onSuccess: () => {
      console.log('Message sent successfully');
      queryClient.invalidateQueries(['lastChatDetails']);
    },

    onError: (error) => {
      console.error('Error sending message:', error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addUserMutation({
      data: { content: newMessage }, // Pass the message content
      chatId: lastChat.id, // Pass the current chat ID
      userId: userToken, // Pass the user ID (your token)
    });
    setNewmessage('');
  };
  useEffect(() => {
    if (data) {
      const userChats = data.data.user;

      // Extract and sort chats once
      const sortedChats = ['chats1', 'chats2', 'groups']
        .flatMap(
          (chatType) =>
            userChats?.[chatType]?.map((chat) =>
              chatType === 'groups'
                ? {
                    ...chat,
                    chatType,
                    lastMessageTime:
                      chat.group.messages?.[0]?.sentAt ||
                      '1970-01-01T00:00:00Z',
                  }
                : {
                    ...chat,
                    chatType,
                    lastMessageTime:
                      chat.messages?.[0]?.sentAt || '1970-01-01T00:00:00Z',
                  }
            ) || []
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
  const isLoading = chatLoading || chatDetailsLoading;
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <ProtectedPage>
      <>
        <div className="md:flex md:justify-center h-screen">
          <div className="h-screen flex flex-col shadow-2xl md:min-w-[50vw] xl:min-w-[30vw] relative">
            <div className=" flex shadow-md ">
              <h2 className="flex items-center justify-between text-white text-4xl text-left font-semibold p-4 w-full bg-[url(./assets/hive-background.svg)] bg-cover">
                THE HIVE
                <button
                  onClick={() => {
                    navigate(`/userPage/${userToken}`);
                  }}
                  className="hover:scale-110 active:scale-100"
                >
                  <Settings size={40} />
                </button>
              </h2>
            </div>
            <div className="h-full  overflow-auto">
              <div>
                {['chats1', 'chats2', 'groups']
                  .flatMap(
                    (chatType) =>
                      filterData?.[chatType]?.map((chat) =>
                        chatType === 'groups'
                          ? {
                              ...chat,
                              chatType,
                              lastMessageTime:
                                chat.group.messages?.[0]?.sentAt ||
                                '1970-01-01T00:00:00Z',
                            }
                          : {
                              ...chat,
                              chatType,
                              lastMessageTime:
                                chat.messages?.[0]?.sentAt ||
                                '1970-01-01T00:00:00Z',
                            }
                      ) || []
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
                    const userId =
                      chat.chatType === 'chats1' || chat.chatType === 'chats2'
                        ? chat.id
                        : chat.groupId;

                    return (
                      <Discussion
                        key={crypto.randomUUID()}
                        name={name}
                        message={chat.messages?.[0]?.content}
                        userId={userId}
                        chatType={chat.chatType}
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
                  <User
                    strokeWidth="1.25"
                    className="w-11 h-11 text-amber-400"
                  />
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
          <div className="hidden w-0 md:flex md:flex-col md:w-full md:h-screen">
            <div className="flex flex-col w-full h-screen md:bg-[url(./assets/messageBackgournd.svg)] md:bg-contain">
              <div className="bg-white w-full shadow-3xl border-b-1">
                {chatDetails?.data?.chat?.name && (
                  <ChatName name={chatDetails?.data?.chat?.users1.name} />
                )}
                {chatDetails?.data?.group?.name && (
                  <ChatName name={chatDetails?.data?.group?.name} />
                )}
              </div>

              <div className="flex flex-col-reverse overflow-y-auto w-full flex-grow">
                {chatDetails?.data?.chat?.messages.map((message) => {
                  return message.userId !== userToken ? (
                    <p
                      className="bg-amber-100 m-4 xl:ml-10 text-center p-2 w-50 shadow-2xl rounded-2xl"
                      key={message.id}
                    >
                      {message.content}
                    </p>
                  ) : (
                    <p
                      className="bg-amber-300 m-4 xl:mr-10 text-center self-end p-2 w-50 shadow-2xl rounded-2xl"
                      key={message.id}
                    >
                      {message.content}
                    </p>
                  );
                })}
                {chatDetails?.data?.group?.messages.map((message) => {
                  return message.userId !== userToken ? (
                    <p
                      className="bg-amber-100 m-4 xl:ml-10 text-center p-2 w-50 shadow-2xl rounded-2xl"
                      key={message.id}
                    >
                      {message.content}
                    </p>
                  ) : (
                    <p
                      className="bg-amber-300 m-4 xl:mr-10 text-center self-end p-2 w-50 shadow-2xl rounded-2xl"
                      key={message.id}
                    >
                      {message.content}
                    </p>
                  );
                })}
              </div>

              <div className="w-full bg-white ">
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center justify-center w-full p-3 "
                >
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
    </ProtectedPage>
  );
}

export default MainPage;
