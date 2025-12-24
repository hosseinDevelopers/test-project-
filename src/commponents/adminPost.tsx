'use client'
import React, { useState } from "react";

function AdminPost() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    stars: "",
    img: "",
    description: "",
    reservationDuration: 30,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    
    const payload = {
      ...form,
      price: Number(form.price),
      stars: Number(form.stars),
      reservationDuration: Number(form.reservationDuration),
    };

    const response = await fetch("http://localhost:3001/book/postBook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include"
    });

    if (!response.ok) throw new Error("خطا در ارسال داده به سرور");

    setMessage("The book was added ✅");
    setForm({
      title: "",
      author: "",
      price: "",
      stars: "",
      img: "",
      description: "",
      reservationDuration: 30,
    });
  } catch (err) {
    console.error(err);
    setMessage("❌ مشکلی در ثبت کتاب پیش آمد!");
  } finally {
    setLoading(false);
  }
};


  const inputClass = "p-3 rounded-xl border border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition shadow-sm bg-indigo-50";

  return (
    <div className="flex items-center justify-center p-6  min-h-screen">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8">
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center">
          📚 Admin Panel - Add Book
        </h2>

        {message && (
          <p className="text-center mb-6 font-semibold text-gray-700">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Book Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className={inputClass}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Author</label>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className={inputClass}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price"
              className={inputClass}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Rating (0-5)</label>
            <input
              type="number"
              min="0"
              max="5"
              name="stars"
              value={form.stars}
              onChange={handleChange}
              placeholder="Enter rating"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Reservation Time (minutes)</label>
            <input
              type="number"
              min="1"
              name="reservationDuration"
              value={form.reservationDuration}
              onChange={handleChange}
              placeholder="مثلاً 60 برای یک ساعت"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 font-semibold text-gray-700">Cover Image URL</label>
            <input
              type="text"
              name="img"
              value={form.img}
              onChange={handleChange}
              placeholder="Enter image URL"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter book description"
              rows={4}
              className={inputClass + " resize-none"}
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-indigo-500 hover:bg-indigo-600"
              } text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-md`}
            >
              {loading ? <p>Posting...</p> : <p>Add Book</p>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminPost;
