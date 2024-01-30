import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBook = (props) => {
  const navigate = useNavigate();

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

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", book.image)
    formData.append("title", book.title)
    formData.append("isbn", book.isbn)
    formData.append("author", book.author)
    formData.append("description", book.description)
    formData.append("published_date", book.published_date)
    formData.append("publisher", book.publisher)
    formData.append("style", book.style)

    console.log('FORM DATA', formData.get("image"))

    axios
      .post("http://localhost:8082/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
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
        navigate("/")
      })
      .catch((err) => {
        console.log("Error in CreateBook!")
      })
  }

  return (
    <div className="CreateBook">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show BooK List
            </Link>
          </div>
          <div className="col-md-10 m-auto">
            <h1 className="display-4 text-center add-book">Add Book</h1>
            <p className="lead text-center">Create new book</p>
            <form noValidate onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title of the Book"
                  name="title"
                  className="form-control"
                  value={book.title}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="ISBN"
                  name="isbn"
                  className="form-control"
                  value={book.isbn}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Author"
                  name="author"
                  className="form-control"
                  value={book.author}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Describe this book"
                  name="description"
                  className="form-control"
                  value={book.description}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="date"
                  placeholder="published_date"
                  name="published_date"
                  className="form-control"
                  value={book.published_date}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Publisher of this Book"
                  name="publisher"
                  className="form-control"
                  value={book.publisher}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Style of the book"
                  name="style"
                  className="form-control"
                  value={book.style}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-warning btn-block mt-4 mb-4 w-100"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;