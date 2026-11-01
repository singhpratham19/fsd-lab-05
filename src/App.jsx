import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import PostPage from './pages/PostPage'

function App() {
  return (
    <>
      <header>
        <h1>
          <Link to="/">Blog Post Management System</Link>
        </h1>
        <p>Pratham Singh, PRN 1032211384</p>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostPage />} />
      </Routes>
    </>
  )
}

export default App
