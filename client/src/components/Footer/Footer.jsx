import React from "react";
import { MdOutlineLocalShipping } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { RiSecurePaymentLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="bg-slate-100 py-12">
        <div className="container mx-auto">
          <div className="flex justify-center items-center gap-8">
            <div className="bg-white px-2 py-4 w-1/4 select-none">
              <div className="flex justify-center items-center gap-3">
                <MdOutlineLocalShipping size={40} />
                <div>
                  <p className="font-bold">Free Shipping & Return</p>
                  <p className="text-slate-600">
                    Free shipping on orders over ₹1000
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white px-2 py-4 w-1/4 select-none">
              <div className="flex justify-center items-center gap-3">
                <RiCustomerService2Line size={40} />
                <div>
                  <p className="font-bold">Customer Support 24/7</p>
                  <p className="text-slate-600">
                    Instant access to perfect support
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white px-2 py-4 w-1/4 select-none">
              <div className="flex justify-center items-center gap-3">
                <RiSecurePaymentLine size={40} />
                <div>
                  <p className="font-bold">100% Secure Payment</p>
                  <p className="text-slate-600">We ensure secure payment!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
