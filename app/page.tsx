import Navbar from "@/components/Main/Navbar";
import React from "react";
import Hero from "@/components/Main/Hero";
import Footer from "@/components/Main/Footer";
import Features from "@/components/Main/Features";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
