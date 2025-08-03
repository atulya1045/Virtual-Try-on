import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Footer, Header, Navbar } from "../components/components";
import PaintCard from "./PaintCard";

function Shop() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <section>
      <Header />
      <Navbar />
      <PaintCard />
      <Footer />
    </section>
  );
}

export default Shop;
