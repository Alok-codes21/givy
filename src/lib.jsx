import { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { img, money, PRODUCTS, catColor } from './data'

const Ctx = createContext(null)
export const useShop = () => useContext(Ctx)
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => load('givy-cart', []))
  const [wish, setWish] = useState(() => load('givy-wish', []))
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(null)
  useEffect(() => localStorage.setItem('givy-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('givy-wish', JSON.stringify(wish)), [wish])
  const say = useCallback((m) => { setToast({ m, k: Date.now() }) }, [])
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2400); return () => clearTimeout(t) }, [toast])
  const add = useCallback((item, openCart = true) => {
    setCart((c) => {
      const key = item.key || item.id
      const ex = c.find((x) => (x.key || x.id) === key)
      if (ex) return c.map((x) => (x.key || x.id) === key ? { ...x, qty: x.qty + (item.qty || 1) } : x)
      return [...c, { ...item, qty: item.qty || 1 }]
    })
    say('Added to cart')
    if (openCart) setOpen(true)
  }, [say])
  const setQty = (key, q) => setCart((c) => q <= 0 ? c.filter((x) => (x.key || x.id) !== key) : c.map((x) => (x.key || x.id) === key ? { ...x, qty: q } : x))
  const clear = () => setCart([])
  const toggleWish = (id) => { setWish((w) => w.includes(id) ? w.filter((x) => x !== id) : [...w, id]); say(wish.includes(id) ? 'Removed from wishlist' : 'Saved to wishlist') }
  const count = cart.reduce((a, b) => a + b.qty, 0)
  const total = cart.reduce((a, b) => a + b.qty * b.price, 0)
  const value = useMemo(() => ({ cart, add, setQty, clear, wish, toggleWish, open, setOpen, count, total, toast }), [cart, wish, open, toast])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

/* word-by-word reveal for big headings */
export function SplitText({ text, as: Tag = 'h2', className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="sw" aria-hidden="true">
          <motion.span style={{ display: 'inline-block' }} initial={{ y: '110%', opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.7, delay: delay + i * 0.07, ease: [0.2, 0.7, 0.2, 1] }}>{w}</motion.span>
          {'\u00A0'}
        </span>
      ))}
    </Tag>
  )
}

export function Reveal({ children, delay = 0, y = 28, className = '' }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}>{children}</motion.div>
  )
}

export function Marquee({ items }) {
  const row = [...items, ...items]
  return (
    <div className="marquee"><div className="marquee-track">{row.map((t, i) => <span key={i}>{t}<i>{'\u2726'}</i></span>)}</div></div>
  )
}

export function Heart({ on }) {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6"><path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3 5.5 6.2 5.5c2 0 3.3 1.1 3.8 2.2.5-1.1 1.8-2.2 3.800-2.200 3.200 0 5 3.100 3.700 6.300C19.500 16.400 12 21 12 21z" /></svg>
}

export function ProductCard({ p, i = 0 }) {
  const { wish, toggleWish, add } = useShop()
  return (
    <motion.article className="card" style={{ "--c": catColor(p.cats[0]) }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.55, delay: (i % 4) * 0.06 }}>
      <div className="card-img">
        <a href={`#/product/${p.id}`}><img src={img(p.img)} alt={p.name} loading="lazy" /></a>
        {p.tag && <span className="chip">{p.tag}</span>}
        <button className={'wish' + (wish.includes(p.id) ? ' on' : '')} aria-label="Save to wishlist" onClick={() => toggleWish(p.id)}><Heart on={wish.includes(p.id)} /></button>
        <button className="quick" onClick={() => p.custom ? (location.hash = '#/customize') : add({ id: p.id, name: p.name, price: p.price, img: p.img })}>{p.custom ? 'Personalise' : 'Quick add'}</button>
      </div>
      <a href={`#/product/${p.id}`} className="card-meta">
        <span className="card-type">{p.type}</span>
        <h3>{p.name}</h3>
        <span className="price">{money(p.price)}</span>
      </a>
    </motion.article>
  )
}
