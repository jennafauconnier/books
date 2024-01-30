import { useState } from 'react'
import './signup.css'
import { useDispatch } from 'react-redux'
import { setToken, setUser } from '../../redux/reducers/authReducer'

const Signup = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSignup = () => {
    const token = `Bearer exampleToken123`
    const user = { email: formData.email }

    dispatch(setToken(token))
    dispatch(setUser(user))
  }

  return (
    <div>
      <input
        type="text"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  )
}

export default Signup