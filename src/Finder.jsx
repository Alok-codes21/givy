import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { PRODUCTS } from './data'
import { ProductCard } from './lib'

const WHO = [
  { k: 'partner-f', t: 'My girlfriend / wife', s: 'Romance, softly said', cats: ['for-her'] },
  { k: 'partner-m', t: 'My boyfriend / husband', s: 'Simple and well made', cats: ['for-him'] },
  { k: 'mom', t: 'Mom / sister / friend', s: 'A her gift', cats: ['for-her'] },
  { k: 'dad', t: 'Dad / brother / friend', s: 'A him gift', cats: ['for-him'] },
  { k: 'baby', t: 'A newborn baby', s: 'Soft and gentle', cats: ['baby'] },
  { k: 'me', t: 'Myself', s: 'You deserve it', cats: ['for-her'] },
]
const WHEN = [
  { k: 'birthday', t: 'Birthday' }, { k: 'anniversary', t: 'Anniversary' }, { k: 'valentines', t: "Valentine's" },
  { k: 'baby', t: 'Welcoming a baby' }, { k: 'any', t: 'Just because' },
]
const VIBE = [
  { k: 'elegant', t: 'Elegant', s: 'Pearls, gold, a little shine' }, { k: 'cute', t: 'Cute and playful', s: 'Soft, floral, fun' },
  { k: 'minimal', t: 'Minimal', s: 'Clean lines, everyday wear' }, { k: 'festive', t: 'Festive', s: 'Statement, dressed up' },
]
const BUDGET = [
  { k: 'u600', t: 'Under \u20B9600', max: 600 }, { k: 'u1200', t: '\u20B9600 to \u20B91,200', min: 600, max: 1200 },
  { k: 'u2500', t: '\u20B91,200 to \u20B92,500', min: 1200, max: 2500 }, { k: 'any', t: 'Money is no limit', min: 0, max: 1e9 },
]
const STEPS = [
  { q: 'Who is the gift for?', sub: 'Tell us about the person', key: 'who', opts: WHO },
  { q: 'What is the occasion?', sub: 'The moment we are gifting for', key: 'when', opts: WHEN },
  { q: 'What style do they love?', sub: 'Pick the feel of the gift', key: 'vibe', opts: VIBE },
  { q: 'What is your budget?', sub: 'We will keep every pick in range', key: 'budget', opts: BUDGET },
]

export function rank(a) {
  const who = WHO.find((x) => x.k === a.who), when = WHEN.find((x) => x.k === a.when), b = BUDGET.find((x) => x.k === a.budget)
  const hidden = JSON.parse(localStorage.getItem('givy-hidden') || '[]')
  return PRODUCTS.filter((p) => !hidden.includes(p.id)).map((p) => {
    let s = 0
    if (who.cats.some((c) => p.cats.includes(c))) s += 4
    else if (who.k === 'baby') s -= 10
    else if (p.cats.includes('baby')) s -= 10
    if (who.k.startsWith('partner') && p.cats.some((c) => ['anniversary', 'valentines'].includes(c))) s += 1
    if (a.when !== 'any' && p.cats.includes(when.k)) s += 4
    if ((p.vibe || []).includes(a.vibe)) s += 3
    const price = p.price
    if (price >= (b.min || 0) && price <= b.max) s += 4; else if (price > b.max) s -= 4 + (price - b.max) / 500
    return { p, s }
  }).sort((x, y) => y.s - x.s).filter((x) => x.s > 2).slice(0, 6)
}

export function Finder() {
  const [i, setI] = useState(0)
  const [a, setA] = useState({})
  const done = i >= STEPS.length
  const res = useMemo(() => (done ? rank(a) : []), [done, a])
  const st = STEPS[i]
  const pick = (k) => { setA({ ...a, [st.key]: k }); setTimeout(() => setI((x) => x + 1), 220) }
  const who = WHO.find((x) => x.k === a.who)
  return (
    <section className="sec finder">
      <p className="eyebrow">Gift finder</p>
      {!done && (
        <>
          <div className="fprog">{STEPS.map((_, n) => <i key={n} className={n <= i ? 'on' : ''} />)}<span>{i + 1} / {STEPS.length}</span></div>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
              <h1 className="h-l">{st.q}</h1>
              <p className="lead sm">{st.sub}</p>
              <div className="fopts">
                {st.opts.map((o) => (
                  <motion.button whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} key={o.k} className={'fopt' + (a[st.key] === o.k ? ' on' : '')} onClick={() => pick(o.k)}>
                    <b>{o.t}</b>{o.s && <small>{o.s}</small>}
                  </motion.button>
                ))}
              </div>
              {i > 0 && <button className="link" onClick={() => setI(i - 1)}>{'\u2190'} Back</button>}
            </motion.div>
          </AnimatePresence>
        </>
      )}
      {done && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="h-l">Picked for <i>{who.t.toLowerCase()}</i></h1>
          <p className="lead sm">{WHEN.find((x) => x.k === a.when).t} {'\u00B7'} {VIBE.find((x) => x.k === a.vibe).t} {'\u00B7'} {BUDGET.find((x) => x.k === a.budget).t}</p>
          {res.length ? <div className="grid">{res.map((r, n) => <ProductCard key={r.p.id} p={r.p} i={n} />)}</div>
            : <p className="empty-t">Nothing fits that exact mix. Try a wider budget.</p>}
          <div className="cta"><button className="btn ghost" onClick={() => { setI(0); setA({}) }}>Start again</button><a className="btn" href="#/customize">Make it personal</a></div>
        </motion.div>
      )}
    </section>
  )
}
