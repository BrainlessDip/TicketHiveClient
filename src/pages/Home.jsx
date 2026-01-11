import React from "react";
import ShowAdvertiseTickets from "../components/ShowAdvertiseTickets";
import LatestTickets from "./../components/LatestTickets";
import PopularRoutes from "../components/PopularRoutes";
import WhyChooseUs from "../components/WhyChooseUs";
import Hero from "../components/Hero";
import JoinJourney from "../components/about/JoinJourney";
import ImpactStats from "../components/about/ImpactStats";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <ShowAdvertiseTickets></ShowAdvertiseTickets>
      <LatestTickets></LatestTickets>
      <PopularRoutes></PopularRoutes>
      <WhyChooseUs></WhyChooseUs>
      <ImpactStats></ImpactStats>
      <FAQ />
      <Testimonials />
      <JoinJourney></JoinJourney>
    </div>
  );
};

export default Home;
