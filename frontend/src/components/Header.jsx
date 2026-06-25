import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Header() {
  const { usuario, estaLogado, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <Link to="/" className="logo">
        MiniSocial
      </Link>

      <nav>
        <Link to="/">Início</Link>

        {!estaLogado && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/cadastro">Cadastro</Link>
          </>
        )}

        {estaLogado && (
          <>
            <span className="usuario-logado">
              Olá, {usuario?.name || usuario?.nome || 'usuário'}
            </span>

            <button type="button" onClick={handleLogout}>
              Sair
            </button>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header