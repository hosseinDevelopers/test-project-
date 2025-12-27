'use client'
import { Iarticle } from "@/app/(group)/Booksshop/page";
import ArticleAdmin from "@/commponents/articleAdmin";
import Link from "next/link"
import { useEffect, useState } from "react";

function BookAdmin() {
  const [data, setData] = useState<Iarticle[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/all`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {data.map((item) => (
            <Link className="" key={item.id} href={`/book/${item.id}`}>
              <ArticleAdmin {...item} />
            </Link>
          ))}
        </div>
    </div>
  );
}

export default BookAdmin;
