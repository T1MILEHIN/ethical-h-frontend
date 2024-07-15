import { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Home = () => {
  const {user} = useContext(AuthContext)
  if (!user) return <Navigate to="/register" />
  return (
    <div className="min-h-screen flex justify-center items-center text-center">
      <div>
        <h1>Hello World {""}</h1>
        <p>
          <Link to="about">About Us</Link>
        </p>
      </div>
    </div>
  )
}

export default Home