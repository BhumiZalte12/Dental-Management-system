import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiSmile, FiShield, FiHeart, FiScissors, FiSearch } from "react-icons/fi";
import { PiToothFill } from "react-icons/pi";

const services = [
  {
    id: "01",
    title: "Dentures",
    description: "Custom-made removable dental prosthetics for restoring missing teeth and improving oral function.",
    icon: <FiSmile />
  },
  {
    id: "02",
    title: "Dental Implants",
    description: "Permanent tooth replacement solutions with titanium implants for a natural and long-lasting smile.",
    icon: <PiToothFill />
  },
  {
    id: "03",
    title: "Teeth Whitening",
    description: "Professional whitening treatments to brighten and enhance the natural look of your teeth.",
    icon: <FiShield />
  },
  {
    id: "04",
    title: "Root Canals",
    description: "Advanced endodontic procedures to treat infected tooth pulp and preserve natural teeth.",
    icon: <FiHeart />
  },
  {
    id: "05",
    title: "Orthodontics",
    description: "Braces and aligners designed to straighten teeth and correct bite issues for a healthier smile.",
    icon: <FiScissors />
  },
  {
    id: "06",
    title: "Diagnosis",
    description: "Comprehensive dental examinations and digital imaging to detect and prevent oral health issues.",
    icon: <FiSearch />
  }
];

const fadeInVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section ref={ref} id="services" className="bg-white text-sky-700 pt-24 pb-4 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold uppercase text-center mb-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInVariants}
        >
          Our Dental Services
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="p-6 bg-sky-100 rounded-lg shadow-md flex flex-col items-center text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="flex flex-col justify-center items-center hover:scale-110 transition duration-200">
                <div className="flex justify-center items-center w-10 h-10 bg-white text-sky-700 rounded-full shadow-lg text-2xl mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-sky-800 text-sm mt-2">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
