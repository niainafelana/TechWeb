import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import { X, ChevronDown, CreditCard, MapPin, Mail } from "lucide-react";

const BagPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCheckout, setShowCheckout] = useState(false);
  const [activeTab, setActiveTab] = useState("credit-card");
  const [formData, setFormData] = useState({
    email: "",
    card: "",
    expiry: "",
    cvc: "",
    address: "",
    postalCode: "",
    city: "",
    region: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: null,
    card: null,
    expiry: null,
    cvc: null,
    address: null,
    postalCode: null,
    city: null,
    region: null,
  });

  const [paymentResult, setPaymentResult] = useState(null);
  const modalRef = useRef(null);

  // Cart operations
  const handleQuantityChange = (id, delta) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + delta);
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 20 : 0;
  const tax = cartItems.length > 0 ? 6 : 0;
  const discount = cartItems.length > 0 ? 6 : 0;
  const total = subtotal + shipping + tax - discount;

  // Validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateCard = (card) => /^\d{16}$/.test(card.replace(/\s+/g, ""));
  const validateExpiry = (expiry) => /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiry);
  const validateCVC = (cvc) => /^\d{3,4}$/.test(cvc);
  const validateAddress = (address) => address.trim().length > 0;
  const validatePostalCode = (postalCode) => /^[0-9]{5}$|^[A-Za-z0-9]{3,10}$/.test(postalCode.trim());
  const validateCity = (city) => city.trim().length > 0;
  const validateRegion = (region) => region.trim().length > 0;

  const validateField = (name, value) => {
    switch (name) {
      case "email": return validateEmail(value) ? null : "Invalid email";
      case "card": return validateCard(value) ? null : "Invalid card number";
      case "expiry": return validateExpiry(value) ? null : "MM/YY format";
      case "cvc": return validateCVC(value) ? null : "3-4 digit code";
      case "address": return validateAddress(value) ? null : "Required";
      case "postalCode": return validatePostalCode(value) ? null : "Invalid";
      case "city": return validateCity(value) ? null : "Required";
      case "region": return validateRegion(value) ? null : "Required";
      default: return null;
    }
  };

  // Form handling
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    setPaymentResult(null);
  };

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, "").match(/.{1,4}/g)?.join(" ").substr(0, 19) || "";
  };

  const formatExpiry = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})/, "$1/")
      .substr(0, 5);
  };

  const handlePayment = () => {
    if (!isFormValid) return;
    
    // Simulate payment processing
    setTimeout(() => {
      const maxAllowed = 200;
      if (total <= maxAllowed) {
        setPaymentResult("valid");
        dispatch(clearCart());
      } else {
        setPaymentResult("refused");
      }
    }, 1500);
  };

  const isFormValid = !Object.values(formErrors).some(err => err !== null) &&
    Object.values(formData).every(val => val.trim() !== "");

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowCheckout(false);
        setPaymentResult(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white/70 to-sky-100/40 p-4 md:p-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* Bag Items */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Bag</h2>
          {cartItems.length === 0 ? (
            <div className="bg-white p-6 rounded-2xl shadow-sm text-center text-gray-500">
              Your bag is empty
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm p-6 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4 min-w-[200px] flex-1">
                  <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center p-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-contain h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                    <p className="mt-2 font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="flex items-center border rounded-lg px-3 py-1">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="text-gray-500 hover:text-gray-900 px-1"
                    >
                      −
                    </button>
                    <span className="px-2 text-gray-700">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="text-gray-500 hover:text-gray-900 px-1"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-sm text-red-500 hover:text-red-700 underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-96 h-fit bg-white rounded-2xl shadow-sm p-6 space-y-6 sticky top-8">
          <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span className="font-medium">−${discount.toFixed(2)}</span>
            </div>
          </div>
          <hr className="border-gray-200" />
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => setShowCheckout(true)}
            disabled={cartItems.length === 0}
            className={`w-full py-3 rounded-xl text-white font-semibold transition-all ${
              cartItems.length > 0
                ? "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Modern Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
          <div ref={modalRef} className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="border-b border-gray-200 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Checkout</h3>
              <button
                onClick={() => {
                  setShowCheckout(false);
                  setPaymentResult(null);
                }}
                className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            {/* Payment Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("credit-card")}
                  className={`flex-1 py-4 font-medium text-sm flex items-center justify-center gap-2 ${
                    activeTab === "credit-card"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <CreditCard size={16} />
                  Credit Card
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Payment Form */}
              {activeTab === "credit-card" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail size={16} className="text-gray-400" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleFormChange}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 ${
                        formErrors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <CreditCard size={16} className="text-gray-400" />
                      Card Information
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <input
                          type="text"
                          name="card"
                          placeholder="1234 5678 9012 3456"
                          value={formatCardNumber(formData.card)}
                          onChange={(e) => {
                            handleFormChange({
                              target: {
                                name: "card",
                                value: formatCardNumber(e.target.value)
                              }
                            });
                          }}
                          className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 ${
                            formErrors.card
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          }`}
                        />
                        {formErrors.card && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.card}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          value={formatExpiry(formData.expiry)}
                          onChange={(e) => {
                            handleFormChange({
                              target: {
                                name: "expiry",
                                value: formatExpiry(e.target.value)
                              }
                            });
                          }}
                          className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 ${
                            formErrors.expiry
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          }`}
                        />
                        {formErrors.expiry && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.expiry}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          name="cvc"
                          placeholder="CVC"
                          value={formData.cvc}
                          onChange={handleFormChange}
                          maxLength="4"
                          className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 ${
                            formErrors.cvc
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          }`}
                        />
                        {formErrors.cvc && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.cvc}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      Shipping Information
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="123 Main St"
                      value={formData.address}
                      onChange={handleFormChange}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 ${
                        formErrors.address
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      }`}
                    />
                    {formErrors.address && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="ZIP Code"
                        value={formData.postalCode}
                        onChange={handleFormChange}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 ${
                          formErrors.postalCode
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        }`}
                      />
                      {formErrors.postalCode && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.postalCode}</p>
                      )}
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleFormChange}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 ${
                          formErrors.city
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        }`}
                      />
                      {formErrors.city && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <select
                        name="region"
                        value={formData.region}
                        onChange={handleFormChange}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 appearance-none ${
                          formErrors.region
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        }`}
                      >
                        <option value="">Select Region/State</option>
                        <option value="Île-de-France">Île-de-France</option>
                        <option value="Auvergne-Rhône-Alpes">Auvergne-Rhône-Alpes</option>
                        <option value="Nouvelle-Aquitaine">Nouvelle-Aquitaine</option>
                        <option value="Occitanie">Occitanie</option>
                        <option value="Hauts-de-France">Hauts-de-France</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                    {formErrors.region && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.region}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={!isFormValid}
                className={`w-full py-3.5 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2 ${
                  isFormValid
                    ? "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {paymentResult === null ? (
                  <>
                    Pay ${total.toFixed(2)}
                    <CreditCard size={18} />
                  </>
                ) : paymentResult === "processing" ? (
                  "Processing..."
                ) : null}
              </button>

              {/* Payment Result */}
              {paymentResult === "valid" && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-green-700 text-center">
                  <p className="font-medium">Payment successful!</p>
                  <p className="text-sm">Your order has been placed.</p>
                </div>
              )}
              {paymentResult === "refused" && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-red-700 text-center">
                  <p className="font-medium">Payment declined</p>
                  <p className="text-sm">Total exceeds $200 limit.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BagPage; 