
import '../styles/global.css'

//_app carrega conteúdo a cada nova tela de navegação
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
