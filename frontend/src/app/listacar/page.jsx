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

  const [nftImageUrl, setNftImageUrl] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

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
    const imgbbResponse = await fetch(
      "https://api.imgbb.com/1/upload?key=dc59cbfee7e507084b6442d6af8e8b2f",
      {
        method: "POST",
        body: formDataImg,
      }
    );
    const imgbbData = await imgbbResponse.json();
    const imageUrl = imgbbData.data.url;

    // Send image URL to FastAPI backend for NFT processing
    const response = await fetch("http://localhost:8000/process_image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });

    const data = await response.json();
    setNftImageUrl(data.hostedImageUrl);
    setShowPopup(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      {/* Wider Layout Wrapper */}
      <div className="w-full max-w-5xl bg-gray-900 border border-gray-700 rounded-3xl shadow-xl p-10">
        <h2 className="text-3xl font-bold text-center text-gray-200 mb-6">
          List Your Car on Solana 🚗
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Left Side Form Fields */}
          <div className="space-y-5">
            {[
              { label: "Brand", name: "brand", type: "text" },
              { label: "Make", name: "make", type: "text" },
              { label: "Year", name: "year", type: "number" },
              { label: "Miles", name: "miles", type: "number" },
              { label: "Price", name: "price", type: "number" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-gray-400 font-medium">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-500 outline-none"
                  required
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>

          {/* Right Side: Image Upload & Description */}
          <div className="space-y-5">
            <div>
              <label className="block text-gray-400 font-medium">Images</label>
              <input
                type="file"
                name="images"
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 focus:ring-2 focus:ring-gray-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-500 outline-none"
                required
                rows="4"
                placeholder="Write a short description..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-lg font-bold text-white bg-gray-700 hover:bg-gray-600 transition-all shadow-md transform hover:scale-105"
            >
              🚀 Submit to Blockchain
            </button>
          </div>
        </form>
      </div>

      {/* NFT Popup */}
      {showPopup && nftImageUrl && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[600px] text-center relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-black text-xl"
              onClick={() => setShowPopup(false)}
            >
              ✖
            </button>

            {/* NFT Display */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">🚀 SUCCESS! 🚀</h3>
            <img
              src={nftImageUrl}
              alt="NFT Preview"
              className="w-full border-4 border-gray-300 p-2 rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingPage;
