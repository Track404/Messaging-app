import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { postUser } from '../api/user';
import { useState } from 'react';
import { Alert } from '@mui/material';
function SignUpPageFr() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validationErrors, setValidationErrors] = useState(null);
  const navigate = useNavigate();

  const { mutate: addUserMutation, isSuccess } = useMutation({
    mutationFn: postUser,
    onError: (error) => {
      if (error?.data?.errors) {
        setValidationErrors(error.data.errors); // Store errors in state
      }
    },
    onSuccess: () => {
      console.log('sucess');
      setValidationErrors(null);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !userInfo ||
      !userInfo.name ||
      !userInfo.email ||
      !userInfo.password ||
      !userInfo.confirmPassword
    ) {
      console.log('User info is incomplete');
      return;
    }
    setValidationErrors(null);
    addUserMutation({
      data: {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
        confirmPassword: userInfo.confirmPassword,
      },
    });
  };

  return (
    <>
      <div className="md:flex md:justify-center">
        <div>
          <h2 className="text-amber-400 text-4xl text-left font-semibold m-4 mb-25">
            THE HIVE
          </h2>

          <div className="flex flex-col items-center md:w-[50vw] ">
            <div className="text-center">
              <h1 className="text-6xl font-semibold max-[400px]:w-75 xl:text-7xl max-w-range ">
                Join The Hive !
              </h1>
              <p className="text-xl xl:text-2xl xl:font-medium">
                {' '}
                Be part of a community
              </p>
            </div>

            <form className="mt-15" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-black-800 font-semibold text-md xl:text-lg"
                >
                  Username
                </label>
                <div className="mt-2 ">
                  <input
                    value={userInfo.name}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, name: e.target.value });
                    }}
                    type="text"
                    id="name"
                    name="name"
                    className="block w-75 h-10 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800 focus:outline-amber-400 xl:h-11 xl:w-85"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-black-800 font-semibold text-md xl:text-lg"
                >
                  Email
                </label>
                <div className="mt-2 ">
                  <input
                    value={userInfo.email}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, email: e.target.value });
                    }}
                    type="text"
                    id="email"
                    name="email"
                    className="block w-75 h-10 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800 focus:outline-amber-400 xl:h-11 xl:w-85"
                    required
                    title="Please enter your Email."
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-black-800 font-semibold text-md xl:text-lg"
                >
                  Password
                </label>
                <div className="mt-2 ">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="block w-75 h-10 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800 focus:outline-amber-400 xl:h-11 xl:w-85"
                    value={userInfo.password}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, password: e.target.value });
                    }}
                    required
                    title="Please enter your Password."
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-black-800 font-semibold text-md xl:text-lg"
                >
                  Confirm Password
                </label>
                <div className="mt-2 mb-6">
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    className="block w-75 h-10 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800 focus:outline-amber-400 xl:h-11 xl:w-85"
                    value={userInfo.confirmPassword}
                    onChange={(e) => {
                      setUserInfo({
                        ...userInfo,
                        confirmPassword: e.target.value,
                      });
                    }}
                    required
                    title="Please confirm your Password."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group/button w-full relative inline-flex items-center justify-center overflow-hidden rounded-md bg-amber-400 backdrop-blur-lg px-10 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
              >
                <span className="text-lg">Sign Up</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/20"></div>
                </div>
              </button>
            </form>
            <div className="flex gap-1 text-sm mt-2 font-light text-gray-500">
              <p>Already have an account? </p>
              <Link to="/login" className="text-amber-400">
                Login
              </Link>
            </div>
            {isSuccess && (
              <>
                <div className="flex justify-center w-full mt-10">
                  <Alert variant="filled" severity="success" className="w-2/3 ">
                    Confirm Register User
                  </Alert>
                </div>
              </>
            )}
            {validationErrors && (
              <>
                <div className="flex justify-center w-full mt-10">
                  <Alert
                    variant="filled"
                    severity="error"
                    className=" flex  items-center"
                  >
                    <ul>
                      {validationErrors.map((err, index) => (
                        <li key={index} style={{ color: 'white' }}>
                          - {err.msg}
                        </li>
                      ))}
                    </ul>
                  </Alert>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="hidden w-0 md:flex md:w-full md:h-screen md:bg-[url(./assets/hive-background.svg)] md:bg-cover"></div>
      </div>
    </>
  );
}

export default SignUpPageFr;
