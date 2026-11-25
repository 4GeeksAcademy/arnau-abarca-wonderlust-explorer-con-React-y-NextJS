# Especificacion: EXPERIENCIAS ARNAU

## 1. Proposito y limites

Fuente de requisitos: [context.md](../../context.md). Esta especificacion define la futura implementacion y su verificacion; no contiene codigo implementado ni implica que las pruebas ya se hayan ejecutado.

El producto permite descubrir 100 experiencias, filtrarlas, consultar sus detalles y guardar favoritas durante la sesion. La interfaz sera en espanol y la marca visible sera **EXPERIENCIAS ARNAU**.

Solo se incluyen `/`, `/experiences`, `/experiences/[id]`, `/favorites` y `/profile`. No se incluyen backend, autenticacion, persistencia, reservas, pagos, mensajeria, fechas, regalos, descuentos, resenas verificadas, ordenacion avanzada ni carruseles. No se agregaran paquetes, scripts de proyecto, paginas ni funcionalidades ajenas al contexto.

## 2. Estado actual del proyecto

La raiz del repositorio contiene la documentacion y `Specs/visual-context`. La aplicacion se encuentra en `nextjs-wanderlust-explorer/`; las rutas no se crearan en la raiz del repositorio.

| Archivo existente | Situacion observada | Cambio previsto |
| --- | --- | --- |
| [package.json](../../nextjs-wanderlust-explorer/package.json) | Next.js 16.4.6, React y React DOM 19.3.0, TypeScript 5, Tailwind 4.3.3 y ESLint 9. Scripts `dev`, `build`, `start` y `lint`. Sin libreria de iconos ni framework de pruebas declarados. | Conservar dependencias y scripts. |
| [src/app/layout.tsx](../../nextjs-wanderlust-explorer/src/app/layout.tsx) | Layout compartido, fuentes Geist y Geist Mono, metadatos de plantilla e idioma ingles. | Marca y metadatos propios, idioma `es`, envoltura cliente persistente y Navbar compartida. |
| [src/app/page.tsx](../../nextjs-wanderlust-explorer/src/app/page.tsx) | Home de ejemplo de Next.js. | Sustituirla por la Home solicitada. |
| [src/app/globals.css](../../nextjs-wanderlust-explorer/src/app/globals.css) | Importa Tailwind, define variables y aplica modo oscuro automatico y fuente Arial. | Aplicar la direccion clara del contexto y usar la fuente existente, sin instalar otra. |
| [tsconfig.json](../../nextjs-wanderlust-explorer/tsconfig.json) | Modo estricto, `noEmit` y alias `@/*` hacia `src/*`. | Mantener estas convenciones. |
| [next.config.ts](../../nextjs-wanderlust-explorer/next.config.ts) | `cacheComponents`, `partialPrefetching` e integracion de Tailwind mediante Turbopack. | Conservar la configuracion; adaptar los limites de renderizado y Suspense a ella. |
| [AGENTS.md](../../nextjs-wanderlust-explorer/AGENTS.md) | Exige consultar la documentacion instalada de esta version antes de escribir codigo. | Leer las guias relevantes de rutas, parametros dinamicos, cache y Suspense al iniciar la implementacion. |

Las versiones declaradas no garantizan que las dependencias esten instaladas. Las comprobaciones posteriores deben utilizar las herramientas locales del proyecto; no descargar paquetes para ejecutar pruebas.

## 3. Estructura propuesta

Ubicaciones relativas a `nextjs-wanderlust-explorer/`. Esta es una propuesta de archivos futuros, no archivos creados en esta fase.

| Ubicacion | Responsabilidad |
| --- | --- |
| `src/app/layout.tsx` | Layout servidor, idioma, metadatos, envoltura compartida y estructura comun. |
| `src/app/page.tsx` | Home. |
| `src/app/experiences/page.tsx` | Entrada del Explorador y limite Suspense para la vista que lee parametros de busqueda. |
| `src/app/experiences/[id]/page.tsx` | Resolver el parametro dinamico conforme a Next.js 16, localizar la experiencia y tratar IDs inexistentes con `notFound`. |
| `src/app/favorites/page.tsx` | Entrada de Favoritos. |
| `src/app/profile/page.tsx` | Entrada de Perfil. |
| `src/app/not-found.tsx` | Estado de recurso inexistente con enlace al Explorador; no es una nueva ruta de producto. |
| `src/components/FavoritesProvider.tsx` | Unico `useState<string[]>` compartido y persistente entre navegaciones internas. |
| `src/components/Navbar.tsx` | Navegacion, enlace activo y menu movil. |
| `src/components/ExperienceCard.tsx` | Tarjeta reutilizada por Explorador y Favoritos. |
| `src/components/SearchBar.tsx` | Busqueda controlada por titulo. |
| `src/components/FilterBar.tsx` | Categoria, destino y limpieza de criterios. |
| `src/components/ExperiencesExplorer.tsx` | Lectura y actualizacion de URL, resultados, errores y estado vacio. |
| `src/components/ExperienceDetail.tsx` | Presentacion del detalle y accion de favorito. |
| `src/components/FavoritesView.tsx` | Lista derivada de favoritas y estado vacio. |
| `src/components/ProfileView.tsx` | Perfil simulado y contador derivado. |
| `src/hooks/useExperiences.ts` | Filtrado y validacion de regex. |
| `src/data/experiences.ts` | Tipo Experience, categorias y array local fijo de 100 objetos. |
| `src/app/globals.css` y `public/` | Estilos compartidos y recursos visuales locales necesarios. |

No crear archivos separados para responsabilidades triviales ni introducir una capa de servicios, almacenamiento o gestion global externa.

## 4. Arquitectura y contratos

### Estado y limites de cliente

El layout permanece servidor y monta una envoltura cliente estable. Dentro de esta vive el unico estado de IDs favoritos, inicialmente vacio. No colocar el estado en una pagina o `template`, ni usar una clave dependiente de la ruta que lo reinicie al navegar.

App Router no permite inyectar directamente props desde un layout servidor a todas sus paginas mediante `children`. Se usara un contexto nativo de React como puente minimo entre la envoltura persistente y los contenedores cliente de cada ruta. No es otro almacen: el unico estado sigue siendo el `useState` superior. Los contenedores reciben sus valores de ese puente y los pasan explicitamente como props a las vistas y tarjetas. No se duplicara el estado ni se hara que las tarjetas consulten el contexto directamente.

| Componente | Contrato esperado |
| --- | --- |
| `ExperienceCard` | Recibe `experience`, `isFavorite` y `onToggleFavorite(id)`. El enlace y el boton de corazon son elementos separados. |
| `SearchBar` | Recibe `value`, `onChange(value)` y el error de regex cuando exista. |
| `FilterBar` | Recibe categoria, destino, opciones de categoria y callbacks de cambio y limpieza. |
| `Navbar` | Lee `usePathname`; no mantiene favoritos propios. |
| `ExperienceDetail` | Recibe experiencia, estado de favorito y callback; usa `useEffect` para el titulo del documento con limpieza al salir. |
| `FavoritesView` | Recibe experiencias favoritas y callback de toggle; no conserva una copia independiente de la lista. |
| `ProfileView` | Recibe el numero de favoritos; el resto del perfil es estatico. |
| `useExperiences` | Recibe dataset y los tres criterios; devuelve resultados y error de regex. Deriva resultados, sin sincronizarlos en otro `useState`. |

Las actualizaciones de favoritos seran funcionales: agregar un ID ausente o quitar uno existente. El contador sera la longitud de los IDs validos guardados y cada lista se derivara del mismo dataset. No usar cookies, `localStorage`, `sessionStorage` ni red para almacenar datos.

### Datos y detalle

Generar con ayuda de IA exactamente 100 objetos fijos, sin aleatoriedad en renderizado. Cada objeto tendra ID string unico y estable, titulo, descripcion completa, categoria, ciudad y pais en destino, precio numerico no negativo, rating entre 0 y 5 e imageUrl funcional.

Categorias permitidas: `Adventure`, `Culture`, `Food`, `Wellness`, `Nature`. Usar las etiquetas espanolas del contexto en la interfaz y mantener los literales originales en datos y URL. Mostrar precios en EUR y valoraciones con un formato consistente.

El detalle buscara por igualdad exacta de ID. Resolver los parametros con la API de la version instalada, sin asumir que `params` es sincrono. Los IDs inexistentes deben producir el estado de no encontrado, no una experiencia por defecto.

### Busqueda y URL

- Parametros: `q`, `category` y `destination`. Leer con `useSearchParams` y actualizar la ruta obtenida de `usePathname` mediante el router de Next.js.
- Usar `URLSearchParams` para codificar valores, conservar parametros ajenos y eliminar los propios que queden vacios.
- Los inputs se derivan de la URL, incluyendo carga directa, recarga y navegacion atras/adelante. Evitar un estado inicial local que quede desincronizado.
- Para cambios de controles, usar reemplazo de la URL sin recarga ni salto de scroll. No exigir una entrada de historial por cada pulsacion de tecla; comprobar atras/adelante entre entradas de historial reales.
- Titulo: regex `new RegExp(term, 'i')`, no una busqueda por descripcion o destino. Compilar una vez por filtrado y capturar patrones invalidos.
- Regex invalida: conservar el termino en URL e input, mostrar un error accesible y no ejecutar el patron. Devolver cero resultados; el mensaje de ausencia de resultados no reemplaza la explicacion del error.
- Categoria: igualdad exacta; valor vacio o desconocido significa todas las categorias. Mostrar el selector en "Todas las categorias" si la URL contiene un valor desconocido.
- Destino: coincidencia parcial sin distinguir mayusculas sobre ciudad o pais dentro de `destination`.
- Combinacion AND de los tres criterios. Un criterio vacio no limita la lista.
- Limpiar individualmente no altera los otros criterios. "Borrar todo" elimina `q`, `category` y `destination`, conservando parametros ajenos.
- Contador basado en resultados derivados. Cero coincidencias muestra exactamente "No se encontraron resultados" y una accion de limpieza.

Situar el contenido dependiente de `useSearchParams` bajo Suspense, con fallback de dimensiones estables. Conservar las opciones actuales de cache: no desactivarlas para ocultar errores de renderizado.

## 5. Paginas y diseno

| Ruta | Contenido y acciones obligatorios |
| --- | --- |
| `/` | Marca como senal principal del primer viewport, hero fotografico a ancho completo, texto breve, "Explorar experiencias" hacia `/experiences` e inicio visible del contenido siguiente. |
| `/experiences` | Controles, contador y cuadricula completa; 100 tarjetas sin criterios. Cada tarjeta muestra foto, titulo, categoria, destino, EUR, rating y corazon. |
| `/experiences/[id]` | Foto protagonista, todos los campos descriptivos, accion guardar/quitar y salida al Explorador. |
| `/favorites` | Solo experiencias guardadas, acceso al detalle, eliminacion inmediata y estado vacio con enlace al Explorador. |
| `/profile` | Nombre, avatar, biografia simulada y contador actualizado con enlace a Favoritos. |

Navbar comun: Inicio, Experiencias, Favoritos y Perfil. Marcar Experiencias como activo tambien en el detalle; usar indicador visual y `aria-current`. En movil, menu lateral con cierre por boton, Escape y fondo exterior, gestion del foco y acceso a las mismas rutas.

### Aplicacion de los PNG

- [Home.png](../visual-context/Home.png): cabecera blanca y hero fotografico con accion turquesa; no copiar marca, cifras comerciales ni campos de fechas.
- [Experience-card-view.png](../visual-context/Experience-card-view.png): jerarquia de filtros, contador, fotografia, corazon, destino, valoracion y titulo; sin carrusel ni ordenacion avanzada.
- [Experience-page.png](../visual-context/Experience-page.png): fotografia grande y accion destacada; sustituir reservas y consultas por favorito, sin ofertas o regalos.
- [Left-menu.png](../visual-context/Left-menu.png): panel lateral blanco con cabecera turquesa y filas separadas; solo enlaces a rutas solicitadas.

Paleta del contexto: blanco `#FFFFFF`, texto `#293532`, acento `#008577`, neutro `#F3F4F4` y estrella `#FFA32B`. Mantener aspecto claro, usar Geist existente, espaciado uniforme y tarjetas con radio de hasta 8 px. No encerrar secciones dentro de tarjetas.

Cuadricula de una columna en movil, dos en ancho intermedio y tres o cuatro en escritorio. Imagenes con proporcion estable, textos sin solapamiento y nombre de marca sin desbordamiento. Controles con foco visible, etiquetas, contraste suficiente y corazones con nombre accesible y `aria-pressed`.

Lucide era una preferencia, no una dependencia obligatoria. Dado que no esta declarada y no se autorizan paquetes nuevos, utilizar recursos vectoriales locales consistentes o iconos inline para controles; no usar esos vectores como sustituto de fotografias. No crear un sistema de iconos complejo.

Usar fotografias o placeholders funcionales en el dataset y un recurso fotografico para Home. Preferir recursos locales cuando sea posible. Si se usa `next/image` remoto, declarar unicamente los patrones de los dominios realmente utilizados. Prever fallback local, texto alternativo y carga diferida fuera de pantalla.

## 6. Fases, pruebas y verificaciones

Implementar una fase cada vez. Tras su comprobacion, registrar el resultado y detenerse antes de continuar a la siguiente fase. No ejecutar la suite completa repetidamente ni instalar un framework de pruebas. Los casos siguientes son pruebas manuales reproducibles y controles con herramientas existentes; no requieren crear archivos de tests.

### Fase 1: dataset y contratos

Alcance: tipo Experience, categorias, array fijo y contratos de props. Sin interfaz completa.

Pruebas:
- Comprobar longitud 100, IDs unicos y todos los campos requeridos presentes.
- Comprobar categorias permitidas y representacion de las cinco, precios no negativos, ratings entre 0 y 5 y formato ciudad + pais.
- Seleccionar del dataset casos reales para las fases siguientes: un titulo distintivo, un destino compartido y una combinacion sin coincidencias. Registrar sus IDs y resultados esperados.
- Comprobar varias URLs de imagen y el recurso de fallback; no asumir que una URL sintacticamente valida carga una imagen.

Verificacion: revisar el dataset y realizar una comprobacion puntual de sus invariantes con las herramientas locales; ejecutar el control de TypeScript descrito abajo. Salida: dataset completo y tipado, sin resultados aleatorios.

### Fase 2: layout, Navbar y Home

Alcance: identidad, idioma, envoltura persistente, navegacion y Home fotografica.

Pruebas:
- Home muestra EXPERIENCIAS ARNAU y el boton navega a `/experiences`; hasta implementar esa ruta, registrar el destino correcto del enlace sin dar por validada la pagina.
- Comprobar la cabecera y el hero a 375 px y 1440 px: texto legible, sin scroll horizontal y con inicio visible de la siguiente seccion.
- Abrir/cerrar el menu movil por boton, Escape y fondo exterior; comprobar foco de entrada y retorno al disparador.
- Recorrer enlaces con teclado y comprobar etiquetas de iconos, foco visible y ausencia de controles comerciales no solicitados.

Verificacion: inspeccion de navegador y lint de los archivos tocados. Salida: estructura comun accesible y Home funcional; los enlaces a vistas pendientes quedan identificados para su comprobacion posterior.

### Fase 3: Explorador, hook y parametros

Alcance: `ExperienceCard`, `SearchBar`, `FilterBar`, `useExperiences`, cuadricula y sincronizacion URL.

Pruebas:
- Abrir `/experiences` sin parametros: contador 100 y 100 tarjetas renderizadas, sin exigir que todas las fotos carguen inmediatamente.
- Buscar el titulo seleccionado en fase 1 con distintas mayusculas: mismos IDs esperados. Verificar que un termino presente solo en descripcion no coincide por ese motivo.
- Probar una regex valida y una invalida, por ejemplo `[`: no hay fallo de pagina y el error invalido es visible y accesible.
- Aplicar categoria sola, destino por ciudad solo y destino por pais solo; despues combinar los tres y comparar con el dataset.
- Abrir una URL precargada con `q`, `category` y `destination`: inputs y resultados coinciden. Recargar mantiene esos filtros.
- Comprobar espacios, acentos y caracteres como `&` correctamente codificados; no convertirlos accidentalmente en otros parametros.
- Limpiar un criterio mantiene los otros. "Borrar todo" recupera 100 resultados y conserva un parametro ajeno, por ejemplo `ref=demo`.
- Categoria desconocida muestra "Todas las categorias" y no limita los resultados por categoria.
- Crear entradas reales de historial navegando entre URLs del Explorador mediante enlaces y comprobar atras/adelante; no esperar recuperar cada tecla si se usa replace.
- Probar la combinacion vacia elegida en fase 1: "No se encontraron resultados" y limpieza disponible.

Verificacion: TypeScript y lint del hook, componentes y ruta tocados. Salida: filtrado independiente y combinado, URL reproducible y ausencia de fallos de Suspense observables en desarrollo.

### Fase 4: detalle y no encontrado

Alcance: ruta dinamica, lookup por ID, contenido completo y `useEffect` para el titulo.

Pruebas:
- Abrir el ID seleccionado desde una tarjeta y mediante URL directa: todos los campos coinciden con el dataset.
- Abrir un ID inexistente: no se muestra otra experiencia; estado de no encontrado con enlace operativo al Explorador.
- Comprobar que `document.title` contiene titulo y marca; salir y verificar que no queda el titulo anterior aplicado indebidamente.
- Comprobar imagen, fallback, legibilidad y enlace Experiencias activo en movil y escritorio.

Verificacion: TypeScript y lint de esta ruta y su vista; comprobar la resolucion de `params` contra la documentacion instalada. Salida: detalle correcto, error controlado y efecto con limpieza.

### Fase 5: favoritos y Perfil

Alcance: conectar estado superior, corazones, Favoritos y Perfil. No anadir almacenamiento.

Pruebas:
- Partir de sesion nueva: lista vacia y contador cero.
- Guardar dos IDs distintos en el Explorador: corazones activos, sin abrir detalle al pulsarlos y sin duplicados.
- Navegar mediante enlaces internos al detalle, Favoritos y Perfil: se conserva la misma seleccion y el contador vale dos.
- Quitar uno desde detalle y otro desde Favoritos: todas las vistas reflejan el cambio, contador cero y estado vacio visible.
- Pulsar repetidamente un mismo corazon: el resultado alterna y nunca acumula copias del ID.
- Recargar la pagina: favoritas vacias y contador cero. Inspeccionar que no se escribieron favoritos en cookies o almacenamiento del navegador.
- Operar el corazon con teclado y comprobar nombre accesible y `aria-pressed` en ambos estados.

Verificacion: TypeScript y lint de la envoltura, vistas y componentes modificados. Salida: una unica fuente de verdad y seleccion conservada solo durante navegacion interna.

### Fase 6: calidad visual e integracion final

Alcance: comprobar conjuntamente las cinco rutas, sin ampliar funcionalidades.

Pruebas:
- Recorrer Home -> Explorador -> Detalle -> Favoritos -> Perfil en movil y escritorio; repetir con filtros precargados y favoritos activos.
- Revisar anchos de 375, 768 y 1440 px: cuadricula, menu, nombre largo, titulo largo y mensajes sin solapamientos ni cambios de dimension inesperados.
- Revisar imagenes visibles y fuera de pantalla, texto alternativo, fallback, contraste, foco y controles accesibles.
- Comprobar cada enlace activo, incluido el detalle; confirmar que no hay nuevas rutas de producto ni acciones fuera de alcance.
- Revisar consola y peticiones: sin errores de renderizado o recursos inesperados; el dataset no depende de una API.

Verificacion: ejecutar una vez TypeScript, lint completo y build final con las herramientas existentes. Con `cacheComponents`, confirmar que build valida los limites Suspense. Si funciona, servir la compilacion con `npm run start` y repetir el recorrido basico y la URL directa del Explorador y Detalle. Salida: criterios del contexto satisfechos y evidencia anotada.

### Herramientas y limites de verificacion

Ejecutar desde `nextjs-wanderlust-explorer/`, no desde la raiz del repositorio:

| Comprobacion | Comando o metodo |
| --- | --- |
| Desarrollo y pruebas manuales | `npm run dev`; usar el puerto libre que informe el servidor. |
| TypeScript | `./node_modules/.bin/tsc --noEmit`; si faltan tipos de rutas generados, consultar la guia instalada y usar `./node_modules/.bin/next typegen` cuando corresponda. |
| Lint focalizado | `./node_modules/.bin/eslint` seguido exclusivamente de las rutas de archivos tocados en esa fase. |
| Lint final | `npm run lint`, una vez al completar la integracion. |
| Build final | `npm run build`, una vez como gate final, no en cada fase. |
| Comprobacion de produccion | `npm run start` tras build correcto y recorrido manual focalizado. |

Si no existen los ejecutables locales, registrar el bloqueo sin descargarlos ni anadir dependencias. No interpretar una inspeccion visual como sustituto de TypeScript o build.

Ante un fallo, limitarse a dos intentos de correccion del mismo problema. Si persiste, detenerse e informar del error exacto, lo probado y la hipotesis; no entrar en un bucle build -> editar -> build. No corregir errores ajenos al alcance.

## 7. Registro y criterio de cierre

Para cada fase registrar: archivos afectados, caso o comando ejecutado, resultado esperado, resultado observado y bloqueos. Marcar cada comprobacion como pendiente, superada, fallida o bloqueada; no marcarla superada solo por haber escrito el codigo.

El prototipo se considerara terminado cuando cumpla todos los criterios de calidad de [context.md](../../context.md), las pruebas de las seis fases esten resueltas y los controles finales pasen o se documenten explicitamente como bloqueados. Un bloqueo no equivale a una verificacion superada.

En esta fase documental solo se crea esta especificacion. El dataset, los componentes, las rutas nuevas y las pruebas de la aplicacion quedan pendientes de implementacion y ejecucion.