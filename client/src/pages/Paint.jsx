import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header, Navbar, Footer, Analysis } from "../components/components";
import axios from "axios";

const Paint = () => {
  const { id } = useParams();
  const [paint, setPaint] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/paint/${id}`);
        setPaint(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id, setPaint]);

  return (
    <section id="paint">
      <Header />
      <Navbar />
      <Analysis paint={paint} />
      <Footer />
    </section>
  );
};

export default Paint;
