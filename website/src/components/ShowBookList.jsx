import { useState, useEffect } from 'react';
import './showbooklist.css';
import { Link, useNavigate } from 'react-router-dom';
import BookCard from './BookCard';
import { useDispatch, useSelector } from 'react-redux';
import { authSliceActions } from '../services/redux/authReducer';
import { Grid, Box, Button } from '@mui/material';
import api from '../services/api'
import { styled } from '@mui/material/styles'



function ShowBookList() {
  const [books, setBooks] = useState([]);
  const token = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const logout = async () => {
    dispatch(authSliceActions.logout({}))
    navigate('/signup')
  }

  const fetchBooks = async() => {
    try {
      const res = await api.get('/books')
      setBooks(res.data)
    } catch (err) {
      console.log('An error as occured to recover books :', err)
    }
  }

  useEffect(() => {
    fetchBooks()

    if(!token) {
      navigate('/signup')
    }
  }, []);

  return (
    <Box className='container-book-list'>
      <div className='container'>
        <div className='container-row'>
            <DisconnectButton variant="contained" onClick={logout}>Se deconnecter</DisconnectButton>
            <h2>Books List</h2>
            <div>
            <Link to='/create-book'>
              <AddBookButton variant="contained">Add a book</AddBookButton>
            </Link>
          </div>
        </div>

          
        <Grid
          container 
          spacing={3}
        >
          {books.length === 0
            ? 'there is no book record!'
            : books.map((book, k) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={k}>
                  <BookCard
                    test={book}
                    id={book._id}
                    title={book.title}
                    author={book.author}
                    description={book.description}
                    image={book.image}
                  />
                </Grid>
              ))}
        </Grid>
      
        </div>
      </Box>
    
  );
}



const AddBookButton = styled(Button)(() => ({
  backgroundColor: '#533745',
  '&:hover': {
    backgroundColor: '#AB4E68',
  },
}))

const DisconnectButton = styled(Button)(() => ({
backgroundColor: '#9D9171',
'&:hover': {
  backgroundColor: '#533745',
},
}))

export default ShowBookList;
