import { Link } from 'react-router-dom'
import '../App.css'

const BookCard = ({book}) => {

  return (
    <Link to={`/show-book/${book._id}`} style={{textDecoration: 'none', color: 'none'}}>
        <div className='card-container'>
        <img
            src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
            alt='Books'
            height={200}
        />
        <div className='desc'>
            <h2>
                {book.title}
            </h2>
            <h3>{book.author}</h3>
            <p>{book.description}</p>
        </div>
        </div>
    </Link>
  );
};

export default BookCard;