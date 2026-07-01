import { Route, Routes } from 'react-router-dom'
import './App.css'
import Body from './components/Body'
import Login from './pages/Login'
import Browse from './components/Browse'
import Header from './components/Header'

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Body />} />
      <Route path="/header" element={<Header />} />
      <Route path="/login" element={<Login />} />
      <Route path="/browse" element={<Browse  />} />

    </Routes>
  )
}

export default App
