import React, { useEffect, useState } from 'react';
import Navbar from './Sidebar';
import { getRandomInt, getRandomFloat } from './utils';

const generateDashboardData = () => ({
  co2Level: getRandomFloat(300, 1000).toFixed(2),
  machineryStatus: [
    { name: 'Drill A1', status: Math.random() > 0.2 ? 'Operational' : 'Faulty' },
    { name: 'Loader B2', status: Math.random() > 0.3 ? 'Operational' : 'Under Maintenance' },
    { name: 'Ventilator C3', status: Math.random() > 0.1 ? 'Operational' : 'Offline' },
  ],
  batteryLevels: [
    { equipment: 'Helmet Light', level: `${getRandomInt(50, 100)}%` },
    { equipment: 'Handheld Radio', level: `${getRandomInt(40, 100)}%` },
    { equipment: 'Gas Detector', level: `${getRandomInt(60, 100)}%` },
  ],
  environmentalData: {
    temperature: `${getRandomInt(24, 38)}°C`,
    humidity: `${getRandomInt(40, 80)}%`,
    noiseLevel: `${getRandomInt(60, 120)} dB`
  },
  safetyGearCheck: Math.random() > 0.1 ? 'Complete' : 'Incomplete'
});

const Header = () => {
  const [dashboardData, setDashboardData] = useState(generateDashboardData());

  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(generateDashboardData());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex bg-white text-gray-900 font-sans">
      <Navbar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <header className="flex justify-between items-center bg-gray-100 rounded-2xl px-4 py-4 shadow-md border">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-xl">
              👷
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Sharanya Gupta</h1>
              <p className="text-sm text-gray-500">Zone A • Shift: 6:00 AM - 2:00 PM</p>
            </div>
          </div>
          <h2 className="text-lg md:text-xl font-semibold tracking-wide text-gray-700 uppercase">Worker Dashboard</h2>
        </header>

        {/* Environmental Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Temperature', value: dashboardData.environmentalData.temperature },
            { label: 'Humidity', value: dashboardData.environmentalData.humidity },
            { label: 'Noise Level', value: dashboardData.environmentalData.noiseLevel }
          ].map(({ label, value }, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow hover:scale-[1.02] hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              <p className="text-sm text-gray-500">{label}</p>
              <h3 className="text-xl font-bold mt-1 text-gray-800">{value}</h3>
            </div>
          ))}
        </section>

        {/* Safety Gear & CO2 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Safety Gear Check', value: dashboardData.safetyGearCheck },
            { label: 'CO₂ Level', value: `${dashboardData.co2Level} ppm` }
          ].map(({ label, value }, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow hover:scale-[1.02] transition-all duration-300 ease-in-out"
            >
              <p className="text-sm text-gray-500 mb-1">{label}</p>
              <h3 className="text-lg font-medium text-gray-800">{value}</h3>
            </div>
          ))}
        </section>

        {/* Battery Level Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dashboardData.batteryLevels.map(({ equipment, level }, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow hover:scale-[1.02] transition-all duration-300 ease-in-out"
            >
              <p className="text-sm text-gray-600 mb-1">{equipment}</p>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-2 bg-blue-500 transition-all duration-300" style={{ width: level }} />
              </div>
              <span className="text-sm mt-2 block text-gray-500">{level}</span>
            </div>
          ))}
        </section>

        {/* Machinery Status */}
        <section className="bg-white rounded-2xl p-4 shadow hover:scale-[1.01] transition-all duration-300 ease-in-out">
          <h3 className="text-base font-semibold mb-2 text-gray-700">Machinery Status</h3>
          <ul className="divide-y divide-gray-200">
            {dashboardData.machineryStatus.map(({ name, status }, index) => (
              <li key={index} className="flex justify-between items-center py-2 text-sm">
                <span className="text-gray-700">{name}</span>
                <span className={`font-semibold ${
                  status === 'Operational' ? 'text-green-500'
                  : status === 'Under Maintenance' ? 'text-yellow-500'
                  : 'text-red-500'
                }`}>
                  {status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Header;
