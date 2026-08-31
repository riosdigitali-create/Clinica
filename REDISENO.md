# REPROFEM México: rediseño del laboratorio

La portada usa el video de laboratorio y fotografía existentes. Se conservan los archivos del logo y los colores borgoña #8D2A3A, rosa #F3AEAF y marfil #FBF7F3. La estructura se rehízo con la referencia visual de Neko Health: portada inmersiva, tipografía grande, secciones amplias, fotografía editorial y navegación sencilla.

## Funciona en esta vista previa

- Catálogo por tipo, categoría y búsqueda sin acentos; fichas de detalle.
- Carrito por persona, sin duplicados exactos; aviso de coincidencias literales entre estudios y paquetes.
- Recorrido: destinatario, nombre, edad, tutor para menores, existencia de orden médica, correo de prueba, preferencia de fecha y resumen editable.
- Resumen descargable con precios, indicaciones y tiempos de los estudios seleccionados. Ningún formulario transmite datos ni cobra. Datos únicamente en memoria; borrado explícito o al recargar.
- Menú móvil, navegación por teclado, diálogos nativos, errores de formulario y movimiento reducido.

## Pendientes que requieren información real

1. **Catálogo recibido:** el usuario proporcionó 47 filas tabuladas el 31 de agosto de 2026. Se importaron 46 estudios únicos en seis categorías con códigos, precios en MXN, preparación y plazos. Se unificó el duplicado exacto de Insulina (4525). No se conservan paquetes ni precios del sitio anterior. La fuente exacta se guarda en data/catalogo-proporcionado.tsv; scripts/import-catalog.cjs hace la importación reproducible. No existe sincronización automática con Google Sheets. verified significa cotejado con la fuente comercial proporcionada, no validación clínica independiente.
2. **Compra real:** no hay pasarela de pago, servidor de pedidos ni agenda conectada. La fecha es una preferencia y el resumen no confirma una contratación. Una integración real debe recalcular precios en servidor y confirmar pagos mediante notificaciones verificadas, nunca con el total del navegador.
3. **Operación clínica:** aclarar el ayuno de los códigos 5153, 55012 y 10169 (fuente: «12 a 4 hrs») y la unidad del plazo del código 4036 («0 a 2»); confirmar disponibilidad, sucursal, contacto, responsable y aviso de privacidad antes de aceptar pacientes reales.
4. **IA:** la experiencia actual es conversacional y guiada por reglas. No llama a un modelo de IA ni recomienda estudios a partir de síntomas.

Fuente solicitada: https://docs.google.com/spreadsheets/d/1VflhLo7e4OD1TKL-pTyUDoPEIdij1TRoDodrwqBEv50/edit?gid=0
Referencia visual: https://www.nekohealth.com/us/en

## Archivos

- index.html, styles.css: página rediseñada.
- app.js: interfaz y recorrido.
- commerce.js: búsqueda, importes y validación.
- catalog.js: cotejo de catálogo y precios contra cada fila de la fuente separado, listo para reemplazar con datos autorizados.
- version-anterior/index.html: respaldo anterior; no se publica.
- reprofem.html: variante histórica no modificada; no se publica.

## Verificación

Las pruebas automatizadas cubren importes desconocidos, catálogo provisional, búsqueda, menores y tutor, fechas imposibles o pasadas, campos requeridos, coincidencias entre paquetes, enlaces internos, sintaxis y archivos usados. No se ejecutaron compras, envíos de datos ni pruebas visuales automatizadas en navegador.

npm run dev inicia la vista local en http://127.0.0.1:4173.
npm test ejecuta las verificaciones.
npm run build prepara el sitio estático y el Worker para Sites.
