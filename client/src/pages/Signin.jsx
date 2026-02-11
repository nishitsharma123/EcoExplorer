// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Link } from 'react-router-dom'
// import signin_image_fallback from "../assets/signup_image_fallback.jpg"
// import signin_video from "../assets/signup_video.mp4"
// export default function Signin() {
//   const [form, setForm] = useState({ email: '', password: '' })

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   return (
//     <div className="min-h-screen grid md:grid-cols-2 bg-white">
//       {/* Left Panel – Video Background */}
//       <div className="hidden md:flex relative items-center justify-center overflow-hidden">
//         <video
//         poster={signin_image_fallback}
//           autoPlay
//           muted
//           loop
//           playsInline
//           preload="auto"
//           className="absolute inset-0 w-full h-full object-cover z-0"
//         >
//           <source src={signin_video} type="video/mp4" />
//           {/* <source src="/assets/eco-bg.webm" type="video/webm" /> */}
//         </video>
//         <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10" />
//         <div className="relative z-20 text-center px-10">
//           <motion.h1
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-4xl font-bold text-white mb-4"
//           >
//             Welcome Back 👋
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="text-lg text-white max-w-md"
//           >
//             Sign in to continue exploring and protecting our forests 🌳
//           </motion.p>
//         </div>
//       </div>

//       {/* Right Panel – Sign In Form */}
//       <motion.div
//         initial={{ opacity: 0, x: 40 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="flex items-center justify-center p-6 md:p-16"
//       >
//         <div className="w-full max-w-md">
//           <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Sign In to EcoExplorer</h2>

//           <form className="space-y-4">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               className="input"
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               className="input"
//             />

//             <button
//               type="submit"
//               className="mt-2 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
//             >
//               Sign In
//             </button>
//           </form>

//           <p className="text-sm text-gray-500 mt-4 text-center">
//             Don’t have an account?{' '}
//             <Link to="/signup" className="text-green-700 font-medium">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </motion.div>

//       {/* Input styling */}
//       <style>{`
//         .input {
//           padding: 0.75rem;
//           border-radius: 0.75rem;
//           border: 1px solid #ccc;
//           width: 100%;
//           transition: border 0.2s;
//         }
//         .input:focus {
//           border-color: #15803d;
//           outline: none;
//         }
//       `}</style>
//     </div>
//   )
// }

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import signin_image_fallback from "../assets/signup_image_fallback.jpg"
import signin_video from "../assets/signup_video.mp4"
import API from '../utils/api'
import { useAuth } from '../context/AuthContext.jsx'
export default function Signin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  // const navigate = useNavigate()
  const { setUser } = useAuth()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await API.post('/auth/login', form)
      const { user, token } = res.data
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setUser(user)
     // 🔁 Redirect based on user role
    if (user.role === 'admin') {
      window.location.href = '/admin/dashboard' // full reload, context re-inits
    } else if (res.data.user.role === 'teacher') {
        window.location.href = '/teacher/dashboard'
  }else {
      window.location.href = '/' // full reload, context re-inits
    }

    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message) // Add this
  setError(err.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-white">
      {/* Left Panel – Video Background */}
      <div className="hidden md:flex relative items-center justify-center overflow-hidden">
        <video
          poster={signin_image_fallback}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={signin_video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10" />
        <div className="relative z-20 text-center px-10">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Welcome Back 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white max-w-md"
          >
            Sign in to continue exploring and protecting our forests 🌳
          </motion.p>
        </div>
      </div>

      {/* Right Panel – Sign In Form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center p-6 md:p-16"
      >
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Sign In to EcoExplorer</h2>

          {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="input"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-green-700 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Input styling */}
      <style>{`
        .input {
          padding: 0.75rem;
          border-radius: 0.75rem;
          border: 1px solid #ccc;
          width: 100%;
          transition: border 0.2s;
        }
        .input:focus {
          border-color: #15803d;
          outline: none;
        }
      `}</style>
    </div>
  )
}
