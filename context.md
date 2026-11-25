# EXPERIENCIAS ARNAU: contexto del producto

## Objetivo y alcance

Construir una plataforma para descubrir experiencias unicas alrededor del mundo, consultar sus detalles y guardar favoritas durante la sesion. Este documento es la base para el futuro `spec.md` y para la implementacion; no implica que las funcionalidades ya esten desarrolladas.

El nombre visible de la aplicacion sera **EXPERIENCIAS ARNAU**. La interfaz estara en espanol. Se utilizara Next.js con App Router, React, TypeScript y Tailwind CSS, sin backend.

## Usuarios y necesidades

- Personas que buscan actividades de aventura, cultura, gastronomia, bienestar o naturaleza.
- Viajeros que quieren comparar experiencias por destino, precio y valoracion.
- Usuarios que quieren reunir una seleccion de favoritas y consultar su resumen sin registrarse.

Flujo principal: Home -> Explorador -> Detalle -> guardar favorita -> Favoritos o Perfil.

## Paginas y enrutamiento

| Ruta | Objetivo | Contenido y comportamiento |
| --- | --- | --- |
| `/` | Home | Hero fotografico, nombre de la plataforma, texto breve y boton principal "Explorar experiencias" que navega a `/experiences`. |
| `/experiences` | Explorador | Las 100 experiencias en una cuadricula sin filtros iniciales; busqueda por titulo, filtro de categoria, filtro de destino, contador de resultados y opciones para limpiar filtros. |
| `/experiences/[id]` | Detalle | Leer el ID de la URL, buscarlo en el dataset local y mostrar imagen, titulo, descripcion completa, categoria, destino, precio y valoracion. Permitir activar o desactivar el favorito. Un ID inexistente debe mostrar una pagina de no encontrado con salida al explorador. |
| `/favorites` | Favoritos | Mostrar solamente las experiencias cuyos IDs esten guardados. Permitir abrir sus detalles y eliminarlas con el corazon. Cuando no haya favoritas, mostrar un estado vacio con enlace al explorador. |
| `/profile` | Perfil | Perfil simulado y estatico con nombre, avatar y breve biografia; resumen dinamico con el numero de favoritos guardados y enlace a `/favorites`. |

La Navbar estara presente en todas las paginas. Sus enlaces seran Inicio, Experiencias, Favoritos y Perfil. Usara `usePathname` para distinguir el enlace activo; una pagina de detalle mantendra activo Experiencias.

## Dataset local

En la fase de implementacion se generara con ayuda de IA un array de **100 objetos** en un fichero TypeScript local, por ejemplo `src/data/experiences.ts` dentro del proyecto Next.js.

| Campo | Tipo y restricciones |
| --- | --- |
| `id` | `string`, unico y estable, utilizable como segmento de URL. |
| `title` | `string`, titulo descriptivo de la experiencia. |
| `description` | `string`, descripcion completa de la actividad. |
| `category` | Union de literales: `Adventure`, `Culture`, `Food`, `Wellness`, `Nature`. |
| `destination` | `string` con ciudad y pais, por ejemplo "Kioto, Japon". |
| `price` | `number` no negativo; mostrar en EUR con formato coherente. |
| `rating` | `number` entre 0 y 5. |
| `imageUrl` | `string`, URL de imagen o placeholder funcional. |

El dataset sera fijo y compartido por Explorador, Detalle y Favoritos, sin peticiones a una API. Tendra variedad de destinos y representacion de las cinco categorias. Los datos y valoraciones seran simulados, no ofertas comerciales reales.

Las etiquetas visibles de categoria podran traducirse como Aventura, Cultura, Gastronomia, Bienestar y Naturaleza, manteniendo los valores originales en datos y URL.

## Busqueda, filtros y URL

- `SearchBar` filtrara exclusivamente por coincidencia en `title`, mediante una regex case-insensitive, como `new RegExp(term, 'i').test(experience.title)`.
- Un termino vacio no restringira los resultados. Si el patron regex no es valido, se mostrara un error de validacion sin romper la pagina; no se sustituira silenciosamente la busqueda por otro comportamiento.
- Categoria: selector con las cinco categorias y una opcion "Todas las categorias"; coincidencia exacta con `category`.
- Destino: campo de busqueda que compruebe coincidencias parciales, sin distinguir mayusculas, dentro de `destination`, permitiendo buscar tanto ciudad como pais.
- Los tres criterios seran independientes y se combinaran con AND: una experiencia debe cumplir todos los criterios activos.
- El filtrado se aplicara al cambiar los controles, sin necesidad de recargar la pagina.
- La URL sera la fuente de verdad del estado de los filtros. Usar `useSearchParams` para leerlos, `usePathname` para conservar la ruta y el router de Next.js para actualizarlos.
- Parametros acordados: `q` para busqueda, `category` para categoria y `destination` para destino. Ejemplo: `/experiences?q=yoga&category=Wellness&destination=Bali`.
- Construir y codificar los parametros con `URLSearchParams`; eliminar los parametros propios vacios y conservar otros parametros ajenos al filtrado.
- Al abrir, recargar o compartir una URL con parametros, los controles deben prerrellenarse y los resultados deben corresponder a esos valores. La navegacion atras/adelante tambien debe reflejarse en los controles.
- Una categoria desconocida en la URL se tratara como ausencia de filtro para evitar un selector sin opcion valida.
- "Borrar todo" eliminara los tres criterios. Cada criterio podra limpiarse sin alterar los otros.
- Si no hay coincidencias, mostrar exactamente **"No se encontraron resultados"**, mantener los controles accesibles y ofrecer limpiar filtros.

## Favoritos y estado compartido

- Guardar los IDs favoritos en un `useState<string[]>` de un componente cliente superior y persistente entre las rutas, montado desde el layout compartido.
- Mantener una unica fuente de verdad para todas las paginas. El componente superior pasara la lista y la funcion de toggle hacia abajo como props a los componentes que las necesiten.
- En App Router, una envoltura cliente comun puede leer la ruta y renderizar el contenido interactivo correspondiente con esas props; no se crearan estados de favoritos independientes por pagina.
- Cada `ExperienceCard` incluira un boton de corazon que agregue o elimine su ID, sin duplicados, mediante una actualizacion funcional del estado.
- El corazon distinguira visualmente el estado guardado del no guardado y tendra nombre accesible y `aria-pressed`.
- Pulsar el corazon no debe activar la navegacion de la tarjeta. El enlace al detalle y el boton seran controles separados, sin anidar botones dentro de enlaces.
- Favoritos y contador del Perfil se actualizaran inmediatamente a partir de la misma lista.
- No se usaran `localStorage`, cookies, base de datos ni persistencia. La seleccion se conservara al navegar por enlaces internos, pero se perdera al recargar o cerrar la aplicacion.

## Componentes y hooks

| Elemento | Responsabilidad |
| --- | --- |
| `Navbar` | Marca, navegacion compartida, enlaces activos con `usePathname` y menu movil. |
| `ExperienceCard` | Imagen, titulo, categoria, destino, precio, valoracion, enlace al detalle y toggle de favorito recibido por props. |
| `SearchBar` | Campo controlado de busqueda por titulo, etiqueta accesible y opcion de limpiar. |
| `FilterBar` | Controles de categoria y destino, filtros activos y accion de limpieza. |
| Componente cliente superior | `useState` compartido de favoritos y distribucion de props a las vistas. |
| `useExperiences` | Custom hook que encapsula la combinacion de busqueda regex, categoria y destino sobre el dataset local, devolviendo resultados y posibles errores. |

Usar `useEffect` al menos en un componente. Caso previsto: actualizar `document.title` al cambiar la experiencia de detalle, con el formato "Titulo de experiencia | EXPERIENCIAS ARNAU" y limpieza apropiada al salir. Los resultados filtrados se derivaran del dataset y los parametros, evitando duplicarlos innecesariamente en otro estado.

Los componentes que usan estado, eventos o hooks de navegacion seran componentes cliente. La lectura con `useSearchParams` debera situarse bajo `Suspense` cuando lo requiera el renderizado de Next.js.

## Referencias visuales

Los PNG se utilizan como referencias de composicion y estilo, no como interfaz final ni como contenido comercial que deba copiarse.

| Referencia | Aplicacion al diseno |
| --- | --- |
| [Home.png](Specs/visual-context/Home.png) | Cabecera blanca, marca destacada, iconos de linea, hero con fotografia de viaje y texto superpuesto, boton principal verde turquesa. Dejar visible el inicio del contenido siguiente. |
| [Experience-card-view.png](Specs/visual-context/Experience-card-view.png) | Contador de resultados, filtros eliminables, tarjetas con fotografia protagonista, corazon en la esquina superior derecha, destino y valoracion destacados, titulo legible. |
| [Experience-page.png](Specs/visual-context/Experience-page.png) | Imagen grande en el detalle, corazon visible y jerarquia clara entre contenido y acciones. La accion del prototipo sera guardar o quitar favorito, no reservar. |
| [Left-menu.png](Specs/visual-context/Left-menu.png) | Menu lateral movil con cabecera turquesa, fondo blanco, filas separadas y boton de cierre. Sustituir las opciones de la referencia por las rutas reales de la plataforma. |

### Direccion visual

- Identidad propia: usar EXPERIENCIAS ARNAU en lugar de la marca de las capturas. No reutilizar sus textos, logotipo o afirmaciones comerciales.
- Base blanca, texto oscuro, acentos turquesa o verde petroleo y estrella de valoracion en un tono calido. Referencias aproximadas: `#008577`, `#FFFFFF`, `#293532`, `#F3F4F4`, `#FFA32B`.
- Tipografia legible, titulos con peso fuerte y escala ajustada a cada superficie; evitar que el nombre largo de la plataforma desborde en movil.
- Hero fotografico a ancho completo con contraste suficiente para el texto; fuera del hero, mantener las fotos claras para reconocer la actividad.
- Tarjetas de experiencia con bordes discretos, radios de hasta 8 px, proporcion de imagen estable y espaciado uniforme. Evitar encerrar secciones completas en tarjetas.
- Cuadricula adaptable: una columna en movil, dos en pantallas intermedias y tres o cuatro en escritorio segun el ancho disponible.
- Cabecera de escritorio con enlaces visibles; menu lateral en movil sin ocultar el acceso a favoritos o perfil. Permitir cierre mediante boton, Escape y fondo exterior, con gestion del foco.
- Iconos de una biblioteca consistente, preferentemente Lucide, para corazon, busqueda, menu, cierre, perfil y estrella; proporcionar nombres accesibles y tooltips cuando sea necesario.
- Adaptar los controles redondeados de las referencias a medidas compactas y consistentes. Los filtros pueden apilarse en movil.

Las capturas son principalmente moviles; el escritorio debe conservar su lenguaje visual con una cuadricula mas amplia, no estirar una unica tarjeta a todo el ancho.

## Criterios de calidad y aceptacion

1. Las cinco rutas funcionan mediante navegacion interna, y la Navbar aparece en todas con el estado activo correcto.
2. Home muestra el nombre EXPERIENCIAS ARNAU y su boton abre `/experiences`.
3. El dataset TypeScript contiene exactamente 100 objetos con IDs unicos y todos los campos obligatorios validos.
4. El Explorador muestra las 100 tarjetas cuando no hay criterios activos.
5. La busqueda por titulo usa regex case-insensitive; un patron invalido no provoca un error de renderizado.
6. Categoria y destino funcionan por separado y combinados con la busqueda.
7. Los tres valores se reflejan en la URL, se prerrellenan al cargar y permanecen sincronizados al navegar atras/adelante. Limpiar un criterio no elimina los demas.
8. Un conjunto sin coincidencias muestra "No se encontraron resultados".
9. Cada detalle corresponde al ID solicitado y muestra todos los datos; un ID desconocido produce un estado de no encontrado.
10. Los corazones guardan y eliminan favoritas sin abrir el detalle, sin duplicados y con estado visual y accesible coherente.
11. La lista de Favoritos y el contador del Perfil se actualizan de forma inmediata y sobreviven a la navegacion interna, pero se reinician al recargar.
12. Existen `ExperienceCard`, `SearchBar`, `FilterBar`, `Navbar`, al menos un custom hook y al menos un uso justificado de `useEffect`.
13. La interfaz funciona en movil y escritorio, sin desbordamientos horizontales, textos superpuestos ni controles inaccesibles.
14. Campos etiquetados, foco visible, navegacion por teclado, contraste suficiente, imagenes con texto alternativo y botones de icono accesibles.
15. Imagenes con dimensiones estables y fallback para errores; si se usa `next/image`, configurar los dominios remotos necesarios. Cargar de forma diferida las imagenes fuera de pantalla.
16. TypeScript y lint no presentan errores atribuibles a la implementacion, y las rutas pueden generarse con la configuracion de Next.js utilizada.

La verificacion de la implementacion sera focalizada en estos recorridos y criterios. Este documento no exige anadir archivos de pruebas automatizadas en esta fase.

## Fuera de alcance y siguiente fase

No se incluyen backend, autenticacion real, reservas, pagos, mensajeria, fechas de disponibilidad, regalos, descuentos, resenas verificadas, ordenacion avanzada, carruseles ni persistencia de favoritos. Estos elementos aparecen parcialmente en las referencias, pero no son requisitos del prototipo.

En una fase posterior se creara `spec.md` a partir de este contexto para concretar la estructura de archivos, los contratos de props, el esquema de datos y las decisiones de implementacion. El entregable de la fase actual es unicamente este `context.md` en la raiz del repositorio.