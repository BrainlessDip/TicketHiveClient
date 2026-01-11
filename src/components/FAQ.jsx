const FAQ = () => {
  const faqs = [
    {
      question: "How do I book a ticket?",
      answer: "Browse available tickets on the All Tickets page, select your desired ticket, and click 'Book Now'. You'll need to be logged in to complete the booking.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, mobile banking, and online payment gateways for your convenience.",
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can cancel or modify your booking up to 24 hours before departure. Go to 'My Bookings' in your dashboard to manage your tickets.",
    },
    {
      question: "How do I get my ticket after booking?",
      answer: "After successful payment, you'll receive your e-ticket via email. You can also download it from your dashboard under 'Booked Tickets'.",
    },
    {
      question: "What if I face issues during booking?",
      answer: "If you encounter any issues, please contact our support team via the Contact Us page or email us at support@tickethive.com.",
    },
    {
      question: "Are there any booking fees?",
      answer: "We charge a minimal service fee for each booking, which will be clearly displayed before you confirm your payment.",
    },
    {
      question: "How do I become a vendor?",
      answer: "To become a vendor and list your tickets, please register an account and contact our admin team for vendor verification.",
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, we use industry-standard encryption and secure payment gateways to protect your financial information.",
    },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-plus bg-base-100 border border-base-300 shadow-sm"
          >
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p className="text-base-content/80">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
