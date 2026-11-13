# Mesa de Ayuda – Área de Sistemas

Sistema web de tickets de soporte para promotores, gerencia, área técnica y demás áreas.
No necesita Office ni servidor propio: es gratis con **Firebase** (base de datos) y **GitHub Pages** (hosting).

## Qué hace
- **Reportar problema**: formulario → genera un número de ticket (ej. `TK-261113-AB12`).
- **Consultar ticket**: el solicitante ve el estado, el técnico asignado, la solución y el historial.
  Enlace directo: `https://SU-USUARIO.github.io/mesa-ayuda/?t=TK-261113-AB12`
- **Panel técnico** (con usuario y contraseña): lista de tickets con filtros y búsqueda, cambio de estado
  (Abierto → En proceso → En espera → Resuelto → Cerrado), asignación de técnico, solución, notas,
  historial automático, **orden de servicio imprimible con firmas**, estadísticas y exportación a CSV (abre en Excel o LibreOffice).

## Facilidades para el empleado
- **Botones rápidos** (No hay internet, PC no enciende, Huellero, Impresora…): llenan tipo, prioridad y descripción con un toque.
- **Recuerda sus datos** en el equipo: la segunda vez solo escribe el problema.
- **QR en cada equipo**: desde el panel técnico se generan etiquetas imprimibles; al escanearlas con el celular,
  el formulario abre con el serial, el área y la ubicación ya llenos.
- **Sin internet en el PC**:
  1. La página abre igual (queda guardada en el equipo después de la primera visita).
  2. Muestra una guía rápida para que el usuario intente resolverlo solo.
  3. El ticket se guarda en el equipo y **se envía solo** cuando vuelve la conexión.
  4. Si es urgente, lo reporta desde el **celular** escaneando el QR.
- **Instalable como app**: en el celular, abrir el enlace en Chrome → menú ⋮ → *Agregar a la pantalla principal*.
  En el PC, Chrome/Edge → icono de instalar en la barra de direcciones (o crear acceso directo en el escritorio).

## Probarlo ya (modo demo)
Abra `index.html` en el navegador. Si no hay configuración de Firebase, funciona en **modo demo**
(los datos quedan solo en ese navegador). Panel: cualquier correo y la contraseña `admin`.

## Ponerlo en línea (unos 15 minutos)

### 1. Firebase
1. Entre a https://console.firebase.google.com con una cuenta de Gmail → **Agregar proyecto** (puede desactivar Analytics).
2. **Compilación → Firestore Database → Crear base de datos** → modo producción → ubicación `southamerica-east1` (o la que le aparezca).
3. En Firestore → pestaña **Reglas**: pegue el contenido de `firestore.rules`, **cambie los correos** por los de los técnicos y publique.
4. **Compilación → Authentication → Comenzar → Correo electrónico/contraseña → Habilitar**.
5. En Authentication → **Usuarios → Agregar usuario**: cree un usuario para cada técnico (los mismos correos de las reglas).
6. **Configuración del proyecto (⚙️) → General → Tus apps → Web (`</>`)** → registre la app y copie el objeto `firebaseConfig`.
7. Abra `index.html`, busque `FIREBASE_CONFIG` al inicio del `<script>` y pegue sus valores.
   Ahí mismo edite la lista `TECNICOS`.

> La `apiKey` de Firebase no es secreta; la seguridad la dan las reglas de Firestore.

### 2. GitHub Pages
1. En github.com/camilo14ca cree un repositorio `mesa-ayuda`.
2. Suba **todos** los archivos: `index.html`, `sw.js`, `manifest.json`, `icon.svg` (y si quiere este README).
3. **Settings → Pages → Branch: main / root → Save**.
4. En 1–2 minutos queda en `https://camilo14ca.github.io/mesa-ayuda/`.
5. En Firebase → Authentication → **Configuración → Dominios autorizados**, agregue `camilo14ca.github.io`.

### 3. Implementación con el personal
1. **Panel técnico → Etiquetas QR**: pegue la lista de equipos (`SERIAL;Área;Ubicación`), genere e imprima. Pegue una en cada PC y kit.
2. En cada PC abra la página una vez con internet y cree el **acceso directo en el escritorio** (así queda disponible sin conexión).
3. Envíe el enlace por los grupos de WhatsApp de cada área, con un mensaje tipo:
   *“Desde hoy, los problemas con equipos se reportan aquí 👉 enlace. Es más rápido que llamar y queda registro. Si el PC no tiene internet, escanee el QR del equipo con su celular.”*
4. Las primeras semanas, cuando alguien llame, pídale amablemente que lo reporte por la mesa de ayuda (o créelo usted mientras habla con la persona y dígale el número de ticket).

## Límites del plan gratuito (Spark)
50.000 lecturas y 20.000 escrituras al día: es mucho más de lo que usa una mesa de ayuda de este tamaño.

## Ideas para después
- Notificación por correo o Telegram cuando entra un ticket urgente.
- Adjuntar fotos (Firebase Storage).
- Encuesta de satisfacción al cerrar.
- Vincular el ticket con la hoja de vida del equipo (inventario).
