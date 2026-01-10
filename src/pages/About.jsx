import AboutHero from "../components/about/AboutHero";
import StoryAndMission from "../components/about/StoryAndMission";


const About = () => {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <AboutHero />
        <StoryAndMission />

      </div>
    </div>
  );
};

export default About;
