import { Link } from 'react-router-dom'
import { FaLeaf, FaMapMarkedAlt, FaQuestionCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Home() {
  const featureCards = [
    {
      icon: <FaLeaf size={64} className="text-green-600" />,
      title: "Learn Nature",
      desc: "Explore curated data on native trees, animals, and their environmental value.",
      to: "/learn",
    },
    {
      icon: <FaMapMarkedAlt size={64} className="text-green-600" />,
      title: "Live Reporting",
      desc: "Report illegal logging, fires, or wildlife threats directly with geo-tagging.",
      to: "/report",
    },
    {
      icon: <FaQuestionCircle size={64} className="text-green-600" />,
      title: "Eco Quiz",
      desc: "Take fun quizzes to test your eco-knowledge and win digital badges.",
      to: "/quiz",
    },
  ]

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 overflow-x-hidden">
      {/* Hero Section */}
      <section className="text-center py-24 px-4 md:px-16">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-green-800 mb-4 leading-tight"
        >
          EcoExplorer 🌿
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Explore nature, report forest threats, and learn how to protect our planet — all in one place.
        </motion.p>

        <motion.div
          className="mt-8 flex justify-center gap-4 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/learn" className="px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition">
              Explore Flora & Fauna
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/report" className="px-6 py-3 bg-white border border-green-700 text-green-700 rounded-xl hover:bg-green-100 transition">
              Report an Incident
            </Link>
          </motion.div>
        </motion.div>
      </section>

{/* Feature Cards */}
<section className="grid md:grid-cols-3 gap-6 px-4 md:px-20 pb-20">
  {featureCards.map((f, i) => (
    <motion.div
      key={i}
      className="rounded-2xl shadow-md bg-white p-6 text-center cursor-pointer hover:shadow-2xl transition-transform"
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay: i * 0.2, duration: 0.6, type: "spring" }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      <Link to={f.to} className="flex flex-col items-center gap-3 h-full text-inherit no-underline">
        {/* Icon with hover bounce/rotate */}
        <motion.div
          whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
          transition={{ duration: 0.4, type: "easeInOut" }}
        >
          {f.icon}
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-800">{f.title}</h3>
        <p className="text-gray-600 text-sm">{f.desc}</p>
      </Link>
    </motion.div>
  ))}
</section>



      {/* Impact Section */}
      <motion.section
        className="bg-green-100 py-16 px-4 md:px-32 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-green-800 mb-4">
          Make an Impact 🌍
        </h2>
        <p className="text-gray-700 max-w-xl mx-auto text-lg">
          Every report and action contributes to forest conservation. Whether you're a student, activist, or nature lover — your voice matters.
        </p>
      </motion.section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        Built with 🌱 by <a href="https://portfolio-nishit-nine.vercel.app/" className="underline text-green-600">Nishit Sharma</a>
      </footer>
    </div>
  )
}
