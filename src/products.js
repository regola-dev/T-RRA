// Un único catálogo: agregar productos aquí amplía tienda y carrito.
export const products = [{id:'presencia', name:'Presencia', category:'Matcha ceremonial', size:'50 g', price:15000, currency:'ARS', demoPrice:false, image:'/assets/instagram/759849568.webp', texture:'/assets/instagram/etiqueta-original.webp', description:'Una pausa para volver al presente.'}];
export const money = value => new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(value);
