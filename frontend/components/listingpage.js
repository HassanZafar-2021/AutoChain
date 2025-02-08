"use client";

import { useState } from "react";

const ListingPage = () => {
  const [formData, setFormData] = useState({
    brand: "",
    make: "",
    year: "",
    miles: "",
    price: "",
    images: null,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to imgbb
    const formDataImg = new FormData();
    formDataImg.append("image", formData.images);
    const imgbbResponse = await fetch("https://api.imgbb.com/1/upload?key=dc59cbfee7e507084b6442d6af8e8b2f", {
      method: "POST",
      body: formDataImg,
    });
    const imgbbData = await imgbbResponse.json();
    const imageUrl = imgbbData.data.url;

    // Send image URL to FastAPI backend
    const response = await fetch("http://localhost:8000/process_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });
    const data = await response.json();
    console.log(data.hostedImageUrl); // URL of the pixel art image

    // Handle the rest of the form submission logic here
    console.log(formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-black shadow-lg rounded-xl border border-gray-800 text-white">
      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400">
        List Your Car on Solana
      </h2>
      <form onSubmit={handleSubmit}>
        {[{ label: "Brand", name: "brand", type: "text" }, { label: "Make", name: "make", type: "text" }, { label: "Year", name: "year", type: "number" }, { label: "Miles", name: "miles", type: "number" }, { label: "Price", name: "price", type: "number" }].map(({ label, name, type }) => (
          <div className="mb-4" key={name}>
            <label className="block text-gray-400">{label}</label>
            <input type={type} name={name} value={formData[name]} onChange={handleChange} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" required />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-gray-400">Images</label>
          <input type="file" name="images" onChange={handleChange} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" required />
        </div>

        <button type="submit" className="w-full py-3 px-4 rounded-lg text-lg font-semibold bg-gradient-to-r from-green-400 to-purple-400 hover:from-purple-400 hover:to-green-400 transition-all shadow-lg">
          Submit to Blockchain
        </button>
      </form>
    </div>
  );
};

export default ListingPage;