import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'

function Home() {
  const { estaLogado, usuario } = useAuth()
  const [textoPost, setTextoPost] = useState('')
  const [posts, setPosts] = useState([])
  const [curtidos, setCurtidos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [mensagem, setMensagem] = useState('')

  const nomeExibido = estaLogado ? usuario?.username || 'Usuário' : 'Visitante'

  useEffect(() => {
    buscarPosts()
  }, [])

  useEffect(() => {
    if (!usuario?.id) {
      setCurtidos([])
      return
    }

    const curtidasSalvas = localStorage.getItem(`@redeSocial:curtidos:${usuario.id}`)
    setCurtidos(curtidasSalvas ? JSON.parse(curtidasSalvas) : [])
  }, [usuario])

  function salvarCurtidos(novosCurtidos) {
    setCurtidos(novosCurtidos)

    if (usuario?.id) {
      localStorage.setItem(
        `@redeSocial:curtidos:${usuario.id}`,
        JSON.stringify(novosCurtidos),
      )
    }
  }

  async function buscarPosts() {
    try {
      setCarregando(true)
      const resposta = await api.get('/posts')
      setPosts(resposta.data)
    } catch (error) {
      setMensagem('Não foi possível carregar os posts.')
    } finally {
      setCarregando(false)
    }
  }

  async function publicarPost() {
    if (!textoPost.trim()) {
      setMensagem('Digite algum texto antes de publicar.')
      return
    }

    try {
      setMensagem('')

      await api.post('/posts', {
        content: textoPost,
      })

      setTextoPost('')
      await buscarPosts()
    } catch (error) {
      setMensagem(error.response?.data?.message || 'Erro ao publicar post.')
    }
  }

  async function alternarCurtida(postId) {
    if (!estaLogado) {
      return
    }

    const jaCurtiu = curtidos.includes(postId)

    try {
      setMensagem('')

      if (jaCurtiu) {
        await api.delete(`/favorites/${postId}`)

        salvarCurtidos(curtidos.filter((id) => id !== postId))

        setPosts((postsAtuais) =>
          postsAtuais.map((post) =>
            post.id === postId
              ? { ...post, likes: Math.max(Number(post.likes) - 1, 0) }
              : post,
          ),
        )
      } else {
        await api.post(`/favorites/${postId}`)

        salvarCurtidos([...curtidos, postId])

        setPosts((postsAtuais) =>
          postsAtuais.map((post) =>
            post.id === postId
              ? { ...post, likes: Number(post.likes) + 1 }
              : post,
          ),
        )
      }
    } catch (error) {
      setMensagem(error.response?.data?.message || 'Erro ao atualizar curtida.')
    }
  }

  function formatarData(data) {
    if (!data) {
      return 'agora'
    }

    return new Date(data).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const totalCurtidas = posts.reduce((total, post) => total + Number(post.likes || 0), 0)

  const totalPostsUsuario = estaLogado
    ? posts.filter((post) => post.username === usuario?.username).length
    : 0

  return (
    <main className="page">
      <section className="layout">
        <aside className="sidebar">
          <div className="profile-card">
            <div className="profile-cover"></div>

            <div className="avatar">{nomeExibido[0]}</div>

            <h2>{nomeExibido}</h2>

            <p>
              {estaLogado
                ? 'Publique pensamentos, curta posts e acompanhe a timeline.'
                : 'Entre na sua conta para publicar e curtir posts.'}
            </p>

            <div className="stats">
              <div>
                <strong>{totalPostsUsuario}</strong>
                <span>Posts</span>
              </div>

              <div>
                <strong>{totalCurtidas}</strong>
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

              {mensagem && <p className="feedback-message">{mensagem}</p>}
            </section>
          ) : (
            <section className="visitor-box">
              <h2>Você está visualizando como visitante</h2>
              <p>Faça login para publicar posts e curtir publicações.</p>
              {mensagem && <p className="feedback-message">{mensagem}</p>}
            </section>
          )}

          <section className="posts-list">
            {carregando && (
              <article className="tweet-card">
                <div className="tweet-content">
                  <p>Carregando posts...</p>
                </div>
              </article>
            )}

            {!carregando && posts.length === 0 && (
              <article className="tweet-card">
                <div className="tweet-avatar">T</div>

                <div className="tweet-content">
                  <div className="tweet-meta">
                    <strong>THE REDE SOCIAL</strong>
                    <span>@theredesocial · agora</span>
                  </div>

                  <p>Nenhum post publicado ainda. Seja o primeiro a postar!</p>
                </div>
              </article>
            )}

            {!carregando &&
              posts.map((post) => {
                const jaCurtiu = curtidos.includes(post.id)

                return (
                  <article className="tweet-card" key={post.id}>
                    <div className="tweet-avatar">{post.username?.[0] || 'U'}</div>

                    <div className="tweet-content">
                      <div className="tweet-meta">
                        <strong>{post.username}</strong>
                        <span>
                          @{post.username} · {formatarData(post.created_at)}
                        </span>
                      </div>

                      <p>{post.content}</p>

                      <button
                        type="button"
                        disabled={!estaLogado}
                        onClick={() => alternarCurtida(post.id)}
                      >
                        {jaCurtiu ? '♥ Descurtir' : '♡ Curtir'} · {post.likes || 0}
                      </button>
                    </div>
                  </article>
                )
              })}
          </section>
        </section>
      </section>
    </main>
  )
}

export default Home
