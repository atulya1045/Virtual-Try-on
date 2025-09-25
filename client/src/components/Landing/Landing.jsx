import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ErrorModal } from "../components";
import paint1 from "../../assests/paint1.png";
import paint2 from "../../assests/paint2.png";
import paint3 from "../../assests/paint3.png";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [showModal, setShowModal] = useState(false);
  var slideIndex = 1;
  var myTimer;
  var slideshowContainer;

  // NEXT AND PREVIOUS CONTROL
  function plusSlides(n) {
    clearInterval(myTimer);
    if (n < 0) {
      showSlides((slideIndex -= 1));
    } else {
      showSlides((slideIndex += 1));
    }
    //COMMENT OUT THE LINES BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
    if (n === -1) {
      myTimer = setInterval(function () {
        plusSlides(n + 2);
      }, 4000);
    } else {
      myTimer = setInterval(function () {
        plusSlides(n + 1);
      }, 4000);
    }
  }

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (Array.from(slides).length !== 0) {
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }

      slides[slideIndex - 1].style.display = "block";
    } else {
      pause();
    }
  }

  const pause = () => {
    clearInterval(myTimer);
  };

  const resume = () => {
    clearInterval(myTimer);
    myTimer = setInterval(function () {
      plusSlides(slideIndex);
    }, 4000);
  };

  const load = () => {
    showSlides(slideIndex);
    myTimer = setInterval(function () {
      plusSlides(1);
    }, 4000);

    //COMMENT OUT THE LINE BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
    slideshowContainer = document.getElementsByClassName("slideshow-inner")[0];

    //UNCOMMENT OUT THE LINE BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
    // slideshowContainer = document.getElementsByClassName('slideshow-container')[0];

    slideshowContainer.addEventListener("mouseenter", pause);
    slideshowContainer.addEventListener("mouseleave", resume);
  };

  const handleClick = () => {
    if (user) {
      pause();
      navigate("/shop");
    } else {
      setShowModal(true);
    }
  };

  return (
    <section
      id="landing"
      onLoad={load}
      className="bg-white mt-5 dark:bg-blue-500"
    >
      {/* Error Modal */}
      {showModal && <ErrorModal setShowModal={setShowModal} pause={pause} />}
      <div className="grid items-center pt-6 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:pt-12 lg:grid-cols-12">
        <div className="place-self-center mr-auto lg:col-span-7">
          <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
            Visualize Home Decor
          </h1>
          <p className="mb-6 max-w-2xl font-semibold text-slate-700 lg:mb-8 md:text-lg lg:text-xl dark:text-slate-800">
            An easy webapp for visualizing the colors and textures fo your walls
            from the comfort of your Home. Harness the power of machine learning
            while staying out of MLOps!
          </p>
          <button
            onClick={handleClick}
            id="get-started-mid"
            className="cursor-pointer inline-flex font-bold justify-center items-center py-3 px-5 mr-3 text-base text-center text-slate-50 rounded-lg bg-slate-900 ease-in-out delay-100 hover:bg-black focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-900"
          >
            GET STARTED
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <div className="slideshow-container">
            <div className="slideshow-inner">
              <div className="mySlides fade">
                <img
                  src={paint1}
                  alt="paint1"
                  className="shadow-xl shadow-gray-700"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="mySlides fade">
                <img
                  src={paint2}
                  alt="paint2"
                  className="shadow-xl shadow-gray-700"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="mySlides fade">
                <img
                  src={paint3}
                  alt="paint3"
                  className="shadow-xl shadow-gray-700"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
