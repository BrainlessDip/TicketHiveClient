import React from "react";
import ShowAdvertiseTickets from "../components/ShowAdvertiseTickets";
import LatestTickets from "./../components/LatestTickets";
import PopularRoutes from "../components/PopularRoutes";
import WhyChooseUs from "../components/WhyChooseUs";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <ShowAdvertiseTickets></ShowAdvertiseTickets>
      <LatestTickets></LatestTickets>
      <PopularRoutes></PopularRoutes>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default Home;
