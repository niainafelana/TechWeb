import React from "react";
import img1 from "../assets/image/nike.png";
import img2 from "../assets/image/adidas.png";

const BagPage = () => {
  const items = [
    {
      id: 1,
      name: "Nike",
      description: "Nike Air Force Premium",
      price: 98.23,
      image: img1, // image statique à adapter
    },
    {
      id: 2,
      name: "adidas",
      description: "DAILY 3.0 SHOES",
      price: 98.23,
      image: img2, // image statique à adapter
    },
  ];

  const summary = {
    subtotal: 90,
    shipping: 20,
    tax: 6,
    discount: 6,
    total: 164.46,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br max-w-[1400px] mx-auto mt-4  from-white/70 to-sky-100/40 p-4 md:p-10">
      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        {/* Your Bag */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-bold">Your Bag</h2>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center gap-4 md:justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-contain rounded-xl bg-white p-2 shadow"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                  <p className="mt-2 font-medium">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div className="flex items-center border rounded-md px-2">
                  <button className="text-xl px-2">−</button>
                  <span className="px-2">1</span>
                  <button className="text-xl px-2">+</button>
                </div>
                <button className="text-sm underline text-gray-700">Remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="w-full md:w-96 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold">Summary</h2>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${summary.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping and delivery</span>
              <span>${summary.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${summary.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Discount</span>
              <span>−${summary.discount.toFixed(2)}</span>
            </div>
          </div>
          <hr />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${summary.total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-900 transition">
            Checkout →
          </button>
        </div>
      </div>
    </div>
  );
};

export default BagPage;
