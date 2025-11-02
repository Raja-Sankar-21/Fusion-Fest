import React, { useEffect, useState } from 'react';
import './events.css';
import './register.css';

export default function Favourites(){
  const [items, setItems] = useState([]);

  useEffect(()=>{
    try {
      const list = JSON.parse(localStorage.getItem('ff_favourites')||'[]');
      setItems(list.reverse());
    } catch { setItems([]); }
  },[]);

  const remove = (id) => {
    const next = items.filter(i=>i.id!==id);
    setItems(next);
    localStorage.setItem('ff_favourites', JSON.stringify([...next].reverse()));
  };

  const clearAll = () => {
    localStorage.removeItem('ff_favourites');
    setItems([]);
  };

  return (
    <div className="help-shell" style={{padding:'40px'}}>
      <h1>My Favourites</h1>
      <p className="muted">Saved event packages.</p>
      <div style={{marginTop:16, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div className="muted">Total: {items.length}</div>
        {items.length>0 && <button className="ghost" onClick={clearAll}>Clear All</button>}
      </div>

      {items.length===0 ? (
        <div className="muted" style={{marginTop:16}}>No favourites yet. Go to Events and add some packages.</div>
      ) : (
        <div className="packages-row" style={{paddingLeft:0, paddingRight:0}}>
          {items.map(p => (
            <div key={p.id} className="pkg-card">
              <div className="pkg-media" style={{backgroundImage:`url(${p.img})`}} />
              <div className="pkg-title">{p.title}</div>
              <div className="pkg-desc">{p.desc}</div>
              <div className="pkg-foot">
                <span className="pkg-price">{p.price}</span>
                <button className="ghost" onClick={()=>remove(p.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
