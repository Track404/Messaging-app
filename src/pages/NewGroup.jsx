import {
  Users,
  MessageSquarePlus,
  SendHorizontal,
  Undo2,
  Send,
} from 'lucide-react';
import userImg from '../assets/userImg.webp';
import UserCard from '../components/UserCard';

import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { CurrentUserContext } from '../context/createContext';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getAllUsers } from '../api/user';

import {
  createManyGroupUsers,
  createGroup,
  postMessageGroup,
} from '../api/group';
function NewGroup() {
  const userToken = useContext(CurrentUserContext);
  const queryClient = useQueryClient();
  const [newMessage, setNewmessage] = useState('');
  const [groupName, setGroupName] = useState('');
  const [userSendId, setUserSendId] = useState([{ id: userToken, name: '' }]);
  const navigate = useNavigate();

  const { data: allUsers } = useQuery({
    queryKey: ['allUsers', userToken],
    queryFn: getAllUsers,
    enabled: !!userToken,
  });

  const { mutate: addUserMutation } = useMutation({
    mutationFn: createGroup,
    onSuccess: (data, { messageToSend, usersIds }) => {
      console.log('Group created successfully');

      const chatId = data?.group?.id;
      if (chatId) {
        // Add users to the group
        addGroupUsersMutation({
          data: { usersIds, groupId: chatId },
        });

        if (messageToSend) {
          // Send the first message after the chat is created
          addChatMutation({
            data: { content: messageToSend },
            chatId: chatId,
            userId: userToken,
          });
        }
        navigate(`/userDiscussion/group/${chatId}`);
      }
      queryClient.invalidateQueries(['ChatDetails']);
    },
    onError: (error) => {
      console.error('Error creating chat:', error);
    },
  });

  const { mutate: addGroupUsersMutation } = useMutation({
    mutationFn: createManyGroupUsers,
    onSuccess: () => {
      console.log('Group users created successfully');
    },
    onError: (error) => {
      console.error('Error adding users to group:', error);
    },
  });

  const { mutate: addChatMutation } = useMutation({
    mutationFn: ({ data, chatId, userId }) =>
      postMessageGroup({ data, chatId, userId }),
    onSuccess: () => {
      console.log('Message sent successfully');
    },
    onError: (error) => {
      console.error('Error sending message:', error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userSendId.length) {
      console.warn('No users selected for the group.');
      return;
    }
    if (!groupName) {
      console.warn('No groupName for the group.');
      return;
    }

    const messageToSend = newMessage.trim();

    addUserMutation({
      data: { name: groupName },
      messageToSend,
      usersIds: userSendId.map((user) => user.id),
    });

    setUserSendId([{ id: userToken, name: '' }]);
    setGroupName('');
    setNewmessage('');
  };

  return (
    <>
      <div className="md:flex md:justify-center h-screen">
        <div className="h-screen flex flex-col shadow-2xl md:w-[60vw] relative">
          <div className="shadow-md ">
            <h2 className="text-white text-4xl text-left font-semibold p-4 w-full bg-[url(./assets/hive-background.svg)] bg-cover">
              NEW GROUP
            </h2>
          </div>
          <button
            onClick={() => {
              navigate('/newDiscussion');
            }}
            className="border-b-2 text-2xl font-bold p-4"
          >
            <div className="flex items-center gap-2 ">
              <Users className="w-11 h-11 text-amber-400" />
              <h2>New Disscussion</h2>
            </div>
          </button>
          <div className="border-b-2 text-2xl font-bold p-4">
            <div className="flex flex-col items-center gap-2 ">
              <label htmlFor="groupName">GroupName</label>
              <input
                type="text"
                id="groupName"
                name="groupName"
                placeholder="Enter a group name"
                className="block w-full h-10 ml-5 mr-5 bg-white rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800 focus:outline-amber-400 xl:h-11 xl:w-150"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
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
                      setUserSendId([
                        ...userSendId,
                        { id: user.id, name: user.name },
                      ]);
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="border-t-2 text-2xl font-bold p-4 md:hidden">
            <div className="flex items-center gap-2 ">
              <Send className="w-11 h-11 text-amber-400" />
              <h2 className=" flex font-bold text-lg ">
                To:
                {userSendId.map((user) => {
                  return (
                    <>
                      <p key={user.id} className="pr-1">
                        {user.name},
                      </p>
                    </>
                  );
                })}
                Select a user
              </h2>
            </div>
          </div>
          <div className="flex justify-around items-center border-t-2 h-30 bg-neutral-50 ">
            <form onSubmit={handleSubmit}>
              <button type="submit" className="hover:scale-110 cursor-pointer">
                <div className="flex flex-col items-center ">
                  <MessageSquarePlus
                    strokeWidth="1.25"
                    className="w-11 h-11 text-amber-400"
                  />
                  <p className="font-medium text-lg">Create Group</p>
                </div>
              </button>
            </form>

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
              <div className="flex w-full h-28  items-center overflow-hidden shadow-sm ">
                <img
                  src={userImg}
                  alt="here"
                  className="rounded-full h-15 w-15 m-3"
                />

                <div className="flex-1 min-w-0">
                  <h2 className=" flex font-bold text-lg ">
                    To:
                    {userSendId.map((user) => {
                      return (
                        <>
                          <p key={user.id} className="pr-1">
                            {user.name},
                          </p>
                        </>
                      );
                    })}
                    Select a user
                  </h2>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse overflow-y-auto w-full flex-grow"></div>

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
  );
}

export default NewGroup;
