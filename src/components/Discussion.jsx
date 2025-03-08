import userImg from '../assets/userImg.webp';
// eslint-disable-next-line react/prop-types
function Discussion({ name, message }) {
  return (
    <>
      <div className="flex w-full h-28  items-center overflow-hidden shadow-sm hover:scale-105">
        <img src={userImg} alt="here" className="rounded-full h-15 w-15 m-3" />
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-lg">{name}</h2>
          {message && <p className="text-gray-500 pr-3 truncate">{message}</p>}
        </div>
      </div>
    </>
  );
}

export default Discussion;
