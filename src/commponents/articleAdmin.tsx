'use client'
import { Iarticle } from '@/app/(group)/Booksshop/page';
import React, { useEffect, useState } from 'react'

function ArticleAdmin({id, title, author, price, stars, image_url, description}: Iarticle) {
 const [star, setStar] = useState("/images/stare0.jpg");

  useEffect(() => {
    switch (stars) {
      case "0": setStar("/images/stare0.jpg"); break;
      case "1": setStar("/images/stare1.jpg"); break;
      case "2": setStar("/images/stare2.jpg"); break;
      case "3": setStar("/images/stare3.jpg"); break;
      case "4": setStar("/images/stare4.jpg"); break;
      case "5": setStar("/images/stare5.jpg"); break;
      default: setStar("/images/stare0.jpg"); 
    }
  }, [stars]);

  return (
    <div className="">
     
        <div
          className="bg-gray-200 rounded-3xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
        
          <div className="relative w-full h-64 bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300 flex items-center justify-center">
            <img
              className="max-h-56 object-contain"
              src={image_url}
              alt=""
            />
          </div>

         
          <div className="p-5 flex flex-col gap-3">
            <h3 className="text-2xl font-bold text-gray-800 tracking-wide hover:text-indigo-600 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 text-sm font-medium line-clamp-2">
              {author}
            </p>

          
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1">
                <img
                  className="w-24"
                  src={star}
                  alt=""
                />
              </div>
              <p className="text-lg font-semibold text-gray-700">
                <span className="text-gray-500 text-sm font-normal">Price: </span>${price}
              </p>
            </div>
          </div>
        </div>

    </div>
  )
}

export default ArticleAdmin
