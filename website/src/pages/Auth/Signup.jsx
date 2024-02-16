import { useState, useContext } from 'react'
import './signup.css'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { Box, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import api from '../../services/api'
import { useNavigate } from "react-router-dom";
import { authSliceActions } from '../../services/redux/authReducer'



const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: true,
  })

  const handleSignup = async () => {
    try {
      const response = await api.post('/users/signup', {
        email: formData.email,
        password: formData.password
      });

      console.log('response', response)
      dispatch(authSliceActions.signup(response.data))
  
      navigate("/showbook")
    } catch (error) {
      console.log("rr", error)
      console.error(error);
    }
  }



  return (
    <Box className="signup-container">
    <form>
      <Box className="input-container">
        <h1 className='title-signup'>Inscrivez-vous</h1>

        <InputTextfield 
          className='email-inpt'
          id="outlined-basic" 
          label="Email" 
          variant="outlined" 
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          size='small'
          InputLabelProps={{ style : { color : '#E0E3E7' } }}
          sx={{ input: { color: '#E0E3E7' } }}
        />

        <InputTextfield
            id="outlined-password-input"
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            autoComplete="current-password"
            size='small'
            InputLabelProps={{ style : { color : '#E0E3E7' } }}
            sx={{ input: { color: '#E0E3E7' } }}
          />
        <Signupbutton variant="contained" onClick={handleSignup}>S'inscrire</Signupbutton>
        <GoToSigninButton variant="text" size="small" onClick={() => navigate('/signin')}>Déjà un compte ? Connecte toi ici !</GoToSigninButton>
      </Box>
    </form>
  </Box>
  )
}

export default Signup


const Signupbutton = styled(Button)(() => ({
  backgroundColor: '#B07156',
  '&:hover': {
    backgroundColor: '#C4A287',
  },
}))

const GoToSigninButton = styled(Button)(() => ({
  color: '#E0E3E7',
  '&:hover': {
    color: '#9D9171',
  },
}))

const InputTextfield = styled(TextField)({
  '& label.Mui-focused': {
    color: '#E0E3E7',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#E0E3E7',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#9D9171',
    },
  },
});