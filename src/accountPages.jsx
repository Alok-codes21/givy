import { useState, useEffect, useRef } from 'react'
import { GOOGLE_CLIENT_ID } from './config'
import { motion } from 'motion/react'
import { useAuth, ADMIN_DEMO } from './auth'
import { PRODUCTS, money, img } from './data'
import { useShop } from './lib'
import { AddressForm, validAddr, emptyAddr } from './AddressForm'

function GoogleBtn({ onCred }) {
  const ref = useRef(null)
  const cb = useRef(onCred); cb.current = onCred
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return
    const init = () => { window.google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: (r) => cb.current(r.credential) }); window.google.accounts.id.renderButton(ref.current, { theme: 'outline', size: 'large', width: 320, text: 'continue_with', shape: 'rectangular' }) }
    if (window.google?.accounts) return init()
    const s = document.createElement('script'); s.src = 'https://accounts.google.com/gsi/client'; s.async = true; s.onload = init; document.head.appendChild(s)
  }, [])
  if (!GOOGLE_CLIENT_ID) return <div className="gbtn off" title="Add a Google client ID in src/config.js to enable"><svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.5 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z"/><path fill="#FBBC05" d="M10.4 28.7A14.5 14.5 0 019.5 24c0-1.6.3-3.2.9-4.7l-7.8-6.1A24 24 0 000 24c0 3.9.9 7.5 2.6 10.8l7.8-6.1z"/><path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.6-5.9c-2 1.4-4.7 2.3-7.6 2.3-6.3 0-11.7-4-13.6-9.8l-7.8 6.1C6.5 42.6 14.6 48 24 48z"/></svg>Continue with Google<small>setup needed: add client ID</small></div>
  return <div className="gbtn-wrap" ref={ref} />
}

export function AuthPage({ mode }) {
  const { signup, login, user } = useAuth()
  const [f, setF] = useState({ name: '', email: '', password: '' })
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const back = new URLSearchParams((location.hash.split('?')[1] || '')).get('next') || '/account'
  if (user) { setTimeout(() => (location.hash = '#' + (user.role === 'admin' && back === '/account' ? '/admin' : back)), 0) }
  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setErr('')
    const r = mode === 'signup' ? await signup(f) : await login(f)
    setBusy(false); if (r) setErr(r)
  }
  const s = mode === 'signup'
  const { loginGoogle } = useAuth()
  const onG = (c) => { const r = loginGoogle(c); if (r) setErr(r) }
  return (
    <section className="sec auth">
      <motion.form className="auth-card" onSubmit={submit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="eyebrow">{s ? 'Join Givy' : 'Welcome back'}</p>
        <h1 className="h-l">{s ? <>Create your <i>account</i></> : <>Log <i>in</i></>}</h1>
        {s && <label className="field">Name<input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} autoComplete="name" /></label>}
        <label className="field">Email<input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" /></label>
        <label className="field">Password<input type="password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} autoComplete={s ? 'new-password' : 'current-password'} /></label>
        {err && <p className="err" role="alert">{err}</p>}
        <button className="btn full" disabled={busy}>{busy ? 'Please wait' : s ? 'Create account' : 'Log in'}</button>
        <div className="or"><span>or</span></div>
        <GoogleBtn onCred={onG} />
        <p className="swap">{s ? 'Already have an account?' : 'New to Givy?'} <a href={s ? '#/login' : '#/signup'}>{s ? 'Log in' : 'Sign up'}</a></p>
        {!s && <p className="demo-note">Demo site: accounts live only in this browser. Try the admin demo: <b>{ADMIN_DEMO.email}</b> / <b>{ADMIN_DEMO.password}</b></p>}
        {s && <p className="demo-note">Demo site: nothing is sent to a server. Do not reuse a real password.</p>}
      </motion.form>
    </section>
  )
}

export function Guard({ role, children }) {
  const { user, ready } = useAuth()
  if (!ready) return <section className="sec"><p className="empty-t">Loading</p></section>
  if (!user) { setTimeout(() => (location.hash = '#/login?next=' + encodeURIComponent(location.hash.replace('#', ''))), 0); return null }
  if (role && user.role !== role) return (
    <section className="sec auth"><div className="auth-card"><p className="eyebrow">403</p><h1 className="h-l">Access <i>denied</i></h1><p className="lead sm">The admin area is only for admin accounts. You are signed in as {user.name} ({user.role}).</p><a className="btn" href="#/">Back to home</a></div></section>
  )
  return children
}

export function Account() {
  const { user, orders, logout, myAddrs, addAddr, delAddr } = useAuth()
  const [adding, setAdding] = useState(false)
  const [af, setAf] = useState(emptyAddr)
  const { wish } = useShop()
  const mine = orders.filter((o) => o.uid === user.id)
  return (
    <section className="sec acct">
      <p className="eyebrow">My account</p>
      <h1 className="h-l">Hi, <i>{user.name.split(' ')[0]}</i></h1>
      <p className="lead sm">{user.email} <span className="role">{user.role}</span></p>
      <div className="acct-grid">
        <div className="panel"><h3>Orders</h3>
          {mine.length ? mine.map((o) => <div className="ord" key={o.id}><div><b>#{o.id}</b><small>{new Date(o.at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} {'\u00B7'} {o.items.reduce((a, b) => a + b.qty, 0)} items{o.ship ? ` \u00B7 to ${o.ship.name}, ${o.ship.city}` : ''}</small></div><span className="st">{o.status}</span><b>{money(o.total)}</b></div>) : <p className="mute">No orders yet. <a href="#/shop">Find a gift</a></p>}
        </div>
        <div className="panel"><h3>Wishlist ({wish.length})</h3>
          {wish.length ? <div className="mini">{PRODUCTS.filter((p) => wish.includes(p.id)).map((p) => <a key={p.id} href={`#/product/${p.id}`}><img src={img(p.img)} alt={p.name} /><span>{p.name}</span></a>)}</div> : <p className="mute">Tap the heart on any gift to save it.</p>}
        </div>
      </div>
      <div className="panel"><h3>Saved addresses ({myAddrs.length})</h3>
        <p className="mute sm">Save your own address or a gift recipient's, and pick it at checkout.</p>
        {myAddrs.map((x) => <div className="ord" key={x.id}><div><b>{x.label || x.name}</b><small>{x.name} {'\u00B7'} {x.phone}<br />{x.line}, {x.city} {x.pin}</small></div><button className="link" onClick={() => delAddr(x.id)}>Delete</button></div>)}
        {adding ? <div className="addnew"><AddressForm value={af} onChange={setAf} labelField /><div className="cta"><button className="btn" disabled={!validAddr(af)} onClick={() => { addAddr(af); setAf(emptyAddr); setAdding(false) }}>Save address</button><button className="btn ghost" onClick={() => setAdding(false)}>Cancel</button></div></div>
          : <button className="btn ghost" onClick={() => setAdding(true)}>+ Add address</button>}
      </div>
      <div className="cta"><a className="btn ghost" href="#/finder">Gift finder</a>{user.role === 'admin' && <a className="btn" href="#/admin">Admin dashboard</a>}<button className="btn ghost" onClick={() => { logout(); location.hash = '#/' }}>Log out</button></div>
    </section>
  )
}

export function Admin() {
  const { users, orders, hidden, toggleHidden, setRole, setStatus, user } = useAuth()
  const revenue = orders.reduce((a, o) => a + o.total, 0)
  return (
    <section className="sec admin">
      <p className="eyebrow">Admin {'\u00B7'} demo</p>
      <h1 className="h-l">Dashboard</h1>
      <div className="stats"><div><b>{orders.length}</b><span>Orders</span></div><div><b>{money(revenue)}</b><span>Revenue</span></div><div><b>{users.length}</b><span>Users</span></div><div><b>{PRODUCTS.length - hidden.length}/{PRODUCTS.length}</b><span>Products live</span></div></div>
      <div className="panel"><h3>Orders</h3>
        {orders.length ? orders.map((o) => <div className="ord" key={o.id}><div><b>#{o.id}</b><small>{o.ship ? `${o.ship.name}, ${o.ship.line}, ${o.ship.city} ${o.ship.pin} \u00B7 ${o.ship.phone}` : o.name}</small></div>
          <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value)}>{['Placed', 'Packed', 'Shipped', 'Delivered'].map((s) => <option key={s}>{s}</option>)}</select><b>{money(o.total)}</b></div>) : <p className="mute">No orders yet. Place one from a user account.</p>}
      </div>
      <div className="panel"><h3>Users</h3>
        {users.map((u) => <div className="ord" key={u.id}><div><b>{u.name}</b><small>{u.email}</small></div>
          <select value={u.role} disabled={u.id === user.id} onChange={(e) => setRole(u.id, e.target.value)}><option>user</option><option>admin</option></select><span /></div>)}
      </div>
      <div className="panel"><h3>Products (show / hide on the store)</h3>
        <div className="prods">{PRODUCTS.map((p) => <label key={p.id} className="prow"><input type="checkbox" checked={!hidden.includes(p.id)} onChange={() => toggleHidden(p.id)} /><img src={img(p.img)} alt="" /><span>{p.name}</span><b>{money(p.price)}</b></label>)}</div>
      </div>
      <div className="panel"><h3>Contact messages</h3>{(JSON.parse(localStorage.getItem('givy-messages') || '[]')).map((m, n) => <div className="ord" key={n}><div><b>{m.name} <small style={{ display: 'inline' }}>{m.email} {'\u00B7'} {m.topic}</small></b><small>{m.msg}</small></div></div>)}{!JSON.parse(localStorage.getItem('givy-messages') || '[]').length && <p className="mute">No messages yet.</p>}</div>
      <div className="panel"><h3>Newsletter subscribers</h3><p className="mute">{JSON.parse(localStorage.getItem('givy-subs') || '[]').join(', ') || 'None yet.'}</p></div>
      <p className="demo-note">All data lives in this browser only. Real authorization needs a server.</p>
    </section>
  )
}
