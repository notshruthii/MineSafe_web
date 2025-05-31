import React from 'react';

const CareerSpot = () => {
  const jobs = [
    {
      title: 'Underground Mining Engineer',
      location: 'Singrauli, Madhya Pradesh',
      desc: 'Plan and manage underground mining operations, ensuring safety, efficiency, and compliance with regulations.',
    },
    {
      title: 'Safety Supervisor',
      location: 'Korba, Chhattisgarh',
      desc: 'Enforce safety standards, lead drills, and monitor site activities to ensure worker safety and compliance.',
    },
    {
      title: 'Heavy Equipment Operator',
      location: 'Dhanbad, Jharkhand',
      desc: 'Operate heavy-duty machines such as excavators and loaders. Conduct regular inspections and maintenance.',
    },
    {
      title: 'Site HR Manager',
      location: 'Talcher, Odisha',
      desc: 'Manage site recruitment, employee relations, welfare programs, and compliance with labor laws.',
    },
  ];

  return (
    <div
      className="min-h-screen text-white font-sans"
      style={{
        backgroundImage: `
          linear-gradient(to top right, rgba(68, 17, 236, 0.7), transparent 40%),
          linear-gradient(to top left, rgba(68, 17, 236, 0.7), transparent 40%),
          rgb(1, 8, 27)
        `,
        backgroundBlendMode: 'overlay',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* Hero Section */}
      <div className="bg-[url('/coal-workers.jpg')] bg-cover bg-center h-72 flex items-center justify-center shadow-lg relative">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <h1 className="relative text-4xl md:text-5xl font-bold px-6 py-3 rounded-lg z-10">
          Join Our Team
        </h1>
      </div>

      {/* Job Cards Section */}
      <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-8 text-yellow-400">Current Job Openings</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="relative group bg-[#121212] border border-gray-700 rounded-xl p-6 overflow-hidden transition-transform transform hover:scale-105 duration-300"
            >
              <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
              <p className="text-sm text-gray-400">{job.location}</p>

              {/* Hidden content revealed on hover */}
              <div className="opacity-0 group-hover:opacity-100 mt-4 transition-opacity duration-300">
                <p className="text-gray-300 text-sm mb-4">{job.desc}</p>
                <button className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 transition">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CareerSpot;
