import { useRef, useState } from 'react'
import { motion, useMotionValue, useAnimationFrame, AnimatePresence } from 'motion/react'
import { img, money, PRODUCTS } from './data'

const TONES = {
  Rose: { box: '#D0707C', ribbon: '#F6E7C8', tissue: '#FBE3E0' },
  Emerald: { box: '#14513E', ribbon: '#E6CB7A', tissue: '#DDE9DD' },
  Navy: { box: '#1F3358', ribbon: '#F1D9D6', tissue: '#D8E4EE' },
  Plum: { box: '#5B2A5E', ribbon: '#E6CB7A', tissue: '#EBDDEE' },
  Sunset: { box: '#D9826B', ribbon: '#FFF4E4', tissue: '#FCE5D6' },
}
const ITEMS = ['p1', 'p7', 'p3', 'p5'].map((id) => PRODUCTS.find((p) => p.id === id))

function Faces({ w, h, d, cls, children }) {
  return (
    <>
      <div className={'f ' + cls} style={{ width: w, height: h, transform: `translateZ(${d / 2}px)` }}><i className="band" />{children}</div>
      <div className={'f ' + cls + ' s2'} style={{ width: w, height: h, transform: `rotateY(180deg) translateZ(${d / 2}px)` }}><i className="band" /></div>
      <div className={'f ' + cls + ' s3'} style={{ width: d, height: h, left: (w - d) / 2, transform: `rotateY(90deg) translateZ(${w / 2}px)` }}><i className="band" /></div>
      <div className={'f ' + cls + ' s4'} style={{ width: d, height: h, left: (w - d) / 2, transform: `rotateY(-90deg) translateZ(${w / 2}px)` }}><i className="band" /></div>
    </>
  )
}

export default function Gift3D() {
  const [tone, setTone] = useState('Rose')
  const [open, setOpen] = useState(false)
  const rotY = useMotionValue(-32)
  const rotX = useMotionValue(-24)
  const drag = useRef(null)
  const hover = useRef(false)
  const t = TONES[tone]
  useAnimationFrame((_, dt) => { if (!drag.current && !hover.current) rotY.set(rotY.get() + dt * 0.012) })
  const down = (e) => { drag.current = { x: e.clientX, y: e.clientY, ry: rotY.get(), rx: rotX.get() }; e.currentTarget.setPointerCapture(e.pointerId) }
  const move = (e) => { const d = drag.current; if (!d) return; rotY.set(d.ry + (e.clientX - d.x) * 0.6); rotX.set(Math.max(-60, Math.min(-6, d.rx - (e.clientY - d.y) * 0.4))) }
  const up = () => { drag.current = null }
  return (
    <div className="g3" style={{ '--box': t.box, '--rib': t.ribbon, '--tis': t.tissue }}>
      <div className="g3-scene" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerEnter={() => (hover.current = false)} aria-label="Interactive 3D gift box. Drag to rotate.">
        <div className="g3-shadow" />
        <motion.div className="g3-world" style={{ rotateY: rotY, rotateX: rotX }}>
          <div className="g3-body">
            <Faces w={200} h={150} d={200} cls="bf" />
            <div className="f bottom" />
            <div className="f tissue" />
          </div>
          <motion.div className="g3-lid" animate={open ? { y: -165, x: 120, rotateZ: 28 } : { y: 0, x: 0, rotateZ: 0 }} transition={{ type: 'spring', stiffness: 90, damping: 14 }}>
            <Faces w={212} h={40} d={212} cls="lf" />
            <div className="f ltop"><i className="b1" /><i className="b2" />
              <span className="bow"><u className="l1" /><u className="l2" /><u className="t1" /><u className="t2" /><u className="knot" /></span></div>
          </motion.div>
        </motion.div>
        <AnimatePresence>
          {open && ITEMS.map((p, i) => (
            <motion.a key={p.id} href={`#/product/${p.id}`} className="g3-item" style={{ left: `${14 + i * 21}%` }}
              initial={{ y: 130, scale: 0.3, opacity: 0, rotate: 0 }}
              animate={{ y: [-120 - (i % 2) * 36, -132 - (i % 2) * 36, -120 - (i % 2) * 36], scale: 1, opacity: 1, rotate: (i - 1.5) * 7 }}
              exit={{ y: 140, scale: 0.3, opacity: 0, transition: { duration: 0.35 } }}
              transition={{ y: { duration: 3.2 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 + i * 0.1 }, scale: { type: 'spring', delay: i * 0.12 }, opacity: { delay: i * 0.12 }, rotate: { type: 'spring', delay: i * 0.12 } }}>
              <img src={img(p.img)} alt="" /><span>{p.name}</span><b>{money(p.price)}</b>
            </motion.a>
          ))}
        </AnimatePresence>
        {open && [0, 1, 2, 3, 4, 5].map((i) => <motion.span key={i} className="spark" style={{ left: `${12 + i * 15}%`, top: `${6 + (i % 3) * 14}%` }} animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>{'\u2726'}</motion.span>)}
        <span className="g3-hint">Drag to spin</span>
      </div>
      <div className="g3-ctl">
        <button className="btn" onClick={() => setOpen(!open)}>{open ? 'Close the gift' : 'Open the gift'}</button>
        <div className="g3-sw" role="group" aria-label="Box colour">{Object.entries(TONES).map(([k, v]) => <button key={k} title={k} aria-label={k} className={tone === k ? 'on' : ''} style={{ background: v.box }} onClick={() => setTone(k)} />)}</div>
      </div>
    </div>
  )
}
