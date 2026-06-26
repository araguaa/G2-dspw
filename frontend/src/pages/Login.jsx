import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Login() {
  const [mensagem, setMensagem] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  async function onSubmit(dados) {
    try {
      setMensagem('')
      await login(dados)
      navigate('/')
    } catch (error) {
      setMensagem(error.response?.data?.message || 'Erro ao fazer login.')
    }
  }

  return (
    <main className="container auth-container">
      <section className="card auth-card">
        <h1>Entrar</h1>
        <p>Acesse sua conta para publicar e curtir posts.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="seuemail@email.com"
            {...register('email', {
              required: 'O e-mail é obrigatório.',
            })}
          />
          {errors.email && <span className="erro">{errors.email.message}</span>}

          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            {...register('senha', {
              required: 'A senha é obrigatória.',
            })}
          />
          {errors.senha && <span className="erro">{errors.senha.message}</span>}

          {mensagem && <p className="erro-box">{mensagem}</p>}

          <button type="submit">Entrar</button>
        </form>

        <p className="link-auth">
          Ainda não tem conta? <Link to="/cadastro">Criar conta</Link>
        </p>
      </section>
    </main>
  )
}

export default Login
