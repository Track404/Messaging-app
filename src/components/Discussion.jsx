import userImg from '../assets/userImg.webp';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// eslint-disable-next-line react/prop-types
function Discussion({ name, message, userId, chatType }) {
  const navigate = useNavigate();
  const [typeConvo, setTypeConvo] = useState(null);
  useEffect(() => {
    if (chatType === 'chats1' || chatType === 'chats2') {
      setTypeConvo('chat');
    } else {
      setTypeConvo('group');
    }
  }, [chatType]);
  return (
    <>
      <div
        onClick={() => {
          navigate(`/userDiscussion/${typeConvo}/${userId}`);
        }}
        className="flex w-full h-28  items-center overflow-hidden shadow-sm hover:scale-105 active:scale-100"
      >
        <img
          src={userImg}
          alt="here"
          className={`${
            chatType === 'groups' ? 'rounded-xl' : 'rounded-full'
          } h-15 w-15 m-3`}
        />
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-lg">{name}</h2>
          {message && <p className="text-gray-500 pr-3 truncate">{message}</p>}
        </div>
      </div>
    </>
  );
}

export default Discussion;
