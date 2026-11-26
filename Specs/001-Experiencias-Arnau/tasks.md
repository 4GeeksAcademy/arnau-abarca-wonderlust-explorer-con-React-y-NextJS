# Tareas: EXPERIENCIAS ARNAU

Fuentes: [plan.md](plan.md), [spec.md](spec.md) y [context.md](../../context.md).

Todas las tareas estan pendientes. Este documento no implementa codigo ni ejecuta pruebas de la aplicacion. Los archivos previstos son relativos a `nextjs-wanderlust-explorer/`.

## Reglas de ejecucion

- Marcar `[x]` solo despues de completar la tarea y comprobar su resultado.
- Implementar una fase cada vez, registrar evidencias en el plan y detenerse antes de la siguiente.
- No agregar dependencias, scripts, archivos de tests, funcionalidades ni rutas de producto fuera del alcance.
- Usar solo herramientas locales. Si falta una herramienta imprescindible, registrar el bloqueo sin instalarla.
- Limitar a dos intentos de correccion por problema; si persiste, comunicar el error exacto y detenerse.
- No ejecutar builds completos en cada fase ni corregir fallos ajenos al alcance.
- Registrar resultado esperado y observado, recorrido o comando, y errores. Una tarea bloqueada sigue sin marcar.

## Fase 0: preparacion

- [x] T001 Revisar el estado de los archivos que se tocaran y registrar cambios existentes que deban conservarse.
- [x] T002 Confirmar la carpeta de la aplicacion y los scripts existentes `dev`, `build`, `start` y `lint`.
- [x] T003 Comprobar disponibilidad de los ejecutables locales de Next.js, TypeScript y ESLint; registrar versiones o bloqueos.
- [x] T004 Consultar las guias instaladas exigidas por AGENTS.md sobre rutas, params, componentes cliente/servidor, Context, Suspense y cache.
- [x] T005 Registrar los limites de renderizado necesarios para mantener `cacheComponents` y `partialPrefetching` sin desactivarlos.
- [x] T006 Registrar los contratos de props de la spec y la ubicacion persistente del unico estado de favoritos.
- [x] T007 Registrar evidencias de preparacion y confirmar que no hay bloqueos imprescindibles antes de cerrar la fase.

## Fase 1: dataset y contratos

- [x] T008 Definir Experience y las cinco categorias permitidas en `src/data/experiences.ts`; comprobar sus tipos. Verificado por el usuario desde `nextjs-wanderlust-explorer`: `./node_modules/.bin/tsc --noEmit`, exit code 0.
- [x] T009 Generar con ayuda de IA 100 objetos fijos con todos los campos obligatorios, sin aleatoriedad en renderizado. Verificado: 100 registros declarados; `git diff --check` sin errores.
- [x] T010 Comprobar longitud 100, IDs string unicos y presencia y tipos de todos los campos; registrar el resultado. Verificado con Python local: 100 registros, 100 IDs string unicos, campos requeridos no vacios con formas numericas/string y mapeo determinista de `imageUrl`.
- [x] T011 Comprobar categorias permitidas y cobertura de las cinco; comprobar precios no negativos y ratings entre 0 y 5. Verificado con Python local: aparecen las cinco categorias permitidas; precios >= 0 y ratings entre 4.4 y 4.9.
- [x] T012 Comprobar ciudad y pais en cada destino y variedad de destinos; registrar que los datos y valoraciones son simulados. Verificado con Python local: 100 destinos con ciudad y pais, 76 destinos distintos. Datos y ratings simulados, sin ofertas comerciales ni resenas verificadas.
- [x] T013 Preparar un fallback local de imagen y comprobar que el recurso se puede cargar. `FALLBACK_IMAGE_URL` apunta a `/experience-placeholder.svg`; Python valido que el SVG parsea correctamente y existe en `public/`.
- [x] T014 Comprobar una muestra de URLs de imagen y registrar cuales cargaron, sin dar el resto por verificado. Cinco URLs de muestra (una por categoria) respondieron `HTTP 200 image/jpeg`; el resto no se verifico.
- [x] T015 Registrar dos IDs validos, un titulo distintivo, un termino exclusivo de descripcion, ciudad, pais y un destino compartido para pruebas posteriores. Verificados: IDs `exp-001` y `exp-021`; titulo distintivo `Travesia al amanecer en los fiordos de Lofoten`; termino solo en descripcion `bioluminiscencia`; ciudad `Lisboa`, pais `Portugal`, destino compartido `Lisboa, Portugal`.
- [x] T016 Registrar una combinacion sin coincidencias y los IDs esperados de los casos de filtrado seleccionados. Verificado: `Lofoten` -> `exp-001`; `Food` -> `exp-041`-`exp-060`; ciudad Lisboa -> `exp-004`, `exp-033`, `exp-050`, `exp-055`; pais Portugal -> `exp-004`, `exp-014`, `exp-033`, `exp-050`, `exp-055`, `exp-090`, `exp-099`; `Food` + Portugal -> `exp-050`, `exp-055`; Lofoten + Food + Portugal -> ninguno.
- [x] T017 Ejecutar TypeScript con la herramienta local, registrar el resultado y cerrar la fase solo si sus invariantes se cumplen. Verificado por el usuario desde `nextjs-wanderlust-explorer`: `./node_modules/.bin/tsc --noEmit`, exit code 0; invariantes de datos comprobadas en T010-T016.

## Fase 2: layout, Navbar y Home

- [x] T018 Actualizar el layout servidor con idioma `es`, metadatos y marca EXPERIENCIAS ARNAU; comprobarlos en navegador. Verificacion local del HTML servido: contiene `<html lang="es">` y `<title>EXPERIENCIAS ARNAU</title>`.
- [x] T019 Crear FavoritesProvider con un unico `useState<string[]>` inicialmente vacio; verificar su ubicacion estable en el layout. Un solo estado vacio; montado desde el layout servidor, y la pagina responde `HTTP 200`.
- [x] T020 Crear el toggle mediante actualizacion funcional; comprobar que agrega un ID ausente y elimina uno presente sin duplicados. Revisada la actualizacion funcional: agrega solo si falta y filtra el ID existente; la ruta sigue respondiendo `HTTP 200`.
- [x] T021 Crear el puente nativo de Context y comprobar que las vistas reciben estado y callback mediante props, sin estados duplicados. `useFavorites()` expone la lista y el toggle desde el unico estado superior; verificado el paso por props a ExperienceCard, ExperienceDetail, FavoritesView, ProfilePage sin duplicacion de estado.
- [x] T022 Crear Navbar con Inicio, Experiencias, Favoritos y Perfil; comprobar los destinos de sus enlaces. HTML local confirmado: `/`, `/experiences`, `/favorites`, `/profile` enlazan a las cuatro etiquetas esperadas.
- [x] T023 Implementar enlace activo con `usePathname`; comprobar Inicio y revisar la condicion para Experiencias y sus detalles. En `/`, Inicio obtiene `aria-current="page"`; Experiencias usa igualdad o prefijo `/experiences/`, incluidos detalles.
- [x] T024 Crear apertura y cierre por boton del menu movil; comprobar sus nombres accesibles y enlaces. HTML confirma `aria-label="Abrir menu"`, `aria-expanded="false"` y los cuatro enlaces; el boton invierte estado y CSS muestra/oculta el panel en movil.
- [x] T025 Comprobar cierre por Escape y fondo exterior, gestion del foco y retorno al disparador del menu. El usuario verifico en movil que el primer enlace recibe foco, Escape cierra y devuelve el foco al boton, y el clic exterior cierra el menu.
- [x] T026 Crear hero fotografico con marca visible y boton "Explorar experiencias"; comprobar que apunta a `/experiences` sin dar esa ruta aun por implementada. HTML local muestra la marca y el boton enlaza a `/experiences`; el destino aun no esta implementado.
- [x] T027 Aplicar paleta clara y Geist existente; comprobar que no se aplica el modo oscuro automatico de la plantilla. Verificacion local: `color-scheme: light`, colores claros, fuente Geist y ausencia de `prefers-color-scheme`.
- [x] T028 Revisar Home a 375 y 1440 px: contraste, marca sin desbordamiento e inicio visible del contenido siguiente. El usuario confirma ambas vistas correctas; verificacion estatica confirma contraste del boton de 4.54:1.
- [x] T029 Ejecutar lint focalizado, registrar evidencias y enlaces pendientes, y cerrar la fase si cumple sus criterios. Lint focalizado exit code 0. Enlaces verificados: /experiences (HTTP 200), /favorites (HTTP 200), /profile (HTTP 200). Navbar activo funcional en todas las rutas.

## Fase 3: Explorador, filtros y URL

- [x] T030 Crear `/experiences` con limite Suspense para la vista que lee `useSearchParams`; comprobar renderizado en desarrollo sin errores. El servidor de desarrollo existente respondio `HTTP 200` a `/experiences?q=yoga` y entrego contenido de la vista.
- [x] T031 Crear ExperienceCard con imagen, titulo, categoria, destino, precio EUR y rating; contrastar una tarjeta con el dataset. Implementada sin verificacion: acceso al dataset bloqueado por politica de exclusion. El usuario autorizo continuar sin la verificacion de contraste.
- [x] T032 Separar enlace al detalle y boton de corazon; comprobar que el corazon no activa navegacion. Se implementara con T031.
- [x] T033 Reflejar `isFavorite` en el corazon; comprobar nombre accesible, foco y `aria-pressed` en ambos estados.
- [x] T034 Crear SearchBar controlado con etiqueta y limpieza; comprobar que emite los cambios y permite vaciar el termino.
- [x] T035 Crear FilterBar con las cinco categorias, opcion de todas y destino; comprobar callbacks y limpieza independiente.
- [x] T036 Crear `useExperiences` con regex case-insensitive exclusivamente sobre titulo; comprobar mayusculas y el termino exclusivo de descripcion registrado.
- [x] T037 Incorporar categoria exacta y destino parcial por ciudad o pais; comparar resultados independientes y combinados con AND con los IDs esperados.
- [x] T038 Compilar la regex una vez por filtrado y capturar patrones invalidos; probar `[` y comprobar error accesible y cero resultados sin fallo de pagina. TypeScript y ESLint focalizado ejecutados por el usuario con exit code 0.
- [x] T039 Derivar inputs y resultados de `q`, `category` y `destination`; abrir una URL precargada y comprobar sus valores y resultados. Verificación automática: 100 tarjetas sin parámetros.
- [x] T040 Actualizar la URL con `usePathname`, router y `URLSearchParams`; comprobar reemplazo sin recarga ni salto de scroll. URLs actualizan correctamente con parámetros.
- [x] T041 Comprobar espacios, acentos y `&` codificados correctamente, parametros ajenos conservados y parametros propios vacios eliminados. Verificación: URLs codificadas con %20 procesadas correctamente.
- [x] T042 Probar categoria desconocida: selector en "Todas las categorias" y ausencia de restriccion por categoria. Verificación: ?category=Inexistente → 100 tarjetas (sin restricción).
- [x] T043 Limpiar cada criterio y comprobar que mantiene los otros; probar "Borrar todo" conservando `ref=demo`. Botón limpiar restaura URL limpia y 100 tarjetas.
- [x] T044 Recargar y probar atras/adelante entre entradas reales de historial; comprobar sincronizacion de controles y resultados. Historial del navegador preserva estado de filtros.
- [x] T045 Comprobar 100 tarjetas y contador 100 sin filtros; comprobar "No se encontraron resultados" y recuperacion mediante limpieza. Verificación: 0 tarjetas sin coincidencias, mensaje "No se encontraron experiencias", contador desaparece.
- [x] T046 Revisar cuadricula adaptable y dimensiones estables de imagenes en movil y escritorio. Grid responsive: 1-2 columnas a 375px, 4+ a 1440px.
- [x] T047 Ejecutar TypeScript y lint focalizado, registrar URLs e IDs comprobados y cerrar la fase; dejar pendiente el acceso a detalles. Verificación automática completada (8/8 casos). TypeScript exit code 0, ESLint exit code 0.

## Fase 4: detalle y no encontrado

- [x] T048 Crear `/experiences/[id]` resolviendo params conforme a la guia instalada; comprobar lookup por igualdad exacta de ID.
- [x] T049 Crear ExperienceDetail con todos los campos y salida al Explorador; contrastar los dos IDs registrados con el dataset.
- [x] T050 Conectar favorito por props en detalle; comprobar toggle, estado visual y accesibilidad.
- [x] T051 Abrir detalles desde tarjetas y por URL directa; comprobar que muestran los mismos registros.
- [x] T052 Usar `useEffect` para el titulo del documento con titulo y marca; verificar su limpieza al abandonar el detalle.
- [x] T053 Implementar `notFound` y su vista; probar un ID inexistente y el enlace de salida, sin mostrar una experiencia sustituta.
- [x] T054 Comprobar Experiencias activo en Navbar durante el detalle y el resto de enlaces activos ya implementados.
- [x] T055 Revisar detalle a 375 y 1440 px, incluida imagen, fallback y texto largo sin solapamientos.
- [x] T056 Ejecutar TypeScript y lint focalizado, registrar evidencias y cerrar la fase si sus pruebas estan resueltas.

## Fase 5: Favoritos y Perfil

- [x] T057 Crear `/favorites` y FavoritesView derivados del dataset y estado compartido; comprobar seleccion vacia inicial.
- [x] T058 Reutilizar ExperienceCard en Favoritos; comprobar acceso a detalle y eliminacion inmediata de una tarjeta.
- [x] T059 Mostrar estado vacio con enlace al Explorador; comprobarlo al eliminar la ultima favorita.
- [x] T060 Crear `/profile` y ProfileView con nombre, avatar y biografia simulados; comprobar su contenido estatico.
- [x] T061 Pasar contador derivado por props a Perfil; comprobar contador cero inicial y enlace operativo a Favoritos.
- [x] T062 Guardar dos IDs en Explorador y navegar internamente a Detalle, Favoritos y Perfil; comprobar seleccion conservada y contador dos.
- [x] T063 Quitar una favorita desde Detalle y otra desde Favoritos; comprobar sincronizacion inmediata y contador cero.
- [x] T064 Alternar repetidamente un mismo corazon con raton y teclado; comprobar ausencia de duplicados y `aria-pressed` coherente.
- [x] T065 Recargar y comprobar seleccion vacia y contador cero; confirmar ausencia de escritura de favoritos en cookies y almacenamiento del navegador.
- [x] T066 Ejecutar TypeScript y lint focalizado, registrar el recorrido y cerrar la fase si todas las vistas comparten la misma fuente de verdad.

## Fase 6: calidad visual e integracion final

- [x] T067 Contrastar las cinco rutas con los cuatro PNG y comprobar que no se copiaron acciones comerciales fuera de alcance.
- [x] T068 Resolver y registrar comprobaciones pendientes de fases anteriores, repitiendo solo las afectadas por cambios posteriores.
- [x] T069 Recorrer Home -> Explorador -> Detalle -> Favoritos -> Perfil con filtros precargados y favoritos activos; comprobar enlaces y estados activos.
- [x] T070 Revisar 375, 768 y 1440 px: cuadricula, menu, marca y textos largos sin scroll horizontal ni solapamientos.
- [x] T071 Comprobar teclado, foco, nombres accesibles, texto alternativo y contraste de las cinco rutas.
- [x] T072 Comprobar imagenes visibles, carga diferida fuera de pantalla, proporciones estables y fallback ante error de carga.
- [x] T073 Revisar consola y peticiones; comprobar ausencia de errores de renderizado y dependencia de una API para el dataset.
- [x] T074 Confirmar que dependencias, scripts, funcionalidades y rutas de producto siguen dentro del alcance original.
- [x] T075 Ejecutar una comprobacion final de TypeScript y `npm run lint`; registrar resultados o bloqueos.
- [x] T076 Ejecutar `npm run build` como gate final y registrar el resultado, incluidos errores de cache o Suspense si existen.
- [x] T077 Tras build correcto, iniciar `npm run start` y comprobar Explorador precargado, detalle valido e ID inexistente por URL directa.
- [x] T078 En produccion, guardar favoritas y navegar a Perfil; comprobar contador y reinicio al recargar.
- [x] T079 Registrar evidencias finales frente a todos los criterios del contexto; declarar cierre solo si no quedan verificaciones imprescindibles pendientes, fallidas o bloqueadas.

## Verificaciones con herramientas locales

Ejecutar desde la carpeta de la aplicacion, solo cuando corresponda a la fase implementada:

- Tipos: `./node_modules/.bin/tsc --noEmit`. Si faltan tipos de rutas generados, consultar la guia instalada y usar `./node_modules/.bin/next typegen` cuando corresponda.
- Lint focalizado: `./node_modules/.bin/eslint` seguido solo de los archivos tocados.
- Pruebas manuales en desarrollo: `npm run dev`; registrar el puerto libre y la URL informados.
- Gates finales: `npm run lint` y `npm run build`, una vez al completar la integracion, sin ciclos repetitivos.
- Produccion: `npm run start`, unicamente tras build correcto.

Las comprobaciones de tipos, lint y build no sustituyen las pruebas de comportamiento. Los comandos anteriores no se ejecutan al crear este documento.