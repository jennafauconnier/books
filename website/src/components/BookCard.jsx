import { Link } from 'react-router-dom'
import '../App.css'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const BookCard = ({ test, id, title, author, description, image }) => {
  return (
    <Link to={`/show-book/${id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ width: 280, height: '100%' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="360"
            image={image}
            alt="Cover books"
            style={{ top: 90 }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography gutterBottom variant="h9" component="div">
              {author}
            </Typography>
            <Typography noWrap variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default BookCard;