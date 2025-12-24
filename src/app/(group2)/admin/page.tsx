'use client'

import { useSidebarContext } from "@/context/bookscontext";

export default function AdminLoginUI() {
  const {
    eror,
    ok,
    setEror,
    setOk,
    username,
    password,
    handlePasswordChange,
    handleUsernameChange,
    handleSubmitAdmin,
    usernameError,passwordError
  } = useSidebarContext();
   const errorClass =
    "text-red-500 text-xs mt-1 font-medium px-2 py-1 bg-red-100 border border-red-300 rounded-md"; 
    
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-100 via-indigo-300 to-indigo-400 p-6">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="px-8 py-6 bg-gradient-to-br from-indigo-200 via-indigo-300 to-indigo-400">
            <h1 className="text-3xl font-extrabold text-indigo-900 tracking-tight text-center">
              Admin
            </h1>
            <p className="mt-2 text-sm text-indigo-800/80 text-center">
              Sign in to your admin panel
            </p>
          </div>

          {/* Alerts */}
          {eror && (
            <div className="relative overflow-hidden p-3 mb-3 mt-2 rounded-xl bg-red-200/40 border border-red-300 text-red-900 shadow-md animate-slide-in">
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
            <div className="relative overflow-hidden p-3 mb-3 mt-2 rounded-xl bg-green-200/40 border border-green-300 text-green-900 shadow-md animate-slide-in">
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

          {/* Form */}
          <form onSubmit={handleSubmitAdmin} className="px-8 py-8 space-y-6">

            <div className="space-y-1">
              <label className="text-sm font-medium text-indigo-800">Username</label>
              <input
                type="text"
                className="w-full rounded-lg px-4 py-2 border border-indigo-200 bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                placeholder="your.username"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
              />
              {usernameError && <p className={errorClass}>{usernameError}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-indigo-800">Password</label>
              <input
                type="password"
                className="w-full rounded-lg px-4 py-2 border border-indigo-200 bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              {passwordError && <p className={errorClass}>{passwordError}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-indigo-800">
                <input type="checkbox" className="h-4 w-4 rounded border-indigo-300" />
                <span>Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-700 text-white font-semibold px-4 py-2 hover:bg-indigo-600 transition"
            >
              Sign in
            </button>
          </form>

          <div className="px-8 py-4 bg-white/60 border-t border-indigo-100 text-center text-xs text-indigo-700">
            This access is for admins only
          </div>
        </div>
      </div>
    </main>
  );
}
