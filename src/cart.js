export function updateQuantity(cart,id,quantity){const next={...cart}; const q=Math.min(20,Math.max(0,Math.trunc(Number(quantity)||0))); if(q)next[id]=q;else delete next[id];return next;}
export function total(cart,products){return products.reduce((sum,p)=>sum+p.price*(cart[p.id]||0),0);}
export function restoreCart(value,products){try{const parsed=JSON.parse(value);return products.reduce((cart,p)=>updateQuantity(cart,p.id,parsed?.[p.id]),{});}catch{return {};}}
