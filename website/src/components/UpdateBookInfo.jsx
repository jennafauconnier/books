import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Grid, TextField } from '@mui/material';
import './updatebookinfo.css';
import api from '../services/api'
import { styled } from '@mui/material/styles'


function UpdateBookInfo() {
  const [book, setBook] = useState({
    title: '',
    isbn: '',
    author: '',
    description: '',
    published_date: '',
    publisher: '',
  })

  const { id } = useParams()
  const navigate = useNavigate()

  const getBook = async() => {
    try {
      const res = await api.get(`http://localhost:8082/books/${id}`)
      setBook({
        title: res.data.title,
        isbn: res.data.isbn,
        author: res.data.author,
        description: res.data.description,
        published_date: res.data.published_date,
        publisher: res.data.publisher,
      })
    } catch (err) {
      console.log('Error while updating this book.')
    }
  }

  useEffect(() => {
    getBook()
  }, [])

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: book.title,
      isbn: book.isbn,
      author: book.author,
      description: book.description,
      published_date: book.published_date,
      publisher: book.publisher,
    };

    try {
      await api.put(`http://localhost:8082/books/${id}`, data);
      navigate(`/show-book/${id}`)
    } catch (err) {
      console.log('Error while trying to update this book.')
    }
  }

  return (
    <div className='update-book-container'>
      <div className='container'>
        <div className='container-row'>
              <Link to={`/show-book/${id}`}>
                <ReturnButton variant="contained">
                    Go back to Book 
                </ReturnButton>
              </Link>
        </div>
        <br />
          <Box>
            <h1 className='title'>{book?.title}</h1>
          </Box>

        <div className='col-md-8 m-auto'>
          <form noValidate onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputTextfield
                  label="Title"
                  name="title"
                  value={book.title}
                  onChange={onChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <InputTextfield
                  label="ISBN"
                  name="isbn"
                  value={book.isbn}
                  onChange={onChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <InputTextfield
                  label="Author"
                  name="author"
                  value={book.author}
                  onChange={onChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <InputTextfield
                  label="Description"
                  name="description"
                  value={book.description}
                  onChange={onChange}
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <InputTextfield
                  label="Published Date"
                  name="published_date"
                  value={book.published_date}
                  onChange={onChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <InputTextfield
                  label="Publisher"
                  name="publisher"
                  value={book.publisher}
                  onChange={onChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <UpdateButton
                  type='submit'
                  variant='contained'
                >
                  Update Book
                </UpdateButton>
              </Grid>
            </Grid>
          </form>
        </div>
        </div>
      </div>
  );
}

export default UpdateBookInfo;


const ReturnButton = styled(Button)(() => ({
  backgroundColor: '#533745',
  '&:hover': {
    backgroundColor: '#AB4E68',
  },
}))

const UpdateButton = styled(Button)(() => ({
  backgroundColor: '#B07156',
  color: 'white',
  '&:hover': {
    backgroundColor: '#533745',
  },
}))

const InputTextfield = styled(TextField)({
  '& label.Mui-focused': {
    color: '#E0E3E7',
  },
  '& .MuiFilledInput-root': {
    backgroundColor: '#ffff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#E0E3E7',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#B07156',
    },
  },
})