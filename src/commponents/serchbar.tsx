  'use client';
  import React, { useState, useEffect } from "react";

  interface IBook {
    id: number;
    title: string;
    author: string;
    price: number;
    image_url?: string;
  }

  function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<IBook[]>([]);
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
      if (!query) {
        setResults([]);
        return;
      }

      const timeout = setTimeout(async () => {
        setLoading(true);
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/search?q=${query}`);
          const text = await res.text();
          console.log("Server response:", text);

          let data: IBook[] = [];
          if (text) {
            data = JSON.parse(text);
          }
          setResults(data);
        } catch (err) {
          console.error(err); 
          setResults([]);
        } finally {
          setLoading(false);
        }
      }, 300); 

      
      return () => clearTimeout(timeout);
    }, [query]);

    return (
      <div className="relative w-64">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          className="transition-all duration-300 ease-in-out focus:w-full bg-white text-black w-full rounded-lg outline-none border px-3 py-2"
        />

 
        {query && results.length > 0 && (
          <div className="absolute bg-white border w-full mt-1 rounded shadow-lg max-h-60 overflow-y-auto z-50">
            {results.map((book) => (
              <div
                key={book.id}
                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                onClick={() => {
                  window.location.href = `/Booksshop/${book.id}`;
                }}  
              >
                {book.image_url && (
                  <img
                    src={book.image_url}
                    alt={book.title}
                    className="w-8 h-10 object-cover rounded"
                  />
                )}
                <div>
                  <p className="font-semibold text-sm">{book.title}</p>
                  <p className="text-xs text-gray-500">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        )}


        {loading && (
          <div className="absolute mt-1 bg-white p-2 text-sm text-gray-600">
            Loading...
          </div>
        )}

     
        {query && !loading && results.length === 0 && (
          <div className="absolute mt-1 bg-white p-2 text-sm text-gray-600 w-full rounded border">
            No results found
          </div>
        )}
      </div>
    );
  }

  export default SearchBar;
