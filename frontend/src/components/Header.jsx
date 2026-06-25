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
    <header className="topbar">
      <div className="topbar-content">
        <Link to="/" className="brand">
          THE REDE SOCIAL
        </Link>

        <nav className="menu">
          <Link to="/">Início</Link>

          {!estaLogado && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/cadastro" className="signup-link">
                Cadastro
              </Link>
            </>
          )}

          {estaLogado && (
            <>
              <span className="user-pill">
                {usuario?.name || usuario?.nome || 'Usuário'}
              </span>

              <button type="button" onClick={handleLogout}>
                Sair
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
