const img = (n) => `${import.meta.env.BASE_URL}img/${n}.jpg`
export { img }
export const CATEGORIES = [
  { slug: 'hampers', color: '#14513E', name: 'Hampers', blurb: 'Ready-to-gift boxes, wrapped with ribbon', img: 'hamper1' },
  { slug: 'birthday', color: '#D9826B', name: 'Birthday', blurb: 'Little things that make the day', img: 'scrunchy1' },
  { slug: 'anniversary', color: '#7A2233', name: 'Anniversary', blurb: 'For the years you have kept', img: 'hamper2' },
  { slug: 'valentines', color: '#C2415D', name: "Valentine's", blurb: 'Say it softly, or say it in gold', img: 'valentine1' },
  { slug: 'for-him-her', color: '#1F3358', name: 'For Him / For Her', blurb: 'Thoughtful pairs for both', img: 'him1' },
  { slug: 'for-her', hidden: true, color: '#B66A86', name: 'For Her', blurb: 'Pendants, earrings and clutchers', img: 'earring1' },
  { slug: 'for-him', hidden: true, color: '#1F3358', name: 'For Him', blurb: 'Simple pieces, well made', img: 'him1' },
  { slug: 'baby', color: '#7FA0B8', name: 'Newborn Baby', blurb: 'Soft, gentle first gifts', img: 'baby1' },
  { slug: 'customized', color: '#5B2A5E', name: 'Customized', blurb: 'Your name, your photo, your note', img: 'custom1' },
]
export const TYPES = ['Pendants', 'Clutchers', 'Scrunchies', 'Earrings', 'Hampers']
export const PRODUCTS = [
  { id: 'p1', name: 'Heart Pendant', type: 'Pendants', cats: ['for-her', 'valentines', 'anniversary', 'birthday'], price: 899, img: 'pendant1', tag: 'Bestseller', desc: 'A small gold-tone heart on a fine chain. Light enough for every day, gift-boxed with a ribbon.', details: ['Gold-plated brass, anti-tarnish coat', '16 inch chain + 2 inch extender', 'Comes in a Givy gift box'] },
  { id: 'p2', name: 'Moon & Star Pendant', type: 'Pendants', cats: ['for-her', 'birthday', 'valentines'], price: 1099, img: 'pendant2', tag: 'New', desc: 'A crescent moon with a tiny star and freshwater-look pearl. A quiet, pretty piece.', details: ['Gold-plated brass', 'Pearl-look bead accent', '17 inch adjustable chain'] },
  { id: 'p3', name: 'Pearl Claw Clutcher', type: 'Clutchers', cats: ['for-her', 'birthday', 'hampers'], price: 549, img: 'clutch1', tag: 'Bestseller', desc: 'An ivory pearl-studded claw clip that holds thick hair without pulling.', details: ['Strong spring hinge', 'Pearl-look beads, hand set', 'Holds medium to thick hair'] },
  { id: 'p4', name: 'Tortoise Maroon Clutcher', type: 'Clutchers', cats: ['for-her', 'birthday', 'anniversary'], price: 449, img: 'clutch2', desc: 'Glossy maroon tortoiseshell finish with a thin gold edge. Goes with everything.', details: ['Cellulose acetate, glossy finish', 'Gold-tone hinge detail', '9 cm wide'] },
  { id: 'p5', name: 'Satin Scrunchie Duo', type: 'Scrunchies', cats: ['for-her', 'birthday', 'hampers', 'baby'], price: 349, img: 'scrunchy1', tag: 'Set of 2', desc: 'Two silky satin scrunchies, deep maroon and blush. Gentle on hair, easy to gift.', details: ['100% satin finish', 'Set of 2: maroon + blush', 'Soft elastic, no crease'] },
  { id: 'p6', name: 'Embroidered Floral Scrunchies', type: 'Scrunchies', cats: ['for-her', 'birthday', 'valentines'], price: 429, img: 'scrunchy2', tag: 'New', desc: 'Designed scrunchies with small hand-stitched florals in cream and rose.', details: ['Cotton blend with embroidery', 'Set of 2', 'Machine washable on gentle'] },
  { id: 'p7', name: 'Pearl Jhumka Earrings', type: 'Earrings', cats: ['for-her', 'anniversary', 'birthday', 'hampers'], price: 1299, img: 'earring1', tag: 'Bestseller', desc: 'Traditional gold jhumkas finished with small pearl drops. For festive days and gifting.', details: ['Gold-plated, nickel-free posts', 'Pearl-look drops', '4.5 cm length'] },
  { id: 'p8', name: 'Crystal Charm Hoops', type: 'Earrings', cats: ['for-her', 'birthday', 'valentines'], price: 799, img: 'earring2', desc: 'Small gold hoops, each with one clear crystal charm. Easy to wear all day.', details: ['Gold-plated, hypoallergenic', '2 cm hoop', 'Crystal-look charm'] },
  { id: 'p9', name: 'Birthday Bloom Hamper', type: 'Hampers', cats: ['hampers', 'birthday'], price: 2499, img: 'hamper1', tag: 'Popular', desc: 'A basket of small gifts: a pendant box, satin scrunchies, a wrapped surprise and a bouquet.', details: ['Pendant + 2 scrunchies + surprise gift', 'Handwritten-style note card', 'Wicker basket, maroon ribbon'] },
  { id: 'p10', name: 'Forever Anniversary Box', type: 'Hampers', cats: ['hampers', 'anniversary'], price: 2999, img: 'hamper2', tag: 'Gift of the month', desc: 'A velvet case with a gold pendant, rose petals and a candle. For the years you have kept.', details: ['Pendant in velvet case', 'Scented candle', 'Rose petals + gift wrap'] },
  { id: 'p11', name: 'Rose & Heart Valentine Box', type: 'Hampers', cats: ['valentines', 'hampers', 'for-her'], price: 2199, img: 'valentine1', tag: 'Valentine edit', desc: 'A single red rose, gold heart earrings and a heart pendant in a ribboned maroon box.', details: ['Heart pendant + stud earrings', 'Rose and satin ribbon', 'Add a personal note free'] },
  { id: 'p12', name: 'Leather & Steel Gift Set', type: 'Hampers', cats: ['for-him', 'birthday', 'hampers', 'anniversary'], price: 1899, img: 'him1', desc: 'A braided leather bracelet and a steel bar pendant chain in a dark maroon box.', details: ['Genuine leather bracelet', 'Stainless steel, water safe', 'Gift box + card'] },
  { id: 'p13', name: 'Little Wonder Baby Set', type: 'Hampers', cats: ['baby', 'hampers'], price: 1599, img: 'baby1', tag: 'Newborn', desc: 'Soft knit headbands, tiny scrunchies and a wooden rattle in a cream basket.', details: ['Soft cotton knit, skin-safe', 'Fits newborn to 6 months', 'Wooden rattle, smooth edges'] },
  { id: 'p14', name: 'Soft Knit Bow Headbands', type: 'Scrunchies', cats: ['baby'], price: 599, img: 'baby1', desc: 'Stretchy knit bow headbands for little heads. Tag-free and gentle.', details: ['Set of 3', 'Very stretchy, no marks', 'Newborn to toddler'] },
  { id: 'p15', name: 'Custom Name Necklace', type: 'Pendants', cats: ['customized', 'for-her', 'birthday', 'anniversary', 'valentines'], price: 1499, img: 'custom1', tag: 'Made for you', custom: true, desc: 'Your name in a flowing script with a small initial charm. Made to order in 5 to 7 days.', details: ['Name up to 12 letters', 'Gold, rose gold or silver finish', 'Ships in a maroon gift box'] },
  { id: 'p16', name: 'Initial Charm Pendant', type: 'Pendants', cats: ['customized', 'for-him', 'for-her'], price: 999, img: 'pendant1', custom: true, desc: 'A single initial on a fine chain. Pick the letter, pick the finish.', details: ['Any letter A to Z', 'Three finishes', 'Made to order'] },
  { id: 'p17', name: 'Name Embroidered Scrunchie', type: 'Scrunchies', cats: ['customized', 'birthday', 'for-her'], price: 499, img: 'scrunchy2', custom: true, desc: 'A satin scrunchie with a name stitched in. Small, personal, quick to make.', details: ['Name up to 10 letters', 'Pick thread colour', 'Made to order'] },
]
// finder tags
const TAGS = { p1: ['minimal', 'cute'], p2: ['elegant', 'minimal'], p3: ['elegant'], p4: ['elegant', 'minimal'], p5: ['cute', 'elegant'], p6: ['cute', 'festive'], p7: ['festive', 'elegant'], p8: ['minimal', 'cute'], p9: ['cute'], p10: ['elegant'], p11: ['elegant', 'cute'], p12: ['minimal'], p13: ['cute'], p14: ['cute'], p15: ['elegant', 'cute'], p16: ['minimal', 'elegant'], p17: ['cute'], p18: ['minimal', 'elegant'], p19: ['minimal'] }
PRODUCTS.forEach((p) => { p.vibe = TAGS[p.id] || [] })
export const money = (n) => '\u20B9' + n.toLocaleString('en-IN')

export const catColor = (slug) => (CATEGORIES.find((c) => c.slug === slug) || {}).color || '#14513E'
