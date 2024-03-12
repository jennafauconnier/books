import { useState } from 'react'
import './signup.css'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import { Box, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import api from '../../services/api'
import { useNavigate } from "react-router-dom";
import { authSliceActions } from '../../services/redux/authReducer'



const Signin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSignin = async () => {
    try {
      const response = await api.post('/users/signin', {
        email: formData.email,
        password: formData.password
      });

      dispatch(authSliceActions.signin(response.data))

      navigate("/showbook")
    } catch (error) {
        console.log(error)
        console.error(error);
    }
  }

  return (
    <Box className="signup-container">
        <form>
            <Box className="input-container">
                <h1 className='title-signup'>Connectez-vous</h1>

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
                <Signinbutton variant="contained" onClick={handleSignin}>Se connecter</Signinbutton>
                <GoToSignupButton variant="text" size="small" onClick={() => navigate('/signup')}>Pas de compte ? Inscris toi ici !</GoToSignupButton>
            </Box>
        </form>
    </Box>
  )
}

export default Signin


const Signinbutton = styled(Button)(() => ({
  backgroundColor: '#B07156',
  '&:hover': {
    backgroundColor: '#C4A287',
  },
}))

const GoToSignupButton = styled(Button)(() => ({
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