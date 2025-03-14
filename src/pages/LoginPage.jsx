import { User } from 'lucide-react';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { LoginUser } from '../api/authentification';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../context/createAuthContext';

function LoginPage() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const { updateToken } = useContext(AuthContext);
  const [validationErrors, setValidationErrors] = useState(null);
  const [invalidInput, setInvalidInput] = useState(null);
  const navigate = useNavigate();

  const { mutate: addUserMutation, isSuccess } = useMutation({
    mutationFn: LoginUser,
    onError: (error) => {
      if (error?.data?.errors) {
        setValidationErrors(error.data.errors);
        const newErrors = {};
        error.data.errors.forEach((err) => {
          newErrors[err.path] = err.msg;
        });
        setInvalidInput(newErrors);
        console.log(invalidInput); // Store errors in state
      }
    },
    onSuccess: (data) => {
      console.log('success');
      updateToken(data.token);
      setValidationErrors(null);
      setInvalidInput(null);
      setTimeout(() => {
        navigate('/Interface');
      }, 3000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInfo || !userInfo.email || !userInfo.password) {
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

          <div className="flex flex-col items-center md:w-[50vw]">
            <div className="text-center">
              <h1 className="text-7xl font-semibold xl:text-8xl">Hi There !</h1>
              <p className="text-xl xl:text-3xl xl:font-medium">
                {' '}
                Welcome to the hive
              </p>
            </div>
            <form className="mt-15" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-black-800 font-semibold text-md xl:text-lg "
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
              <div>
                <label
                  htmlFor="password"
                  className="block text-black-800 font-semibold text-md xl:text-lg"
                >
                  Password
                </label>
                <div className="mt-2 mb-6">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={userInfo.password}
                    className={`block w-75 h-10 rounded-md py-1.5 px-2 ring-1 ring-inset 
                      focus:text-gray-800 focus:outline-amber-400 xl:h-11 xl:w-85
                      ${
                        invalidInput?.password
                          ? 'ring-red-500 focus:outline-red-500'
                          : 'ring-gray-400'
                      }`}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, password: e.target.value });
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group/button w-full relative inline-flex items-center justify-center overflow-hidden rounded-md bg-amber-400 backdrop-blur-lg px-10 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
              >
                <span className="text-lg">Log In</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/20"></div>
                </div>
              </button>
              <button
                onClick={() => {
                  addUserMutation({
                    data: {
                      name: 'Guest User',
                      email: 'guest.user@gmail.com',
                      password: 'abcd',
                      confirmPassword: 'abcd',
                    },
                  });
                }}
                type="button"
                className="group/button w-full mt-4 relative inline-flex gap-1 items-center justify-center overflow-hidden rounded-md bg-amber-400 backdrop-blur-lg px-5 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
              >
                <User />
                <span className="text-lg">Guest User</span>
                <div className="absolute inset-0 flex  h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/20"></div>
                </div>
              </button>
            </form>

            <div className="flex gap-1 text-sm mt-2 font-light text-gray-500">
              <p>Dont have an account yet? </p>
              <Link to="/register" className="text-amber-400">
                Register
              </Link>
            </div>
            {isSuccess && (
              <>
                <div className="flex justify-center w-full mt-10">
                  <Alert variant="filled" severity="success" className="w-2/3 ">
                    Confirm Login
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
                          {err.msg}
                          {err.param}
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

export default LoginPage;
