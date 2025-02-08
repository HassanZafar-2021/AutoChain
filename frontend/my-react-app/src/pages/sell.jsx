import { useState } from "react";

const Sell = () => {
  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    mileage: "",
    price: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Sell Your Car</h2>
      <form className="space-y-4 mt-4">
        <input
          type="text"
          name="make"
          placeholder="Make"
          onChange={handleChange}
          className="p-2 border"
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          onChange={handleChange}
          className="p-2 border"
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          onChange={handleChange}
          className="p-2 border"
        />
        <input
          type="number"
          name="mileage"
          placeholder="Mileage"
          onChange={handleChange}
          className="p-2 border"
        />
        <input
          type="number"
          name="price"
          placeholder="Price ($)"
          onChange={handleChange}
          className="p-2 border"
        />
        <button className="bg-blue-500 text-white px-4 py-2">List Car</button>
      </form>
    </div>
  );
};

export default Sell;
