// import React, { useEffect, useState } from "react";
// import axiosAuth from "../api/axiosAuth";
// import Swal from "sweetalert2";

// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import LockIcon from "@mui/icons-material/Lock";

// export default function Checkout() {
//   const [cartItems, setCartItems] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);

//   const [formData, setFormData] = useState({
//     email: "",
//     firstName: "",
//     lastName: "",
//     address: "",
//     city: "",
//     state: "",
//     pin: "",
//     cardNumber: "",
//     expiry: "",
//     cvv: "",
//     nameOnCard: "",
//   });

//   const FREE_SHIPPING_LIMIT = 100;

//   /* ================= FETCH CART ================= */

//   const fetchCart = async () => {
//     try {
//       const res = await axiosAuth.get("/cart");
//       setCartItems(res.data);

//       const total = res.data.reduce(
//         (sum, item) =>
//           sum + Number(item.prod_price) * Number(item.Quantity),
//         0
//       );

//       setSubtotal(total);
//     } catch (err) {
//       console.error("Checkout cart error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const shippingCost = subtotal >= FREE_SHIPPING_LIMIT ? 0 : 40;
//   const totalAmount = subtotal + shippingCost;

//   /* ================= HANDLE INPUT ================= */

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   /* ================= PAYMENT ================= */

//   const handlePayment = (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.cardNumber) {
//       return Swal.fire("Error", "Please fill all required fields", "error");
//     }

//     Swal.fire({
//       icon: "success",
//       title: "Payment Successful!",
//       text: "Your order has been placed successfully.",
//       confirmButtonColor: "#0d6efd",
//     });
//   };

//   return (
//     <div className="container-fluid bg-light min-vh-100 py-5">
//       <div className="container">
//         <div className="row">

//           {/* ================= LEFT FORM ================= */}
//           <div className="col-lg-7 bg-white p-4 rounded shadow-sm">

//             <h4 className="mb-4">Contact</h4>

//             <input
//               type="email"
//               name="email"
//               className="form-control mb-3"
//               placeholder="Email address"
//               onChange={handleChange}
//             />

//             <h4 className="mt-4 mb-3">Delivery</h4>

//             <div className="row">
//               <div className="col-md-6 mb-3">
//                 <input
//                   name="firstName"
//                   className="form-control"
//                   placeholder="First name"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="col-md-6 mb-3">
//                 <input
//                   name="lastName"
//                   className="form-control"
//                   placeholder="Last name"
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <input
//               name="address"
//               className="form-control mb-3"
//               placeholder="Address"
//               onChange={handleChange}
//             />

//             <div className="row">
//               <div className="col-md-4 mb-3">
//                 <input
//                   name="city"
//                   className="form-control"
//                   placeholder="City"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="col-md-4 mb-3">
//                 <input
//                   name="state"
//                   className="form-control"
//                   placeholder="State"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="col-md-4 mb-3">
//                 <input
//                   name="pin"
//                   className="form-control"
//                   placeholder="PIN Code"
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <h4 className="mt-4 mb-3 d-flex align-items-center gap-2">
//               <CreditCardIcon /> Payment
//             </h4>

//             <div className="border p-3 rounded bg-light">
//               <input
//                 name="cardNumber"
//                 className="form-control mb-3"
//                 placeholder="Card number"
//                 onChange={handleChange}
//               />

//               <div className="row">
//                 <div className="col-md-6 mb-3">
//                   <input
//                     name="expiry"
//                     className="form-control"
//                     placeholder="Expiry (MM/YY)"
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <input
//                     name="cvv"
//                     className="form-control"
//                     placeholder="Security code"
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <input
//                 name="nameOnCard"
//                 className="form-control"
//                 placeholder="Name on card"
//                 onChange={handleChange}
//               />
//             </div>

//             <button
//               className="btn btn-primary w-100 mt-4"
//               onClick={handlePayment}
//             >
//               <LockIcon fontSize="small" /> Pay Now
//             </button>
//           </div>

//           {/* ================= RIGHT SUMMARY ================= */}
//           <div className="col-lg-5">
//             <div className="bg-white p-4 rounded shadow-sm">

//               <h5 className="mb-4">Order Summary</h5>

//               {cartItems.map((item) => (
//                 <div
//                   key={item.ProductID}
//                   className="d-flex justify-content-between mb-3"
//                 >
//                   <div className="d-flex gap-3">
//                     <img
//                       src={`http://localhost:5000/images/Jewelry/${item.prod_image}`}
//                       width="60"
//                       alt=""
//                     />
//                     <div>
//                       <p className="mb-1">{item.prod_title}</p>
//                       <small>Qty: {item.Quantity}</small>
//                     </div>
//                   </div>

//                   <strong>
//                     ₹
//                     {(Number(item.prod_price) *
//                       Number(item.Quantity)).toFixed(2)}
//                   </strong>
//                 </div>
//               ))}

//               <hr />

//               <div className="d-flex justify-content-between">
//                 <span>Subtotal</span>
//                 <span>₹{subtotal.toFixed(2)}</span>
//               </div>

//               <div className="d-flex justify-content-between">
//                 <span>
//                   Shipping{" "}
//                   {shippingCost === 0 && (
//                     <span className="text-success">(Free)</span>
//                   )}
//                 </span>
//                 <span>₹{shippingCost.toFixed(2)}</span>
//               </div>

//               <hr />

//               <div className="d-flex justify-content-between fw-bold fs-5">
//                 <span>Total</span>
//                 <span>₹{totalAmount.toFixed(2)}</span>
//               </div>

//               {subtotal < FREE_SHIPPING_LIMIT && (
//                 <div className="alert alert-info mt-3 d-flex align-items-center gap-2">
//                   <LocalShippingIcon fontSize="small" />
//                   Spend ₹
//                   {(FREE_SHIPPING_LIMIT - subtotal).toFixed(2)} more for free
//                   shipping!
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }





// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function Checkout() {
//   const [deliveryType, setDeliveryType] = useState("ship");

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddressId, setSelectedAddressId] = useState(null);

//   const [user, setUser] = useState(null);

//   const subtotal = products?.reduce(
//     (acc, item) => acc + (item.price || 0) * (item.qty || 0),
//     0
//   ) || 0;

//   const taxes = subtotal * 0.18; // example 18% GST
//   const total = subtotal + taxes;

//   useEffect(() => {
//     fetchCart();
//     fetchAddresses();
//     fetchUser();
//   }, []);

//   //Fetch User
//   const fetchUser = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/user/profile",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//           }
//         }
//       );

//       setUser(res.data.user);

//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };


//   //Fetch Address
//   const fetchAddresses = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/addresses",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//           }
//         }
//       );

//       setAddresses(res.data.addresses);

//       // Auto select default address
//       const defaultAddress = res.data.addresses.find(a => a.IsDefault === 1);
//       if (defaultAddress) {
//         setSelectedAddressId(defaultAddress.id);
//       }

//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//     }
//   };


//   //Fetch Cart 
//   const fetchCart = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/cart",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//           }
//         }
//       );

//       setProducts(res.data.items);
//       setLoading(false);

//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   };

//   const handlePlaceOrder = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/order/place",
//         {
//           addressId: selectedAddressId, // you will fetch this
//           deliveryType,
//           paymentMethod: "card"
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//           }
//         }
//       );

//       alert("Order placed successfully!");
//       fetchCart(); // refresh cart

//     } catch (error) {
//       console.error("Order error:", error);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <>
//       {/* Internal CSS */}
//       <style>
//         {`
//           .checkout-container {
//             min-height: 100vh;
//             background: white;
//           }

//           .checkout-card {
//             border-radius: 12px;
//           }

//           .summary-card {
//             border-radius: 12px;
//             position: sticky;
//             top: 20px;
//           }

//           .product-variant {
//             font-size: 13px;
//             color: gray;
//           }

//           .pay-btn {
//             background: #0d6efd;
//             border-radius: 8px;
//             font-weight: 500;
//           }

//           .pay-btn:hover {
//             background: #0b5ed7;
//           }

//           .summary-card {
//             background: #fafafa;
//           }
//         `}
//       </style>

//       <div className="container-fluid checkout-container py-5">
//         <div className="container">
//           <div className="row g-4">

//             {/* LEFT SIDE */}
//             <div className="col-lg-8">
//               <div className="p-4 checkout-card">
//                 <h3 className="mb-4">Checkout</h3>

//                 {/* Account Row */}
//                 <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-4">
//                   <div className="d-flex align-items-center gap-3">
//                     <div
//                       className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
//                       style={{ width: "40px", height: "40px" }}
//                     >
//                       U
//                     </div>
//                     <div>{user?.email}</div>
//                   </div>
//                   <div style={{ cursor: "pointer" }}>⋮</div>
//                 </div>

//                 {/* Delivery */}
//                 <div className="mb-4 border-bottom pb-4">
//                   <h6 className="mb-3 text-muted">Delivery</h6>

//                   {/* Ship Option */}
//                   <div
//                     className={`p-3 rounded mb-2 ${
//                       deliveryType === "ship"
//                         ? "border border-primary bg-light"
//                         : "border"
//                     }`}
//                     style={{ cursor: "pointer" }}
//                     onClick={() => setDeliveryType("ship")}
//                   >
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div className="d-flex align-items-center gap-2">
//                         <input
//                           type="radio"
//                           checked={deliveryType === "ship"}
//                           readOnly
//                         />
//                         <span>Ship</span>
//                       </div>
//                       <span>🚚</span>
//                     </div>
//                   </div>

//                   {/* Pickup Option */}
//                   <div
//                     className={`p-3 rounded ${
//                       deliveryType === "pickup"
//                         ? "border border-primary bg-light"
//                         : "border"
//                     }`}
//                     style={{ cursor: "pointer" }}
//                     onClick={() => setDeliveryType("pickup")}
//                   >
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div className="d-flex align-items-center gap-2">
//                         <input
//                           type="radio"
//                           checked={deliveryType === "pickup"}
//                           readOnly
//                         />
//                         <span>Pick up</span>
//                       </div>
//                       <span>🏬</span>
//                     </div>
//                   </div>

//                   {/* Ship Details */}
//                   {deliveryType === "ship" && (
//                     <>
//                       <div className="mt-4">
//                         <div className="d-flex justify-content-between align-items-center">
//                           <strong>Ship to</strong>
//                           <span className="text-primary">⌄</span>
//                         </div>

//                         <div className="mt-3">
//                           {addresses.length === 0 ? (
//                             <div className="text-muted">No address found</div>
//                           ) : (
//                             addresses.map((addr) => (
//                               <div
//                                 key={addr.AddressID}
//                                 className={`p-3 rounded mb-2 ${
//                                   selectedAddressId === addr.AddressID
//                                     ? "border border-primary bg-light"
//                                     : "border"
//                                 }`}
//                                 style={{ cursor: "pointer" }}
//                                 onClick={() => setSelectedAddressId(addr.AddressID)}
//                               >
//                                 <div className="d-flex justify-content-between">
//                                   <div>
//                                     <div className="fw-semibold">
//                                       {addr.firstName} {addr.lastName}
//                                     </div>
//                                     <div className="text-muted small">
//                                       {addr.addressLine1}, {addr.city}, {addr.state} - {addr.pincode}
//                                     </div>
//                                   </div>

//                                   <input
//                                     type="radio"
//                                     checked={selectedAddressId === addr.id}
//                                     readOnly
//                                   />
//                                 </div>
//                               </div>
//                             ))
//                           )}
//                         </div>
//                       </div>

//                       <div className="mt-4">
//                         <div className="d-flex justify-content-between align-items-center">
//                           <strong>Shipping method</strong>
//                           <span className="text-primary">⌄</span>
//                         </div>

//                         <div className="mt-2">
//                           Standard · <strong>FREE</strong>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>

//                 {/* Payment */}
//                 <div className="mb-4">
//                   <h5 className="mb-3">Payment</h5>

//                   <input
//                     type="text"
//                     className="form-control mb-3"
//                     placeholder="Card number"
//                   />

//                   <div className="row">
//                     <div className="col-md-6 mb-3">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Expiration date (MM / YY)"
//                       />
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Security code"
//                       />
//                     </div>
//                   </div>

//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Name on card"
//                   />
//                 </div>

//                 {/* Billing Address */}
//                 <div className="mb-4">
//                   <h5 className="mb-3">Billing Address</h5>

//                   <select className="form-select mb-3">
//                     <option>India</option>
//                   </select>

//                   <div className="row">
//                     <div className="col-md-6 mb-3">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="First name"
//                       />
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Last name"
//                       />
//                     </div>
//                   </div>

//                   <input
//                     type="text"
//                     className="form-control mb-3"
//                     placeholder="Address"
//                   />

//                   <input
//                     type="text"
//                     className="form-control mb-3"
//                     placeholder="Apartment, suite (optional)"
//                   />

//                   <div className="row">
//                     <div className="col-md-4 mb-3">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="City"
//                       />
//                     </div>
//                     <div className="col-md-4 mb-3">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="State"
//                       />
//                     </div>
//                     <div className="col-md-4 mb-3">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="PIN code"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   className="btn btn-primary w-100 py-2 pay-btn"
//                   onClick={handlePlaceOrder}
//                   disabled={!selectedAddressId}
//                 >
//                   Pay now
//                 </button>

//               </div>
//             </div>

//             {/* RIGHT SIDE */}
//             <div className="col-lg-4">
//               <div className="shadow-sm p-4 summary-card">
//                 <h5 className="mb-4">Order Summary</h5>

//                 {loading ? (
//                   <div className="text-center py-5">Loading cart...</div>
//                 ) : products.length === 0 ? (
//                   <div className="text-center py-5">Your cart is empty</div>
//                 ) : (
//                   <>
//                     {products.map((item) => (
//                       <div
//                         key={item.id || item._id}
//                         className="d-flex justify-content-between align-items-start mb-4"
//                       >
//                         <div className="d-flex gap-3">
//                           {/* Product Image */}
//                           <div className="position-relative">
//                             <img
//                               src={`http://localhost:5000${item.image}`}
//                               alt={item.name}
//                               className="rounded border"
//                               style={{
//                                 width: "70px",
//                                 height: "70px",
//                                 objectFit: "cover"
//                               }}
//                             />

//                             {/* Quantity Badge */}
//                             <span
//                               className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
//                               style={{ fontSize: "12px" }}
//                             >
//                               {item.qty}
//                             </span>
//                           </div>

//                           {/* Product Info */}
//                           <div>
//                             <div className="fw-semibold">{item.name}</div>
//                             <div className="text-muted small">
//                               {item.variant || ""}
//                             </div>
//                           </div>
//                         </div>

//                         {/* Price */}
//                         <div className="fw-semibold">
//                           ₹{(item.price * item.qty).toFixed(2)}
//                         </div>
//                       </div>
//                     ))}

//                     <hr />

//                     <div className="d-flex justify-content-between mb-2">
//                       <span>Subtotal</span>
//                       <span>₹{subtotal.toFixed(2)}</span>
//                     </div>

//                     <div className="d-flex justify-content-between mb-2">
//                       <span>Shipping</span>
//                       <span>FREE</span>
//                     </div>

//                     <div className="d-flex justify-content-between mb-3">
//                       <span>Estimated taxes</span>
//                       <span>₹{taxes.toFixed(2)}</span>
//                     </div>

//                     <hr />

//                     <div className="d-flex justify-content-between fw-bold fs-5">
//                       <span>Total</span>
//                       <span>₹{total.toFixed(2)}</span>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }





import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Checkout() {
  const [deliveryType, setDeliveryType] = useState("ship");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [cardNumber, setCardNumber] = useState("");

  const [user, setUser] = useState(null);

  // =============================
  // Safe subtotal calculation
  // =============================
  const subtotal =
    products?.reduce((acc, item) => {
      const price = item?.price || item?.prod_price || 0;
      const qty = item?.qty || item?.Quantity || 0;
      return acc + price * qty;
    }, 0) || 0;

  const taxes = subtotal * 0.18;
  const total = subtotal + taxes;

  useEffect(() => {
    fetchCart();
    fetchAddresses();
    fetchUser();
  }, []);

  // =============================
  // Fetch User
  // =============================
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      // If backend returns plain object:
      setUser(res.data?.user || res.data);

    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // =============================
  // Fetch Addresses
  // =============================
  const fetchAddresses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/addresses",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      const addressList = res.data?.addresses || res.data || [];
      setAddresses(addressList);

      // Auto select default
      const defaultAddress = addressList.find(
        (a) => a.IsDefault === 1 || a.isDefault === 1
      );

      if (defaultAddress) {
        setSelectedAddressId(
          defaultAddress.AddressID || defaultAddress.id
        );
      }

    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  // =============================
  // Fetch Cart
  // =============================
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/cart",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setProducts(res.data?.items || res.data || []);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching cart:", error);
      setProducts([]);
      setLoading(false);
    }
  };

  // =============================
  // Place Order
  // =============================
  const handlePlaceOrder = async () => {

    console.log("Selected Address:", selectedAddressId);
    console.log("Card Number:", cardNumber);

    if (!selectedAddressId) {
      alert("Please select address");
      return;
    }

    if (!cardNumber) {
      alert("Please enter card number");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/order/checkout",
        {
          addressId: selectedAddressId,
          cardNumber: cardNumber,
          subtotal,
          shipping: 0,
          total
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Order placed successfully!");
      fetchCart();

    } catch (error) {
      console.error("Order error:", error.response?.data || error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };


  return (
    <>
      {/* Internal CSS */}
      <style>{`
        .checkout-container {
          min-height: 100vh;
          background: white;
        }
        .checkout-card {
          border-radius: 12px;
        }
        .summary-card {
          border-radius: 12px;
          position: sticky;
          top: 20px;
          background: #fafafa;
        }
        .pay-btn {
          border-radius: 8px;
          font-weight: 500;
        }
      `}</style>

      <div className="container-fluid checkout-container py-5">
        <div className="container">
          <div className="row g-4">

            {/* LEFT SIDE */}
            <div className="col-lg-7">
              <div className="p-4 checkout-card">
                <h3 className="mb-4">Checkout</h3>

                {/* User */}
                <div className="d-flex align-items-center gap-3 border-bottom pb-3 mb-4">
                  <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}>
                    U
                  </div>
                  <div>{user?.email || user?.Email}</div>
                </div>

                {/* Delivery */}
                <div className="mb-4">
                  <h6 className="mb-3 text-muted">Delivery</h6>

                  <div className="border rounded p-3">

                    {/* Ship Option */}
                    <div
                      className={`d-flex justify-content-between align-items-center p-2 rounded mb-2 ${
                        deliveryType === "ship" ? "bg-light border border-primary" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => setDeliveryType("ship")}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          checked={deliveryType === "ship"}
                          readOnly
                        />
                        <span>Ship</span>
                      </div>
                      <i className="bi bi-truck"></i>
                    </div>

                    {/* Pick Up Option */}
                    <div
                      className={`d-flex justify-content-between align-items-center p-2 rounded ${
                        deliveryType === "pickup" ? "bg-light border border-primary" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => setDeliveryType("pickup")}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          checked={deliveryType === "pickup"}
                          readOnly
                        />
                        <span>Pick up</span>
                      </div>
                      <i className="bi bi-shop"></i>
                    </div>

                  </div>
                </div>

                {/* Addresses */}
                {/* Ship To */}
                {deliveryType === "ship" && (
                  <div className="mb-4">
                    <h6 className="mb-3 text-muted">Ship to</h6>

                    {addresses.length === 0 ? (
                      <div className="text-muted">No address found</div>
                    ) : (
                      addresses.map((addr) => {
                        const id = addr.AddressID || addr.id;

                        return (
                          <div
                            key={id}
                            className={`border rounded p-3 mb-2 ${
                              selectedAddressId === id
                                ? "border-primary bg-light"
                                : ""
                            }`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setSelectedAddressId(id)}
                          >
                            <div className="d-flex justify-content-between">
                              <div>
                                <div className="fw-semibold">
                                  {addr.FirstName || addr.firstName}{" "}
                                  {addr.LastName || addr.lastName}
                                </div>
                                <div className="text-muted small">
                                  {addr.Address1 || addr.addressLine1},{" "}
                                  {addr.City || addr.city},{" "}
                                  {addr.State || addr.state},{" "}
                                  {addr.PostalCode || addr.pincode}
                                </div>
                              </div>

                              <input
                                type="radio"
                                checked={selectedAddressId === id}
                                readOnly
                              />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                {/* Shipping Method */}
                {deliveryType === "ship" && (
                  <div className="mb-4">
                    <h6 className="mb-3 text-muted">Shipping method</h6>

                    <div className="border rounded p-3 d-flex justify-content-between">
                      <span>Standard</span>
                      <span className="fw-semibold">FREE</span>
                    </div>
                  </div>
                )}
                
                {/* Payment */}
                <div className="mb-4">
                  <h5 className="mb-1">Payment</h5>
                  <div className="text-muted small mb-3">
                    All transactions are secure and encrypted.
                  </div>

                  <div className="border rounded p-3">

                    <div className="mb-3 fw-semibold">
                      Credit card
                    </div>
                    
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Card number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MM / YY"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="CVC"
                        />
                      </div>
                    </div>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name on card"
                    />
                  </div>
                </div>

                {/* Billing Address */}
                <div className="mb-4">
                  <h5 className="mb-3">Billing Address</h5>

                  <select className="form-select mb-3">
                    <option>India</option>
                  </select>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Address"
                  />

                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Apartment, suite (optional)"
                  />

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="State"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="PIN code"
                      />
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-primary w-100 py-2 pay-btn"
                  onClick={handlePlaceOrder}
                  disabled={!selectedAddressId || products.length === 0}
                >
                  Pay now
                </button>

              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-lg-5">
              <div className="shadow-sm p-4 summary-card">
                <h5 className="mb-4 fw-semibold">Order summary</h5>

                {loading ? (
                  <div className="text-center py-5">Loading cart...</div>
                ) : products.length === 0 ? (
                  <div className="text-center py-5">Your cart is empty</div>
                ) : (
                  <>
                    {products.map((item, index) => {
                      const price = item?.price || item?.prod_price || 0;
                      const qty = item?.qty || item?.Quantity || 0;
                      const name = item?.name || item?.prod_title || "Product";
                      const image =
                        item?.image || item?.prod_image || "";

                      return (
                        <div
                          key={item.id || item._id || index}
                          className="d-flex justify-content-between align-items-start mb-4"
                        >
                          <div className="d-flex gap-3">
                            <div className="position-relative">
                              <img
                                src={`http://localhost:5000/images/Jewelry/${item.prod_image}`}
                                width="60"
                                alt=""
                              />
                            
                              <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
                                style={{ fontSize: "12px" }}
                              >
                                {qty}
                              </span>
                            </div>

                            <div>
                              <div className="fw-semibold">{name}</div>
                            </div>
                          </div>

                          <div className="fw-semibold">
                            ₹{(price * qty).toFixed(2)}
                          </div>
                        </div>
                      );
                    })}

                    <hr />

                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipping</span>
                      <span>FREE</span>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <span>Estimated taxes</span>
                      <span>₹{taxes.toFixed(2)}</span>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-between fw-bold fs-5">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
