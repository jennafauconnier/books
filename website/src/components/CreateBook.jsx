import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Button, Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles'
import './createbook.css'


const CreateBook = () => {
  const navigate = useNavigate()

  const [book, setBook] = useState({
    title: "",
    isbn: "",
    author: "",
    description: "",
    published_date: "",
    publisher: "",
    style: "",
    image: "",
  });

  const onChange = (e) => {
    if (e.target.name === "image") {
      setBook({ ...book, image: e.target.files[0] });
    } else {
      setBook({ ...book, [e.target.name]: e.target.value });
    }
  }


  const onSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    Object.entries(book).forEach(([key, value]) => {
      formData.append(key, value)
    })

    try {
      await api.post("http://localhost:8082/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setBook({
        title: "",
        isbn: "",
        author: "",
        description: "",
        published_date: "",
        publisher: "",
        style: "",
        image: "null",
      })
      navigate('/showbook')
    } catch (err) {
      console.log("Error while trying to add a book", err)
    }
  }

  return (
    <div className="create-book-container">
      <div className="container">
        <div className='container-row'>
            <Link to='/showbook'>
              <ReturnButton variant="contained">
                Go back to book list
              </ReturnButton>
            </Link>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1 className="display-4 text-center">Add Book</h1>
            <p className="lead text-center">Create new book</p>
            <form noValidate onSubmit={onSubmit}>
              <InputTextfield
                label="Title of the Book"
                name="title"
                value={book.title}
                onChange={onChange}
                fullWidth
                variant="outlined"
                sx={{ marginBottom: '10px' }}
              />
              <InputTextfield
                label="ISBN"
                name="isbn"
                value={book.isbn}
                onChange={onChange}
                fullWidth
                variant="outlined"
                sx={{ marginBottom: '10px' }}
              />
              <InputTextfield
                label="Author"
                name="author"
                value={book.author}
                onChange={onChange}
                fullWidth
                variant="outlined"
                sx={{ marginBottom: '10px' }}
              />
              <InputTextfield
                label="Description"
                name="description"
                value={book.description}
                onChange={onChange}
                fullWidth
                variant="outlined"
                sx={{ marginBottom: '10px' }}
              />
              <InputTextfield
                label="Published Date"
                name="published_date"
                value={book.published_date}
                onChange={onChange}
                fullWidth
                variant="outlined"
                sx={{ marginBottom: '10px' }}
              />
              <InputTextfield
                label="Publisher of the Book"
                name="publisher"
                value={book.publisher}
                onChange={onChange}
                fullWidth
                variant="outlined"
                sx={{ marginBottom: '10px' }}
              />
              <InputTextfield
                label="Style of the book"
                name="style"
                value={book.style}
                onChange={onChange}
                fullWidth
                variant="outlined"
                sx={{ marginBottom: '10px' }}
              />
              <InputTextfield
              type="file"
              name="image"
              accept='image/*'
              onChange={onChange}
              fullWidth
              sx={{ marginBottom: '10px' }}
            />

              <AddButton
                type="submit"
                variant="contained"
              >
                Add a book
              </AddButton>
            </form>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CreateBook;


const ReturnButton = styled(Button)(() => ({
  backgroundColor: '#533745',
  '&:hover': {
    backgroundColor: '#AB4E68',
  },
}))

const AddButton = styled(Button)(() => ({
  backgroundColor: '#9D9171',
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
      borderColor: '#533745',
    },
  },
})
