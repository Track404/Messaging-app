import userImg from '../assets/userImg.webp';

// eslint-disable-next-line react/prop-types
function ChatName({ name }) {
  return (
    <>
      <div className="flex w-full h-28  items-center overflow-hidden shadow-sm">
        <img src={userImg} alt="here" className="rounded-full h-15 w-15 m-3" />
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-lg">{name}</h2>
        </div>
      </div>
    </>
  );
}

export default ChatName;
