"use client";

import { useSidebarContext } from "@/context/bookscontext";
import React, { useEffect, useState } from "react";


interface IBook {
  id: number;
  title: string;
  author: string;
  image_url: string | null;
  price: number;
}

interface IReservation {
  reservationId: number;
  reservedUntil: string;
  book: IBook;
}

export default function ActiveReservations() {
  const { loggedIn } = useSidebarContext();

  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    if (!loggedIn) return;

    const fetchReservations = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token");

        const res = await fetch(
          "http://localhost:3001/book/reservations/active",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          console.error("Request failed", res.status);
          setReservations([]);
          return;
        }

        const data = await res.json();
        setReservations(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setReservations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [loggedIn]); // 

  

  
  if (!loggedIn) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-gray-600">
         برای مشاهده رزروهای فعال، لطفاً وارد شوید
        </p>
      </div>
    );
  }


  if (loading) {
    return (
      <p className="text-center mt-5">
        Loading reservations...
      </p>
    );
  }

  // 📭 رزروی وجود ندارد
  if (reservations.length === 0) {
    return (
      <p className="text-center mt-5">
        No active reservations
      </p>
    );
  }

  

  return (
    <div className="p-6">
      <h1 className="text-3xl text-center mb-6">
        My Active Reservations
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((resv) => (
          <div
            key={resv.reservationId}
            className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center"
          >
            {resv.book.image_url && (
              <img
                src={resv.book.image_url}
                alt={resv.book.title}
                className="w-full h-48 object-contain mb-4 rounded-xl"
              />
            )}

            <h2 className="text-lg font-bold">
              {resv.book.title}
            </h2>

            <p className="text-gray-500">
              {resv.book.author}
            </p>

            <p className="text-gray-700 font-semibold mt-2">
              ${resv.book.price}
            </p>

            <p className="text-indigo-600 mt-2 text-sm">
              Reserved until:{" "}
              {new Date(resv.reservedUntil).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
