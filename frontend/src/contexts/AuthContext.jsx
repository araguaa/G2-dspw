import { createContext, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const usuarioSalvo = localStorage.getItem('@redeSocial:usuario')
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null
  })

  const estaLogado = !!usuario

  async function cadastrar(dados) {
    const resposta = await api.post('/auth/register', {
      name: dados.nome,
      email: dados.email,
      password: dados.senha,
    })

    return resposta.data
  }

  async function login(dados) {
    const resposta = await api.post('/auth/login', {
      email: dados.email,
      password: dados.senha,
    })

    const tokenRecebido = resposta.data.token
    const usuarioRecebido = resposta.data.user || resposta.data.usuario

    localStorage.setItem('@redeSocial:token', tokenRecebido)
    localStorage.setItem('@redeSocial:usuario', JSON.stringify(usuarioRecebido))

    setUsuario(usuarioRecebido)
  }

  function logout() {
    localStorage.removeItem('@redeSocial:token')
    localStorage.removeItem('@redeSocial:usuario')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, estaLogado, cadastrar, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}