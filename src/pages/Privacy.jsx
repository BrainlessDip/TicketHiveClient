const Privacy = () => {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy & Terms of Service
          </h1>
          <p className="text-lg text-base-content/70">
            Last updated: January 10, 2026
          </p>
        </div>

        <div className="space-y-8">
          <section className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Privacy Policy</h2>
              
              <div className="space-y-4 text-base-content/80">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Information We Collect</h3>
                  <p>
                    We collect information you provide directly to us, including your name, email address, phone number, and payment information when you create an account or make a booking.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">How We Use Your Information</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>To process your ticket bookings and payments</li>
                    <li>To send you booking confirmations and updates</li>
                    <li>To provide customer support</li>
                    <li>To improve our services and user experience</li>
                    <li>To send promotional offers (with your consent)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Data Security</h3>
                  <p>
                    We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Information Sharing</h3>
                  <p>
                    We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our platform, subject to confidentiality agreements.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Your Rights</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your account and data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Request a copy of your data</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Terms of Service</h2>
              
              <div className="space-y-4 text-base-content/80">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Acceptance of Terms</h3>
                  <p>
                    By accessing and using TicketHive, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">User Accounts</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>You must provide accurate and complete information</li>
                    <li>You are responsible for maintaining account security</li>
                    <li>You must be at least 18 years old to create an account</li>
                    <li>One person or entity may maintain only one account</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Booking and Payment</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>All bookings are subject to availability</li>
                    <li>Prices are subject to change without notice</li>
                    <li>Payment must be completed to confirm booking</li>
                    <li>Cancellation policies vary by vendor</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Prohibited Activities</h3>
                  <p>You agree not to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Use the platform for any illegal purposes</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with the proper functioning of the platform</li>
                    <li>Impersonate another person or entity</li>
                    <li>Post false or misleading information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Limitation of Liability</h3>
                  <p>
                    TicketHive acts as a platform connecting travelers with vendors. We are not responsible for the quality of services provided by vendors or any issues arising from your travel.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Changes to Terms</h3>
                  <p>
                    We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the modified terms.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Cookie Policy</h2>
              
              <div className="space-y-4 text-base-content/80">
                <p>
                  We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where our visitors are coming from.
                </p>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Types of Cookies We Use</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Essential Cookies:</strong> Required for the platform to function</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  </ul>
                </div>

                <p>
                  You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our platform.
                </p>
              </div>
            </div>
          </section>

          <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 shadow-xl border border-base-300">
            <div className="card-body text-center">
              <h2 className="text-2xl font-bold mb-3">Questions About Our Policies?</h2>
              <p className="text-base-content/80 mb-4">
                If you have any questions about our Privacy Policy or Terms of Service, please don't hesitate to contact us.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a href="/contact" className="btn btn-primary">
                  Contact Us
                </a>
                <a href="/help" className="btn btn-outline">
                  Visit Help Center
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
