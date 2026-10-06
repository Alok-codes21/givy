import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CATEGORIES, img, money } from './data'
import { useShop } from './lib'
import { useAuth } from './auth'
import { Newsletter, STORE } from './Info'
import { AddressForm, validAddr, emptyAddr } from './AddressForm'

export function Logo({ full }) { return <a href="#/" className="logo" aria-label="Givy home"><img src={`${import.meta.env.BASE_URL}img/${full ? 'logo-full' : 'logo-head'}.png`} alt="Givy" /></a> }

export function Header() {
  const { count, setOpen, wish } = useShop()
  const { user } = useAuth()
  const [menu, setMenu] = useState(false)
  const [sc, setSc] = useState(false)
  useEffect(() => { const f = () => setSc(window.scrollY > 24); f(); window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f) }, [])
  useEffect(() => { const c = () => setMenu(false); window.addEventListener('hashchange', c); return () => window.removeEventListener('hashchange', c) }, [])
  return (
    <>
      <div className="announce">Free gift wrap on every order &nbsp;{'\u2726'}&nbsp; Free shipping above {money(999)}</div>
      <header className={'hdr' + (sc ? ' sc' : '')}>
        <button className="burger" aria-label="Menu" onClick={() => setMenu(true)}><i /><i /></button>
        <Logo />
        <nav className="nav">
          <a href="#/shop/hampers">Hampers</a><a href="#/shop/birthday">Birthday</a><a href="#/shop/anniversary">Anniversary</a><a href="#/shop/valentines">Valentine's</a><a href="#/shop/for-him-her">For Him / For Her</a><a href="#/shop/baby">Baby</a><a href="#/customize">Customize</a><a href="#/finder" className="gf">Gift finder</a>
        </nav>
        <div className="hdr-r">
          <a className="ico txt acc" href={user ? '#/account' : '#/login'}>{user ? user.name.split(' ')[0] : 'Log in'}</a>
          <button className="ico txt" onClick={() => document.getElementById('searchbox')?.focus() || (location.hash = '#/shop')}>Search</button>
          <a href="#/wishlist" className="ico" aria-label="Wishlist">{'\u2661'}{wish.length > 0 && <b>{wish.length}</b>}</a>
          <button className="ico bag" aria-label="Open cart" onClick={() => setOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6a3 3 0 016 0v2" /></svg>
            {count > 0 && <b>{count}</b>}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {menu && (
          <motion.div className="mmenu" initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.35 }}>
            <button className="close" onClick={() => setMenu(false)} aria-label="Close">{'\u2715'}</button>
            <a href="#/shop">Shop all</a>
            {CATEGORIES.filter((c) => !c.hidden).map((c) => <a key={c.slug} href={`#/shop/${c.slug}`}>{c.name}</a>)}
            <a href="#/finder">Gift finder</a>
            <a href="#/wishlist">Wishlist</a>
            <a href={user ? '#/account' : '#/login'}>{user ? 'My account' : 'Log in / Sign up'}</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function CartDrawer() {
  const { open, setOpen, cart, setQty, total, clear } = useShop()
  const { user, placeOrder, myAddrs, addAddr } = useAuth()
  const [sel, setSel] = useState('new')
  const [save, setSave] = useState(true)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState(emptyAddr)
  const [step, setStep] = useState('cart')
  useEffect(() => { if (!open) setTimeout(() => { setStep('cart'); setDone(false) }, 300) }, [open])
  const ship = total >= 999 || total === 0 ? 0 : 79
  const chosen = sel !== 'new' ? myAddrs.find((x) => x.id === sel) : null
  const ship_to = chosen || form
  const ok = chosen || validAddr(form)
  useEffect(() => { if (open && myAddrs.length && sel === 'new' && !form.name) setSel(myAddrs[0].id) }, [open, myAddrs.length])
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
          <motion.aside className="drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}>
            <div className="drawer-h"><h3>{done ? 'Order placed' : step === 'cart' ? 'Your cart' : 'Delivery details'}</h3><button onClick={() => setOpen(false)} aria-label="Close cart">{'\u2715'}</button></div>
            {done ? (
              <div className="done"><div className="tick">{'\u2713'}</div><h4>Thank you</h4><p>Delivering to <b>{ship_to.name}</b>, {ship_to.city} {ship_to.pin}. This is a demo store, so no payment was taken and nothing will ship. In the real Givy, your order would reach you in 3 to 5 days, gift wrapped.</p><button className="btn" onClick={() => { clear(); setOpen(false) }}>Keep browsing</button></div>
            ) : cart.length === 0 ? (
              <div className="empty"><p>Your cart is empty.</p><a className="btn" href="#/shop" onClick={() => setOpen(false)}>Find a gift</a></div>
            ) : step === 'cart' ? (
              <>
                <div className="lines">
                  {cart.map((c) => {
                    const k = c.key || c.id
                    return (
                      <motion.div layout className="line" key={k}>
                        <img src={img(c.img)} alt="" />
                        <div>
                          <b>{c.name}</b>
                          {c.note && <small>{c.note}</small>}
                          <div className="qty"><button onClick={() => setQty(k, c.qty - 1)} aria-label="Less">{'\u2212'}</button><span>{c.qty}</span><button onClick={() => setQty(k, c.qty + 1)} aria-label="More">+</button></div>
                        </div>
                        <span className="lp">{money(c.price * c.qty)}</span>
                      </motion.div>
                    )
                  })}
                </div>
                <div className="drawer-f">
                  <div className="ship-bar"><i style={{ width: Math.min(100, (total / 999) * 100) + '%' }} /></div>
                  <p className="ship-t">{total >= 999 ? 'You have free shipping' : `Add ${money(999 - total)} more for free shipping`}</p>
                  <div className="row"><span>Subtotal</span><span>{money(total)}</span></div>
                  <div className="row"><span>Shipping</span><span>{ship ? money(ship) : 'Free'}</span></div>
                  <div className="row big"><span>Total</span><span>{money(total + ship)}</span></div>
                  <button className="btn full" onClick={() => setStep('form')}>Checkout</button>
                </div>
              </>
            ) : (
              <div className="drawer-f form">
                <p className="demo-note">Demo checkout. No payment is collected.{!user && <> <a href="#/login" onClick={() => setOpen(false)}><u>Log in</u></a> to see this order in your account.</>}</p>
                <h4 className="shipto">Ship to</h4>
                {myAddrs.map((x) => <label key={x.id} className={'aopt' + (sel === x.id ? ' on' : '')}><input type="radio" name="addr" checked={sel === x.id} onChange={() => setSel(x.id)} /><span><b>{x.label || x.name}</b><small>{x.name} {'\u00B7'} {x.phone}<br />{x.line}, {x.city} {x.pin}</small></span></label>)}
                <label className={'aopt' + (sel === 'new' ? ' on' : '')}><input type="radio" name="addr" checked={sel === 'new'} onChange={() => setSel('new')} /><span><b>{myAddrs.length ? 'New address or a gift for someone else' : 'Delivery address'}</b><small>Enter the recipient's name and address</small></span></label>
                {sel === 'new' && <AddressForm value={form} onChange={setForm} labelField={!!user && save} />}
                {sel === 'new' && user && <label className="chk"><input type="checkbox" checked={save} onChange={(e) => setSave(e.target.checked)} /> Save this address to my account</label>}
                <div className="row big"><span>Total</span><span>{money(total + ship)}</span></div>
                <button className="btn full" disabled={!ok} onClick={() => { if (user) placeOrder({ name: ship_to.name, ship: { name: ship_to.name, phone: ship_to.phone, line: ship_to.line, city: ship_to.city, pin: ship_to.pin }, items: cart.map((c) => ({ id: c.id, name: c.name, qty: c.qty, price: c.price })), total: total + ship }); if (user && !chosen && save) addAddr(form); setDone(true) }}>Place order</button>
                <button className="link" onClick={() => setStep('cart')}>Back to cart</button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export function Toast() {
  const { toast } = useShop()
  return <AnimatePresence>{toast && <motion.div key={toast.k} className="toast" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>{toast.m}</motion.div>}</AnimatePresence>
}

export function Footer() {
  return (
    <footer className="ftr">
      <Newsletter />
      <div className="ftr-in">
        <div><Logo full /><p>Small, pretty things for the people you love. Pendants, clutchers, scrunchies, earrings and hampers, wrapped with care.</p>
          <div className="soc"><a href={STORE.ig} target="_blank" rel="noreferrer">Instagram</a><a href={STORE.wa} target="_blank" rel="noreferrer">WhatsApp</a><a href={STORE.fb} target="_blank" rel="noreferrer">Facebook</a><a href={STORE.pin} target="_blank" rel="noreferrer">Pinterest</a></div></div>
        <div><h5>Shop</h5>{['hampers', 'birthday', 'anniversary', 'valentines'].map((s) => <a key={s} href={`#/shop/${s}`}>{s === 'valentines' ? "Valentine's" : s[0].toUpperCase() + s.slice(1)}</a>)}<a href="#/shop/for-him-her">For Him / For Her</a><a href="#/shop/baby">Newborn Baby</a><a href="#/customize">Customized</a><a href="#/finder">Gift finder</a></div>
        <div><h5>Help</h5><a href="#/track">Track order</a><a href="#/faq">FAQ</a><a href="#/shipping">Shipping &amp; delivery</a><a href="#/returns">Returns &amp; exchange</a><a href="#/contact">Contact us</a></div>
        <div><h5>Givy</h5><a href="#/about">Our story</a><a href="#/account">My account</a><a href="#/privacy">Privacy policy</a><a href="#/terms">Terms of service</a><p className="ft-c">{STORE.email}<br />{STORE.hours}</p></div>
      </div>
      <div className="ftr-b">{'\u00A9'} 2026 Givy. Demo storefront. Secure checkout is not enabled in this demo.</div>
    </footer>
  )
}
