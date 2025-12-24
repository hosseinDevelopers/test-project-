"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Serchbar from "./serchbar";
import { useSidebarContext } from "@/context/bookscontext";

export default function Navbar() {
  const path = usePathname();

  const navItems = [
    { label: "Main Page", href: "/" },
    { label: "Books", href: "/Booksshop" },
    { label: "Purchases", href: "/Shoppingcart" },
  ];
  const { loggedIn, handleLogout } = useSidebarContext();
  return (
    <div className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 shadow-md py-3 px-6 flex items-center justify-between">
    
      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-gray-100 font-semibold hover:text-white transition-colors px-3 py-1 rounded-b-lg ${
              path === item.href ? "border-b-2 border-white" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}

        <Link
          href="/panel"
          className={`text-yellow-300 font-semibold hover:text-white transition-colors px-3 py-1 rounded-b-lg ${
            path === "/panel" ? "border-b-2 border-white" : ""
          }`}
        >
          Panel-Admin
        </Link>
      </div>

      
      <div className="flex items-center gap-4">
        <Serchbar />
        <Link href="/login">
          {loggedIn ? (
            <img
              src="data:image/jpeg;base64,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"
              alt=""
              className="w-10 h-10 rounded-full border-2 border-white hover:border-gray-200 transition cursor-pointer"
              onClick={handleLogout}
            />
          ) : (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Microsoft_Account_Logo.svg/1200px-Microsoft_Account_Logo.svg.png"
              alt="Login"
              className="w-10 h-10 rounded-full border-2 border-white hover:border-gray-200 transition cursor-pointer"
            />
          )}
        </Link>
      </div>
    </div>
  );
}
