import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { AuthProvider } from './contexts/AuthContext'
import Cadastro from './pages/Cadastro'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
