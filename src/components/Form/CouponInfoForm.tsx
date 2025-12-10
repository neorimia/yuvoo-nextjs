import React from "react";

const CouponInfoForm: React.FC = () => {
    // handleSubmit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="checkout-coupon">
                <input type="text" placeholder="Coupon Code" required />
                <div className="bd-coupon-btn">
                    <button className="bd-btn" type="submit">
                        <span className="bd-btn-inner">
                            <span className="bd-btn-normal">Apply Coupon</span>
                            <span className="bd-btn-hover">Apply Coupon</span>
                        </span>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CouponInfoForm;
