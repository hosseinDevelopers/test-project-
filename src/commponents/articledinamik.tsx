"use client";

import { Iarticle } from "@/app/(group)/Booksshop/page";
import { useSidebarContext } from "@/context/bookscontext";
import React, { useEffect, useState } from "react";

function Articledinamik({ book }: { book: Iarticle }) {
  const [star, setStar] = useState("/images/stare0.jpg");
  const [timeLeft, setTimeLeft] = useState<number | null>(null); 
  const [isActive, setIsActive] = useState(book.status === "reserved");

  const handleReserve = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/reserve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId: book.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Reservation failed");
        return;
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  
  useEffect(() => {
    switch (book.stars) {
      case "0":
        setStar("/images/stare0.jpg");
        break;
      case "1":
        setStar("/images/stare1.jpg");
        break;
      case "2":
        setStar("/images/stare2.jpg");
        break;
      case "3":
        setStar("/images/stare3.jpg");
        break;
      case "4":
        setStar("/images/stare4.jpg");
        break;
      case "5":
        setStar("/images/stare5.jpg");
        break;
      default:
        setStar("/images/stare0.jpg");
    }
  }, [book.stars]);

  
  useEffect(() => {
    const reservation = book.reservations?.[0]; 
    if (!reservation?.reserved_until) return; 
    const timechek = reservation.reserved_until || 30;
    const updateTime = () => {
      const now = new Date();
      const reservedUntil = new Date(timechek); 
      const diff = reservedUntil.getTime() - now.getTime();

      if (diff <= 0) {
        setIsActive(false);
        setTimeLeft(null);
      } else {
        setTimeLeft(diff);
      }
    };

    updateTime(); 
    const interval = setInterval(updateTime, 1000); 

    return () => clearInterval(interval);
  }, [book.reservations]);

  
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  const { loggedIn } = useSidebarContext();
  return (
    <div className="flex flex-col md:flex-row m-auto mt-20 w-11/12 sm:w-3/4 lg:w-2/3 bg-gray-200 rounded-3xl shadow-xl overflow-hidden transition duration-300 hover:shadow-2xl hover:-translate-y-1">
    
      <div className="md:w-1/3 w-full bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300 flex items-center justify-center p-6">
        <img
          src={book.image_url}
          alt="Book cover"
          className="w-full h-64 object-contain drop-shadow-md rounded-xl"
        />
      </div>

      
      <div className="md:w-2/3 w-full p-8 flex flex-col gap-5">
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
          {book.title}
        </h1>
        <p className="text-lg font-semibold text-indigo-400">
          by {book.author}
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          {book.description}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <img src={star} alt="Rating Stars" className="w-24" />
          <span className="text-gray-700 font-medium">{book.stars}/5</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-gray-900">
            ${book.price}
          </span>
          {loggedIn === false ? (
            <h2 className="text-red-500 font-semibold">
              You must be logged in to reserve a book
            </h2>
          ) : isActive && timeLeft !== null ? (
            <span className="text-red-500 font-semibold">
              Reserved by{" "}
              <span className="font-bold">
                {book.reservations?.[0]?.user?.username}
              </span>{" "}
              ({formatTime(timeLeft)})
            </span>
          ) : (
            <button
              onClick={handleReserve}
              className="bg-indigo-500 text-white px-6 py-2 rounded-xl"
            >
              Reserve
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Articledinamik;
