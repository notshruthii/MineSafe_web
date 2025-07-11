import React from 'react';

const Contact = () => {
  return (
    <div
      className="min-h-screen px-6 py-16 text-white font-sans flex flex-col"
      style={{
        background: `
          linear-gradient(to top right, rgba(68, 17, 236, 0.7), transparent 40%),
          linear-gradient(to top left, rgba(68, 17, 236, 0.7), transparent 40%),
          rgb(1, 8, 27)
        `
      }}
    >
      {/* Header */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-300">
          We’re here to help! Reach out to us using the details below.
        </p>
      </div>

      {/* Contact Info */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-20 text-gray-300">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-semibold mb-3 text-white">Office Address</h2>
          <p className="text-center md:text-left">Coal Mine Career Center</p>
          <p className="text-center md:text-left">Sector 7, Reva Campus</p>
          <p className="text-center md:text-left">Bengaluru, India – 560064</p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-semibold mb-3 text-white">Email</h2>
          <a
            href="mailto:support@coalcareers.org"
            className="text-white underline hover:text-blue-400 transition"
          >
            support@coalcareers.org
          </a>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-semibold mb-3 text-white">Phone</h2>
          <a
            href="tel:+919876543210"
            className="text-white underline hover:text-blue-400 transition"
          >
            +91 98765 43210
          </a>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-semibold mb-3 text-white">Office Hours</h2>
          <p className="text-center md:text-left">Mon – Fri: 9:00 AM – 6:00 PM</p>
          <p className="text-center md:text-left">Sat – Sun: Closed</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
