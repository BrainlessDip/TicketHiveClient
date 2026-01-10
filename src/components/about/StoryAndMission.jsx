const StoryAndMission = () => {
  return (
    <div className="grid md:grid-cols-2 gap-12 mb-16">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Our Story</h2>
        <p className="text-base-content/80 leading-relaxed">
          Founded in 2024, TicketHive was born from a simple idea: making travel booking easier and more accessible for everyone in Bangladesh. We recognized the challenges travelers face when booking tickets and set out to create a platform that simplifies the entire process.
        </p>
        <p className="text-base-content/80 leading-relaxed">
          Today, we're proud to serve thousands of customers daily, connecting them with reliable transportation options across the country. Our commitment to excellence and customer satisfaction drives everything we do.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Our Mission</h2>
        <p className="text-base-content/80 leading-relaxed">
          To revolutionize the way people book travel tickets in Bangladesh by providing a seamless, secure, and user-friendly platform that connects travelers with the best transportation options available.
        </p>
        <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
          <h3 className="font-semibold text-lg mb-2">Our Vision</h3>
          <p className="text-base-content/80">
            To become the most trusted and preferred travel booking platform in Bangladesh, setting new standards for convenience and customer service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryAndMission;
