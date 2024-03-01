import { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, Paper, TableRow } from '@mui/material';

import { Link, useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles'
import api from '../services/api';

import './showbookdetails.css'

function ShowBookDetails() {
  const [book, setBook] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchBook = async() => {
    try {
      const res = await api.get(`/books/${id}`)
      setBook(res.data)
    } catch (err) {
      console.log('Error occured to recover this book.')
    }
  }

  const onDeleteBook = (id) => {
    try {
      api.delete(`books/${id}`)
      navigate('/showbook')
    } catch (err) {
      console.log('Error while deleting book.')
    }
  };

  useEffect(() => {
    fetchBook()
  }, []);

  return (
    <div className='ShowBookDetails'>
      <div className='container'>
          <div className='container-row'>
            <Link to='/showbook'>
              <ReturnButton variant="contained">
                Go back to Book List
              </ReturnButton>
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>{book?.title}</h1>
            <p className='lead text-center'>Book's Info</p>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>{book.title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Author</TableCell>
                  <TableCell>{book.author}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ISBN</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Publisher</TableCell>
                  <TableCell>{book.publisher}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Published Date</TableCell>
                  <TableCell>{book.published_date}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{book.description}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className='button-container'>
            <Link to={`/edit-book/${book._id}`}>
              <EditButton>
                Edit Book
              </EditButton>
            </Link>

            <DeleteButton
              variant='contained'
              onClick={() => {
                onDeleteBook(book._id);
              }}
            >
              Delete Book
            </DeleteButton>
          </div>
        </div>
      </div>
  );
}

const ReturnButton = styled(Button)(() => ({
  backgroundColor: '#533745',
  '&:hover': {
    backgroundColor: '#AB4E68',
  },
}))

const DeleteButton = styled(Button)(() => ({
  backgroundColor: '#533745',
  color: 'white',
  '&:hover': {
    backgroundColor: '#D83B67',
  },
}))

const EditButton = styled(Button)(() => ({
  backgroundColor: '#B07156',
  color: 'white',
  '&:hover': {
    backgroundColor: '#533745',
  },
}))

export default ShowBookDetails;