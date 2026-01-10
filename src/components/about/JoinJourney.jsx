const JoinJourney = () => {
  return (
    <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 shadow-xl border border-base-300">
      <div className="card-body text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
        <p className="text-lg text-base-content/80 max-w-2xl mx-auto mb-6">
          Whether you're a frequent traveler or planning your next adventure, TicketHive is here to make your booking experience smooth and hassle-free.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/all-tickets" className="btn btn-primary">
            Browse Tickets
          </a>
          <a href="/contact" className="btn btn-outline">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default JoinJourney;
