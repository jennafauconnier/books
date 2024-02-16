import { Link } from 'react-router-dom'
import '../App.css'

const BookCard = ({ book }) => {

  return (
    <Link to={`/show-book/${book?._id}`} style={{textDecoration: 'none', color: 'none'}}>
        <div className='card-container d-flex justify-content-center flex-column'>
        <img
            src={book?.image}
            alt='Books'
            height={383}
        />
        <div className='desc'>
            <h2>
                {book?.title}
            </h2>
            <h3>{book?.author}</h3>
            <p>{book?.description}</p>
        </div>
        </div>
    </Link>
  );
};

export default BookCard;