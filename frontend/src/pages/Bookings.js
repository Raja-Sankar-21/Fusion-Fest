import React, { useEffect, useState } from 'react';
import './events.css';
import './register.css';

export default function Bookings(){
  const [bookings, setBookings] = useState([]);
  const [active, setActive] = useState(null);
  const [edit, setEdit] = useState({ location:'', distance:0, startingCost:'', services:[] });
  const [err, setErr] = useState('');

  useEffect(()=>{
    const list = JSON.parse(localStorage.getItem('ff_bookings') || '[]');
    setBookings(list.reverse());
  },[]);

  const clearAll = () => {
    localStorage.removeItem('ff_bookings');
    setBookings([]);
  };

  const openEdit = (b) => {
    setActive(b);
    setEdit({
      location: b.location || '',
      distance: typeof b.distance==='number' ? b.distance : 0,
      startingCost: b.startingCost ?? '',
      services: Array.isArray(b.services) ? b.services : [],
    });
    setErr('');
  };

  const saveEdit = () => {
    if (active && active.type !== 'Corporate Vendor') {
      if (!edit.location.trim()) return setErr('Please enter a location.');
      if (Number(edit.distance) < 0) return setErr('Distance must be 0 or more.');
      if (edit.services.length === 0) return setErr('Select at least one service.');
    }
    const updated = bookings.map(b => b.id === active.id ? {
      ...b,
      location: edit.location,
      distance: Number(edit.distance) || 0,
      startingCost: edit.startingCost === '' ? b.startingCost : Number(edit.startingCost),
      services: edit.services,
      updatedAt: new Date().toISOString(),
    } : b);
    setBookings(updated);
    localStorage.setItem('ff_bookings', JSON.stringify([...updated].reverse()));
    setActive(null);
  };

  const removeItem = (id) => {
    const next = bookings.filter(b=>b.id!==id);
    setBookings(next);
    localStorage.setItem('ff_bookings', JSON.stringify([...next].reverse()));
  };

  const getThumb = (b) => {
    if (b.vendorName === 'Elite Planners') return 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop';
    if (b.vendorName === 'Prime Events') return 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=1200&auto=format&fit=crop';
    const t = (b.type||'').toLowerCase();
    if (t.includes('wedding')) return 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop';
    if (t.includes('birthday')) return 'https://images.unsplash.com/photo-1549068106-b024baf5062d?q=80&w=1200&auto=format&fit=crop';
    if (t.includes('concert')||t.includes('festival')) return 'https://images.unsplash.com/photo-1512363563032-61c5d87970a7?q=80&w=1200&auto=format&fit=crop';
    if (t.includes('corporate')) return 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1200&auto=format&fit=crop';
    if (t.includes('exhibition')||t.includes('trade')) return 'https://images.unsplash.com/photo-1551836022-4c4c79ecde6b?q=80&w=1200&auto=format&fit=crop';
    return 'https://images.unsplash.com/photo-1521336575822-6da63fb45455?q=80&w=1200&auto=format&fit=crop';
  };

  return (
    <div className="help-shell" style={{padding:'40px'}}>
      <h1>My Bookings</h1>
      <p className="muted">All your bookings listed here.</p>
      <div style={{marginTop:16, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div className="muted">Total: {bookings.length}</div>
        {bookings.length>0 && <button className="ghost" onClick={clearAll}>Clear All</button>}
      </div>
      <div style={{marginTop:16, display:'flex', gap:12, overflowX:'auto', paddingBottom:8}}>
        {bookings.length===0 && <div className="muted">No bookings yet.</div>}
        {bookings.map(b => (
          <div key={b.id} className="booking-card" style={{flex:'0 0 auto', width:220, minHeight:180, background:'rgba(15,20,40,.75)', border:'1px solid rgba(255,255,255,.08)', borderRadius:14, padding:12, display:'grid', gap:8}}>
            <div style={{height:90, borderRadius:10, backgroundImage:`url(${getThumb(b)})`, backgroundSize:'cover', backgroundPosition:'center'}} />
            <div style={{fontWeight:700, lineHeight:1.2}}>{b.type}</div>
            {b.vendorName && <div className="muted" style={{fontSize:12}}>Vendor: {b.vendorName}</div>}
            <div className="muted" style={{fontSize:12, display:'grid', gap:2}}>
              {b.location && <span>Location: {b.location}</span>}
              {typeof b.distance!== 'undefined' && <span>Distance: {b.distance} km</span>}
              {typeof b.startingCost!== 'undefined' && <span>₹{b.startingCost}</span>}
            </div>
            <div style={{display:'flex', gap:6, marginTop:'auto'}}>
              <button className="ghost" style={{flex:1}} onClick={()=>removeItem(b.id)}>Remove</button>
              <button className="primary" style={{flex:1}} onClick={()=>openEdit(b)}>View</button>
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div className="modal-overlay" onClick={()=>setActive(null)}>
          <div className="modal" onClick={(e)=>e.stopPropagation()}>
            <button className="modal-close" onClick={()=>setActive(null)} aria-label="Close">×</button>
            <h2>Edit Booking</h2>
            <p className="muted" style={{marginTop:4}}>Update the details and save your changes.</p>

            {active.type === 'Corporate Vendor' ? (
              <div style={{marginTop:12}}>
                <div className="muted">Vendor: {active.vendorName}</div>
                <div className="muted">Type: {active.type}</div>
                <div style={{display:'flex', gap:10, marginTop:12}}>
                  <button className="ghost" onClick={()=>removeItem(active.id)}>Remove</button>
                  <button className="primary" onClick={()=>setActive(null)}>Done</button>
                </div>
              </div>
            ) : (
              <form className="form-grid two" style={{marginTop:12}}>
                <label>Primary Service Location<input value={edit.location} onChange={(e)=>setEdit({...edit, location:e.target.value})} placeholder="e.g., Chennai"/></label>
                <label>Max Service Distance (in Km)<input type="number" min={0} value={edit.distance} onChange={(e)=>setEdit({...edit, distance: Math.max(0, Number(e.target.value))})}/></label>
                <label>Starting Cost (₹)<input value={edit.startingCost} onChange={(e)=>setEdit({...edit, startingCost:e.target.value})} placeholder="e.g., 10000"/></label>
                <div className="chips">
                  <div className="chips-title">Services</div>
                  {['Catering','Decoration','Photography','Venue Services','DJ/Music','Other Planning'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={edit.services.includes(opt)} onChange={(e)=>{
                      const next = new Set(edit.services);
                      e.target.checked ? next.add(opt) : next.delete(opt);
                      setEdit({...edit, services:[...next]});
                    }}/> {opt}</label>
                  ))}
                </div>
                {err && <div style={{color:'#fca5a5'}}>{err}</div>}
                <div style={{display:'flex', gap:12}}>
                  <button type="button" className="ghost" onClick={()=>setActive(null)}>Cancel</button>
                  <button type="button" className="primary" onClick={saveEdit}>Save Changes</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
