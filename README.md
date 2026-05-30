# Portafolio interactivo de Victoria Medina

Sitio estático diseñado como una experiencia creativa tipo estudio con un tablero de corcho interactivo.

## Uso

1. Abre `index.html` en un navegador moderno.
2. Haz clic en "Explora el tablero" para entrar al portafolio.
3. Selecciona cualquier objeto para abrir la sección correspondiente.

> Para obtener animaciones de entrada/salida correctas entre páginas, es mejor servir el sitio desde un servidor local en lugar de abrirlo desde el sistema de archivos.

- Opción rápida: `python3 -m http.server 8000`
- Luego abre `http://localhost:8000` en tu navegador.

## Estructura

- `index.html` - página principal, tablero de corcho interactivo y portal a las secciones.
- `styles.css` - estilos visuales, transiciones y ambiente.
- `script.js` - interacción, parallax, sonido y navegación.
- `sobre-mi.html`, `proyectos.html`, `experiencia.html`, `habilidades.html`, `software.html`, `proceso.html`, `servicios.html`, `testimonios.html`, `log.html` - páginas internas independientes con transiciones cinemáticas.

## Despliegue directo

Este sitio está listo para desplegarse como sitio estático en GitHub Pages.

1. Inicializa el repositorio (si aún no existe):
   - `git init`
   - `git add .`
   - `git commit -m "Initial portfolio site"`
2. Crea un repositorio en GitHub y agrega el remoto:
   - `git remote add origin https://github.com/<usuario>/<repositorio>.git`
3. Empuja a `main`:
   - `git push -u origin main`

El workflow de GitHub Actions en `.github/workflows/deploy.yml` publicará el contenido del repositorio en la rama `gh-pages` cada vez que se haga push a `main`.

> Si usas un dominio personalizado, agrega un archivo `CNAME` en la raíz del repositorio con tu dominio.

## Assets incluidos

- `assets/polaroid-hero-1.jpg` — imagen de muestra (Unsplash/Picsum placeholder)
- `assets/polaroid-hero-2.jpg` — imagen de muestra
- `assets/studio-1.jpg` — imagen de estudio de muestra
- `assets/cork.svg` — textura de corcho SVG
- `assets/tack.wav` — sonido de tachuela (generado localmente)

Si deseas reemplazar estos archivos por tus fotografías y audio originales, pon los archivos en la carpeta `assets/` con los mismos nombres.

## Notas

El proyecto usa HTML, CSS y JavaScript puro para crear una experiencia inmersiva sin dependencias externas.
