import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaintCard = () => {
  const [paints, setPaints] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios({
        method: "get",
        url: "http://localhost:8000/paint/all",
      });

      setPaints(response.data);
    };

    fetchData();
  }, [setPaints]);

  return (
    <section className="grid grid-cols-4 p-4">
      {paints.map((paint, index) => {
        return (
          <div
            key={index}
            className=" rounded-lg  shadow-lg bg-slate-200 m-3 text-center"
          >
            <div className="flex flex-col justify-content items-center p-3">
              <div
                className="w-32 h-32"
                style={{ backgroundColor: `${paint.hex}` }}
              ></div>
            </div>
            <div className="flex flex-col justify-content items-center">
              <div className="p-6">
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 ">
                  {paint.name}
                </h5>
                <p className="mb-4 text-base text-neutral-600">
                  Color Name: {paint.color}
                  <br />
                  Hex Code: {paint.hex}
                </p>
                <button
                  type="button"
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                  onClick={() => navigate(`/shop/${paint._id}`)}
                >
                  Try Now
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default PaintCard;
