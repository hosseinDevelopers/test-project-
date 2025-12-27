"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface SidebarContextType {
  test: string;
  setTest: React.Dispatch<React.SetStateAction<string>>;
  handleUsernameChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleNameChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleSubmitAdmin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  usernameError: string;
  setUsernameError: React.Dispatch<React.SetStateAction<string>>;
  passwordError: string;
  setPasswordError: React.Dispatch<React.SetStateAction<string>>;
  nameError: string;
  eror: string;
  setEror: React.Dispatch<React.SetStateAction<string>>;
  ok: string;
  setOk: React.Dispatch<React.SetStateAction<string>>;
  mode: "login" | "register";
  setMode: React.Dispatch<React.SetStateAction<"login" | "register">>;
  loggedIn: boolean;
  chekAdmin: boolean;
  handleLogout: () => void;
  handleSubmit1: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  name: string;
  usernamerezerved: string;
}

const SidebarContext = createContext({} as SidebarContextType);

export const useSidebarContext = () => useContext(SidebarContext);

export default function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [test, setTest] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [eror, setEror] = useState("");
  const [ok, setOk] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [chekAdmin , setChekAdmin] = useState(false)
  const [usernamerezerved , setUsernamerezerved] = useState("")
  const handleNameChange = (value: string) => {
    setName(value);
    if (value.length <= 2) {
      setNameError("Your name must be more than 2 characters ❌");
    } else {
      setNameError("");
    }
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (value.includes(" ")) {
      setUsernameError("Usernames should not contain spaces ❌");
    } else if (value.length < 9) {
      setUsernameError("Username must be at least 9 characters long ❌");
    } else {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value.includes(" ")) {
      setPasswordError("Password should not contain spaces ❌");
    } else if (value.length < 7) {
      setPasswordError("Password must be at least 7 characters long ❌");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (usernameError || passwordError) {
      alert("لطفا خطاهای فرم را برطرف کنید");
      return;
    }

    if (mode === "register") setMode("login");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      setUsername("");
      setPassword("");
      const data = await res.json();

      if (data.success) {
        console.log("Server response:", data);
        localStorage.setItem("token", data.token);
        setOk(data.message);
        setTimeout(() => setOk(""), 2000);
        setTimeout(() => {
          window.location.href = "/";
        }, 300);
      } else {
        setEror(data.message);
        setTimeout(() => setEror(""), 2000);
      }
    } catch (err) {
      console.error("Error sending request", err);
    }
  };
  const handleSubmitAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (usernameError || passwordError) {
      alert("لطفا خطاهای فرم را برطرف کنید");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/loginAdmin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      setUsername("");
      setPassword("");
      const data = await res.json();
      
      if (data.success) {
        setOk(data.message);
        setTimeout(() => setOk(""), 2000);
        setTimeout(() => {
          window.location.href = "/panel";
        }, 300);
      } else {
        setEror(data.message);
        setTimeout(() => setEror(""), 2000);
      }
    } catch (err) {
      console.error("Error sending request", err);
    }
  };
   const checkAdminStatus = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin-check`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.loggedIn) {
        setChekAdmin(true);
      } else {
        setChekAdmin(false);
      }
    } catch (err) {
      console.error("Error checking admin status", err);
      setChekAdmin(false);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const handleSubmit1 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (usernameError || passwordError) {
      alert("لطفا خطاهای فرم را برطرف کنید");
      return;
    }

    if (mode === "register") setMode("login");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name }),
        credentials: "include",
      });
      setUsername("");
      setPassword("");
      setName("");
      const data = await res.json();
      console.log("Server response:", data);

      if (data.success) {
        setOk("you'r welcome" + " " + data.data.name);
        console.log(data);
        setTimeout(() => setOk(""), 2000);
      } else {
        setEror(data.message);
        setTimeout(() => setEror(""), 2000);
      }
    } catch (err) {
      console.error("Error sending request", err);
    }
  };
  const checkLogin = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/status`, {
      method: "GET", 
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json", 
      },
    });

    const data = await res.json();
    // console.log(data);
    if (data.loggedIn) {
      setLoggedIn(true);
      setUsernamerezerved(data.user.username)
    } else {
      setLoggedIn(false);
      setUsernamerezerved("")
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST", 
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = "/login";
      } else {
        setEror(data.message || "Logout failed");
        setTimeout(() => setEror(""), 2000);
      }
    } catch (err) {
      console.error("Error logging out", err);
      setEror("Server error");
    }
  };

  return (
    <SidebarContext.Provider
      value={{
        test,
        setTest,
        handleUsernameChange,
        handlePasswordChange,
        handleSubmit,
        username,
        setUsername,
        password,
        setPassword,
        usernameError,
        setUsernameError,
        passwordError,
        setPasswordError,
        eror,
        setEror,
        ok,
        setOk,
        mode,
        setMode,
        loggedIn,
        handleLogout,
        handleSubmit1,
        handleNameChange,
        nameError,
        name,
        handleSubmitAdmin,
        chekAdmin,
        usernamerezerved
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
