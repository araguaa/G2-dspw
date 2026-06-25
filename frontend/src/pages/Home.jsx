import { useAuth } from '../contexts/AuthContext'

function Home() {
  const { estaLogado } = useAuth()

  return (
    <main className="container">
      <section className="hero-card">
        <p className="tag">Rede social acadêmica</p>

        <h1>MiniSocial</h1>

        <p>
          Uma rede social simples, no estilo do Twitter antigo, feita com React,
          Express e SQLite.
        </p>
      </section>

      {estaLogado ? (
        <section className="card">
          <h2>O que estou pensando?</h2>

          <textarea placeholder="Digite seu post..." maxLength="280" />

          <button type="button">Publicar</button>
        </section>
      ) : (
        <section className="card aviso">
          <h2>Você está visualizando como visitante</h2>

          <p>Faça login para publicar posts e curtir publicações.</p>
        </section>
      )}

      <section className="posts">
        <h2>Posts recentes</h2>

        <article className="post">
          <strong>MiniSocial</strong>

          <p>Os posts do backend serão listados aqui na próxima etapa.</p>

          <button type="button" disabled>
            🤍 Curtir
          </button>
        </article>
      </section>
    </main>
  )
}

export default Home
