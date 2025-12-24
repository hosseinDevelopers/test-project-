'use client'
import Container from "@/commponents/container";
import { useSidebarContext } from "@/context/bookscontext";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div className="">
      <Container>
        <div className="flex justify-between mt-20">
          <div className="mt-6">
          <pre className="text-4xl ">Books  are a window to<br/> <pre className="text-4xl text-center">unknown worlds</pre></pre>
          <Link href={"/Booksshop"}>
               <button className="p-2 bg-amber-400 rounded-sm block m-auto mt-10 text-2xl cursor-pointer hover:bg-amber-300">Buy books</button>
          </Link>
          <img className="rounded-2xl w-60 mt-2" src="/images/women1.png" alt="" />
          </div>
          <div>
          <img className=" rounded-2xl w-150" src="/images/Library1.png" alt="" />
          </div> 
        </div>
         <div className="flex justify-between mt-20">
          <div>
            <img className="w-150 rounded-2xl" src="/images/wonmen2.png" alt="" />
          </div>
          <div>
            <img className="ml-60 mb-10 w-60" src="/images/icon.png" alt="" />
             <pre className="text-4xl text-center">unknown worlds</pre>
          <Link href={"/Shoppingcart"}>
               <button className="p-2 bg-amber-400 rounded-sm block m-auto mt-10 text-2xl cursor-pointer hover:bg-amber-300">Purchases</button>
          </Link>
          </div>
         </div>
    </Container>
    </div>
  );
}
