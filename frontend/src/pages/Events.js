import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './events.css';
import '../pages/register.css';
import '../pages/vendorRegister.css';

const cards = [
  { title: 'Marriage / Wedding', desc: 'Venue, Decoration, Catering, DJ, Photography, and related services.', icon: '💍' },
  { title: 'Birthday Celebration', desc: 'Cake, Venue, Entertainment, Themes, and Party Favors.', icon: '🎂' },
  { title: 'Corporate Event', desc: 'Conferences, Team Building, Launches, Gala Dinners.', icon: '🏢' },
  { title: 'Social Gathering', desc: 'Anniversaries, Reunions, Festive Parties.', icon: '🥂' },
  { title: 'Concert / Festival', desc: 'Stage setup, Sound systems, Security, Ticketing.', icon: '🎸' },
  { title: 'Exhibition / Trade Show', desc: 'Booths, Infrastructure, Registration, Promotion.', icon: '🛍️' },
  { title: 'Religious / Cultural', desc: 'Community services, Traditions, Rituals.', icon: '🙏' },
  { title: 'Custom Event', desc: 'Define your unique requirements here.', icon: '✨' },
];

const packages = [
  { id:'pkg-wed-basic', title:'Wedding Essentials', desc:'Venue decor + catering for 200 guests', price:'₹1.5L', img:'https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?q=80&w=1200&auto=format&fit=crop' },
  { id:'pkg-bday-fun', title:'Birthday Bash', desc:'Theme decor + cake + games', price:'₹25k', img:'https://images.unsplash.com/photo-1543525324-5401c9a4d093?q=80&w=1200&auto=format&fit=crop' },
  { id:'pkg-corp-meet', title:'Corporate Meet Pack', desc:'Conference setup + AV + snacks', price:'₹85k', img:'https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1200&auto=format&fit=crop' },
  { id:'pkg-concert', title:'Concert Mini', desc:'Stage + sound + lighting (small)', price:'₹2.2L', img:'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop' },
  { id:'pkg-social', title:'Social Get-Together', desc:'Backyard setup + snacks + music', price:'₹30k', img:'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop' },
  { id:'pkg-exhibition', title:'Expo Starter', desc:'Booth + basic branding + registration', price:'₹1.1L', img:'https://images.unsplash.com/photo-1551836022-4c4c79ecde6b?q=80&w=1200&auto=format&fit=crop' },
  { id:'pkg-cultural', title:'Cultural Evening', desc:'Stage + seating + lights', price:'₹95k', img:'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop' },
  { id:'pkg-custom', title:'Custom Lite', desc:'Consultation + plan + vendor shortlist', price:'₹15k', img:'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop' },
];

export default function Events() {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ location: '', distance: 0, startingCost: '', services: new Set(), files: [] });
  const [error, setError] = useState('');
  const [favs, setFavs] = useState(()=>{
    try { return JSON.parse(localStorage.getItem('ff_favourites')||'[]'); } catch { return []; }
  });
  const [toast, setToast] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');
  const pkgRowRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const navigate = useNavigate();

  const isCorporate = selected === 'Corporate Event';

  const resetModal = () => {
    setSelected(null);
    setForm({ location: '', distance: 0, startingCost: '', services: new Set(), files: [] });
    setError('');
  };

  const priceToNumber = (priceStr) => {
    if (!priceStr) return 0;
    const s = priceStr.replace(/[^0-9.a-zA-Z]/g, '').toLowerCase();
    if (s.endsWith('l')) {
      const n = parseFloat(s.slice(0, -1));
      return isNaN(n) ? 0 : n * 100000;
    }
    if (s.endsWith('k')) {
      const n = parseFloat(s.slice(0, -1));
      return isNaN(n) ? 0 : n * 1000;
    }
    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
  };

  const getCategory = (p) => {
    const t = `${p.id} ${p.title} ${p.desc}`.toLowerCase();
    if (t.includes('wedding')) return 'Wedding';
    if (t.includes('birthday')) return 'Birthday';
    if (t.includes('corp') || t.includes('conference')) return 'Corporate';
    if (t.includes('concert')) return 'Concert';
    if (t.includes('social')) return 'Social';
    if (t.includes('exhibition') || t.includes('expo')) return 'Exhibition';
    if (t.includes('cultural')) return 'Cultural';
    if (t.includes('custom')) return 'Custom';
    return 'Other';
  };

  const filteredSorted = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = packages.filter(p => {
      const inSearch = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
      const inFilter = filter === 'All' || getCategory(p) === filter;
      return inSearch && inFilter;
    });
    if (sortBy === 'Price: Low to High') {
      list = [...list].sort((a,b)=>priceToNumber(a.price)-priceToNumber(b.price));
    } else if (sortBy === 'Price: High to Low') {
      list = [...list].sort((a,b)=>priceToNumber(b.price)-priceToNumber(a.price));
    } else if (sortBy === 'Alphabetical') {
      list = [...list].sort((a,b)=>a.title.localeCompare(b.title));
    }
    return list;
  }, [packages, query, filter, sortBy]);

  React.useEffect(() => {
    const el = pkgRowRef.current;
    if (!el) return;
    el.scrollTo({ left: 0, behavior: 'auto' });
    setTimeout(() => evalArrows(), 0);
  }, [filteredSorted]);

  const scrollPackages = (dir) => {
    const el = pkgRowRef.current;
    if (!el) return;
    const step = 260; 
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const evalArrows = () => {
    const el = pkgRowRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft < maxScroll - 2);
  };

  React.useEffect(()=>{
    const el = pkgRowRef.current;
    if (!el) return;
    evalArrows();
    const onScroll = () => evalArrows();
    el.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  },[pkgRowRef]);

  const saveList = (key, item) => {
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.push(item);
    localStorage.setItem(key, JSON.stringify(list));
  };

  const handleSubmit = () => {
    if (!form.location.trim()) return setError('Please enter a primary service location.');
    if (Number(form.distance) < 0) return setError('Distance must be 0 or more.');
    if (!String(form.startingCost).trim() || isNaN(Number(form.startingCost))) return setError('Enter a valid starting cost.');
    if (form.services.size === 0) return setError('Select at least one service.');
    const booking = {
      id: Date.now(),
      type: selected,
      location: form.location,
      distance: Number(form.distance),
      startingCost: Number(form.startingCost),
      services: Array.from(form.services),
      createdAt: new Date().toISOString(),
    };
    saveList('ff_bookings', booking);
    resetModal();
    navigate('/bookings');
  };

  const addToCart = (vendorName) => {
    saveList('ff_cart', { id: Date.now(), type: 'Corporate Vendor', vendorName, createdAt: new Date().toISOString() });
  };

  const bookVendor = (vendorName) => {
    saveList('ff_bookings', { id: Date.now(), type: 'Corporate Vendor', vendorName, createdAt: new Date().toISOString() });
    resetModal();
    navigate('/bookings');
  };



  const toggleFav = (pkg) => {
    const exists = favs.find((x)=>x.id===pkg.id);
    const next = exists ? favs.filter(x=>x.id!==pkg.id) : [...favs, { ...pkg, savedAt: new Date().toISOString() }];
    localStorage.setItem('ff_favourites', JSON.stringify(next));
    setFavs(next);
    setToast(exists ? 'Removed from favourites' : 'Added to favourites');
    setTimeout(()=>setToast(''), 1500);
  };

  return (
    <div className="events-shell">
      <h1>Select Your Event Type</h1>
      <p className="muted">Start planning by choosing the type of celebration you’re organizing.</p>
      <div className="grid">
        {cards.map((c) => (
          <div key={c.title} className="tile" onClick={() => setSelected(c.title)} role="button">
            <div className="icon">{c.icon}</div>
            <div className="title">{c.title}</div>
            <div className="desc">{c.desc}</div>
          </div>
        ))}
      </div>
      <div className="packages">
        <div className="packages-head">
          <div className="title">Popular Packages</div>
          <div className="packages-controls">
            <input
              type="search"
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              placeholder="Search packages..."
              aria-label="Search packages"
            />
            <select value={filter} onChange={(e)=>setFilter(e.target.value)} aria-label="Filter by category">
              <option>All</option>
              <option>Wedding</option>
              <option>Birthday</option>
              <option>Corporate</option>
              <option>Concert</option>
              <option>Social</option>
              <option>Exhibition</option>
              <option>Cultural</option>
              <option>Custom</option>
            </select>
            <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} aria-label="Sort packages">
              <option>Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Alphabetical</option>
            </select>
          </div>
        </div>
        <div className="packages-row" ref={pkgRowRef}>
          {filteredSorted.map(p => (
            <div key={p.id} className="pkg-card">
              <div className="pkg-media" style={{backgroundImage:`url(${p.img})`}} />
              <div className="pkg-title">{p.title}</div>
              <div className="pkg-desc">{p.desc}</div>
              <div className="pkg-foot">
                <span className="pkg-price">{p.price}</span>
                {favs.find(x=>x.id===p.id) ? (
                  <button className="ghost" type="button" onClick={()=>toggleFav(p)} disabled>Added</button>
                ) : (
                  <button className="ghost" type="button" onClick={()=>toggleFav(p)}>Add to Favourites</button>
                )}
              </div>
            </div>
          ))}
          <button className={`pkg-nav left ${canLeft?'':'hidden'}`} type="button" onClick={()=>scrollPackages(-1)} aria-label="Scroll left">‹</button>
          <button className={`pkg-nav right ${canRight?'':'hidden'}`} type="button" onClick={()=>scrollPackages(1)} aria-label="Scroll right">›</button>
        </div>
      </div>

      {toast && (
        <div className="toast">{toast}</div>
      )}

      {selected && (
        <div className="modal-overlay" onClick={resetModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={resetModal} aria-label="Close">×</button>
            {!isCorporate ? (
              <div className="booking-form">
                <h2>{selected}</h2>
                <p className="muted">Provide details to help us plan your event.</p>
                <form className="form-grid two">
                  <label>Primary Service Location<input value={form.location} onChange={(e)=>setForm({...form, location:e.target.value})} placeholder="e.g., Chennai, Bengaluru, Virtual"/></label>
                  <label>Max Service Distance (in Km)<input type="number" min={0} value={form.distance} onChange={(e)=>{ const v = Math.max(0, Number(e.target.value)); setForm({...form, distance:v}); }}/></label>
                  <label>Starting Cost (₹)<input value={form.startingCost} onChange={(e)=>setForm({...form, startingCost:e.target.value})} placeholder="e.g., 10000"/></label>
                  <div className="chips">
                    <div className="chips-title">Work Preferences / Services Offered (Select at least one):</div>
                    {['Catering','Decoration','Photography','Venue Services','DJ/Music','Other Planning'].map(opt => (
                      <label key={opt}><input type="checkbox" checked={form.services.has(opt)} onChange={(e)=>{
                        const s = new Set(form.services);
                        e.target.checked ? s.add(opt) : s.delete(opt);
                        setForm({...form, services:s});
                      }}/> {opt}</label>
                    ))}
                  </div>
                  <div className="portfolio">
                    <div>Portfolio Upload (Optional):</div>
                    <input type="file" multiple onChange={(e)=>setForm({...form, files:[...e.target.files]})}/>
                    <small>(Placeholder for future file upload)</small>
                  </div>
                  {error && <div style={{color:'#fca5a5'}}>{error}</div>}
                  <div style={{display:'flex',gap:12}}>
                    <button className="primary" type="button" onClick={handleSubmit}>Submit</button>
                    <button className="ghost" type="button" onClick={resetModal}>Cancel</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="corporate-vendors">
                <h2>Conference Planning</h2>
                <p className="muted">End-to-end management for corporate meetings, summits, offsites, and product launches.</p>
                <div className="corp-panel">
                  <div className="muted" style={{marginBottom:12}}>Select a trusted partner to proceed:</div>
                  <div className="vendor-grid">
                  <div className="vendor-card">
                    <div className="vendor-title">Elite Planners</div>
                    <div className="vendor-desc">Experts in high-end corporate conferences and product launches.</div>
                    <div className="vendor-media" style={{backgroundImage:'url(https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop)', backgroundSize:'cover', backgroundPosition:'center'}}/>
                    <div className="vendor-actions">
                      <button className="ghost" type="button" onClick={()=>addToCart('Elite Planners')}>Add to Cart</button>
                      <button className="primary" type="button" onClick={()=>bookVendor('Elite Planners')}>Book Now</button>
                    </div>
                  </div>
                  <div className="vendor-card">
                    <div className="vendor-title">Prime Events</div>
                    <div className="vendor-desc">Specialized in end-to-end corporate event logistics.</div>
                    <div className="vendor-media" style={{backgroundImage:'url(https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=1200&auto=format&fit=crop)', backgroundSize:'cover', backgroundPosition:'center'}}/>
                    <div className="vendor-actions">
                      <button className="ghost" type="button" onClick={()=>addToCart('Prime Events')}>Add to Cart</button>
                      <button className="primary" type="button" onClick={()=>bookVendor('Prime Events')}>Book Now</button>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
