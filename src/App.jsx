import { useEffect, useState } from 'react'
import { ShopProvider } from './lib'
import { Header, CartDrawer, Toast, Footer } from './Header'
import { AuthProvider } from './auth'
import { AuthPage, Guard, Account, Admin } from './accountPages'
import { Finder } from './Finder'
import { About, Contact, Faq, Shipping, Returns, Privacy, Terms, Track, NotFound } from './Info'
import { Home, Shop, Product, Customize, Wishlist } from './pages'

function useHash() {
  const [h, setH] = useState(location.hash || '#/')
  useEffect(() => { const f = () => { setH(location.hash || '#/'); window.scrollTo(0, 0) }; window.addEventListener('hashchange', f); return () => window.removeEventListener('hashchange', f) }, [])
  return h
}
export default function App() {
  const h = useHash()
  const [, a, b] = h.replace('#', '').split('?')[0].split('/')
  let page
  if (a === 'shop') page = <Shop slug={b} />
  else if (a === 'product') page = <Product id={b} />
  else if (a === 'customize') page = <Customize />
  else if (a === 'wishlist') page = <Wishlist />
  else if (a === 'finder') page = <Finder />
  else if (a === 'login') page = <AuthPage mode="login" />
  else if (a === 'signup') page = <AuthPage mode="signup" />
  else if (a === 'account') page = <Guard><Account /></Guard>
  else if (a === 'admin') page = <Guard role="admin"><Admin /></Guard>
  else if (a === 'about') page = <About />
  else if (a === 'contact') page = <Contact />
  else if (a === 'faq') page = <Faq />
  else if (a === 'shipping') page = <Shipping />
  else if (a === 'returns') page = <Returns />
  else if (a === 'privacy') page = <Privacy />
  else if (a === 'terms') page = <Terms />
  else if (a === 'track') page = <Track />
  else if (!a || a === '') page = <Home />
  else page = <NotFound />
  return (
    <AuthProvider><ShopProvider>
      <Header />
      <main>{page}</main>
      <Footer />
      <CartDrawer />
      <Toast />
    </ShopProvider></AuthProvider>
  )
}
