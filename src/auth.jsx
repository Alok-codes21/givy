import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const A = createContext(null)
export const useAuth = () => useContext(A)
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v))
// Demo only: passwords are salted+hashed in the browser. This is NOT real security.
async function hash(pw, salt) {
  const data = new TextEncoder().encode(salt + ':' + pw)
  if (window.crypto?.subtle) { const b = await crypto.subtle.digest('SHA-256', data); return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('') }
  let h = 5381; for (const c of data) h = ((h << 5) + h + c) >>> 0; return 'x' + h
}
export const ADMIN_DEMO = { email: 'admin@givy.demo', password: 'Admin@123' }
const SESSION_MS = 1000 * 60 * 60 * 8

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => load('givy-users', []))
  const [session, setSession] = useState(() => { const s = load('givy-session', null); return s && s.exp > Date.now() ? s : null })
  const [orders, setOrders] = useState(() => load('givy-orders', []))
  const [hidden, setHidden] = useState(() => load('givy-hidden', []))
  const [addrs, setAddrs] = useState(() => load('givy-addrs', []))
  const [ready, setReady] = useState(false)
  useEffect(() => { save('givy-users', users) }, [users])
  useEffect(() => { save('givy-orders', orders) }, [orders])
  useEffect(() => { save('givy-addrs', addrs) }, [addrs])
  useEffect(() => { save('givy-hidden', hidden) }, [hidden])
  useEffect(() => { session ? save('givy-session', session) : localStorage.removeItem('givy-session') }, [session])
  useEffect(() => {
    (async () => {
      if (!load('givy-users', []).some((u) => u.email === ADMIN_DEMO.email)) {
        const salt = Math.random().toString(36).slice(2)
        const admin = { id: 'u-admin', name: 'Givy Admin', email: ADMIN_DEMO.email, role: 'admin', salt, hash: await hash(ADMIN_DEMO.password, salt), created: Date.now() }
        setUsers((u) => [...u.filter((x) => x.email !== admin.email), admin])
      }
      setReady(true)
    })()
  }, [])
  const user = session ? users.find((u) => u.id === session.uid) || null : null

  const signup = useCallback(async ({ name, email, password }) => {
    email = email.trim().toLowerCase()
    if (!name.trim()) return 'Please enter your name'
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Enter a valid email'
    if (password.length < 8 || !/\d/.test(password)) return 'Password needs 8+ characters and a number'
    if (users.some((u) => u.email === email)) return 'An account with this email already exists'
    const salt = Math.random().toString(36).slice(2)
    const u = { id: 'u-' + Date.now(), name: name.trim(), email, role: 'user', salt, hash: await hash(password, salt), created: Date.now() }
    setUsers((x) => [...x, u]); setSession({ uid: u.id, exp: Date.now() + SESSION_MS }); return null
  }, [users])
  const login = useCallback(async ({ email, password }) => {
    email = email.trim().toLowerCase()
    const u = users.find((x) => x.email === email)
    if (!u || (await hash(password, u.salt)) !== u.hash) return 'Wrong email or password'
    setSession({ uid: u.id, exp: Date.now() + SESSION_MS }); return null
  }, [users])
  const loginGoogle = useCallback((cred) => {
    try {
      const p = JSON.parse(decodeURIComponent(escape(atob(cred.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))))
      const email = String(p.email || '').toLowerCase()
      if (!email) return 'Google did not return an email'
      // Demo: the token is decoded in the browser, not verified by a server.
      const ex = users.find((u) => u.email === email)
      const u = ex || { id: 'u-g' + Date.now(), name: p.name || email.split('@')[0], email, role: 'user', google: true, picture: p.picture, created: Date.now() }
      if (!ex) setUsers((x) => [...x, u])
      setSession({ uid: u.id, exp: Date.now() + SESSION_MS }); return null
    } catch { return 'Google sign-in failed' }
  }, [users])
  const myAddrs = addrs.filter((x) => x.uid === user?.id)
  const addAddr = (ad) => { const n = { ...ad, id: 'a' + Date.now(), uid: user.id }; setAddrs((x) => [...x, n]); return n }
  const delAddr = (id) => setAddrs((x) => x.filter((a) => a.id !== id))
  const logout = () => setSession(null)
  const setRole = (id, role) => { if (user?.role !== 'admin') return; setUsers((x) => x.map((u) => (u.id === id ? { ...u, role } : u))) }
  const placeOrder = (o) => { const order = { id: 'GV' + String(Date.now()).slice(-6), uid: user?.id, at: Date.now(), status: 'Placed', ...o }; setOrders((x) => [order, ...x]); return order }
  const setStatus = (id, status) => { if (user?.role !== 'admin') return; setOrders((x) => x.map((o) => (o.id === id ? { ...o, status } : o))) }
  const toggleHidden = (id) => { if (user?.role !== 'admin') return; setHidden((h) => (h.includes(id) ? h.filter((x) => x !== id) : [...h, id])) }
  return <A.Provider value={{ user, users, orders, hidden, ready, myAddrs, addAddr, delAddr, signup, login, loginGoogle, logout, setRole, placeOrder, setStatus, toggleHidden }}>{children}</A.Provider>
}
