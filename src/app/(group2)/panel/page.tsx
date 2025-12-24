'use client';

import AdminPost from "@/commponents/adminPost";
import DashboardPanel from "@/commponents/panelAdmin";
import { useSidebarContext } from "@/context/bookscontext";
import { useState } from "react";
import BookAdmin from "../book/page";

export default function Admin() {
  const [active, setActive] = useState("panel");

  const items = [
    { id: "panel", label: "Dashboard" },
    { id: "post", label: "Posts" },
    { id: "books", label: "Books" },
  ];
  const {chekAdmin} = useSidebarContext()

  if (!chekAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
        <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center">

          <svg
            className="mx-auto mb-4 h-20 w-20 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 4h.01m-.01-14a9 9 0 110 18 9 9 0 010-18z" />
          </svg>

          <h1 className="text-2xl font-bold text-gray-800">Admin Access Denied</h1>

          <p className="text-gray-600 mt-3">
            You are logged out. Please sign in to access the admin dashboard.
          </p>

          <a
            href="/admin"
            className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-500 transition"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }else{
    return (
    <div className="h-screen bg-gray-50 flex flex-col">

    
      <div className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 shadow-lg">
        <ul className="flex gap-6 px-8 py-4">
          {items.map(item => (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`cursor-pointer px-5 py-2 rounded-xl font-semibold transition-all backdrop-blur-sm
                ${
                  active === item.id
                    ? "bg-white text-indigo-700 shadow-lg scale-105"
                    : "text-white hover:bg-white/20 hover:scale-105"
                }`}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

 
      <div className="flex-1 overflow-auto p-6">
        {active === "panel" && <DashboardPanel />}
        {active === "post" && <AdminPost />}
        {active === "books" && <BookAdmin />}
      </div>
    </div>
  );
  }

}
