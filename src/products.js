// Un único catálogo: agregar productos aquí amplía tienda y carrito.
export const products = [{id:'presencia', name:'Presencia', category:'Matcha ceremonial', size:'50 g', price:28000, currency:'ARS', demoPrice:true, image:'/assets/presencia.jpg', texture:'/assets/label-hd.png', description:'Una pausa para volver al presente.'}];
export const money = value => new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(value);
