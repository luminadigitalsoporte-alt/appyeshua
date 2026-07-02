# Yeshua Web MVP

Aplicación web progresiva centrada en Cristo y las Escrituras.

## Ejecutar localmente

El proyecto no necesita instalar dependencias. Sí debe servirse por HTTP para probar el service worker:

```powershell
python -m http.server 4173
```

Luego abre `http://localhost:4173`.

## Estado de autenticación

La pantalla usa acceso sin contraseña mediante enlace mágico de Supabase. Permanece deshabilitada mientras `config.js` no tenga la URL y clave pública del proyecto. No se guardan contraseñas ni se simula una sesión sensible en el navegador.

Después de crear el proyecto:

1. Ejecuta `supabase-schema.sql` en el editor SQL.
2. En **Authentication > URL Configuration**, configura `Site URL` con la URL HTTPS publicada.
3. Añade esa misma dirección a **Redirect URLs**.
4. Copia la **Project URL** y la clave pública **anon/publishable** en `config.js`.
5. Nunca coloques la clave `service_role` o una secret key en archivos del navegador.

Ejemplo:

```js
window.YESHUA_CONFIG = {
  supabaseUrl: "https://TU-PROYECTO.supabase.co",
  supabaseAnonKey: "TU-CLAVE-PUBLICA"
};
```

El acceso se habilita únicamente bajo `http://localhost` o una dirección `https://`. No debe probarse abriendo `index.html` mediante `file://`.

La seguridad se apoya en:

- HTTPS obligatorio.
- Sesiones seguras administradas por Supabase.
- Confirmación de correo y recuperación de contraseña.
- Protección contra abuso y límites de solicitudes.
- Políticas Row Level Security para diario y progreso.

Al iniciar sesión por primera vez, la app combina el progreso y diario local con la cuenta. Después sincroniza nuevas entradas, eliminaciones, días completados, idioma y tema.

## Biblia

Esta versión incluye los 66 libros y 1,189 capítulos canónicos en Reina-Valera 1909 y King James Version. Cada libro se carga bajo demanda y queda disponible en la caché después de ser leído. Consulta `BIBLE-SOURCES.md` para atribución y condiciones.

## Verificación pendiente

- Repetir el acceso por enlace mágico cuando se restablezca el límite horario de correos de Supabase.
- Confirmar que diario, progreso, idioma y tema aparecen después de cerrar sesión y entrar nuevamente.
- Ejecutar `supabase-onboarding-migration.sql` cuando queramos sincronizar metas y ritmo del onboarding.
