// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Link } from 'react-router-dom'
// import signup_image_fallback from "../assets/signup_image_fallback.jpg"
// import signup_video from "../assets/signup_video.mp4"
// export default function Signup() {
//   const [form, setForm] = useState({
//     fullName: '', email: '', phone: '',
//     street: '', city: '', district: '', state: '',
//     password: '', confirmPassword: ''
//   })

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   return (
//     <div className="min-h-screen grid md:grid-cols-2 bg-white">
//       {/* Left Side - Background Video */}
//       <div className="hidden md:flex relative items-center justify-center overflow-hidden">
//         <video
//         poster={signup_image_fallback}
//         autoPlay
//         muted
//         loop
//         playsInline
//         preload="auto"
//           className="absolute inset-0 w-full h-full object-cover z-0"
//         >
//           <source src={signup_video} type="video/mp4" />
//         </video>
//         <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10" />
//         <div className="relative z-20 text-center px-10">
//           <motion.h1
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-4xl font-bold text-white mb-4"
//           >
//             Welcome to EcoExplorer 🌿
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="text-lg text-white max-w-md"
//           >
//             “Protect nature, and it will protect you.”
//           </motion.p>
//         </div>
//       </div>

//       {/* Right Side - Sign Up Form */}
//       <motion.div
//         initial={{ opacity: 0, x: 40 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="flex items-center justify-center p-6 md:p-16"
//       >
//         <div className="w-full max-w-xl">
//           <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Create Your Account</h2>

//           <form className="grid grid-cols-1 gap-4">
//             <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="input" />
//             <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input" />
//             <input type="tel" name="phone" placeholder="Mobile Number" onChange={handleChange} className="input" />

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <input type="text" name="street" placeholder="Street" onChange={handleChange} className="input" />
//               <input type="text" name="city" placeholder="City" onChange={handleChange} className="input" />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <input type="text" name="district" placeholder="District" onChange={handleChange} className="input" />
//               <input type="text" name="state" placeholder="State" onChange={handleChange} className="input" />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input" />
//               <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="input" />
//             </div>

//             <button
//               type="submit"
//               className="mt-2 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
//             >
//               Sign Up
//             </button>
//           </form>

//           <p className="text-sm text-gray-500 mt-4 text-center">
//             Already have an account? <Link to="/signin" className="text-green-700 font-medium">Sign In</Link>
//           </p>
//         </div>
//       </motion.div>

//       {/* Input style (global to this component) */}
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
import signup_image_fallback from "../assets/signup_image_fallback.jpg"
import signup_video from "../assets/signup_video.mp4"
import API from '../utils/api' // axios instance

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    street: '', city: '', district: '', state: '',
    password: '', confirmPassword: '', role: 'general'
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    const payload = {
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      mobile: form.phone,
      role: form.role,
      address: {
        street: form.street,
        city: form.city,
        district: form.district,
        state: form.state,
      }
    }

    try {
      setLoading(true)
      const res = await API.post('/auth/signup', payload)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/signin')
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-white">
      {/* Left Side - Background Video */}
      <div className="hidden md:flex relative items-center justify-center overflow-hidden">
        <video
          poster={signup_image_fallback}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={signup_video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10" />
        <div className="relative z-20 text-center px-10">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Welcome to EcoExplorer 🌿
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white max-w-md"
          >
            “Protect nature, and it will protect you.”
          </motion.p>
        </div>
      </div>

      {/* Right Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center p-6 md:p-16"
      >
        <div className="w-full max-w-xl">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Create Your Account</h2>

          {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required className="input" />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="input" />
            <input type="tel" name="phone" placeholder="Mobile Number" onChange={handleChange} required className="input" />

            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="street" placeholder="Street" onChange={handleChange} className="input" />
              <input type="text" name="city" placeholder="City" onChange={handleChange} className="input" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="district" placeholder="District" onChange={handleChange} className="input" />
              <input type="text" name="state" placeholder="State" onChange={handleChange} className="input" />
            </div>

            <select name="role" onChange={handleChange} className="input" required>
              <option value="general">General User</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher / Professor</option>
              {/* <option value="admin">Admin</option> */}
            </select>

            <div className="grid grid-cols-2 gap-4">
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input" />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required className="input" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account? <Link to="/signin" className="text-green-700 font-medium">Sign In</Link>
          </p>
        </div>
      </motion.div>

      {/* Input style (scoped CSS) */}
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
