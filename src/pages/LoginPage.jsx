import { Link } from 'react-router-dom';

function LoginPage() {
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
            <form className="mt-15">
              <div>
                <label
                  htmlFor="email"
                  className="block text-black-800 font-semibold text-md xl:text-lg"
                >
                  Email
                </label>
                <div className="mt-2 ">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="block w-75 h-10 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800 focus:outline-amber-400 xl:h-11 xl:w-85"
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
                    className="block w-75 h-10 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800 focus:outline-amber-400 xl:h-11 xl:w-85"
                  />
                </div>
              </div>

              <button className="group/button w-full relative inline-flex items-center justify-center overflow-hidden rounded-md bg-amber-400 backdrop-blur-lg px-10 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20">
                <span className="text-lg">Log In</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/20"></div>
                </div>
              </button>
            </form>
            <div className="flex gap-1 text-sm mt-2 font-light text-gray-500">
              <p>Already have an account? </p>
              <Link to="/register" className="text-amber-400">
                Register
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden w-0 md:flex md:w-full md:h-screen md:bg-[url(./assets/hive-background.svg)] md:bg-cover"></div>
      </div>
    </>
  );
}

export default LoginPage;
