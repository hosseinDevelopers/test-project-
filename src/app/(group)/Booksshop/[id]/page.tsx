import Articledinamik from "@/commponents/articledinamik";
import { Iarticle } from "../page";



interface IProductProps {
  params: { id: string };
}
export const dynamic = "force-dynamic";
export default async function BookCardSimple({ params }: IProductProps) {
  const id = params.id;

  const res = await fetch(`http://localhost:3001/book/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <p className="text-center mt-10 text-red-600">خطا در دریافت اطلاعات کتاب</p>;
  }

  const data = (await res.json()) as Iarticle;
  

  return (
    <div className="p-6">
      <Articledinamik book={data} />
    </div>
  );
}

