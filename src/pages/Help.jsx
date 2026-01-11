const Help = () => {
  return (
    <div className="px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Help & Support
          </h1>
          <p className="text-lg text-base-content/70">
            Find answers to common questions and get the help you need
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="card-title">Email Support</h2>
              </div>
              <p className="text-base-content/70">
                Get help via email at{" "}
                <a
                  href="mailto:support@tickethive.com"
                  className="text-primary hover:underline"
                >
                  support@tickethive.com
                </a>
              </p>
              <p className="text-sm text-base-content/60 mt-2">
                Response time: Within 24 hours
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h2 className="card-title">Phone Support</h2>
              </div>
              <p className="text-base-content/70">
                Call us at{" "}
                <a
                  href="tel:+8801234567890"
                  className="text-primary hover:underline"
                >
                  +880 1234-567890
                </a>
              </p>
              <p className="text-sm text-base-content/60 mt-2">
                Available: Mon-Sat, 9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>


        <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 shadow-xl border border-base-300">
          <div className="card-body text-center">
            <h2 className="text-2xl font-bold mb-3">Still Need Help?</h2>
            <p className="text-base-content/80 mb-4">
              Can't find what you're looking for? Our support team is here to assist you.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="/contact" className="btn btn-primary">
                Contact Support
              </a>
              <a href="/about" className="btn btn-outline">
                Learn More About Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
