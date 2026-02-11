// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { FiMenu, FiX } from 'react-icons/fi'
// import { useAuth } from '../context/AuthContext'

// export default function Navbar() {
//   const { pathname } = useLocation()
//   const [menuOpen, setMenuOpen] = useState(false)
//   const { user, logout } = useAuth()
//   const navigate = useNavigate()
// const handleQuizClick = () => {
//     if (user) {
//       navigate('/quiz')
//     } else {
//       alert('Please sign in to access quizzes.') // Or open a custom modal
//       navigate('/signin') // Optional auto-redirect
//     }
//   }
//   const navItems = [
//     { label: 'Home', to: '/' },
//     { label: 'Learn', to: '/learn' },
//     { label: 'Report', to: '/report' },
//      { label: 'Quiz', onClick: handleQuizClick },
//     { label: 'About', to: '/about' },
//      ...(user?.role === 'admin' ? [{ label: 'Admin Dashboard', to: '/admin/dashboard' }] : []),
//      ...(user?.role === 'teacher' ? [{ label: 'Teacher Dashboard', to: '/teacher/dashboard' }] : []),
//     // ...(user ? [] : [{ label: 'Sign in', to: '/signin' }]),
//   ]

//   const handleLogout = () => {
//     logout()
//     navigate('/')
//   }

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -60, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6, ease: 'easeOut' }}
//         className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-green-200 px-4 md:px-12 py-3 flex justify-between items-center shadow-sm"
//       >
//         {/* Logo */}
//         <div className="text-green-800 font-bold text-xl tracking-tight flex items-center gap-2">
//           🌿 EcoExplorer
//         </div>

//         {/* Desktop Nav */}
//         <div className="hidden md:flex gap-4 items-center text-sm md:text-base font-medium text-gray-800">
//           {navItems.map((item) => (
//             <Link
//               key={item.to}
//               to={item.to}
//               className={`px-3 py-1.5 rounded-md transition-all duration-200 ${
//                 pathname === item.to
//                   ? 'bg-green-600 text-white shadow'
//                   : 'hover:bg-green-100 text-green-800'
//               }`}
//             >
//               {item.label}
//             </Link>
//           ))}

//           {user ? (
//             <>
//               <span className="text-green-800">👋 {user.fullName.split(' ')[0]}</span>
//               <button
//                 onClick={handleLogout}
//                 className="px-3 py-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <Link
//               to="/signin"
//               className={`px-3 py-1.5 rounded-md transition-all duration-200 ${
//                 pathname === '/signin'
//                   ? 'bg-green-600 text-white shadow'
//                   : 'hover:bg-green-100 text-green-800'
//               }`}
//             >
//               Sign In
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="text-green-800 text-2xl focus:outline-none"
//           >
//             {menuOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>
//       </motion.nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden bg-white shadow-md px-4 py-4 space-y-2 border-b border-green-200"
//           >
//             {navItems.map((item) => (
//               <Link
//                 key={item.to}
//                 to={item.to}
//                 onClick={() => setMenuOpen(false)}
//                 className={`block px-4 py-2 rounded-md text-base font-medium ${
//                   pathname === item.to
//                     ? 'bg-green-600 text-white shadow'
//                     : 'text-green-800 hover:bg-green-100'
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             ))}

//             {user ? (
//               <>
//                 <span className="block px-4 py-2 text-green-800 font-semibold">👋 {user.fullName.split(' ')[0]}</span>
//                 <button
//                   onClick={() => {
//                     setMenuOpen(false)
//                     handleLogout()
//                   }}
//                   className="block w-full text-left px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link
//                 to="/signin"
//                 onClick={() => setMenuOpen(false)}
//                 className={`block px-4 py-2 rounded-md text-base font-medium ${
//                   pathname === '/signin'
//                     ? 'bg-green-600 text-white shadow'
//                     : 'text-green-800 hover:bg-green-100'
//                 }`}
//               >
//                 Sign In
//               </Link>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleQuizClick = () => {
    if (user) {
      navigate('/quiz')
    } else {
      alert('Please sign in to access quizzes.')
      navigate('/signin')
    }
  }

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Learn', to: '/learn' },
    { label: 'Report', to: '/report' },
    { label: 'Quiz', onClick: handleQuizClick }, // 👈 Not using `to`
    { label: 'About', to: '/about' },
    ...(user?.role === 'admin'
      ? [{ label: 'Admin Dashboard', to: '/admin/dashboard' }]
      : []),
    ...(user?.role === 'teacher'
      ? [{ label: 'Teacher Dashboard', to: '/teacher/dashboard' }]
      : []),
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-green-200 px-4 md:px-12 py-3 flex justify-between items-center shadow-sm"
      >
        {/* Logo */}
        <div className="text-green-800 font-bold text-xl tracking-tight flex items-center gap-2">
          🌿 EcoExplorer
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-4 items-center text-sm md:text-base font-medium text-gray-800">
          {navItems.map((item, idx) =>
            item.to ? (
              <Link
                key={idx}
                to={item.to}
                className={`px-3 py-1.5 rounded-md transition-all duration-200 ${
                  pathname === item.to
                    ? 'bg-green-600 text-white shadow'
                    : 'hover:bg-green-100 text-green-800'
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={idx}
                onClick={item.onClick}
                className="px-3 py-1.5 rounded-md transition-all duration-200 hover:bg-green-100 text-green-800"
              >
                {item.label}
              </button>
            )
          )}

          {user ? (
            <>
              <span className="text-green-800">👋 {user.fullName.split(' ')[0]}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className={`px-3 py-1.5 rounded-md transition-all duration-200 ${
                pathname === '/signin'
                  ? 'bg-green-600 text-white shadow'
                  : 'hover:bg-green-100 text-green-800'
              }`}
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-green-800 text-2xl focus:outline-none"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md px-4 py-4 space-y-2 border-b border-green-200"
          >
            {navItems.map((item, idx) =>
              item.to ? (
                <Link
                  key={idx}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2 rounded-md text-base font-medium ${
                    pathname === item.to
                      ? 'bg-green-600 text-white shadow'
                      : 'text-green-800 hover:bg-green-100'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={idx}
                  onClick={() => {
                    item.onClick()
                    setMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 rounded-md text-base font-medium text-green-800 hover:bg-green-100"
                >
                  {item.label}
                </button>
              )
            )}

            {user ? (
              <>
                <span className="block px-4 py-2 text-green-800 font-semibold">
                  👋 {user.fullName.split(' ')[0]}
                </span>
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    handleLogout()
                  }}
                  className="block w-full text-left px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2 rounded-md text-base font-medium ${
                  pathname === '/signin'
                    ? 'bg-green-600 text-white shadow'
                    : 'text-green-800 hover:bg-green-100'
                }`}
              >
                Sign In
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
