import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 px-4 md:px-24 py-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Heading */}
      <motion.h1
        className="text-4xl font-bold text-green-800 mb-6"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        About EcoExplorer 🌿
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-gray-700 text-lg max-w-3xl leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <strong>EcoExplorer</strong> is a public-first forest awareness and reporting platform aimed at educating citizens
        about local flora & fauna, enabling incident reporting like illegal logging and fires, and promoting eco-literacy
        through interactive tools such as quizzes and maps.
      </motion.p>

      {/* Creator & Mission */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-green-700 mb-2">👨‍💻 Creator</h2>
        <p className="text-gray-700">
          Created by <strong>Nishit Sharma</strong> as a tech-for-good project to help communities and NGOs combat
          environmental crimes. The project will be donated to a verified NGO after launch to support its real-world impact.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-2">🎯 Vision</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Build environmental awareness using technology</li>
          <li>Empower citizens to report incidents in real time</li>
          <li>Enable learning through games, quizzes, and local insights</li>
        </ul>
      </motion.div>

      {/* Optional Goals Section */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-green-700 mb-4">📈 Future Roadmap</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Add multilingual content for rural reach",
            "Offline-first PWA mode",
            "NGO dashboard for analyzing reports",
          ].map((goal, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
              <p className="text-gray-800">{goal}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
