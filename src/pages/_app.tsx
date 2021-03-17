
import '../styles/global.css'
import { Provider } from 'next-auth/client'


//_app carrega conteúdo a cada nova tela de navegação
function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
