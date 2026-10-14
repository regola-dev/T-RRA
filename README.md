# TÉRRA — sitio editorial y tienda botánica

Implementación sobre la arquitectura existente: Vite + JavaScript, sin backend ni pasarela. Se conservan los archivos del visor Three.js como recurso disponible, sin cargarlo en la portada. Rutas: inicio, bebidas, fichas de PRESENCIA y PULSO, Universo, Rituales, Historias, FAQ, contacto y carrito.

## Ejecutar

Node 22.12 o superior y pnpm:

    pnpm install --frozen-lockfile
    pnpm dev
    pnpm test
    pnpm build
    pnpm preview

## Editar contenido y habilitar pedidos

`src/products.js` centraliza catálogo y `commerce`: productos, precios, stock, ingredientes, preparación, conservación, imágenes, Instagram, WhatsApp, email, envíos, medios de pago, condiciones y URL pública. PRESENCIA tiene precio PROVISIONAL de ARS 15.000; PULSO no tiene precio. El stock de ambos está pendiente. No se inventaron disponibilidad ni datos comerciales.

Para habilitar un producto, confirmar un precio entero en ARS, poner `provisionalPrice:false` y un `stock` entero positivo. El carrito limita cantidades por stock y a 20 unidades. Persistencia local sin datos personales. Esto no reserva inventario en un servidor: la dueña debe confirmar cada consulta.

Para habilitar envío de consultas de pedido por WhatsApp:

- `whatsapp`: número real internacional solo con dígitos (10 a 15), sin inventarlo.
- `payments`: nombres de medios de pago reales disponibles.
- `shipping`: opciones `{ id, label, cost }`, con importe entero en ARS no negativo. Definir cobertura en cada descripción y ofrecer solo zonas atendidas.
- `policies`: condiciones comerciales confirmadas, incluyendo cobertura, plazos, cambios y devoluciones.

Se muestra subtotal, envío y total antes de enviar. Se requieren nombre, provincia, localidad, dirección y código postal argentino. El envío abre un mensaje de WhatsApp; no confirma pedido, no cobra y no vacía el carrito. Los datos no se guardan en localStorage. El cliente debe enviar el mensaje y TÉRRA confirmar stock, entrega y pago. Los importes son una consulta editable por el cliente; nunca utilizarlos como comprobante de pago.

Completar datos fiscales, domicilio comercial, términos y privacidad antes de publicar para venta. Verificar obligaciones aplicables con asesoramiento local. No hay pagos online, webhooks ni backend de pedidos. Integrar Mercado Pago requiere una futura implementación del servidor, validación del catálogo en servidor y verificación oficial de notificaciones; no agregar claves al frontend.

## Imágenes y diseño

Adjuntos originales en `assets-source/`, fuera del directorio público. Versiones WebP optimizadas en `public/assets/brand/`. `presencia.jpg` y `pulso.jpg` son las imágenes recibidas. Logo sobre hoja para portada y universo. `terra-negro.png` es un logo blanco con transparencia; su copia recortada sin cambiar el diseño se usa en navegación. Las fotos previas de Instagram permanecen disponibles.

Sustituir `image` de cada producto en el catálogo y las imágenes editoriales de `src/main.js`. Paleta en `src/editorial.css`, estilos existentes en `src/style.css`. Fuentes Google Fonts con fallback Georgia/Arial; se puede servir WOFF2 local para eliminar esa petición externa. No hay trackers ni cookies de analítica.

`src/articles.js` contiene el modelo editorial: slug, título, bajada, categoría, fecha opcional, portada, párrafos, fuentes y artículos relacionados. Agregar entradas allí amplía el listado y genera rutas sin rediseñar. Las historias históricas/botánicas no verificadas siguen pendientes. Se incluye una reflexión de marca útil, sin atribuir hechos científicos ni referencias inventadas. Preparación de matcha orientativa; hibiscus pendiente de validación específica.

## SEO y despliegue

`pnpm build` genera `dist`. El build emite HTML por ruta. Vercel usa URLs limpias; otros hostings pueden usar el fallback SPA incluido en `public/_redirects`. El build genera HTML con títulos, descripción y Open Graph propios para cada ruta, legibles sin ejecutar JavaScript. El contenido todavía se renderiza en cliente; para indexación completa del contenido incorporar prerender/SSR.

Configurar `commerce.siteUrl` para canonical y sitemap; el build los genera cuando el dominio esté confirmado. No se inventó dominio. El robots inicial impide indexar hasta revisión comercial. No se agregaron ofertas estructuradas mientras precio y stock estén pendientes.

Publicación: importar este repositorio en un hosting estático, comando `pnpm build`, salida `dist`, Node 22.12+. En Vercel usar la configuración incluida. No se requiere ninguna variable de entorno para esta versión. WhatsApp se configura como dato público, no como secreto. No hay servicios externos de pago configurados.

Esta entrega no se publica automáticamente: requiere revisar datos pendientes y seleccionar el hosting/dominio para el repositorio existente.
