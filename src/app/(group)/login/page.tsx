"use client";
import { useSidebarContext } from "@/context/bookscontext";

export default function AuthForm() {
  const {
    handleSubmit1,
    handlePasswordChange,
    handleUsernameChange,
    handleSubmit,
    eror,
    ok,
    mode,
    password,
    passwordError,
    setEror,
    setMode,
    setOk,
    username,
    usernameError,
    handleNameChange,
    nameError,
    name,
    loggedIn
  } = useSidebarContext();
 
  const errorClass =
    "text-red-500 text-xs mt-1 font-medium px-2 py-1 bg-red-100 border border-red-300 rounded-md";

  const cardStyle =
    "w-full max-w-md bg-gradient-to-br from-indigo-600 via-purple-500 to-blue-600 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl py-10 px-10 animate-fade-in";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      {mode === "login" && (
        <div className={cardStyle}>
          <h2 className="text-white text-4xl mb-6 text-center font-extrabold drop-shadow">
            Login
          </h2>

          {eror && (
            <div className="relative overflow-hidden p-3 mb-4 rounded-xl bg-red-200/40 border border-red-300 text-red-900 shadow-md animate-slide-in">
              <span>{eror}</span>
              <button
                onClick={() => setEror("")}
                className="absolute right-3 top-2 text-2xl cursor-pointer text-red-800 font-bold hover:text-red-600"
              >
                ×
              </button>
              <div className="absolute bottom-0 left-0 h-1 bg-red-400 animate-progress"></div>
            </div>
          )}

          {ok && (
            <div className="relative overflow-hidden p-3 mb-4 rounded-xl bg-green-200/40 border border-green-300 text-green-900 shadow-md animate-slide-in">
              <span>{ok}</span>
              <button
                onClick={() => setOk("")}
                className="absolute right-3 top-2 text-2xl cursor-pointer text-green-800 font-bold hover:text-green-600"
              >
                ×
              </button>
              <div className="absolute bottom-0 left-0 h-1 bg-green-400 animate-progress"></div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Enter username..."
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/80 border border-white/40 focus:outline-none shadow-inner"
              required
            />
            {usernameError && <p className={errorClass}>{usernameError}</p>}

            <input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/80 border border-white/40 focus:outline-none shadow-inner"
              required
            />
            {passwordError && <p className={errorClass}>{passwordError}</p>}

            <button
              type="submit"
              className="w-full font-semibold bg-white/30 text-white py-3 rounded-xl hover:bg-white/40 transition shadow-xl border border-white/40"
            >
              Login
            </button>

            <button className="w-full flex items-center justify-center gap-3 border border-white/40 rounded-xl py-3 hover:bg-white/20 transition text-white backdrop-blur-sm">
              <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
                <path
                  fill="#4285F4"
                  d="M533.5 278.4c0-17.3-1.5-34-4.5-50.1H272.1v95h147.1c-6.3 34-25 62.9-53.3 82.2v68.1h86.3c50.5-46.5 79.3-115 79.3-195.2z"
                />
                <path
                  fill="#34A853"
                  d="M272.1 544.3c72.3 0 133-23.9 177-64.7l-86.3-68.1c-24 16.2-54.7 25.8-90.7 25.8-69.7 0-128.8-47.1-150-110.4H33.3v69.3c43 84.8 130 148.1 238.8 148.1z"
                />
                <path
                  fill="#FBBC05"
                  d="M122.1 321.6c-9.8-29.3-9.8-60.8 0-90.1v-69.3H33.3c-39.4 77.3-39.4 169.9 0 247.3l88.8-68z"
                />
                <path
                  fill="#EA4335"
                  d="M272.1 107.7c39 0 74.1 13.4 101.8 39.7l76.3-76.3C400.7 24 339.1 0 272.1 0 163.2 0 77.3 63.3 33.3 148.1l88.8 69.3c21.2-63.2 80.3-110.4 150-110.4z"
                />
              </svg>
              Sign in with Google
            </button>
          </form>

          <p className="text-sm text-center text-white mt-6">
            Don't have an account?
            <button
              className="ml-2 cursor-pointer font-bold text-white hover:underline"
              onClick={() => setMode("register")}
            >
              Register
            </button>
          </p>
        </div>
      )}

      {/* REGISTER */}
      {mode === "register" && (
        <div className={cardStyle}>
          <h2 className="text-white text-4xl mb-6 text-center font-extrabold drop-shadow">
            Register
          </h2>

          {eror && (
            <div className="relative overflow-hidden p-3 mb-4 rounded-xl bg-red-200/40 border border-red-300 text-red-900 shadow-md animate-slide-in">
              <span>{eror}</span>
              <button
                onClick={() => setEror("")}
                className="absolute right-3 top-2 text-2xl cursor-pointer text-red-800 font-bold hover:text-red-600"
              >
                ×
              </button>
              <div className="absolute bottom-0 left-0 h-1 bg-red-400 animate-progress"></div>
            </div>
          )}

          {ok && (
            <div className="relative overflow-hidden p-3 mb-4 rounded-xl bg-green-200/40 border border-green-300 text-green-900 shadow-md animate-slide-in">
              <span>{ok}</span>
              <button
                onClick={() => setOk("")}
                className="absolute right-3 top-2 text-2xl cursor-pointer text-green-800 font-bold hover:text-green-600"
              >
                ×
              </button>
              <div className="absolute bottom-0 left-0 h-1 bg-green-400 animate-progress"></div>
            </div>
          )}

          <form onSubmit={handleSubmit1} className="space-y-5">
            <input
              type="text"
              placeholder="Enter Name..."
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/80 border border-white/40 focus:outline-none shadow-inner"
              required
            />
            {nameError && <p className={errorClass}>{nameError}</p>}

            <input
              type="text"
              placeholder="Enter username..."
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/80 border border-white/40 focus:outline-none shadow-inner"
              required
            />
            {usernameError && <p className={errorClass}>{usernameError}</p>}

            <input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/80 border border-white/40 focus:outline-none shadow-inner"
              required
            />
            {passwordError && <p className={errorClass}>{passwordError}</p>}

            <button
              type="submit"
              className="w-full font-semibold bg-white/30 text-white py-3 rounded-xl hover:bg-white/40 transition shadow-xl border border-white/40"
            >
              Register
            </button>

            <button className="w-full flex items-center justify-center gap-3 border border-white/40 rounded-xl py-3 hover:bg-white/20 transition text-white backdrop-blur-sm">
              <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
                <path
                  fill="#4285F4"
                  d="M533.5 278.4c0-17.3-1.5-34-4.5-50.1H272.1v95h147.1c-6.3 34-25 62.9-53.3 82.2v68.1h86.3c50.5-46.5 79.3-115 79.3-195.2z"
                />
                <path
                  fill="#34A853"
                  d="M272.1 544.3c72.3 0 133-23.9 177-64.7l-86.3-68.1c-24 16.2-54.7 25.8-90.7 25.8-69.7 0-128.8-47.1-150-110.4H33.3v69.3c43 84.8 130 148.1 238.8 148.1z"
                />
                <path
                  fill="#FBBC05"
                  d="M122.1 321.6c-9.8-29.3-9.8-60.8 0-90.1v-69.3H33.3c-39.4 77.3-39.4 169.9 0 247.3l88.8-68z"
                />
                <path
                  fill="#EA4335"
                  d="M272.1 107.7c39 0 74.1 13.4 101.8 39.7l76.3-76.3C400.7 24 339.1 0 272.1 0 163.2 0 77.3 63.3 33.3 148.1l88.8 69.3c21.2-63.2 80.3-110.4 150-110.4z"
                />
              </svg>
              Sign in with Google
            </button>
          </form>

          <p className="text-sm text-center text-white mt-6">
            Already have an account?
            <button
              className="ml-2 cursor-pointer font-bold text-white hover:underline"
              onClick={() => setMode("login")}
            >
              Log in
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
