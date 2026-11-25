# Plan de implementacion: EXPERIENCIAS ARNAU

## Fuentes y alcance

Este plan desarrolla [spec.md](spec.md) y respeta [context.md](../../context.md). Todas las fases estan **pendientes**. Crear el plan no implica implementar codigo, generar el dataset ni ejecutar pruebas de la aplicacion.

La aplicacion vive en `nextjs-wanderlust-explorer/`. Las ubicaciones propuestas mas abajo son relativas a esa carpeta. Los documentos permanecen en `Specs/001-Experiencias-Arnau/`.

Entregable futuro: plataforma en Next.js, React, TypeScript y Tailwind con 100 experiencias locales, filtros en URL, detalle, favoritos en memoria y perfil simulado. Solo se implementaran `/`, `/experiences`, `/experiences/[id]`, `/favorites` y `/profile`.

No agregar dependencias, scripts, rutas de producto o funcionalidades nuevas. No incluir backend, autenticacion, persistencia, reservas, pagos, mensajeria, fechas, regalos, descuentos, resenas verificadas, ordenacion avanzada ni carruseles. `not-found.tsx` sera un estado del enrutamiento, no otra pagina de producto.

## Metodo de trabajo

- Trabajar una fase cada vez y detenerse despues de registrar su resultado. No continuar automaticamente a la siguiente.
- Leer solo las guias y los archivos necesarios para la tarea actual; conservar cambios previos del usuario.
- Hacer el menor cambio que complete la tarea y verificarlo antes de ampliar el alcance.
- Usar las herramientas ya instaladas. No instalar iconos, runners de pruebas ni otras dependencias.
- Las pruebas descritas son casos manuales y comprobaciones puntuales; no crear archivos de tests automatizados como parte de este plan.
- Ante un problema, permitir como maximo dos intentos de correccion. Si persiste, detenerse e informar del error exacto, lo probado y la hipotesis.
- No repetir builds completos por fase ni corregir fallos ajenos al alcance.

## Tecnologias por fase: guia pedagogica

Esta seccion explica que herramienta usaremos, para que sirve en cada fase y que aprenderas al aplicarla. No introduce nuevas dependencias ni tareas: acompana las fases ya previstas.

| Fase | Tecnologias y objetivo tecnico | Objetivo de aprendizaje |
| --- | --- | --- |
| 0: preparacion | Node.js y npm para ejecutar las herramientas existentes; documentacion local de Next.js 16 para confirmar sus APIs; TypeScript y ESLint para comprobar disponibilidad del entorno. | Diferenciar el entorno de ejecucion, el gestor de paquetes y el framework. Entender por que se consulta la version instalada antes de asumir una API. |
| 1: dataset y contratos | TypeScript para el tipo Experience, las categorias como union de literales y los contratos de props. Arrays y objetos de JavaScript para el dataset local. Comprobaciones puntuales para cantidad, unicidad y rangos. | Modelar datos antes de construir la interfaz. Distinguir errores de tipos de errores en los valores: TypeScript no garantiza por si solo 100 objetos, IDs unicos o ratings entre 0 y 5. |
| 2: layout, Navbar y Home | Next.js App Router para el layout, la Home y los enlaces internos; `usePathname` para el enlace activo. React con `useState` y Context para favoritos compartidos y estado del menu. Tailwind CSS y las fuentes existentes para estilos y responsividad; HTML semantico para accesibilidad. | Comprender componentes servidor frente a cliente, composicion mediante `children`, estado elevado y un proveedor persistente. Reconocer que Context transporta el estado, pero no lo persiste, y que Tailwind controla el aspecto, no el comportamiento. |
| 3: Explorador y filtros | React para componentes controlados y el custom hook `useExperiences`. Next.js con `useSearchParams`, `usePathname`, router y Suspense para leer y actualizar la URL. `URLSearchParams` para codificacion; `RegExp` y operaciones de arrays para filtrado. Tailwind para cuadricula adaptable. | Usar la URL como fuente de verdad, separar logica y presentacion, derivar resultados sin duplicar estado y combinar criterios con AND. Entender que un hook reutiliza logica y que Suspense delimita contenido que puede esperar durante el renderizado. |
| 4: detalle y no encontrado | Next.js para la ruta dinamica, resolucion de `params` y `notFound`. TypeScript y busqueda en el array local para identificar la experiencia. React con `useEffect` y la API del navegador `document.title` para el titulo y su limpieza. | Relacionar un segmento de URL con un registro local, manejar recursos inexistentes y distinguir renderizado de efectos secundarios. Entender por que acceder al documento pertenece al cliente. |
| 5: Favoritos y Perfil | React con el `useState` superior, actualizaciones funcionales, puente de Context y props a vistas y tarjetas. Operaciones de arrays para derivar favoritas y contador. Next.js para navegar sin recargar entre las rutas. | Mantener una unica fuente de verdad, evitar duplicados y sincronizar varias vistas sin copiar el estado. Distinguir memoria del componente de almacenamiento persistente y comprender por que una recarga elimina la seleccion. |
| 6: integracion final | TypeScript para comprobacion estatica, ESLint para reglas de codigo y Next.js para build y servidor de produccion. Navegador para recorridos manuales, consola, teclado y viewports; Tailwind y HTML para ajustes visuales y accesibles necesarios. | Diferenciar verificacion de tipos, lint, compilacion y pruebas de comportamiento. Comprender que un build correcto no demuestra por si solo que filtros, favoritos o accesibilidad funcionen. |

### Como se complementan

- **TypeScript** describe la forma de los datos y las props antes de ejecutar la aplicacion; no valida automaticamente todos los valores en tiempo de ejecucion.
- **React** compone la interfaz y gestiona sus cambios mediante estado, props y hooks; el custom hook encapsula filtrado, no crea otra fuente de datos.
- **Next.js** organiza rutas y coordina renderizado servidor/cliente, navegacion y compilacion; usarlo no obliga a crear un backend para este prototipo.
- **Tailwind CSS** aplica estilos y reglas responsivas; la navegacion por teclado y los nombres accesibles dependen tambien del HTML y de la logica de interaccion.
- **APIs de JavaScript y del navegador** resuelven regex, arrays, parametros de URL y titulo del documento sin instalar librerias adicionales.
- **Pruebas manuales y herramientas locales** aportan evidencias distintas y complementarias. No se anadira un framework de tests ni se confundira una comprobacion de tipos con una prueba funcional.

Al cerrar cada fase, relaciona su evidencia con el aprendizaje: que concepto aplicaste, que caso lo comprueba y que limites tiene esa comprobacion. Por ejemplo, en fase 5, guardar dos experiencias y navegar a Perfil comprueba estado compartido; recargar y observar contador cero comprueba la ausencia de persistencia.

## Fase 0: preparacion

Estado: pendiente. Dependencias: ninguna.

Tareas:
1. Confirmar la estructura actual y los cambios existentes en los archivos que se vayan a tocar, sin revertirlos.
2. Comprobar la disponibilidad local de Next.js, TypeScript y ESLint y los scripts existentes: `dev`, `build`, `start` y `lint`.
3. Consultar las guias relevantes en `node_modules/next/dist/docs/`, segun `AGENTS.md`, antes de escribir codigo: App Router, parametros dinamicos, componentes cliente, contexto, Suspense y cache.
4. Confirmar los limites de renderizado necesarios con `cacheComponents` y `partialPrefetching`, manteniendo la configuracion actual.
5. Fijar los contratos de props indicados en la spec y el puente nativo de React para el unico estado superior de favoritos.

Verificaciones:
- Los ejecutables locales existen y las guias necesarias estan disponibles.
- Las cinco rutas y los archivos propuestos corresponden a la carpeta de la aplicacion, no a la raiz del repositorio.
- Ninguna tarea exige instalar paquetes o desactivar opciones de cache.

Criterio de salida: herramientas y convenciones confirmadas; decisiones de limites cliente/servidor documentadas. Si faltan herramientas o guias imprescindibles, registrar el bloqueo, sin descargarlas ni dar la fase por superada.

## Fase 1: dataset y contratos

Estado: pendiente. Dependencias: fase 0 superada.

Archivos previstos: `src/data/experiences.ts`. Definir los contratos de los componentes sin crear archivos vacios de interfaz.

Tareas:
1. Definir el tipo Experience y los cinco literales de categoria: Adventure, Culture, Food, Wellness y Nature.
2. Generar con ayuda de IA un array fijo de exactamente 100 objetos, con IDs string unicos y estables.
3. Incluir titulo, descripcion completa, categoria, destino con ciudad y pais, precio numerico no negativo, rating entre 0 y 5 e imageUrl funcional en cada objeto.
4. Cubrir las cinco categorias y destinos variados. Mantener datos y valoraciones explicitamente simulados y precios previstos en EUR.
5. Seleccionar recursos fotograficos o placeholders funcionales y un fallback local necesario. No utilizar aleatoriedad en renderizado.
6. Registrar casos reales del dataset para posteriores pruebas: titulo distintivo, termino exclusivo de descripcion, ciudad y pais, destino compartido, dos IDs validos y una combinacion sin coincidencias.

Pruebas y verificaciones:
- Comprobar longitud 100, unicidad de IDs, presencia y tipos de todos los campos.
- Comprobar categorias permitidas, cobertura de las cinco, rangos numericos y formato de destino.
- Comprobar una muestra de imagenes y el fallback; distinguir una URL bien formada de una imagen que realmente carga.
- Ejecutar el control local de TypeScript. No instalar un runner para validar el dataset.

Criterio de salida: dataset fijo y tipado que cumple las invariantes. Registrar IDs y resultados esperados de los casos elegidos. No marcar como verificadas las imagenes que no se hayan comprobado.

## Fase 2: layout, Navbar y Home

Estado: pendiente. Dependencias: fases 0 y 1 superadas.

Archivos previstos: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/components/FavoritesProvider.tsx`, `src/components/Navbar.tsx` y recursos locales necesarios en `public/`.

Tareas:
1. Mantener el layout servidor; actualizar idioma a `es`, metadatos y marca EXPERIENCIAS ARNAU.
2. Montar una envoltura cliente persistente con un unico `useState<string[]>` inicialmente vacio y actualizacion funcional de toggle, sin almacenamiento.
3. Establecer el contexto nativo de React como puente a contenedores de ruta. Las vistas y tarjetas recibiran los valores por props; no tendran otro estado de favoritos.
4. Crear Navbar con Inicio, Experiencias, Favoritos y Perfil; determinar el enlace activo mediante `usePathname`, incluyendo Experiencias en el detalle.
5. Implementar menu lateral movil con cierre mediante boton, Escape y fondo exterior, con gestion del foco.
6. Sustituir la Home de plantilla por un hero fotografico, marca visible, texto breve y boton "Explorar experiencias" hacia `/experiences`.
7. Aplicar la paleta clara del contexto y la fuente Geist existente, sin modo oscuro automatico, desbordamientos ni nuevas dependencias de iconos.

Pruebas y verificaciones:
- Revisar Home a 375 y 1440 px: fotografia, contraste, marca legible y comienzo visible de la seccion siguiente.
- Comprobar destino del boton y los cuatro enlaces; no afirmar que las rutas pendientes ya funcionan.
- Probar menu y controles mediante teclado: foco visible, cierre y retorno al disparador.
- Ejecutar lint focalizado sobre los archivos tocados y revisar posibles errores de limites cliente/servidor durante desarrollo.

Criterio de salida: Home y estructura comun funcionales y accesibles. La conservacion de favoritos entre rutas queda pendiente de la fase 5; los enlaces hacia paginas aun no implementadas quedan pendientes de comprobacion funcional.

## Fase 3: Explorador, filtros y URL

Estado: pendiente. Dependencias: fases 1 y 2 superadas.

Archivos previstos: `src/app/experiences/page.tsx`, `src/components/ExperiencesExplorer.tsx`, `src/components/ExperienceCard.tsx`, `src/components/SearchBar.tsx`, `src/components/FilterBar.tsx` y `src/hooks/useExperiences.ts`.

Tareas:
1. Crear la entrada de ruta con Suspense para el contenido dependiente de `useSearchParams`, sin desactivar la configuracion de cache.
2. Implementar los contratos de tarjeta, busqueda y filtros; separar el enlace al detalle del boton de corazon.
3. Mostrar las 100 tarjetas sin criterios, con fotografia, titulo, categoria, destino, precio, rating y favorito recibido por props.
4. Encapsular en `useExperiences` la regex case-insensitive sobre titulo, categoria exacta y destino parcial sin distinguir mayusculas; combinarlos con AND.
5. Compilar la regex una vez por filtrado. Capturar patrones invalidos, devolver cero resultados y mostrar un error accesible sin romper la vista.
6. Leer `q`, `category` y `destination` desde la URL y derivar de ella los controles y resultados. Una categoria desconocida no restringe la lista.
7. Actualizar la URL con `usePathname`, el router y `URLSearchParams`, mediante reemplazo sin recarga ni salto de scroll. Conservar parametros ajenos y eliminar los propios vacios.
8. Permitir limpiar criterios individualmente y con "Borrar todo"; mostrar contador y "No se encontraron resultados" cuando corresponda.
9. Adaptar cuadricula y controles a movil y escritorio, con imagenes de dimensiones estables.

Pruebas y verificaciones:
- Sin query params: contador 100 y 100 tarjetas renderizadas.
- Probar casos de fase 1: mayusculas en titulo, termino exclusivo de descripcion, ciudad, pais y combinacion de los tres criterios; comparar IDs con resultados esperados.
- Probar una regex valida y `[`: error controlado, termino preservado y controles operativos.
- Abrir una URL precargada y recargar: inputs y resultados coinciden con sus parametros.
- Probar espacios, acentos y `&`, categoria desconocida y limpieza conservando `ref=demo`.
- Verificar atras/adelante entre entradas reales del historial; no esperar una entrada por pulsacion de tecla si se usa reemplazo.
- Probar la combinacion sin resultados y recuperar los 100 mediante limpieza.
- Ejecutar TypeScript y lint focalizado; revisar Suspense en desarrollo. La validacion de produccion queda para fase 6.

Criterio de salida: filtros independientes y combinados correctos, URL reproducible y estados de error/vacio accesibles. La navegacion a detalles queda pendiente hasta fase 4.

## Fase 4: detalle y no encontrado

Estado: pendiente. Dependencias: fases 1 a 3 superadas.

Archivos previstos: `src/app/experiences/[id]/page.tsx`, `src/app/not-found.tsx` y `src/components/ExperienceDetail.tsx`.

Tareas:
1. Resolver el ID con la API de parametros dinamicos de la version instalada, sin asumir parametros sincronos.
2. Buscar la experiencia por igualdad exacta de ID en el dataset local; usar `notFound` si no existe.
3. Mostrar fotografia, titulo, descripcion completa, categoria, destino, EUR y valoracion; incluir favorito y salida al Explorador.
4. Pasar estado y toggle por props desde el contenedor conectado al puente compartido.
5. Usar `useEffect` para actualizar el titulo del documento con titulo y marca, con limpieza apropiada al abandonar el detalle.
6. Crear el estado de no encontrado con enlace operativo al Explorador, sin nueva ruta de producto.

Pruebas y verificaciones:
- Abrir los IDs registrados desde una tarjeta y por URL directa; contrastar todos sus campos con el dataset.
- Abrir un ID inexistente: estado de no encontrado, nunca una experiencia sustituta.
- Comprobar titulo del documento al entrar y salir, favorito accesible y Navbar con Experiencias activo.
- Revisar fotografia y fallback a 375 y 1440 px.
- Ejecutar TypeScript y lint focalizado de la ruta y componentes afectados.

Criterio de salida: detalle correcto, lookup seguro, efecto con limpieza y enlaces verificados. La sincronizacion completa con Favoritos y Perfil sigue pendiente de fase 5.

## Fase 5: Favoritos y Perfil

Estado: pendiente. Dependencias: fases 1 a 4 superadas.

Archivos previstos: `src/app/favorites/page.tsx`, `src/app/profile/page.tsx`, `src/components/FavoritesView.tsx`, `src/components/ProfileView.tsx` y ajustes minimos en el puente o conexiones existentes.

Tareas:
1. Derivar la lista de Favoritos del dataset y los IDs del estado superior, sin duplicar el estado.
2. Reutilizar ExperienceCard para mostrar favoritas, abrir detalles y quitar experiencias.
3. Mostrar estado vacio con enlace al Explorador.
4. Crear perfil simulado con nombre, avatar y biografia estaticos; recibir por props el contador derivado y enlazar a Favoritos.
5. Completar la conexion entre Explorador, Detalle, Favoritos y Perfil. Mantener la envoltura montada al navegar y evitar claves dependientes de ruta.
6. Confirmar que no se utiliza almacenamiento del navegador, cookies ni servicios externos para favoritos.

Pruebas y verificaciones:
- Sesion nueva: Favoritos vacio y Perfil con contador cero.
- Guardar los dos IDs seleccionados: corazones activos y ninguna navegacion involuntaria ni duplicados.
- Navegar por enlaces internos a Detalle, Favoritos y Perfil: seleccion conservada y contador dos.
- Quitar desde Detalle y Favoritos: vistas sincronizadas inmediatamente, contador cero y estado vacio.
- Alternar repetidamente el mismo corazon con raton y teclado: toggle correcto, `aria-pressed` coherente y sin duplicados.
- Recargar: seleccion perdida y contador cero; confirmar ausencia de escritura de favoritos en almacenamiento y cookies.
- Ejecutar TypeScript y lint focalizado sobre las conexiones y vistas tocadas.

Criterio de salida: una sola fuente de verdad, flujo entre las cinco rutas completo y favoritas solo en memoria de la sesion de navegacion interna.

## Fase 6: calidad visual e integracion final

Estado: pendiente. Dependencias: fases 0 a 5 superadas.

Archivos previstos: solo ajustes necesarios en los archivos ya implementados; no ampliar el alcance.

Tareas:
1. Comparar la interfaz con las cuatro referencias PNG descritas en la spec, sin copiar marca o elementos comerciales fuera de alcance.
2. Comprobar el flujo Home -> Explorador -> Detalle -> Favoritos -> Perfil, incluida URL precargada y favoritos activos.
3. Revisar responsividad a 375, 768 y 1440 px: cuadricula, textos largos, menu, foco y ausencia de scroll horizontal o solapamientos.
4. Revisar texto alternativo, contraste, nombres accesibles, dimensiones estables, fallback y carga diferida de imagenes.
5. Ejecutar los gates finales una vez; si son correctos, servir la compilacion y repetir el recorrido basico en produccion.
6. Registrar evidencias y pendientes; confirmar que dependencias, scripts y rutas no se ampliaron.

Pruebas y verificaciones:
- Completar los casos funcionales pendientes de fases anteriores, sin repetir comprobaciones ya resueltas salvo que un cambio las afecte.
- Revisar consola y recursos: sin errores de renderizado o imagenes inesperadamente rotas; dataset sin dependencia de una API.
- Ejecutar TypeScript, lint completo y build final con las herramientas locales. Build debe validar Suspense y los limites requeridos por cache.
- Tras build correcto, iniciar produccion y abrir directamente Explorador con parametros, detalle valido y detalle inexistente; repetir guardado y contador mediante navegacion interna.

Criterio de salida: todos los criterios de aceptacion del contexto satisfechos y gates superados. Las comprobaciones bloqueadas se identifican como tales, no como superadas ni como cierre completo.

## Comandos y limites

Ejecutar desde `nextjs-wanderlust-explorer/`, usando solo instalaciones locales:

| Momento | Comprobacion |
| --- | --- |
| Preparacion | Comprobar disponibilidad de `./node_modules/.bin/next`, `./node_modules/.bin/tsc` y `./node_modules/.bin/eslint`. |
| Verificacion de tipos | `./node_modules/.bin/tsc --noEmit`. Si faltan tipos generados de rutas, consultar la guia instalada y usar `./node_modules/.bin/next typegen` cuando corresponda. |
| Lint por fase | `./node_modules/.bin/eslint` seguido solo de los archivos afectados. |
| Pruebas manuales | `npm run dev`; utilizar el puerto libre informado y registrar la URL. |
| Gate final | `npm run lint` y `npm run build`, una vez cada uno en fase 6. |
| Validacion de produccion | `npm run start`, solo despues de build correcto. |

No ejecutar estos comandos en la fase documental. No recurrir a instalaciones automaticas si falta un ejecutable. No iniciar ciclos de build repetidos; aplicar el limite de dos intentos y comunicar fallos antes de ampliar trabajo.

## Registro de evidencias

Actualizar este registro al completar cada fase, sin marcar pruebas pendientes como ejecutadas:

| Fase | Estado | Evidencia necesaria |
| --- | --- | --- |
| 0 | Pendiente | Herramientas, guias y limites confirmados; bloqueos si existen. |
| 1 | Pendiente | Invariantes de 100 objetos, tipos, imagenes comprobadas y casos de prueba elegidos. |
| 2 | Pendiente | Home, menu y teclado comprobados; lint y enlaces aun pendientes. |
| 3 | Pendiente | URLs de prueba, IDs esperados/obtenidos, regex invalida, vacio, historial, tipos y lint. |
| 4 | Pendiente | IDs validos e inexistente, titulo del documento, vista responsiva, tipos y lint. |
| 5 | Pendiente | Secuencia guardar/quitar, contador, navegacion interna, recarga, tipos y lint. |
| 6 | Pendiente | Recorrido integrado, viewports, accesibilidad, tipos, lint, build y produccion. |

Para cada caso registrar resultado esperado, observado, comando o recorrido y errores exactos. Estados permitidos: pendiente, superada, fallida o bloqueada. Una fase con verificaciones imprescindibles bloqueadas no autoriza dar la implementacion por finalizada.