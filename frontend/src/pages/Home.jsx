import { useAuth } from '../contexts/AuthContext'

function Home() {
  const { estaLogado, usuario } = useAuth()

  return (
    <main className="page">
      <section className="layout">
        <aside className="sidebar">
          <div className="profile-card">
            <div className="profile-cover"></div>

            <div className="avatar">
              {(usuario?.name || usuario?.nome || 'T')[0]}
            </div>

            <h2>
              {estaLogado
                ? usuario?.name || usuario?.nome || 'Usuário'
                : 'Visitante'}
            </h2>

            <p>
              {estaLogado
                ? 'Publique pensamentos, curta posts e acompanhe a timeline.'
                : 'Entre na sua conta para publicar e curtir posts.'}
            </p>

            <div className="stats">
              <div>
                <strong>0</strong>
                <span>Posts</span>
              </div>

              <div>
                <strong>0</strong>
                <span>Curtidas</span>
              </div>
            </div>
          </div>

          <div className="about-box">
            <h3>THE REDE SOCIAL</h3>
            <p>
              Rede social acadêmica inspirada no visual clássico das redes
              sociais do início da década de 2010.
            </p>
          </div>
        </aside>

        <section className="timeline">
          <div className="timeline-title">
            <h1>Timeline</h1>
            <span>React • Express • SQLite</span>
          </div>

          {estaLogado ? (
            <section className="composer">
              <label htmlFor="post">O que estou pensando?</label>

              <textarea
                id="post"
                placeholder="Compartilhe uma ideia em até 280 caracteres..."
                maxLength="280"
              />

              <div className="composer-footer">
                <span>280 caracteres</span>
                <button type="button">Publicar</button>
              </div>
            </section>
          ) : (
            <section className="visitor-box">
              <h2>Você está visualizando como visitante</h2>
              <p>Faça login para publicar posts e curtir publicações.</p>
            </section>
          )}

          <section className="posts-list">
            <article className="tweet-card">
              <div className="tweet-avatar">T</div>

              <div className="tweet-content">
                <div className="tweet-meta">
                  <strong>THE REDE SOCIAL</strong>
                  <span>@theredesocial · agora</span>
                </div>

                <p>Os posts do backend serão listados aqui na próxima etapa.</p>

                <button type="button" disabled>
                  ♡ Curtir
                </button>
              </div>
            </article>
          </section>
        </section>
      </section>
    </main>
  )
}

export default Home
