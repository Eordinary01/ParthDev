"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from submitting the default way
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setSuccessMessage("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSuccessMessage(""), 3000); // Clear the message after 3 seconds
    } else {
      alert("Failed to send message.");
    }
  };

  return (
    <section id="contact">

    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">Contact Me</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="w-full px-3 py-2 border rounded text-black"
              />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="w-full px-3 py-2 border rounded text-black"
              />
          </div>
          <div className="mb-4">
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Lets Collab, drop in your socialz!!"
              className="w-full px-3 py-2 border rounded text-black"
              />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            Send Message
          </button>
          {successMessage && (
            <p className="mt-4 text-green-500 text-center">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
          </section>
  );
}
