"use client";
import { useEffect, useState } from "react";

export default function LoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center  bg-gradient-to-b from-indigo-100 via-indigo-300 to-indigo-400 dark:bg-black">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 animate-pulse">
          <img className="shadow rounded-tl-4xl rounded-br-4xl absolute top-63 right-163" src="data:image/png;base64,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" alt="" />
        </h1>
        <div className="relative w-48 h-1 bg-gray-200 overflow-hidden rounded-2xl">
          <div className="absolute left-0 top-0 h-full w-1/3 bg-blue-500 animate-slide" />
        </div>
        <style jsx>{`
          @keyframes slide {
            0% {
              left: -33%;
            }
            100% {
              left: 100%;
            }
          }
          .animate-slide {
            animation: slide 1s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}
