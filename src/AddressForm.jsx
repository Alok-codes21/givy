import { useState } from 'react'
export const validAddr = (f) => f.name.trim() && /^\d{10}$/.test(f.phone) && /^\d{6}$/.test(f.pin) && f.line.trim().length > 5 && f.city.trim()
export function AddressForm({ value, onChange, labelField }) {
  const set = (k, v) => onChange({ ...value, [k]: v })
  return (
    <div className="aform">
      {labelField && <label>Label<input placeholder="Home, Work, Mom's place" value={value.label} onChange={(e) => set('label', e.target.value)} /></label>}
      <label>Recipient name<input value={value.name} onChange={(e) => set('name', e.target.value)} /></label>
      <label>Phone (10 digits)<input inputMode="numeric" value={value.phone} onChange={(e) => set('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} /></label>
      <label>Address<textarea rows="2" placeholder="House no, street, area" value={value.line} onChange={(e) => set('line', e.target.value)} /></label>
      <div className="two"><label>City<input value={value.city} onChange={(e) => set('city', e.target.value)} /></label>
      <label>PIN code<input inputMode="numeric" value={value.pin} onChange={(e) => set('pin', e.target.value.replace(/\D/g, '').slice(0, 6))} /></label></div>
    </div>
  )
}
export const emptyAddr = { label: '', name: '', phone: '', line: '', city: '', pin: '' }
