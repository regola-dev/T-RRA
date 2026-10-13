# TÉRRA — Presencia

Primera versión de ecommerce responsive, en español, con Vite y Three.js. El catálogo está en `src/products.js`. Precio confirmado: $15.000 ARS por Presencia 50 g. Venta exclusiva en Argentina y envíos a todo el país, con costo a confirmar según destino; no hay servidor de pedidos ni pasarela de pagos.

## Ejecutar

Requisitos: Node.js 22.12+ y pnpm.

```sh
pnpm install
pnpm dev
pnpm test
pnpm build
pnpm preview
```

La compilación estática se genera en `dist/`. Se puede publicar en Sites, Netlify, Cloudflare Pages o Vercel con comando `pnpm build` y directorio `dist`.

## Estructura

- `src/products.js`: catálogo y formato de precios.
- `src/cart.js`: cantidades, totales y restauración segura.
- `src/pouch.js`: geometría volumétrica del pouch, materiales, luces y controles reales Three.js.
- `src/main.js`: tienda, bolsa y checkout local.
- `public/assets/`: fotografías y recortes derivados de las dos referencias adjuntas.

## Modelo 3D y fidelidad

La etiqueta frontal usa una reconstrucción ImageGen de 1024 × 1536 px basada en las dos referencias de etiqueta y logo proporcionadas. Conserva la hoja, la composición y los textos; es una reconstrucción visual, no el arte de imprenta original. El pouch es una malla 3D con dos caras, abombado, cierre, costuras y base. Se gira con mouse/táctil, se acerca con rueda/pinch o botones, y se restablece la cámara. El render pausa fuera de pantalla y respeta movimiento reducido. Si WebGL no inicia se muestra la foto con aviso.

La textura está limitada por la resolución, perspectiva e iluminación de la foto recibida: no sustituye un arte de imprenta. El dorso es ilustrativo sin texto comercial inventado. Para fidelidad de producción: aportar etiqueta en alta resolución, dorso, medidas del pouch y, si existe, archivo GLB oficial.

## Alcance y publicación comercial

La bolsa se conserva en localStorage. El checkout valida datos de ejemplo en el navegador, muestra confirmación y vacía la bolsa: no envía ni conserva los datos del formulario, no crea pedidos y no solicita tarjetas.

Antes de venta real: confirmar origen, ingredientes, stock y políticas; conectar backend de pedidos e inventario, pasarela de pagos y logística; agregar términos y privacidad y verificar accesibilidad y compatibilidad en dispositivos reales. Agregar nuevos productos al catálogo y definir imágenes y modelos correspondientes.

Tipografías Google Fonts con alternativas locales del sistema. Fotografías tomadas de las referencias proporcionadas, sin fotografías de stock. Instagram no pudo consultarse en vivo; identidad basada en las capturas adjuntas.
