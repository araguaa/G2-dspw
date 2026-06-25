import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

function Home() {
  const { estaLogado, usuario } = useAuth()
  const [textoPost, setTextoPost] = useState('')

  const [posts, setPosts] = useState([
    {
      id: 1,
      autor: 'THE REDE SOCIAL',
      usuario: '@theredesocial',
      texto: 'Bem-vindo à timeline. Aqui serão exibidos os posts cadastrados no backend.',
      curtido: false,
      curtidas: 0,
      horario: 'agora',
    },
    {
      id: 2,
      autor: 'Projeto Web',
      usuario: '@devweb',
      texto: 'Rede social acadêmica com React, Express e SQLite, inspirada no visual clássico das redes sociais antigas.',
      curtido: false,
      curtidas: 2,
      horario: 'há pouco',
    },
  ])

  function publicarPost() {
    if (!textoPost.trim()) {
      return
    }

    const nomeUsuario = usuario?.name || usuario?.nome || 'Usuário'

    const novoPost = {
      id: Date.now(),
      autor: nomeUsuario,
      usuario: `@${nomeUsuario.toLowerCase().replaceAll(' ', '')}`,
      texto: textoPost,
      curtido: false,
      curtidas: 0,
      horario: 'agora',
    }

    setPosts([novoPost, ...posts])
    setTextoPost('')
  }

  function alternarCurtida(id) {
    if (!estaLogado) {
      return
    }

    const postsAtualizados = posts.map((post) => {
      if (post.id !== id) {
        return post
      }

      return {
        ...post,
        curtido: !post.curtido,
        curtidas: post.curtido ? post.curtidas - 1 : post.curtidas + 1,
      }
    })

    setPosts(postsAtualizados)
  }

  const nomeExibido = estaLogado
    ? usuario?.name || usuario?.nome || 'Usuário'
    : 'Visitante'

  return (
    <main className="page">
      <section className="layout">
        <aside className="sidebar">
          <div className="profile-card">
            <div className="profile-cover"></div>

            <div className="avatar">
              {nomeExibido[0]}
            </div>

            <h2>{nomeExibido}</h2>

            <p>
              {estaLogado
                ? 'Publique pensamentos, curta posts e acompanhe a timeline.'
                : 'Entre na sua conta para publicar e curtir posts.'}
            </p>

            <div className="stats">
              <div>
                <strong>{estaLogado ? posts.filter((post) => post.autor === nomeExibido).length : 0}</strong>
                <span>Posts</span>
              </div>

              <div>
                <strong>{posts.reduce((total, post) => total + post.curtidas, 0)}</strong>
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
                value={textoPost}
                onChange={(event) => setTextoPost(event.target.value)}
              />

              <div className="composer-footer">
                <span>{280 - textoPost.length} caracteres restantes</span>
                <button type="button" onClick={publicarPost}>
                  Publicar
                </button>
              </div>
            </section>
          ) : (
            <section className="visitor-box">
              <h2>Você está visualizando como visitante</h2>
              <p>Faça login para publicar posts e curtir publicações.</p>
            </section>
          )}

          <section className="posts-list">
            {posts.map((post) => (
              <article className="tweet-card" key={post.id}>
                <div className="tweet-avatar">
                  {post.autor[0]}
                </div>

                <div className="tweet-content">
                  <div className="tweet-meta">
                    <strong>{post.autor}</strong>
                    <span>{post.usuario} · {post.horario}</span>
                  </div>

                  <p>{post.texto}</p>

                  <button
                    type="button"
                    disabled={!estaLogado}
                    onClick={() => alternarCurtida(post.id)}
                  >
                    {post.curtido ? '♥ Descurtir' : '♡ Curtir'} · {post.curtidas}
                  </button>
                </div>
              </article>
            ))}
          </section>
        </section>
      </section>
    </main>
  )
}

export default Home
