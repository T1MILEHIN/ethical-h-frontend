import React from 'react'

const Instagram = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 md:flex-row">
      <div className="hidden md:block md:w-1/2 lg:w-1/3">
        <img
          src="/screenshot2-2x.png"
          alt="Instagram mobile view"
          className="object-cover  w-[250px]"
        />
      </div>

      <div className="flex flex-col items-center w-full md:w-1/3 lg:w-1/4">
        <div className="bg-white border border-gray-300 p-8 rounded-lg w-full max-w-xs">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoCnylJgwO59dVeqvB1V1jb58KqPPGTwNawA&s"
            alt="Instagram Logo"
            className="w-full h-16 object-cover mx-auto mb-8"
          />
          
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Phone number, username, or email"
              className="text-black w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400 text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              
              className="text-black w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400 text-sm"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-1.5 rounded-sm font-semibold text-sm hover:bg-blue-600"
            >
              Log In
            </button>
          </form>

          <div className="flex items-center mt-4 mb-4">
            <div className="border-t border-gray-300 flex-grow mr-3"></div>
            <span className="text-gray-500 text-xs">OR</span>
            <div className="border-t border-gray-300 flex-grow ml-3"></div>
          </div>

          <button className="w-full text-blue-700 font-semibold text-sm mb-4">
            Log in with Facebook
          </button>
          <a href="#" className="text-xs text-blue-500 block text-center">
            Forgot password?
          </a>
        </div>

        <div className="bg-white border border-gray-300 p-4 rounded-lg w-full max-w-xs mt-4 text-center">
          <span className="text-sm">Don't have an account?</span>
          <a href="#" className="text-blue-500 font-semibold text-sm ml-1">
            Sign up
          </a>
        </div>
      </div>
    </div>
  )
}

export default Instagram