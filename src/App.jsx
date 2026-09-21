import { useEffect, useState } from 'react'
import './App.css'

const productImages = [
  'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=85',
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=500&q=85',
]

const relatedProducts = [
  { name: 'Santal 33', price: '$195.00', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=500&q=85' },
  { name: 'Another 13', price: '$215.00', image: 'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?auto=format&fit=crop&w=500&q=85' },
  { name: 'Thé Matcha 26', price: '$230.00', image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=500&q=85' },
  { name: 'Baie 19', price: '$195.00', image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=500&q=85' },
]

function Header({ scrolled, bagCount }) {
  return <header className={scrolled ? 'site-header scrolled' : 'site-header'}><a className="brand" href="/">L<span>É</span>LABO</a><nav className="main-nav" aria-label="Main navigation"><a href="#shop">Shop</a><a href="#stores">Stores</a><a href="#about">About us</a></nav><div className="header-actions"><button aria-label="Search" className="icon-button">⌕</button><button aria-label={`Shopping bag, ${bagCount} items`} className="bag-button">Bag {bagCount > 0 && <span className="bag-badge">{bagCount}</span>}</button><button aria-label="Open menu" className="menu-button">☰</button></div></header>
}

function ProductGallery() {
  const [activeImage, setActiveImage] = useState(0)
  return <div className="gallery"><div className="gallery-main"><img src={productImages[activeImage]} alt="Santal 33 perfume bottle" /><button className="gallery-arrow previous" onClick={() => setActiveImage((activeImage + productImages.length - 1) % productImages.length)} aria-label="Previous image">←</button><button className="gallery-arrow next" onClick={() => setActiveImage((activeImage + 1) % productImages.length)} aria-label="Next image">→</button></div><div className="thumbnail-list" aria-label="Product images">{productImages.map((image, index) => <button className={index === activeImage ? 'thumbnail active' : 'thumbnail'} key={image} onClick={() => setActiveImage(index)}><img src={image} alt={`View ${index + 1}`} /></button>)}</div></div>
}

function QuantityControl({ quantity, onQuantityChange }) {
  return <div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => onQuantityChange((currentQuantity) => Math.max(1, currentQuantity - 1))}>−</button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => onQuantityChange((currentQuantity) => currentQuantity + 1)}>+</button></div>
}

function ProductDetails() {
  const [added, setAdded] = useState(false)
  const [bagCount, setBagCount] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [scrolled, setScrolled] = useState(false)
  const unitPrice = 230
  const totalPrice = unitPrice * quantity

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const addToBag = () => {
    setBagCount((currentCount) => currentCount + 1)
    setAdded(true)
  }

  return <div className="storefront"><Header scrolled={scrolled} bagCount={bagCount} /><main><div className="breadcrumbs"><a href="/">Home</a><span>/</span><a href="#fragrance">Fragrance</a><span>/</span><strong>Santal 33</strong></div><section className="product-layout" id="shop"><ProductGallery /><article className="product-copy"><p className="eyebrow">Eau de parfum</p><h1>Santal 33</h1><p className="subtitle">A firewood-inspired fragrance</p><p className="description">Santal 33 is a perfume that captures the raw, hypnotic beauty of the great American West. It is a celebration of the spirit of the wild, wrapped in smoky woods and spicy, leathery warmth.</p><div className="price-row"><strong>${totalPrice.toFixed(2)}</strong><span>50 ml / 1.7 fl oz</span></div><div className="purchase-row"><QuantityControl quantity={quantity} onQuantityChange={setQuantity} /><button className="add-button" onClick={addToBag}>{added ? 'Added to bag' : 'Add to bag'} <span>→</span></button></div><div className="product-notes"><div><span>01</span><strong>Top notes</strong><p>Cardamom, violet accord</p></div><div><span>02</span><strong>Heart notes</strong><p>Australian sandalwood, papyrus</p></div><div><span>03</span><strong>Base notes</strong><p>Cedarwood, leather, amber</p></div></div><details open><summary>Details</summary><p>Made in the USA. Vegan formula, cruelty-free. The bottle is designed to be refilled at our boutiques.</p></details></article></section><section className="related-section"><div className="section-heading"><p className="eyebrow">Explore the collection</p><h2>More fragrances</h2><a href="#shop">View all <span>→</span></a></div><div className="related-grid">{relatedProducts.map((product) => <a className="related-card" href="#shop" key={product.name}><div className="related-image"><img src={product.image} alt="" /></div><div><h3>{product.name}</h3><p>{product.price}</p></div></a>)}</div></section></main><footer className="site-footer"><div className="footer-brand">L<span>É</span>LABO<p>Fine fragrances, formulated with care.</p></div><div id="stores"><h3>Customer care</h3><a href="#contact">Contact us</a><a href="#shipping">Shipping & returns</a><a href="#faq">FAQ</a></div><div id="about"><h3>Discover</h3><a href="#stores">Our stores</a><a href="#about">Our story</a><a href="#journal">Journal</a></div><div className="footer-newsletter"><h3>Stay in the know</h3><p>Sign up for new launches and stories.</p><form onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Your email address" aria-label="Your email address" /><button aria-label="Subscribe">→</button></form></div></footer></div>
}

function App() {
  const routes = { '/': ProductDetails, '/product-details': ProductDetails }
  const Page = routes[window.location.pathname] || ProductDetails
  return <Page />
}

export default App
