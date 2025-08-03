import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorModal = ({ setShowModal, pause }) => {
  const navigate = useNavigate();

  const click = (e) => {
    const data = e.target.dataset;
    if (data.toggle) {
      setShowModal(false);
    }
  };

  return (
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      style={{ backgroundColor: "rgba(52, 52, 52, 0.8)" }}
      data-toggle="false"
      onClick={click}
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/* CONTENT */}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/* HEADER */}
          <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
            <div className="title font-semibold text-pink-900 text-3xl">
              Error!
            </div>
          </div>

          {/* BODY */}
          <div className="relative p-6 flex-auto">
            <p className="text-2xl mb-4">Please Login before Shopping!</p>
            {/* <p className="flex justify-center title py-2 text-3xl text-pink-900">
              Score: {score}
            </p> */}
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-end px-6 py-4 border-t border-solid border-slate-200 rounded-b">
            <button
              className="bg-cyan-800 text-white active:bg-cyan-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                pause();
                navigate("/login");
              }}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
