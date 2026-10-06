import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { CATEGORIES, PRODUCTS, TYPES, img, money, catColor } from './data'
import Gift3D from './Gift3D'
import { SplitText, Reveal, Marquee, ProductCard, useShop, Heart } from './lib'

const navCats = CATEGORIES.filter((c) => !c.hidden)
const catName = (s) => (CATEGORIES.find((c) => c.slug === s) || {}).name

export function Home() {
  const [tab, setTab] = useState('hampers')
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 50])
  const list = PRODUCTS.filter((p) => p.cats.includes(tab)).slice(0, 4)
  return (
    <>
      <section className="hero">
        <div className="hero-l">
          <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>The art of gifting</motion.p>
          <h1 className="h-xl" aria-label="Little things, wrapped with a lot of love.">
            {['Little', 'things,', '<i>wrapped</i>', 'with', 'a', 'lot', 'of', 'love.'].map((w, i) => (
              <span className="sw" key={i} aria-hidden="true"><motion.span style={{ display: 'inline-block' }} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.15 + i * 0.08, ease: [0.2, 0.7, 0.2, 1] }} dangerouslySetInnerHTML={{ __html: w }} />{'\u00A0'}</span>
            ))}
          </h1>
          <motion.p className="lead" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>Pendants, hair clutchers, scrunchies and earrings, curated into hampers and gifts for every person and every moment.</motion.p>
          <motion.div className="cta" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 }}>
            <a className="btn" href="#/shop">Shop gifts</a><a className="btn ghost" href="#/customize">Design your own</a>
          </motion.div>
          <motion.p className="proof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}><span>{'\u2605'} 4.9 rated</span><span>Ships in 24h</span><span>Gift-ready box</span></motion.p>
        </div>
        <motion.div className="hero-r" style={{ y }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <div className="arch big"><img src={img('hero')} alt="Givy gift hamper with maroon ribbon" /></div>
          <motion.a href="#/product/p7" className="float f1" animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity }}><img src={img('earring1')} alt="" /><span>Pearl Jhumka Earrings</span><b>{money(1299)}</b></motion.a>
          <motion.a href="#/product/p1" className="float f2" animate={{ y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity }}><img src={img('pendant1')} alt="" /><span>Heart Pendant</span><b>{money(899)}</b></motion.a>
          <div className="seal"><span>Valentine's<br />edit is live</span></div>
        </motion.div>
      </section>

      <Marquee items={['Hampers', 'Birthday', 'Anniversary', "Valentine's", 'For Him', 'For Her', 'Newborn Baby', 'Customized', 'Pendants', 'Clutchers', 'Scrunchies', 'Earrings']} />

      <section className="sec occ">
        <p className="eyebrow c">Shop by occasion</p>
        <SplitText as="h2" className="h-l c" text="Who are we gifting today?" />
        <div className="arches">
          {navCats.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06}>
              <a href={`#/shop/${c.slug}`} className="arch-card" style={{ "--c": c.color }}>
                <div className="arch"><img src={img(c.img)} alt={c.name} loading="lazy" /></div>
                <h3>{c.name}</h3><p>{c.blurb}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="g3-band"><section className="sec g3-sec">
        <div>
          <p className="eyebrow">Unwrap the magic</p>
          <SplitText as="h2" className="h-l" text="Every gift comes wrapped like this." />
          <Reveal delay={0.2}><p className="lead">Spin the box, pick a colour and open it to peek at what could be inside. Every Givy order arrives in a box like this, with a ribbon and a note.</p>
            <div className="cta"><a className="btn" href="#/shop/hampers">Shop hampers</a><a className="btn ghost" href="#/customize">Customize one</a></div></Reveal>
        </div>
        <Reveal><Gift3D /></Reveal>
      </section></div>

      <section className="sec tight">
        <div className="sec-h"><SplitText as="h2" className="h-l" text="Gifts people love" />
          <div className="chips">{navCats.slice(0, 5).map((c) => <button key={c.slug} style={{ '--c': c.color }} className={'pill' + (tab === c.slug ? ' on' : '')} onClick={() => setTab(c.slug)}>{c.name}</button>)}</div></div>
        <AnimatePresence mode="wait">
          <motion.div key={tab} className="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {list.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
          </motion.div>
        </AnimatePresence>
        <div className="c more"><a className="btn ghost" href={`#/shop/${tab}`}>See all {catName(tab)}</a></div>
      </section>

      <section className="sec tight">
        <Reveal>
          <div className="banner">
            <div><p className="eyebrow gold">Customized gifts</p><h2 className="h-l light"><i>Add a name,</i> a photo, a little note.</h2><p className="bl">Make a pendant, a scrunchie or a hamper that is only theirs. Preview it live before you order.</p></div>
            <a className="btn gold" href="#/customize">Customize a gift</a>
          </div>
        </Reveal>
      </section>

      <div className="story-band"><section className="sec story">
        <Reveal className="story-img"><div className="arch big"><img src={img('story')} alt="Wrapping a gift" loading="lazy" /></div></Reveal>
        <div>
          <p className="eyebrow">Why Givy</p>
          <SplitText as="h2" className="h-l" text="A gift should feel chosen, not bought." />
          <Reveal delay={0.2}><p className="lead">Every piece is picked for how it looks in a box and how it feels on a Tuesday. We wrap it, add a card, and send it on time.</p>
            <ul className="ticks"><li>Free gift wrap and handwritten-style card</li><li>Anti-tarnish, skin-safe jewellery</li><li>Easy 7 day exchange</li></ul></Reveal>
        </div>
      </section></div>
    </>
  )
}

export function Shop({ slug }) {
  const [type, setType] = useState('All')
  const [sort, setSort] = useState('feat')
  const [q, setQ] = useState('')
  useEffect(() => { setType('All') }, [slug])
  const title = slug === 'for-him-her' ? 'For Him / For Her' : catName(slug) || 'All gifts'
  const hid = JSON.parse(localStorage.getItem('givy-hidden') || '[]')
  let list = PRODUCTS.filter((p) => !hid.includes(p.id)).filter((p) => !slug || (slug === 'for-him-her' ? p.cats.some((c) => c === 'for-him' || c === 'for-her') : p.cats.includes(slug)))
  const types = TYPES.filter((t) => list.some((p) => p.type === t))
  list = list.filter((p) => (type === 'All' || p.type === type) && p.name.toLowerCase().includes(q.toLowerCase()))
  if (sort === 'lo') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'hi') list = [...list].sort((a, b) => b.price - a.price)
  return (
    <div className="tint" style={{ "--c": catColor(slug) }}><section className="sec shop tint-in">
      <p className="crumb"><a href="#/">Home</a> / {title}</p>
      <div className="sec-h">
        <h1 className="h-l">{title.split(' ')[0]} <i>{title.split(' ').slice(1).join(' ') || 'gifts'}</i></h1>
        <div className="chips">{['All', ...types].map((t) => <button key={t} className={'pill' + (type === t ? ' on' : '')} onClick={() => setType(t)}>{t}</button>)}</div>
      </div>
      <div className="tools"><input id="searchbox" placeholder="Search gifts" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="feat">Featured</option><option value="lo">Price: low to high</option><option value="hi">Price: high to low</option></select>
        <span className="cnt">{list.length} gifts</span></div>
      <div className="catbar">{navCats.map((c) => <a key={c.slug} style={{ '--c': c.color }} className={slug === c.slug ? 'on' : ''} href={`#/shop/${c.slug}`}>{c.name}</a>)}</div>
      {list.length ? <div className="grid">{list.map((p, i) => <ProductCard key={p.id + slug} p={p} i={i} />)}</div> : <p className="empty-t">Nothing matches yet. Try another filter.</p>}
    </section></div>
  )
}

export function Wishlist() {
  const { wish } = useShop()
  const list = PRODUCTS.filter((p) => wish.includes(p.id))
  return (
    <section className="sec shop"><h1 className="h-l">Your <i>wishlist</i></h1>
      {list.length ? <div className="grid">{list.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}</div> : <p className="empty-t">Tap the heart on any gift to save it here.</p>}</section>
  )
}

export function Product({ id }) {
  const p = PRODUCTS.find((x) => x.id === id)
  const { add, wish, toggleWish } = useShop()
  const [qty, setQty] = useState(1)
  const [wrap, setWrap] = useState(true)
  const [note, setNote] = useState('')
  const [zoom, setZoom] = useState(false)
  const [pos, setPos] = useState('50% 50%')
  useEffect(() => { setQty(1); setNote(''); window.scrollTo(0, 0) }, [id])
  if (!p) return <section className="sec"><p>Gift not found. <a href="#/shop">Back to shop</a></p></section>
  const more = PRODUCTS.filter((x) => x.id !== p.id && x.cats.some((c) => p.cats.includes(c))).slice(0, 4)
  const price = p.price + (wrap ? 0 : 0)
  return (
    <>
      <section className="sec pdp">
        <p className="crumb"><a href="#/">Home</a> / <a href="#/shop">Shop</a> / {p.name}</p>
        <div className="pdp-in">
          <div className={'pdp-img' + (zoom ? ' z' : '')} onMouseEnter={() => setZoom(true)} onMouseLeave={() => setZoom(false)} onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setPos(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`) }}>
            <img src={img(p.img)} alt={p.name} style={{ transformOrigin: pos }} />
            {p.tag && <span className="chip">{p.tag}</span>}
          </div>
          <div className="pdp-r">
            <p className="eyebrow">{p.type}</p>
            <h1 className="h-l">{p.name}</h1>
            <p className="pdp-price">{money(price)} <small>incl. taxes</small></p>
            <p className="lead sm">{p.desc}</p>
            <ul className="ticks">{p.details.map((d) => <li key={d}>{d}</li>)}</ul>
            <label className="opt"><input type="checkbox" checked={wrap} onChange={(e) => setWrap(e.target.checked)} /> Gift wrap with ribbon (free)</label>
            <label className="field">Gift note (optional)<input maxLength={80} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Happy birthday, I love you" /></label>
            <div className="buy">
              <div className="qty lg"><button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Less">{'\u2212'}</button><span>{qty}</span><button onClick={() => setQty(qty + 1)} aria-label="More">+</button></div>
              <button className="btn grow" onClick={() => add({ key: p.id + '|' + note + wrap, id: p.id, name: p.name, price, img: p.img, qty, note: [wrap ? 'Gift wrapped' : '', note && `Note: ${note}`].filter(Boolean).join(' / ') })}>Add to cart</button>
              <button className={'sq' + (wish.includes(p.id) ? ' on' : '')} aria-label="Wishlist" onClick={() => toggleWish(p.id)}><Heart on={wish.includes(p.id)} /></button>
            </div>
            {p.custom && <a className="btn ghost full" href="#/customize">Personalise this gift</a>}
            <p className="deliv">Delivers in 3 to 5 days. Easy 7 day exchange.</p>
          </div>
        </div>
      </section>
      <section className="sec tight"><h2 className="h-m">You may also like</h2><div className="grid">{more.map((x, i) => <ProductCard key={x.id} p={x} i={i} />)}</div></section>
    </>
  )
}

const BASES = [
  { id: 'name', label: 'Name necklace', price: 1499, img: 'custom1', max: 12 },
  { id: 'initial', label: 'Initial pendant', price: 999, img: 'pendant1', max: 1 },
  { id: 'scrunchie', label: 'Embroidered scrunchie', price: 499, img: 'scrunchy2', max: 10 },
  { id: 'locket', label: 'Photo locket', price: 1799, img: 'pendant2', max: 12 },
]
const FINISH = { gold: ['#B8912F', '#E8C96A', 'Gold'], rose: ['#C98E7C', '#EBC0B0', 'Rose gold'], silver: ['#9A9A9E', '#DCDCE0', 'Silver'] }
const BOX = { emerald: '#14513E', burgundy: '#7A2233', navy: '#1F3358', plum: '#5B2A5E', blush: '#B66A86' }
const FONTS = { script: "'Great Vibes', cursive", serif: "'Cormorant Garamond', serif", hand: "'Dancing Script', cursive" }

export function Customize() {
  const { add } = useShop()
  const [base, setBase] = useState('name')
  const [text, setText] = useState('Aanya')
  const [fin, setFin] = useState('gold')
  const [font, setFont] = useState('script')
  const [note, setNote] = useState('Happy anniversary, with all my love.')
  const [box, setBox] = useState(true)
  const [photo, setPhoto] = useState(null)
  const [tone, setTone] = useState('emerald')
  const fileRef = useRef(null)
  const b = BASES.find((x) => x.id === base)
  const price = b.price + (box ? 0 : 0)
  const shown = base === 'initial' ? (text[0] || 'A') : text || 'Name'
  const [c1, c2] = FINISH[fin]
  const step = !text ? 1 : base === 'locket' && !photo ? 2 : note ? 4 : 3
  const onFile = (f) => { if (!f || !f.type.startsWith('image/')) return; const r = new FileReader(); r.onload = () => setPhoto(r.result); r.readAsDataURL(f) }
  return (
    <section className="sec cust">
      <div className="steps">{['Choose piece', 'Personalise', 'Preview', 'Add to cart'].map((s, i) => <span key={s} className={step === i + 1 ? 'on' : step > i + 1 ? 'past' : ''}>{i + 1}. {s}</span>)}</div>
      <div className="cust-in">
        <div className="preview">
          <div className="pv-card" style={{ '--g1': c1, '--g2': c2, '--tone': BOX[tone] }}>
            <AnimatePresence mode="wait">
              <motion.div key={base + fin} className="pv-item" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                {base === 'name' && (<><div className="chain" /><div className="nameplate" style={{ fontFamily: FONTS[font], fontSize: Math.max(38, Math.min(92, 330 / (Math.max(shown.length, 4) * 0.45))) }}>{shown}</div><div className="initial-ch">{(text[0] || 'A').toUpperCase()}</div></>)}
                {base === 'initial' && (<><div className="ring" /><div className="disc"><span style={{ fontFamily: font === 'script' ? FONTS.serif : FONTS[font] }}>{shown.toUpperCase()}</span></div></>)}
                {base === 'locket' && (<><div className="ring" /><div className="disc photo">{photo ? <img src={photo} alt="Your upload" /> : <span className="ph">Upload a photo</span>}</div><div className="nameplate sm" style={{ fontFamily: FONTS[font] }}>{shown}</div></>)}
                {base === 'scrunchie' && (<div className="scr"><div className="scr-ring" /><div className="scr-txt" style={{ fontFamily: FONTS[font] }}>{shown}</div></div>)}
              </motion.div>
            </AnimatePresence>
            {photo && base !== 'locket' && <div className="pv-photo"><img src={photo} alt="Your photo" /><small>Photo card</small></div>}
            {note && <div className="pv-note">{note}</div>}
          </div>
          <p className="pv-cap">Live preview {'\u00B7'} {b.label}</p>
        </div>
        <div className="cust-f">
          <h1 className="h-l">Make it <i>yours</i></h1>
          <p className="lead sm">Pick a piece, add a name or photo and a handwritten note. See it live, then add it to your cart.</p>
          <div className="lab">Piece</div>
          <div className="chips left">{BASES.map((x) => <button key={x.id} className={'pill' + (base === x.id ? ' on' : '')} onClick={() => { setBase(x.id); if (x.id === 'initial') setText((t) => t.slice(0, 1) || 'A') }}>{x.label}</button>)}</div>
          <label className="field">{base === 'initial' ? 'Initial' : 'Name'}<input maxLength={b.max} value={text} onChange={(e) => setText(e.target.value)} placeholder={base === 'initial' ? 'A' : 'Aanya'} /></label>
          <div className="lab">Style</div>
          <div className="chips left">{[['script', 'Script'], ['serif', 'Classic'], ['hand', 'Handwritten']].map(([k, l]) => <button key={k} className={'pill' + (font === k ? ' on' : '')} style={{ fontFamily: FONTS[k], fontSize: 18 }} onClick={() => setFont(k)}>{l}</button>)}</div>
          <div className="lab">Finish: {FINISH[fin][2]}</div>
          <div className="swatches">{Object.entries(FINISH).map(([k, v]) => <button key={k} aria-label={v[2]} className={fin === k ? 'on' : ''} style={{ background: `linear-gradient(135deg, ${v[1]}, ${v[0]})` }} onClick={() => setFin(k)} />)}</div>
          <div className="lab">Colour: {tone}</div>
          <div className="swatches swatch-box">{Object.entries(BOX).map(([k, v]) => <button key={k} aria-label={k} className={tone === k ? 'on' : ''} style={{ background: v }} onClick={() => setTone(k)} />)}</div>
          <div className="lab">Photo {base === 'locket' ? '(shown inside the locket)' : '(printed on a small card)'}</div>
          <div className={'drop' + (photo ? ' has' : '')} onClick={() => fileRef.current.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); onFile(e.dataTransfer.files[0]) }}>
            {photo ? <><img src={photo} alt="" /><span>Photo added. <u>Change</u> or <u onClick={(e) => { e.stopPropagation(); setPhoto(null) }}>remove</u></span></> : <span>Drop a photo or <u>browse</u></span>}
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files[0])} />
          </div>
          <label className="field">Gift note<input maxLength={80} value={note} onChange={(e) => setNote(e.target.value)} /></label>
          <label className="opt"><input type="checkbox" checked={box} onChange={(e) => setBox(e.target.checked)} /> Gift box with ribbon (free)</label>
          <div className="buy">
            <button className="btn grow" disabled={!text} onClick={() => add({ key: `c|${base}|${tone}|${text}|${fin}|${font}|${note}|${!!photo}`, id: 'custom-' + base, name: `Custom ${b.label}`, price, img: b.img, note: `${shown} / ${FINISH[fin][2]} / ${tone}${photo ? ' / photo' : ''}${note ? ` / "${note}"` : ''}` })}>Add to cart {'\u00B7'} {money(price)}</button>
            <span className="deliv">Ready in 5 to 7 days</span>
          </div>
        </div>
      </div>
    </section>
  )
}
