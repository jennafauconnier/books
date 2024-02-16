import './App.css'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'


import CreateBook from "./components/CreateBook"
import ShowBookList from "./components/ShowBookList"
import ShowBookDetails from "./components/ShowBookDetails"
import UpdateBookInfo from "./components/UpdateBookInfo"
import Signup from './pages/Auth/Signup'
import Signin from './pages/Auth/Signin'

function App() {

  return (
    <>
     <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/showbook" element={<ShowBookList />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/show-book/:id" element={<ShowBookDetails />} />
          <Route path="/edit-book/:id" element={<UpdateBookInfo />} />
      </Routes> 
    </>
  )
}

export default App
