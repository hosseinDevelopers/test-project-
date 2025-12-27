"use client";
import { Iarticle } from "@/app/(group)/Booksshop/page";
import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { Trash2, Edit3 } from "lucide-react";
import { useRouter } from "next/router";
interface IProductProps {
  params: { id: string };
}
export interface UpdateBookPayload {
  title?: string;
  author?: string;
  price?: number;
  stars?: string;
  img?: string;
  description?: string;
  reservationDuration?: number;
}

function Dynamikroute({ params }: IProductProps) {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Iarticle | null>(null);
  const [star, setStar] = useState("/images/stare0.jpg");
  const [editing, setEditing] = useState(false); // حالت ویرایش فعال یا غیرفعال
  const [editData, setEditData] = useState<UpdateBookPayload | null>(null);

  const handleEditClick = () => {
    if (!data) return;

    setEditData({
      title: data.title,
      author: data.author,
      price: data.price,
      stars: data.stars,
      img: data.image_url,
      description: data.description,
      reservationDuration: data.reservation_duration,
    });

    setEditing(true);
  };

  useEffect(() => {
    fetch(`http://localhost:3001/book/${id}`, {
      cache: "no-store",
    })
      .then((respanse) => respanse.json())
      .then((datares) => setData(datares))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return; 
    try {
      const res = await fetch(`http://localhost:3001/book/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        alert("Delete failed");
        return;
      }

  
      window.location.href = "/panel";
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  useEffect(() => {
    switch (data?.stars) {
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
  }, [data?.stars]);
  return (
    <div>
      <div className="flex flex-col md:flex-row m-auto mt-20 w-11/12 sm:w-3/4 lg:w-2/3 bg-gray-200 rounded-3xl shadow-xl overflow-hidden transition duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* تصویر کتاب */}
        <div className="md:w-1/3 w-full bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300 flex items-center justify-center p-6">
          <img
            src={data?.image_url}
            alt="Book cover"
            className="w-full h-64 object-contain drop-shadow-md rounded-xl"
          />
        </div>

        {/* محتوا */}
        <div className="md:w-2/3 w-full p-8 flex flex-col gap-5">
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
            {data?.title}
          </h1>
          <p className="text-lg font-semibold text-indigo-400">
            by {data?.author}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            {data?.description}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <img src={star} alt="Rating Stars" className="w-24" />
            <span className="text-gray-700 font-medium">{data?.stars}/5</span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold text-gray-900">
              ${data?.price}
            </span>

            <div className="flex items-center gap-3">
              <button
                className="
      flex items-center gap-2
      bg-amber-400 text-white
      px-4 py-2 rounded-xl
      font-semibold
      hover:bg-amber-500
      transition
      shadow
    "
                onClick={handleEditClick}
              >
                <Edit3 size={18} />
                Edit
              </button>

              <button
                className="
      flex items-center gap-2
      bg-red-500 text-white
      px-4 py-2 rounded-xl
      font-semibold
      hover:bg-red-600
      transition
      shadow
    "
                onClick={handleDelete}
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {editing && editData && (
        <form
          onSubmit={async (e) => {
            if (!editData) return; 

            const payload = {
              title: editData.title || undefined,
              author: editData.author || undefined,
              price:
                editData.price !== undefined
                  ? Number(editData.price)
                  : undefined,
              stars:
                editData.stars !== undefined
                  ? Number(editData.stars)
                  : undefined,
              img: editData.img || undefined,
              description: editData.description || undefined,
              reservationDuration:
                editData.reservationDuration !== undefined
                  ? Number(editData.reservationDuration)
                  : undefined,
            };
            e.preventDefault();

            try {
              const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
              });

              if (!res.ok) throw new Error("Update failed");

              const updatedBook = await res.json();
              setData(updatedBook);
              setEditing(false);
              window.location.reload();
            } catch (err) {
              console.error(err);
              alert("Error updating book");
            }
          }}
          className="mt-7 ml-130 p-4 mb-4 bg-gray-200 rounded-xl shadow-md max-w-md"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Edit Book
          </h3>

          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Title</label>
            <input
              className="px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />
          </div>

          {/* Author */}
          <div className="flex flex-col gap-1 mt-3">
            <label className="text-sm font-medium text-gray-600">Author</label>
            <input
              className="px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={editData.author}
              onChange={(e) =>
                setEditData({ ...editData, author: e.target.value })
              }
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1 mt-3">
            <label className="text-sm font-medium text-gray-600">
              Price ($)
            </label>
            <input
              type="number"
              className="px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={editData.price}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  price: Number(e.target.value),
                })
              }
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1 mt-3">
            <label className="text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              rows={3}
              className="px-3 py-2 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={editData.description || ""}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <label className="text-sm font-medium text-gray-600">Stars</label>
            <input
              type="number"
              min={0}
              max={5}
              className="px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={editData.stars ?? ""}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  stars: e.target.value,
                })
              }
            />
          </div>
          {/* Image URL */}
          <div className="flex flex-col gap-1 mt-3">
            <label className="text-sm font-medium text-gray-600">
              Image URL
            </label>
            <input
              className="px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={editData.img || ""}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  img: e.target.value,
                })
              }
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Reservation Duration */}
          <div className="flex flex-col gap-1 mt-3">
            <label className="text-sm font-medium text-gray-600">
              Reservation Duration (days)
            </label>
            <input
              type="number"
              min={1}
              className="px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={editData.reservationDuration ?? ""}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  reservationDuration: Number(e.target.value),
                })
              }
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-5">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-4 py-2 text-sm rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Dynamikroute;
