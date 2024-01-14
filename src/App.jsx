import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import LayoutHome from './components/LayoutHome'
import RequireAuth from './components/RequireAuth'
import Home from './components/Home'
import Register from './components/Register'
import PersistLogin from './components/PersistLogin'

function App() {

  return (
    <Routes>
      <Route path='/' element={<LayoutHome />}>
        <Route index element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>

      <Route element={<PersistLogin />}>
        <Route path='/' element={<RequireAuth />} >
          <Route path='home' element={<Home />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
