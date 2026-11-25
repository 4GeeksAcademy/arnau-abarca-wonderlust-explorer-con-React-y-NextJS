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

- [ ] T001 Revisar el estado de los archivos que se tocaran y registrar cambios existentes que deban conservarse.
- [ ] T002 Confirmar la carpeta de la aplicacion y los scripts existentes `dev`, `build`, `start` y `lint`.
- [ ] T003 Comprobar disponibilidad de los ejecutables locales de Next.js, TypeScript y ESLint; registrar versiones o bloqueos.
- [ ] T004 Consultar las guias instaladas exigidas por AGENTS.md sobre rutas, params, componentes cliente/servidor, Context, Suspense y cache.
- [ ] T005 Registrar los limites de renderizado necesarios para mantener `cacheComponents` y `partialPrefetching` sin desactivarlos.
- [ ] T006 Registrar los contratos de props de la spec y la ubicacion persistente del unico estado de favoritos.
- [ ] T007 Registrar evidencias de preparacion y confirmar que no hay bloqueos imprescindibles antes de cerrar la fase.

## Fase 1: dataset y contratos

- [ ] T008 Definir Experience y las cinco categorias permitidas en `src/data/experiences.ts`; comprobar sus tipos.
- [ ] T009 Generar con ayuda de IA 100 objetos fijos con todos los campos obligatorios, sin aleatoriedad en renderizado.
- [ ] T010 Comprobar longitud 100, IDs string unicos y presencia y tipos de todos los campos; registrar el resultado.
- [ ] T011 Comprobar categorias permitidas y cobertura de las cinco; comprobar precios no negativos y ratings entre 0 y 5.
- [ ] T012 Comprobar ciudad y pais en cada destino y variedad de destinos; registrar que los datos y valoraciones son simulados.
- [ ] T013 Preparar un fallback local de imagen y comprobar que el recurso se puede cargar.
- [ ] T014 Comprobar una muestra de URLs de imagen y registrar cuales cargaron, sin dar el resto por verificado.
- [ ] T015 Registrar dos IDs validos, un titulo distintivo, un termino exclusivo de descripcion, ciudad, pais y un destino compartido para pruebas posteriores.
- [ ] T016 Registrar una combinacion sin coincidencias y los IDs esperados de los casos de filtrado seleccionados.
- [ ] T017 Ejecutar TypeScript con la herramienta local, registrar el resultado y cerrar la fase solo si sus invariantes se cumplen.

## Fase 2: layout, Navbar y Home

- [ ] T018 Actualizar el layout servidor con idioma `es`, metadatos y marca EXPERIENCIAS ARNAU; comprobarlos en navegador.
- [ ] T019 Crear FavoritesProvider con un unico `useState<string[]>` inicialmente vacio; verificar su ubicacion estable en el layout.
- [ ] T020 Crear el toggle mediante actualizacion funcional; comprobar que agrega un ID ausente y elimina uno presente sin duplicados.
- [ ] T021 Crear el puente nativo de Context y comprobar que las vistas reciben estado y callback mediante props, sin estados duplicados.
- [ ] T022 Crear Navbar con Inicio, Experiencias, Favoritos y Perfil; comprobar los destinos de sus enlaces.
- [ ] T023 Implementar enlace activo con `usePathname`; comprobar Inicio y revisar la condicion para Experiencias y sus detalles.
- [ ] T024 Crear apertura y cierre por boton del menu movil; comprobar sus nombres accesibles y enlaces.
- [ ] T025 Comprobar cierre por Escape y fondo exterior, gestion del foco y retorno al disparador del menu.
- [ ] T026 Crear hero fotografico con marca visible y boton "Explorar experiencias"; comprobar que apunta a `/experiences` sin dar esa ruta aun por implementada.
- [ ] T027 Aplicar paleta clara y Geist existente; comprobar que no se aplica el modo oscuro automatico de la plantilla.
- [ ] T028 Revisar Home a 375 y 1440 px: contraste, marca sin desbordamiento e inicio visible del contenido siguiente.
- [ ] T029 Ejecutar lint focalizado, registrar evidencias y enlaces pendientes, y cerrar la fase si cumple sus criterios.

## Fase 3: Explorador, filtros y URL

- [ ] T030 Crear `/experiences` con limite Suspense para la vista que lee `useSearchParams`; comprobar renderizado en desarrollo sin errores.
- [ ] T031 Crear ExperienceCard con imagen, titulo, categoria, destino, precio EUR y rating; contrastar una tarjeta con el dataset.
- [ ] T032 Separar enlace al detalle y boton de corazon; comprobar que el corazon no activa navegacion.
- [ ] T033 Reflejar `isFavorite` en el corazon; comprobar nombre accesible, foco y `aria-pressed` en ambos estados.
- [ ] T034 Crear SearchBar controlado con etiqueta y limpieza; comprobar que emite los cambios y permite vaciar el termino.
- [ ] T035 Crear FilterBar con las cinco categorias, opcion de todas y destino; comprobar callbacks y limpieza independiente.
- [ ] T036 Crear `useExperiences` con regex case-insensitive exclusivamente sobre titulo; comprobar mayusculas y el termino exclusivo de descripcion registrado.
- [ ] T037 Incorporar categoria exacta y destino parcial por ciudad o pais; comparar resultados independientes y combinados con AND con los IDs esperados.
- [ ] T038 Compilar la regex una vez por filtrado y capturar patrones invalidos; probar `[` y comprobar error accesible y cero resultados sin fallo de pagina.
- [ ] T039 Derivar inputs y resultados de `q`, `category` y `destination`; abrir una URL precargada y comprobar sus valores y resultados.
- [ ] T040 Actualizar la URL con `usePathname`, router y `URLSearchParams`; comprobar reemplazo sin recarga ni salto de scroll.
- [ ] T041 Comprobar espacios, acentos y `&` codificados correctamente, parametros ajenos conservados y parametros propios vacios eliminados.
- [ ] T042 Probar categoria desconocida: selector en "Todas las categorias" y ausencia de restriccion por categoria.
- [ ] T043 Limpiar cada criterio y comprobar que mantiene los otros; probar "Borrar todo" conservando `ref=demo`.
- [ ] T044 Recargar y probar atras/adelante entre entradas reales de historial; comprobar sincronizacion de controles y resultados.
- [ ] T045 Comprobar 100 tarjetas y contador 100 sin filtros; comprobar "No se encontraron resultados" y recuperacion mediante limpieza.
- [ ] T046 Revisar cuadricula adaptable y dimensiones estables de imagenes en movil y escritorio.
- [ ] T047 Ejecutar TypeScript y lint focalizado, registrar URLs e IDs comprobados y cerrar la fase; dejar pendiente el acceso a detalles.

## Fase 4: detalle y no encontrado

- [ ] T048 Crear `/experiences/[id]` resolviendo params conforme a la guia instalada; comprobar lookup por igualdad exacta de ID.
- [ ] T049 Crear ExperienceDetail con todos los campos y salida al Explorador; contrastar los dos IDs registrados con el dataset.
- [ ] T050 Conectar favorito por props en detalle; comprobar toggle, estado visual y accesibilidad.
- [ ] T051 Abrir detalles desde tarjetas y por URL directa; comprobar que muestran los mismos registros.
- [ ] T052 Usar `useEffect` para el titulo del documento con titulo y marca; verificar su limpieza al abandonar el detalle.
- [ ] T053 Implementar `notFound` y su vista; probar un ID inexistente y el enlace de salida, sin mostrar una experiencia sustituta.
- [ ] T054 Comprobar Experiencias activo en Navbar durante el detalle y el resto de enlaces activos ya implementados.
- [ ] T055 Revisar detalle a 375 y 1440 px, incluida imagen, fallback y texto largo sin solapamientos.
- [ ] T056 Ejecutar TypeScript y lint focalizado, registrar evidencias y cerrar la fase si sus pruebas estan resueltas.

## Fase 5: Favoritos y Perfil

- [ ] T057 Crear `/favorites` y FavoritesView derivados del dataset y estado compartido; comprobar seleccion vacia inicial.
- [ ] T058 Reutilizar ExperienceCard en Favoritos; comprobar acceso a detalle y eliminacion inmediata de una tarjeta.
- [ ] T059 Mostrar estado vacio con enlace al Explorador; comprobarlo al eliminar la ultima favorita.
- [ ] T060 Crear `/profile` y ProfileView con nombre, avatar y biografia simulados; comprobar su contenido estatico.
- [ ] T061 Pasar contador derivado por props a Perfil; comprobar contador cero inicial y enlace operativo a Favoritos.
- [ ] T062 Guardar dos IDs en Explorador y navegar internamente a Detalle, Favoritos y Perfil; comprobar seleccion conservada y contador dos.
- [ ] T063 Quitar una favorita desde Detalle y otra desde Favoritos; comprobar sincronizacion inmediata y contador cero.
- [ ] T064 Alternar repetidamente un mismo corazon con raton y teclado; comprobar ausencia de duplicados y `aria-pressed` coherente.
- [ ] T065 Recargar y comprobar seleccion vacia y contador cero; confirmar ausencia de escritura de favoritos en cookies y almacenamiento del navegador.
- [ ] T066 Ejecutar TypeScript y lint focalizado, registrar el recorrido y cerrar la fase si todas las vistas comparten la misma fuente de verdad.

## Fase 6: calidad visual e integracion final

- [ ] T067 Contrastar las cinco rutas con los cuatro PNG y comprobar que no se copiaron acciones comerciales fuera de alcance.
- [ ] T068 Resolver y registrar comprobaciones pendientes de fases anteriores, repitiendo solo las afectadas por cambios posteriores.
- [ ] T069 Recorrer Home -> Explorador -> Detalle -> Favoritos -> Perfil con filtros precargados y favoritos activos; comprobar enlaces y estados activos.
- [ ] T070 Revisar 375, 768 y 1440 px: cuadricula, menu, marca y textos largos sin scroll horizontal ni solapamientos.
- [ ] T071 Comprobar teclado, foco, nombres accesibles, texto alternativo y contraste de las cinco rutas.
- [ ] T072 Comprobar imagenes visibles, carga diferida fuera de pantalla, proporciones estables y fallback ante error de carga.
- [ ] T073 Revisar consola y peticiones; comprobar ausencia de errores de renderizado y dependencia de una API para el dataset.
- [ ] T074 Confirmar que dependencias, scripts, funcionalidades y rutas de producto siguen dentro del alcance original.
- [ ] T075 Ejecutar una comprobacion final de TypeScript y `npm run lint`; registrar resultados o bloqueos.
- [ ] T076 Ejecutar `npm run build` como gate final y registrar el resultado, incluidos errores de cache o Suspense si existen.
- [ ] T077 Tras build correcto, iniciar `npm run start` y comprobar Explorador precargado, detalle valido e ID inexistente por URL directa.
- [ ] T078 En produccion, guardar favoritas y navegar a Perfil; comprobar contador y reinicio al recargar.
- [ ] T079 Registrar evidencias finales frente a todos los criterios del contexto; declarar cierre solo si no quedan verificaciones imprescindibles pendientes, fallidas o bloqueadas.

## Verificaciones con herramientas locales

Ejecutar desde la carpeta de la aplicacion, solo cuando corresponda a la fase implementada:

- Tipos: `./node_modules/.bin/tsc --noEmit`. Si faltan tipos de rutas generados, consultar la guia instalada y usar `./node_modules/.bin/next typegen` cuando corresponda.
- Lint focalizado: `./node_modules/.bin/eslint` seguido solo de los archivos tocados.
- Pruebas manuales en desarrollo: `npm run dev`; registrar el puerto libre y la URL informados.
- Gates finales: `npm run lint` y `npm run build`, una vez al completar la integracion, sin ciclos repetitivos.
- Produccion: `npm run start`, unicamente tras build correcto.

Las comprobaciones de tipos, lint y build no sustituyen las pruebas de comportamiento. Los comandos anteriores no se ejecutan al crear este documento.