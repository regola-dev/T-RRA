export const commerce = {
  brand: 'TÉRRA', description: 'La naturaleza como origen. Bebidas botánicas con historia.',
  siteUrl: '', instagram: 'https://www.instagram.com/desde.terra/', whatsapp: '', email: '',
  payments: [], shipping: [], policies: '', legalName: '', taxId: '', address: '',
};
export const products = [
 {id:'presencia',name:'PRESENCIA',category:'Matcha ceremonial',size:'50 g',price:15000,provisionalPrice:true,stock:null,currency:'ARS',image:'/assets/brand/presencia.webp',texture:'/assets/instagram/etiqueta-original.webp',description:'Volver al presente a través de un pequeño ritual.',ingredients:null,preparation:'Preparación orientativa: tamizá 1–2 g, integrá con un poco de agua caliente sin hervir y completá a gusto. Las indicaciones definitivas del producto están pendientes de confirmación.',storage:'Mantené el envase cerrado, protegido de la humedad, el calor y la luz. Consultá la etiqueta para las condiciones definitivas.'},
 {id:'pulso',name:'PULSO',category:'Hibiscus en polvo',size:'50 g',price:null,provisionalPrice:false,stock:null,currency:'ARS',image:'/assets/brand/pulso.webp',description:'Expansión, apertura, movimiento y florecimiento.',ingredients:null,preparation:'Las proporciones y el modo de preparación están pendientes de validación por TÉRRA. Consultá las instrucciones del envase antes de preparar; no asumimos que el polvo sea soluble.',storage:'Conservá el envase cerrado y protegido de la humedad, el calor y la luz. Las condiciones definitivas se confirmarán en la etiqueta.'}
];
export const money = value => new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(value);
export const canBuy = p => Number.isSafeInteger(p.price) && p.price > 0 && !p.provisionalPrice && Number.isSafeInteger(p.stock) && p.stock > 0;
export const availability = p => p.stock === null ? 'Disponibilidad por confirmar' : p.stock === 0 ? 'Sin stock' : `${p.stock} disponibles`;
