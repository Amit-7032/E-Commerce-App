import React from "react";

const EmptyCart = ({ setShowCartModal }) => {
  return (
    <>
      <div className="container">
        <img src="/shopping.png" alt="Shopping Cart" className="image" />
        <h1 className="heading">Your Cart is Empty!</h1>
        <p className="text">There are no items in your cart.</p>
      </div>
      <div className="mt-3 flex justify-center">
        <button
          type="button"
          className="empty-cart-button"
          onClick={() => setShowCartModal(false)}
        >
          Continue Shopping
        </button>
      </div>
    </>
  );
};

export default EmptyCart;
