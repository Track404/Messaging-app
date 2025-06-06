import userImg from '../assets/userImg.webp';
import ProtectedPage from '../components/ProtectedRoute';
import { MessageSquarePlus, Home, Pencil, LogOut } from 'lucide-react';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/createAuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUniqueUser, updateUser } from '../api/user';
import { LogoutUser } from '../api/authentification';
function UserPage() {
  const { userToken, updateToken } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [isActive, setIsActive] = useState(false);
  const [alertIsActive, setAlertisActive] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [baseInfo, setBaseInfo] = useState({ name: '', email: '' });
  const [guestUser, setGuestUser] = useState(false);
  const [invalidInput, setInvalidInput] = useState(null);
  const [validationErrors, setValidationErrors] = useState(null);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['userInfo', userToken],
    queryFn: getUniqueUser,
    enabled: !!userToken,
  });
  useEffect(() => {
    if (data) {
      setBaseInfo(data.data.user);
      setUserInfo(data.data.user);
    }
  }, [data]);

  const { mutate: addUserMutation, isSuccess } = useMutation({
    mutationFn: ({ data, userId }) => updateUser({ data, userId }),

    onSuccess: () => {
      console.log('UpdateUser sent successfully');
      setIsActive(!isActive);
      setValidationErrors(null);
      setInvalidInput(null);
      setAlertisActive(!alertIsActive);
      setTimeout(() => {
        setAlertisActive(false);
      }, 3000);
      queryClient.invalidateQueries(['userInfo']);
    },

    onError: (error) => {
      if (error?.data?.errors) {
        setValidationErrors(error.data.errors);
        const newErrors = {};
        error.data.errors.forEach((err) => {
          newErrors[err.path] = err.msg;
        });
        setInvalidInput(newErrors);
        console.log(invalidInput);
      }
    },
  });

  const { mutate: addLogoutMutation } = useMutation({
    mutationFn: LogoutUser,

    onSuccess: () => {
      console.log('Logout sent successfully');
      updateToken(null);
      queryClient.invalidateQueries([
        'userInfo',
        'chats',
        'LastChatDetails,allUsers',
      ]);
      navigate('/login');
    },

    onError: (error) => {
      console.log(error);
    },
  });
  const handleLogout = (e) => {
    e.preventDefault();

    addLogoutMutation();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInfo) return;
    if (
      !baseInfo.name === 'Guest User' ||
      baseInfo.email === 'guest.user@gmail.com'
    ) {
      setGuestUser(true);
      return;
    }

    if (userInfo.name === baseInfo.name && userInfo.email === baseInfo.email) {
      setIsActive(!isActive);
      return;
    }
    addUserMutation({
      data: { name: userInfo.name, email: userInfo.email }, // Pass the message content
      userId: userToken, // Pass the user ID (your token)
    });
  };
  return (
    <ProtectedPage>
      <>
        <div className="h-screen flex flex-col shadow-2xl relative ">
          <div className="shadow-md ">
            <h2 className="text-white text-4xl text-left font-semibold p-4 w-full bg-[url(./assets/hive-background.svg)] bg-cover">
              PROFILE
            </h2>
          </div>
          {alertIsActive && isSuccess && (
            <>
              <div className="flex justify-center w-full mt-10 absolute top-12">
                <Alert variant="filled" severity="success" className="w-2/3 ">
                  User Info Change Successfully
                </Alert>
              </div>
            </>
          )}
          {isActive ? (
            <>
              <div className="h-full flex flex-col  items-center  ">
                <div className="relative hover:scale-110">
                  <img
                    src={userImg}
                    alt="user image"
                    className="rounded-full h-40 w-40 m-5 opacity-45  lg:h-60 lg:w-60 "
                  />
                  <Pencil className="absolute bottom-18 left-18 size-15 lg:bottom-26 lg:left-26 lg:size-20 stroke-2 " />
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 lg:grid-cols-2 h-full  gap-5 content-center"
                >
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-black-800 font-semibold text-lg xl:text-xl"
                    >
                      Username
                    </label>
                    <div className="mt-2 ">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className={`block w-75 h-10 rounded-md py-1.5 px-2 ring-1 ring-inset 
                        focus:text-gray-800 focus:outline-amber-400 xl:h-11 xl:w-85
                        ${
                          invalidInput?.name
                            ? 'ring-red-500 focus:outline-red-500'
                            : 'ring-gray-400'
                        }`}
                        value={userInfo.name}
                        onChange={(e) => {
                          setUserInfo({ ...userInfo, name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-black-800 font-semibold text-lg xl:text-xl"
                    >
                      Email
                    </label>
                    <div className="mt-2 ">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        className={`block w-75 h-10 rounded-md py-1.5 px-2 ring-1 ring-inset 
                        focus:text-gray-800 focus:outline-amber-400 xl:h-11 xl:w-85
                        ${
                          invalidInput?.email
                            ? 'ring-red-500 focus:outline-red-500'
                            : 'ring-gray-400'
                        }`}
                        value={userInfo.email}
                        onChange={(e) => {
                          setUserInfo({ ...userInfo, email: e.target.value });
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group/button lg:col-span-full w-full relative inline-flex items-center justify-center overflow-hidden rounded-md bg-amber-400 backdrop-blur-lg px-10 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
                  >
                    <span className="text-lg">Confirm Change</span>
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                      <div className="relative h-full w-10 bg-white/20"></div>
                    </div>
                  </button>
                </form>
                {validationErrors && (
                  <>
                    <div className="flex justify-center w-full mb-20 ">
                      <Alert
                        variant="filled"
                        severity="error"
                        className=" flex  items-center"
                      >
                        <ul>
                          {validationErrors.map((err, index) => (
                            <li key={index} style={{ color: 'white' }}>
                              -{err.msg}
                            </li>
                          ))}
                        </ul>
                      </Alert>
                    </div>
                  </>
                )}
                {guestUser && (
                  <>
                    <div className="flex justify-center w-full mb-20 ">
                      <Alert
                        variant="filled"
                        severity="error"
                        className=" flex  items-center"
                      >
                        <p>Cannot change Guest User information </p>
                      </Alert>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full  gap-1   justify-items-center items-center text-center">
                <div className="flex flex-col justify-center items-center lg:col-span-full">
                  <h2 className="font-bold text-3xl lg:text-4xl ">
                    Profile Image
                  </h2>
                  <img
                    src={userImg}
                    alt="user image"
                    className=" rounded-full h-40 w-40 m-5 lg:h-60 lg:w-60"
                  />
                </div>

                <div className="">
                  <h2 className="font-bold text-3xl mb-4 lg:text-4xl">
                    Username
                  </h2>
                  <p className="text-lg font-medium lg:text-xl">
                    {userInfo && userInfo.name}
                  </p>
                </div>
                <div>
                  <h2 className="font-bold text-3xl mb-4 lg:text-4xl">Email</h2>
                  <p className="text-lg font-medium lg:text-xl">
                    {userInfo && userInfo.email}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsActive(!isActive);
                  }}
                  className="group/button lg:col-span-full relative inline-flex items-center justify-center overflow-hidden rounded-md bg-amber-400 backdrop-blur-lg px-10 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
                >
                  <span className="text-lg">Change User Info</span>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-10 bg-white/20"></div>
                  </div>
                </button>
              </div>
            </>
          )}
          <div className="flex justify-around items-center border-t-2 h-30 bg-neutral-50">
            <button
              onClick={() => {
                navigate('/interface');
              }}
              className="hover:scale-110 cursor-pointer"
            >
              <div className="flex flex-col items-center ">
                <Home strokeWidth="1.25" className="w-11 h-11 text-amber-400" />
                <p className="font-medium text-lg">Home</p>
              </div>
            </button>

            <button
              onClick={() => {
                navigate('/newDiscussion');
              }}
              className="hover:scale-110 cursor-pointer"
            >
              <div className="flex flex-col items-center ">
                <MessageSquarePlus
                  strokeWidth="1.25"
                  className="w-11 h-11 text-amber-400"
                />
                <p className="font-medium text-lg">New Discussion</p>
              </div>
            </button>
            <button
              onClick={handleLogout}
              className="hover:scale-110 cursor-pointer"
            >
              <div className="flex flex-col items-center ">
                <LogOut
                  strokeWidth="1.25"
                  className="w-11 h-11 text-amber-400"
                />
                <p className="font-medium text-lg">Logout</p>
              </div>
            </button>
          </div>
        </div>
      </>
    </ProtectedPage>
  );
}

export default UserPage;
