"use client";

import { useAppSelector } from "@/redux/hooks";
import { cart_product } from "@/redux/slices/cartSlice";
import { remove_wishlist_product, wishlistItems } from "@/redux/slices/wishlistSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const WishlistMain = () => {
  const wishlist = useAppSelector(wishlistItems);
  const dispatch = useDispatch();

  return (
    <div className="cart-area pt-100 pb-100">
      <div className="container">
        {wishlist.length === 0 && (
          <div className="text-center">
            <h3>Your wishlist is empty</h3>
          </div>
        )}
        {wishlist.length >= 1 && (
          <div className="row wow fadeInUp" data-wow-delay=".3s">
            <div className="col-12">
              <div className="table-content table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Images</th>
                      <th className="cart-product-name">Product</th>
                      <th className="product-price">Unit Price</th>
                      <th className="product-quantity">Add to cart</th>
                      <th className="product-subtotal">Total</th>
                      <th className="product-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist.map((item, index) => (
                      <tr key={index}>
                        <td className="product-thumbnail">
                          <Link href={`/shop-details/${item.id}`}>
                            {item?.productImg && (
                              <Image
                                src={item?.productImg}
                                style={{ width: "100%", height: "100%" }}
                                alt="img not found"
                              />
                            )}
                          </Link>
                        </td>
                        <td className="product-name">
                          <Link href={`/shop-details/${item.id}`}>{item.title}</Link>
                        </td>
                        <td className="product-price">
                          <span className="amount">${item.price}</span>
                        </td>
                        <td className="product-quantity">
                          <Link
                            href="/cart"
                            className="border-btn"
                            onClick={() => dispatch(cart_product(item))}
                          >
                            Add to Cart
                          </Link>
                        </td>
                        <td className="product-subtotal">
                          <span className="amount">${item.price}</span>
                        </td>
                        <td className="product-remove">
                          <button
                            type="submit"
                            onClick={() => dispatch(remove_wishlist_product(item))}
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistMain;
