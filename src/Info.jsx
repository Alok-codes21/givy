import { useState } from 'react'
import { motion } from 'motion/react'
import { img } from './data'
import { useAuth } from './auth'
import { Reveal } from './lib'

export const STORE = { email: 'hello@givy.demo', phone: '+91 00000 00000', hours: 'Mon to Sat, 10am to 7pm IST', city: 'India', ig: 'https://instagram.com/', fb: 'https://facebook.com/', wa: 'https://wa.me/', pin: 'https://pinterest.com/' }
const store = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }

function Page({ eyebrow, title, children, wide }) {
  return <section className={'sec info' + (wide ? ' wide' : '')}><motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}><p className="eyebrow">{eyebrow}</p><h1 className="h-l">{title}</h1>{children}</motion.div></section>
}
const Demo = () => <p className="demo-note">Sample copy for a demo store. Replace the details and policy wording with your own before launch.</p>

export function About() {
  return (
    <>
      <Page eyebrow="Our story" title={<>Gifts that speak <i>from the heart</i></>} wide>
        <div className="about-grid">
          <div className="arch big"><img src={img('story')} alt="Wrapping a gift" /></div>
          <div className="prose">
            <p>Givy started with a simple idea: a gift should feel chosen, not bought. We make small, pretty things for the people you love, from pendants and earrings to hair clutchers, scrunchies and ready-to-gift hampers.</p>
            <p>Every piece is picked for how it looks in the box and how it feels in everyday life. We wrap it, add a note in your words, and send it so it arrives on time.</p>
            <div className="vals"><div><b>Chosen with care</b><span>Small batches, checked by hand</span></div><div><b>Wrapped for you</b><span>Free gift wrap on every order</span></div><div><b>Made personal</b><span>Names, photos and notes</span></div></div>
            <div className="cta"><a className="btn" href="#/shop">Shop gifts</a><a className="btn ghost" href="#/finder">Find a gift</a></div>
          </div>
        </div>
      </Page>
    </>
  )
}

export function Contact() {
  const [f, setF] = useState({ name: '', email: '', topic: 'Order help', msg: '' })
  const [sent, setSent] = useState(false)
  const ok = f.name.trim() && /^\S+@\S+\.\S+$/.test(f.email) && f.msg.trim().length > 4
  const send = (e) => { e.preventDefault(); localStorage.setItem('givy-messages', JSON.stringify([{ ...f, at: Date.now() }, ...store('givy-messages', [])])); setSent(true) }
  return (
    <Page eyebrow="Contact" title={<>We would love to <i>hear from you</i></>} wide>
      <div className="contact-grid">
        <div className="prose">
          <p>Questions about an order, a custom name, or choosing a gift? Write to us and we will reply within one working day.</p>
          <ul className="clist"><li><b>Email</b><a href={`mailto:${STORE.email}`}>{STORE.email}</a></li><li><b>Phone / WhatsApp</b><span>{STORE.phone}</span></li><li><b>Hours</b><span>{STORE.hours}</span></li></ul>
          <div className="soc"><a href={STORE.ig} target="_blank" rel="noreferrer">Instagram</a><a href={STORE.wa} target="_blank" rel="noreferrer">WhatsApp</a><a href={STORE.fb} target="_blank" rel="noreferrer">Facebook</a><a href={STORE.pin} target="_blank" rel="noreferrer">Pinterest</a></div>
        </div>
        {sent ? <div className="auth-card"><div className="tick">{'\u2713'}</div><h3 className="h-m">Message received</h3><p className="lead sm">Thanks {f.name.split(' ')[0]}. This is a demo form, so the message is saved only in this browser.</p></div> : (
          <form className="auth-card" onSubmit={send}>
            <label className="field">Name<input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
            <label className="field">Email<input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></label>
            <label className="field">Topic<select className="sel" value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })}>{['Order help', 'Customized gift', 'Bulk or corporate gifting', 'Returns and exchange', 'Something else'].map((t) => <option key={t}>{t}</option>)}</select></label>
            <label className="field">Message<textarea rows="4" value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} /></label>
            <button className="btn full" disabled={!ok}>Send message</button>
          </form>
        )}
      </div>
    </Page>
  )
}

const FAQ = [
  ['Orders', [
    ['How do I place an order?', 'Add gifts to your cart, choose the delivery address (your own or the person you are gifting), and place the order. You can order without an account, but an account saves your addresses and order history.'],
    ['Can I send a gift to someone else?', 'Yes. At checkout, choose "New address or a gift for someone else" and enter the recipient\'s name, phone and address. You can also add a gift note and gift wrap on the product page.'],
    ['Can I change or cancel my order?', 'Within 12 hours of placing it, write to us and we will update or cancel it. After it is packed we cannot change it.'],
  ]],
  ['Delivery', [
    ['How long does delivery take?', 'Ready gifts reach most cities in 3 to 5 working days. Customized gifts are made to order and take 5 to 7 working days before shipping.'],
    ['Is shipping free?', 'Shipping is free above \u20B9999. Below that it is a flat \u20B979.'],
    ['Can I track my order?', 'Yes. Use Track order with your order ID, or open your account to see the status.'],
  ]],
  ['Products and care', [
    ['Is the jewellery skin-safe?', 'Our pendants and earrings are gold-plated brass with an anti-tarnish coat. Keep them dry, avoid perfume directly on the piece, and store them in the gift box.'],
    ['How does customization work?', 'Pick a customized gift, add the name, font and finish, and upload a photo if the piece takes one. You see a live preview before adding it to the cart.'],
  ]],
  ['Returns', [
    ['What is your exchange policy?', 'Unused items in original packaging can be exchanged within 7 days of delivery. Customized items are made for you, so they can only be replaced if they arrive damaged or wrong.'],
    ['How do refunds work?', 'If an exchange is not possible, we refund to your original payment method within 5 to 7 working days after we receive the item.'],
  ]],
]
export function Faq() {
  const [open, setOpen] = useState('0-0')
  return (
    <Page eyebrow="Help" title={<>Frequently asked <i>questions</i></>}>
      {FAQ.map(([sec, qs], a) => (
        <div className="faq-sec" key={sec}><h3>{sec}</h3>
          {qs.map(([q, ans], b) => { const k = a + '-' + b; const o = open === k; return (
            <div className={'faq' + (o ? ' open' : '')} key={k}><button onClick={() => setOpen(o ? '' : k)} aria-expanded={o}><span>{q}</span><i>{o ? '\u2212' : '+'}</i></button>{o && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>{ans}</motion.p>}</div>
          ) })}
        </div>
      ))}
      <p className="lead sm">Still stuck? <a className="ul" href="#/contact">Contact us</a></p>
      <Demo />
    </Page>
  )
}

export function Shipping() {
  return (
    <Page eyebrow="Policy" title={<>Shipping &amp; <i>delivery</i></>}>
      <div className="prose">
        <h3>Delivery times</h3><p>Ready gifts: 3 to 5 working days to most cities. Customized gifts: 5 to 7 working days to make, then 3 to 5 days to deliver. Remote pin codes may take 2 to 3 more days.</p>
        <h3>Shipping charges</h3><p>Free above {'\u20B9'}999. Flat {'\u20B9'}79 on smaller orders. Free gift wrap on every order.</p>
        <h3>Gifting to someone else</h3><p>Enter the recipient's details at checkout. We do not put prices in the parcel, and your gift note goes inside the box.</p>
        <h3>Delivery attempts</h3><p>Our courier makes up to 3 attempts. Please keep the recipient's phone number correct so they can be reached.</p>
        <h3>Tracking</h3><p>Use <a className="ul" href="#/track">Track order</a> with your order ID.</p>
      </div><Demo />
    </Page>
  )
}
export function Returns() {
  return (
    <Page eyebrow="Policy" title={<>Returns &amp; <i>exchange</i></>}>
      <div className="prose">
        <h3>7 day exchange</h3><p>You can exchange unused items in original packaging within 7 days of delivery. Write to us from the <a className="ul" href="#/contact">contact page</a> with your order ID and a photo.</p>
        <h3>Not eligible</h3><p>Customized items (names, photos, embroidery), earrings opened for hygiene reasons, and items worn or damaged after delivery. If a customized item arrives damaged or wrong, we will replace it at no cost.</p>
        <h3>Damaged or wrong item</h3><p>Tell us within 48 hours of delivery with photos of the parcel and the item. We will send a replacement or refund.</p>
        <h3>Refunds</h3><p>Approved refunds go to the original payment method within 5 to 7 working days after we receive the item.</p>
      </div><Demo />
    </Page>
  )
}
export function Privacy() {
  return (
    <Page eyebrow="Legal" title={<>Privacy <i>policy</i></>}>
      <div className="prose">
        <h3>What we collect</h3><p>Your name, email, phone and delivery addresses, and what you order. If you use Google sign-in we receive your name, email and profile picture from Google.</p>
        <h3>How we use it</h3><p>To deliver orders, support you, and, only if you subscribe, send updates. We do not sell your data.</p>
        <h3>Photos you upload</h3><p>Photos for customized gifts are used only to make that gift.</p>
        <h3>Cookies and storage</h3><p>We store your cart, wishlist and sign-in session in your browser. In this demo, everything stays in your browser only.</p>
        <h3>Your choices</h3><p>You can ask us to update or delete your data at any time through the <a className="ul" href="#/contact">contact page</a>. You can unsubscribe from emails at any time.</p>
      </div><Demo />
    </Page>
  )
}
export function Terms() {
  return (
    <Page eyebrow="Legal" title={<>Terms of <i>service</i></>}>
      <div className="prose">
        <h3>Using the store</h3><p>By ordering you confirm the details you enter are correct, including the recipient's address and phone number.</p>
        <h3>Prices and payment</h3><p>Prices are in Indian rupees and include applicable taxes unless noted. We may correct pricing errors and will tell you before shipping.</p>
        <h3>Product images</h3><p>Colors and finishes can look slightly different on different screens.</p>
        <h3>Customized orders</h3><p>Please check spelling before you order. We make customized items exactly as submitted.</p>
        <h3>Liability</h3><p>Our liability is limited to the value of the order. Policies on shipping, exchange and privacy form part of these terms.</p>
      </div><Demo />
    </Page>
  )
}

export function Track() {
  const { orders } = useAuth()
  const [id, setId] = useState('')
  const [res, setRes] = useState(null)
  const STEPS = ['Placed', 'Packed', 'Shipped', 'Delivered']
  const find = (e) => { e.preventDefault(); const q = id.trim().replace('#', '').toUpperCase(); setRes(orders.find((o) => o.id === q) || 'none') }
  return (
    <Page eyebrow="Order status" title={<>Track your <i>order</i></>}>
      <form className="track" onSubmit={find}><input placeholder="Order ID, e.g. GV123456" value={id} onChange={(e) => setId(e.target.value)} /><button className="btn" disabled={!id.trim()}>Track</button></form>
      {res === 'none' && <p className="err">We could not find that order in this browser. Check the ID from your confirmation.</p>}
      {res && res !== 'none' && <div className="panel"><b>#{res.id}</b>{res.ship && <small className="mute"> {'\u00B7'} to {res.ship.name}, {res.ship.city}</small>}
        <div className="steps">{STEPS.map((s, n) => <div key={s} className={n <= STEPS.indexOf(res.status) ? 'on' : ''}><i />{s}</div>)}</div></div>}
      <Demo />
    </Page>
  )
}

export function NotFound() {
  return <section className="sec info nf"><p className="eyebrow">404</p><h1 className="h-l">This page <i>wandered off</i></h1><p className="lead sm">The page you are looking for is not here. Let us find you a gift instead.</p><div className="cta"><a className="btn" href="#/">Home</a><a className="btn ghost" href="#/shop">Shop all</a><a className="btn ghost" href="#/finder">Gift finder</a></div></section>
}

export function Newsletter() {
  const [e, setE] = useState('')
  const [st, setSt] = useState('')
  const sub = (ev) => {
    ev.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(e)) return setSt('err')
    const l = store('givy-subs', []); if (!l.includes(e.toLowerCase())) localStorage.setItem('givy-subs', JSON.stringify([...l, e.toLowerCase()]))
    setSt('ok'); setE('')
  }
  return (
    <div className="news"><div><h4>Join the Givy list</h4><p>Gift ideas, new arrivals and occasion reminders. No spam.</p></div>
      <form onSubmit={sub}><input type="email" placeholder="Your email" value={e} onChange={(x) => { setE(x.target.value); setSt('') }} aria-label="Email" /><button>Subscribe</button></form>
      {st === 'ok' && <small className="news-m">Thank you, you are on the list.</small>}{st === 'err' && <small className="news-m bad">Enter a valid email.</small>}</div>
  )
}
