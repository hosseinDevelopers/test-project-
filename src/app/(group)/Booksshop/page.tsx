import ArticleList from "@/commponents/article";
import Article from "@/commponents/article";
import Container from "@/commponents/container";
import Link from "next/link";
import React from "react";
export interface IUser {
  id: number;
  username: string;
}
export interface IReservation {
  id?: number;
  reserved_at?: string;
  reserved_until?: string;
  status?: 'active' | 'expired' | 'completed';
  user?: IUser;
}
export interface Iarticle {
  id?: number;
  title?: string;
  author?: string;
  price?: number;
  stars?: string;
  image_url?: string;
  description?: string;
  reservation_duration?: number
  status?: 'available' | 'reserved';
  reservations?: IReservation[];
}

async function Books() {
  
   const res = await fetch("http://localhost:3001/book/all");
   const data = (await res.json()) as Iarticle[];

  return (
    <Container>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mt-10">
      {data.map(item => (
        <Link className='' key={item.id} href={`/Booksshop/${item.id}`}>
          <ArticleList {...item} />
        </Link>
      ))}
    </div>
    </Container>
  );
}

export default Books;
