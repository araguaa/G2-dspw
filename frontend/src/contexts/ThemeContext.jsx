import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [modoNoite, setModoNoite] = useState(() => {
    return localStorage.getItem('@redeSocial:tema') === 'noite'
  })

  useEffect(() => {
    if (modoNoite) {
      document.body.classList.add('night-mode')
      localStorage.setItem('@redeSocial:tema', 'noite')
    } else {
      document.body.classList.remove('night-mode')
      localStorage.setItem('@redeSocial:tema', 'classico')
    }
  }, [modoNoite])

  function alternarTema() {
    setModoNoite((temaAtual) => !temaAtual)
  }

  return (
    <ThemeContext.Provider value={{ modoNoite, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
