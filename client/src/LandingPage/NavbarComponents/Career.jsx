import React, { useEffect, useState } from 'react';

const Career = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.arbeitnow.com/api/job-board-api')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.data.slice(0, 12)); // Display first 12 jobs
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="min-h-screen px-6 py-16 text-white font-sans"
      style={{
        background: `
          linear-gradient(to top right, rgba(68, 17, 236, 0.7), transparent 40%),
          linear-gradient(to top left, rgba(68, 17, 236, 0.7), transparent 40%),
          rgb(1, 8, 27)
        `,
      }}
    >
      {/* Header */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Career Opportunities in Coal Mining</h1>
        <p className="text-lg text-gray-300">
          Empowering the backbone of industry – explore impactful careers in coal mining and energy today.
        </p>
      </div>

      {/* Job Listings */}
      <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-8 border-b pb-2 border-gray-600">Featured Job Roles</h2>
        {loading ? (
          <p className="text-gray-400">Loading job listings...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="bg-[#0f172a] border border-gray-600 rounded-xl p-6 shadow-md hover:shadow-2xl transition duration-300 hover:scale-105"
              >
                <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                <p className="text-sm text-gray-400 mb-1">{job.company_name}</p>
                <p className="text-sm text-gray-300 mb-2">{job.location}</p>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-white underline hover:text-blue-300 transition"
                >
                  View Job
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* External Job Portals */}
      <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-600">Explore More Jobs</h2>
        <div className="space-y-3">
          <a
            href="https://www.naukri.com/coal-mining-jobs-in-india-857"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white underline hover:text-gray-300 transition"
          >
            Naukri.com – Coal Mining Jobs
          </a>
          <a
            href="https://in.indeed.com/q-coal-mining-jobs.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white underline hover:text-gray-300 transition"
          >
            Indeed – Coal Mining Listings
          </a>
          <a
            href="https://www.monsterindia.com/search/coal-mining-jobs"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white underline hover:text-gray-300 transition"
          >
            Monster India – Coal Mining Jobs
          </a>
          <a
            href="https://www.timesjobs.com/jobskill/coal-mining-jobs"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white underline hover:text-gray-300 transition"
          >
            TimesJobs – Coal Mining Opportunities
          </a>
        </div>
      </section>
    </div>
  );
};

export default Career;
