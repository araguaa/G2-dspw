import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Cadastro() {
  const [mensagem, setMensagem] = useState('')
  const { cadastrar } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const senha = watch('senha')

  async function onSubmit(dados) {
    try {
      setMensagem('')
      await cadastrar(dados)
      navigate('/login')
    } catch (error) {
      setMensagem(error.response?.data?.message || 'Erro ao criar conta.')
    }
  }

  return (
    <main className="container auth-container">
      <section className="card auth-card">
        <h1>Criar conta</h1>
        <p>Cadastre-se para participar da rede social.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            placeholder="Seu nome"
            {...register('nome', {
              required: 'O nome é obrigatório.',
              minLength: {
                value: 3,
                message: 'O nome deve ter pelo menos 3 caracteres.',
              },
            })}
          />
          {errors.nome && <span className="erro">{errors.nome.message}</span>}

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
            placeholder="Mínimo de 6 caracteres"
            {...register('senha', {
              required: 'A senha é obrigatória.',
              minLength: {
                value: 6,
                message: 'A senha deve ter pelo menos 6 caracteres.',
              },
            })}
          />
          {errors.senha && <span className="erro">{errors.senha.message}</span>}

          <label htmlFor="confirmarSenha">Confirmar senha</label>
          <input
            id="confirmarSenha"
            type="password"
            placeholder="Repita sua senha"
            {...register('confirmarSenha', {
              required: 'Confirme sua senha.',
              validate: (value) => value === senha || 'As senhas não coincidem.',
            })}
          />
          {errors.confirmarSenha && (
            <span className="erro">{errors.confirmarSenha.message}</span>
          )}

          {mensagem && <p className="erro-box">{mensagem}</p>}

          <button type="submit">Cadastrar</button>
        </form>

        <p className="link-auth">
          Já tem conta? <Link to="/login">Fazer login</Link>
        </p>
      </section>
    </main>
  )
}

export default Cadastro
