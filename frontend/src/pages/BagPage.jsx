import React, { useState, useRef, useEffect } from "react";
import img1 from "../assets/image/nike.png";
import img2 from "../assets/image/adidas.png";

const BagPage = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Nike",
      description: "Nike Air Force Premium",
      price: 98.23,
      image: img1,
      quantity: 1,
    },
    {
      id: 2,
      name: "adidas",
      description: "DAILY 3.0 SHOES",
      price: 98.23,
      image: img2,
      quantity: 1,
    },
  ]);

  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    card: "",
    address: "",
    postalCode: "",
    city: "",
    region: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: null,
    card: null,
    address: null,
    postalCode: null,
    city: null,
    region: null,
  });

  const [paymentResult, setPaymentResult] = useState(null);

  const modalRef = useRef(null);

  // Gestion quantité & suppression
  const handleQuantityChange = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Totaux
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = items.length > 0 ? 20 : 0;
  const tax = items.length > 0 ? 6 : 0;
  const discount = items.length > 0 ? 6 : 0;
  const total = subtotal + shipping + tax - discount;

  // Validations
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateCard = (card) => {
    const cleaned = card.replace(/\s+/g, "");
    const re = /^\d{16}$/;
    return re.test(cleaned);
  };

  const validateAddress = (address) => address.trim().length > 0;

  const validatePostalCode = (postalCode) => {
    // Par exemple français 5 chiffres ou alphanumérique US
    const re = /^[0-9]{5}$|^[A-Za-z0-9]{3,10}$/;
    return re.test(postalCode.trim());
  };

  const validateCity = (city) => city.trim().length > 0;

  const validateRegion = (region) => region.trim().length > 0;

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return validateEmail(value) ? null : "Email invalide";
      case "card":
        return validateCard(value)
          ? null
          : "Numéro de carte invalide (16 chiffres)";
      case "address":
        return validateAddress(value) ? null : "Adresse obligatoire";
      case "postalCode":
        return validatePostalCode(value) ? null : "Code postal invalide";
      case "city":
        return validateCity(value) ? null : "Ville obligatoire";
      case "region":
        return validateRegion(value) ? null : "Région obligatoire";
      default:
        return null;
    }
  };

  // Gestion des changements dans le formulaire
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));

    setPaymentResult(null);
  };

  const isFormValid =
    !Object.values(formErrors).some((err) => err !== null) &&
    Object.values(formData).every((val) => val.trim() !== "");

  const handlePayment = () => {
    if (!isFormValid) return;

    const maxAllowed = 200;
    if (total <= maxAllowed) {
      setPaymentResult("valid");
      setItems([]);
    } else {
      setPaymentResult("refused");
    }
  };

  // Fermeture du modal si click hors modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowCheckout(false);
        setPaymentResult(null);
      }
    };

    if (showCheckout) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCheckout]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white/70 to-sky-100/40 p-4 md:p-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        {/* Bag Items */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-bold">Your Bag</h2>
          {items.length === 0 ? (
            <div className="bg-white p-2 rounded-2xl shadow-lg text-center text-gray-500">
              Panier vide
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-4 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-[200px] flex-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 md:w-28 md:h-28 object-contain rounded-xl bg-white p-2 shadow"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                    <p className="mt-2 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0 flex-shrink-0">
                  <div className="flex items-center border rounded-md px-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="text-xl px-2 select-none"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      −
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="text-xl px-2 select-none"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-sm underline text-gray-700 whitespace-nowrap"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="w-full max-w-md md:w-96 h-fit bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold">Summary</h2>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping and delivery</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Discount</span>
              <span>−${discount.toFixed(2)}</span>
            </div>
          </div>
          <hr />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => setShowCheckout(true)}
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition"
            disabled={items.length === 0}
          >
            Checkout →
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate-fadeIn">
          <div
            ref={modalRef}
            className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => {
                setShowCheckout(false);
                setPaymentResult(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              aria-label="Close checkout form"
            >
              &times;
            </button>

            <h3 className="text-3xl font-semibold mb-6 text-center">
              Checkout
            </h3>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleFormChange}
                className={`w-full rounded-lg border px-4 py-3 placeholder-gray-400 focus:outline-none transition ${
                  formErrors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
                required
              />
              {formErrors.email && (
                <p className="mt-1 text-red-600 text-sm">{formErrors.email}</p>
              )}
            </div>

            {/* Card */}
            <div className="mb-4">
              <label
                htmlFor="card"
                className="block mb-1 font-medium text-gray-700"
              >
                Numéro de carte
              </label>
              <input
                type="text"
                id="card"
                name="card"
                placeholder="1234 5678 9012 3456"
                value={formData.card}
                onChange={(e) => {
                  // Formattage simple avec espaces
                  let val = e.target.value.replace(/\D/g, "");
                  val = val
                    .match(/.{1,4}/g)
                    ?.join(" ")
                    .substr(0, 19) || "";
                  handleFormChange({ target: { name: "card", value: val } });
                }}
                maxLength={19}
                className={`w-full rounded-lg border px-4 py-3 placeholder-gray-400 focus:outline-none transition ${
                  formErrors.card
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
                required
                inputMode="numeric"
                pattern="[0-9 ]*"
              />
              {formErrors.card && (
                <p className="mt-1 text-red-600 text-sm">{formErrors.card}</p>
              )}
            </div>

            {/* Address */}
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block mb-1 font-medium text-gray-700"
              >
                Adresse
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="123 Rue Exemple"
                value={formData.address}
                onChange={handleFormChange}
                className={`w-full rounded-lg border px-4 py-3 placeholder-gray-400 focus:outline-none transition ${
                  formErrors.address
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
                required
              />
              {formErrors.address && (
                <p className="mt-1 text-red-600 text-sm">{formErrors.address}</p>
              )}
            </div>

            {/* Postal Code */}
            <div className="mb-4">
              <label
                htmlFor="postalCode"
                className="block mb-1 font-medium text-gray-700"
              >
                Code Postal
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder="75000"
                value={formData.postalCode}
                onChange={handleFormChange}
                maxLength={10}
                className={`w-full rounded-lg border px-4 py-3 placeholder-gray-400 focus:outline-none transition ${
                  formErrors.postalCode
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
                required
              />
              {formErrors.postalCode && (
                <p className="mt-1 text-red-600 text-sm">{formErrors.postalCode}</p>
              )}
            </div>

            {/* City */}
            <div className="mb-4">
              <label
                htmlFor="city"
                className="block mb-1 font-medium text-gray-700"
              >
                Ville
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Paris"
                value={formData.city}
                onChange={handleFormChange}
                className={`w-full rounded-lg border px-4 py-3 placeholder-gray-400 focus:outline-none transition ${
                  formErrors.city
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
                required
              />
              {formErrors.city && (
                <p className="mt-1 text-red-600 text-sm">{formErrors.city}</p>
              )}
            </div>

            {/* Region */}
            <div className="mb-6">
              <label
                htmlFor="region"
                className="block mb-1 font-medium text-gray-700"
              >
                Région / État
              </label>
              <input
                type="text"
                id="region"
                name="region"
                placeholder="Île-de-France"
                value={formData.region}
                onChange={handleFormChange}
                className={`w-full rounded-lg border px-4 py-3 placeholder-gray-400 focus:outline-none transition ${
                  formErrors.region
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
                required
              />
              {formErrors.region && (
                <p className="mt-1 text-red-600 text-sm">{formErrors.region}</p>
              )}
            </div>

            <button
              onClick={handlePayment}
              disabled={!isFormValid}
              className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                isFormValid
                  ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Pay ${total.toFixed(2)}
            </button>

            {paymentResult === "valid" && (
              <p className="mt-4 text-center text-green-600 font-bold">
                Paiement validé ✅
              </p>
            )}
            {paymentResult === "refused" && (
              <p className="mt-4 text-center text-red-600 font-bold">
                Paiement refusé ❌ (Total supérieur à $200)
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BagPage;
