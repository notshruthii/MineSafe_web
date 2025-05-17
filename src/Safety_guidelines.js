import React from "react";
import { motion } from "framer-motion";

export default function SafetyGuidelines() {
  const guidelines = [
    {
      title: "1. Wear Protective Gear",
      description:
        "Always wear a helmet, gloves, boots, and a mask to protect against injuries and dust.",
      image: "https://cdn-icons-png.flaticon.com/512/1995/1995739.png",
    },
    {
      title: "2. Ensure Proper Ventilation",
      description:
        "Good airflow is crucial to reduce the risk of suffocation and gas buildup.",
      image: "https://cdn-icons-png.flaticon.com/512/3082/3082001.png",
    },
    {
      title: "3. Use Safe Equipment",
      description:
        "Regularly inspect and maintain tools and machines to avoid accidents.",
      image: "https://cdn-icons-png.flaticon.com/512/4018/4018585.png",
    },
    {
      title: "4. Be Trained for Emergencies",
      description:
        "Know the emergency exits and procedures in case of fire, gas leak, or collapse.",
      image: "https://cdn-icons-png.flaticon.com/512/619/619034.png",
    },
    {
      title: "5. Monitor Air Quality",
      description:
        "Always check for dangerous gases like methane or carbon monoxide before starting work.",
      image: "https://cdn-icons-png.flaticon.com/512/2913/2913556.png",
    },
    {
      title: "6. Keep Work Area Clean",
      description:
        "A clean and organized work area helps prevent slips, trips, and falls.",
      image: "https://cdn-icons-png.flaticon.com/512/809/809957.png",
    },
    {
      title: "7. Maintain Communication",
      description:
        "Stay in regular contact with your team, especially in underground operations.",
      image: "https://cdn-icons-png.flaticon.com/512/2460/2460424.png",
    },
    {
      title: "8. Limit Exposure to Dust and Noise",
      description:
        "Use dust suppressors and ear protection to avoid long-term health problems.",
      image: "https://cdn-icons-png.flaticon.com/512/4351/4351670.png",
    },
    {
      title: "9. Follow Safety Signage",
      description:
        "Obey all posted signs and warnings throughout the mining site to avoid hazards.",
      image: "https://cdn-icons-png.flaticon.com/512/595/595798.png",
    },
    {
      title: "10. Conduct Pre-Work Inspections",
      description:
        "Check your working environment and tools before starting any task.",
      image: "https://cdn-icons-png.flaticon.com/512/1828/1828743.png",
    },
    {
      title: "11. Stay Hydrated and Take Breaks",
      description:
        "Working long hours underground can be exhausting—stay hydrated and rest regularly.",
      image: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    },
    {
      title: "12. Report Unsafe Conditions",
      description:
        "Immediately report any unsafe conditions to supervisors or safety officers.",
      image: "https://cdn-icons-png.flaticon.com/512/1828/1828911.png",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">⛏️ Coal Mining Safety Guidelines</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {guidelines.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white text-black rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-4">
              <img src={item.image} alt="icon" className="w-12 h-12" />
              <h2 className="text-2xl font-semibold">{item.title}</h2>
            </div>
            <p className="mt-4 text-lg">{item.description}</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-10 text-center text-gray-400">
        Following these simple rules can help protect lives in coal mining operations. Stay safe! ⚠️
      </p>
    </div>
  );
}
