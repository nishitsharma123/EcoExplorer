// src/pages/admin/AllUsers.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AllUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUsers(res.data)
      } catch (err) {
        console.error('Failed to fetch users:', err)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="p-6 md:p-12 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-green-700 mb-6">All Registered Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-green-200 rounded-xl">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t hover:bg-green-50">
                <td className="p-3">{user.fullName}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
