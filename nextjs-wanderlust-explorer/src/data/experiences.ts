export const EXPERIENCE_CATEGORIES = [
  "Adventure",
  "Culture",
  "Food",
  "Wellness",
  "Nature",
] as const;

export type ExperienceCategory = (typeof EXPERIENCE_CATEGORIES)[number];

export type Experience = {
  id: string;
  title: string;
  description: string;
  category: ExperienceCategory;
  destination: string;
  price: number;
  rating: number;
  imageUrl: string;
};

type ExperienceData = Omit<Experience, "imageUrl">;

const experienceData: ExperienceData[] = [
  { id: "exp-001", title: "Travesia al amanecer en los fiordos de Lofoten", description: "Navegacion tranquila entre paredes de roca y pequenas aldeas pesqueras. En las noches despejadas de invierno, el cielo puede mostrar bioluminiscencia sobre el agua.", category: "Adventure", destination: "Reine, Noruega", price: 145, rating: 4.8 },
  { id: "exp-002", title: "Senderismo por el valle de Cocora", description: "Caminata guiada entre palmas de cera, miradores naturales y senderos de montana con paradas para observar el paisaje.", category: "Adventure", destination: "Salento, Colombia", price: 62, rating: 4.7 },
  { id: "exp-003", title: "Escalada para principiantes en granito", description: "Sesion introductoria de escalada en roca con equipo incluido, instrucciones de seguridad y rutas adaptadas al nivel del grupo.", category: "Adventure", destination: "Yosemite, Estados Unidos", price: 118, rating: 4.6 },
  { id: "exp-004", title: "Kayak entre calas de la costa", description: "Salida en kayak por calas protegidas, con tiempo para nadar y conocer la geologia de la costa desde el mar.", category: "Adventure", destination: "Lisboa, Portugal", price: 54, rating: 4.5 },
  { id: "exp-005", title: "Ciclismo de montana en los Andes", description: "Ruta de descenso por caminos rurales andinos, con guia local, paradas panoramicas y opciones para distintos niveles.", category: "Adventure", destination: "Mendoza, Argentina", price: 92, rating: 4.8 },
  { id: "exp-006", title: "Espeleologia en una cueva de lava", description: "Exploracion a pie de una cueva volcanica con casco, linterna y explicaciones sobre la formacion de sus tuneles.", category: "Adventure", destination: "Reikiavik, Islandia", price: 109, rating: 4.6 },
  { id: "exp-007", title: "Paseo en globo sobre Capadocia", description: "Vuelo al amanecer para contemplar las formaciones rocosas y los valles desde el aire, sujeto a las condiciones meteorologicas.", category: "Adventure", destination: "Göreme, Turquia", price: 210, rating: 4.9 },
  { id: "exp-008", title: "Rafting en los rapidos del rio", description: "Descenso en balsa por tramos de corriente moderada con guia, equipo de seguridad y una charla previa sobre el recorrido.", category: "Adventure", destination: "Banos, Ecuador", price: 76, rating: 4.7 },
  { id: "exp-009", title: "Ruta en bicicleta por el desierto", description: "Recorrido guiado en bicicleta por pistas del desierto, con pausas a la sombra y agua para el trayecto.", category: "Adventure", destination: "Merzouga, Marruecos", price: 68, rating: 4.4 },
  { id: "exp-010", title: "Snorkel en un arrecife protegido", description: "Inmersion de superficie en una zona marina protegida para observar peces y corales con guia y equipo incluido.", category: "Adventure", destination: "Dahab, Egipto", price: 49, rating: 4.6 },
  { id: "exp-011", title: "Cabalgata por los senderos patagonicos", description: "Paseo a caballo por caminos de estepa y bosque, con instrucciones para jinetes principiantes y experimentados.", category: "Adventure", destination: "El Calafate, Argentina", price: 83, rating: 4.5 },
  { id: "exp-012", title: "Via ferrata sobre el lago", description: "Travesia equipada por una pared rocosa con puentes y cables, acompanada por un instructor y vistas al lago.", category: "Adventure", destination: "Interlaken, Suiza", price: 132, rating: 4.8 },
  { id: "exp-013", title: "Excursion con raquetas de nieve", description: "Caminata invernal por un bosque nevado con raquetas, guia local y paradas para aprender a reconocer huellas.", category: "Adventure", destination: "Banff, Canada", price: 97, rating: 4.7 },
  { id: "exp-014", title: "Surf de iniciacion en la playa", description: "Clase en grupo reducido que combina equilibrio en la arena, practica en el agua y recomendaciones para continuar.", category: "Adventure", destination: "Ericeira, Portugal", price: 58, rating: 4.5 },
  { id: "exp-015", title: "Tirolesa entre las copas del bosque", description: "Circuito de tirolinas con varias plataformas y una explicacion sobre el ecosistema del bosque tropical.", category: "Adventure", destination: "La Fortuna, Costa Rica", price: 71, rating: 4.6 },
  { id: "exp-016", title: "Caminata hasta un crater volcanico", description: "Ascenso guiado por un sendero de montaña hasta el borde de un crater, con pausas para aclimatarse y observar el terreno.", category: "Adventure", destination: "Arequipa, Peru", price: 88, rating: 4.7 },
  { id: "exp-017", title: "Paddleboard por aguas tranquilas", description: "Introduccion al paddleboard en una bahia resguardada, con tabla, chaleco y acompanamiento durante toda la salida.", category: "Adventure", destination: "Split, Croacia", price: 43, rating: 4.4 },
  { id: "exp-018", title: "Observacion de estrellas en el altiplano", description: "Paseo nocturno por un paisaje de altura y observacion del cielo con telescopio, sujeto a la nubosidad.", category: "Adventure", destination: "San Pedro de Atacama, Chile", price: 64, rating: 4.8 },
  { id: "exp-019", title: "Barranquismo en un canon de roca", description: "Descenso por un canon con pequenos saltos y pozas, dirigido por guias con equipo tecnico y alternativas para evitar los tramos mas exigentes.", category: "Adventure", destination: "Granada, Espana", price: 105, rating: 4.6 },
  { id: "exp-020", title: "Travesia en trineo con perros", description: "Recorrido en trineo por senderos nevados con un musher local y una introduccion al cuidado de los perros.", category: "Adventure", destination: "Tromso, Noruega", price: 176, rating: 4.9 },
  { id: "exp-021", title: "Paseo por los templos de Kioto", description: "Visita a varios templos y jardines tradicionales para conocer su arquitectura, simbolos y relacion con la vida cotidiana.", category: "Culture", destination: "Kioto, Japon", price: 57, rating: 4.8 },
  { id: "exp-022", title: "Recorrido por el casco antiguo", description: "Paseo a pie por plazas, callejones y edificios historicos, con relatos sobre los cambios de la ciudad a lo largo del tiempo.", category: "Culture", destination: "Praga, Chequia", price: 31, rating: 4.6 },
  { id: "exp-023", title: "Taller de caligrafia japonesa", description: "Introduccion practica a la caligrafia con pincel, tinta y papel, incluyendo el significado de algunos trazos tradicionales.", category: "Culture", destination: "Tokio, Japon", price: 46, rating: 4.7 },
  { id: "exp-024", title: "Museo y memoria del barrio", description: "Visita guiada a un museo comunitario y sus calles cercanas para descubrir historias, oficios y objetos de la vida local.", category: "Culture", destination: "Ciudad de Mexico, Mexico", price: 28, rating: 4.5 },
  { id: "exp-025", title: "Arquitectura modernista de Barcelona", description: "Ruta urbana para observar fachadas y espacios modernistas, con contexto sobre sus materiales, autores y epoca.", category: "Culture", destination: "Barcelona, Espana", price: 39, rating: 4.7 },
  { id: "exp-026", title: "Ceremonia del te en una casa tradicional", description: "Encuentro introductorio para aprender los gestos y la etiqueta de una ceremonia del te en un espacio tradicional.", category: "Culture", destination: "Osaka, Japon", price: 52, rating: 4.8 },
  { id: "exp-027", title: "Arte callejero y murales del puerto", description: "Recorrido por murales y talleres independientes para conocer a artistas y la historia reciente del distrito portuario.", category: "Culture", destination: "Valparaiso, Chile", price: 25, rating: 4.6 },
  { id: "exp-028", title: "Historia de la antigua Roma", description: "Paseo por restos arqueologicos y espacios publicos con una guia que conecta la historia antigua con la ciudad actual.", category: "Culture", destination: "Roma, Italia", price: 44, rating: 4.7 },
  { id: "exp-029", title: "Mosaicos y patios de Fez", description: "Visita a patios y talleres de mosaico para conocer tecnicas artesanales y patrones geometricos de la region.", category: "Culture", destination: "Fez, Marruecos", price: 34, rating: 4.5 },
  { id: "exp-030", title: "Musica tradicional en una plaza", description: "Encuentro cultural con musicos locales y explicaciones sobre instrumentos, ritmos y celebraciones de la zona.", category: "Culture", destination: "Sevilla, Espana", price: 36, rating: 4.6 },
  { id: "exp-031", title: "Ruta de los palacios de Jaipur", description: "Visita a palacios y patios de la ciudad rosa para descubrir su historia, arquitectura y artes decorativas.", category: "Culture", destination: "Jaipur, India", price: 42, rating: 4.7 },
  { id: "exp-032", title: "Ceramica artesanal de Oaxaca", description: "Demostracion y practica de tecnicas de ceramica con una artesana local, desde la preparacion del barro hasta la decoracion.", category: "Culture", destination: "Oaxaca, Mexico", price: 49, rating: 4.8 },
  { id: "exp-033", title: "Paseo literario por Lisboa", description: "Recorrido por librerias, plazas y rincones vinculados a escritores portugueses y a la historia editorial de la ciudad.", category: "Culture", destination: "Lisboa, Portugal", price: 29, rating: 4.5 },
  { id: "exp-034", title: "Tradiciones marineras de Bergen", description: "Visita al antiguo muelle y al mercado para conocer la vida portuaria, las rutas comerciales y las tradiciones locales.", category: "Culture", destination: "Bergen, Noruega", price: 33, rating: 4.6 },
  { id: "exp-035", title: "Caligrafia arabe y patrones geometricos", description: "Taller introductorio sobre escritura artistica y composicion de patrones, con materiales para practicar durante la sesion.", category: "Culture", destination: "Granada, Espana", price: 41, rating: 4.7 },
  { id: "exp-036", title: "Templos y mercados de Bangkok", description: "Recorrido a pie por templos, calles y mercados para comprender las costumbres y la vida cotidiana de la ciudad.", category: "Culture", destination: "Bangkok, Tailandia", price: 38, rating: 4.6 },
  { id: "exp-037", title: "Fotografia de arquitectura en Chicago", description: "Paseo fotografico por edificios emblematicos con consejos de encuadre y una introduccion al desarrollo arquitectonico urbano.", category: "Culture", destination: "Chicago, Estados Unidos", price: 47, rating: 4.5 },
  { id: "exp-038", title: "Teatro de marionetas tradicional", description: "Representacion breve y conversacion con artistas sobre la construccion de marionetas y su papel en las historias populares.", category: "Culture", destination: "Hanoi, Vietnam", price: 32, rating: 4.8 },
  { id: "exp-039", title: "Mercados y memoria de Estambul", description: "Paseo por mercados historicos para conocer productos, arquitectura comercial y relatos de distintas comunidades.", category: "Culture", destination: "Estambul, Turquia", price: 35, rating: 4.7 },
  { id: "exp-040", title: "Escultura y jardines de Florencia", description: "Visita guiada a esculturas y jardines historicos para explorar la relacion entre arte, paisaje y ciudad.", category: "Culture", destination: "Florencia, Italia", price: 48, rating: 4.8 },
  { id: "exp-041", title: "Mercado y cocina callejera de Hanoi", description: "Paseo por puestos de comida para conocer ingredientes habituales y probar pequenas porciones de recetas locales.", category: "Food", destination: "Hanoi, Vietnam", price: 37, rating: 4.8 },
  { id: "exp-042", title: "Taller de pasta fresca", description: "Preparacion manual de pasta con una cocinera local, desde el amasado hasta una comida compartida al final del taller.", category: "Food", destination: "Bolonia, Italia", price: 66, rating: 4.9 },
  { id: "exp-043", title: "Cata de cacao de origen", description: "Degustacion guiada de distintas variedades de cacao con explicaciones sobre cultivo, fermentacion y elaboracion.", category: "Food", destination: "Quito, Ecuador", price: 39, rating: 4.6 },
  { id: "exp-044", title: "Sabores de un mercado provenzal", description: "Recorrido entre productores para descubrir quesos, frutas y panes de temporada, con degustaciones en varias paradas.", category: "Food", destination: "Niza, Francia", price: 45, rating: 4.7 },
  { id: "exp-045", title: "Cocina casera de Oaxaca", description: "Clase participativa para preparar salsas y platos regionales mientras se conversa sobre ingredientes y tradiciones familiares.", category: "Food", destination: "Oaxaca, Mexico", price: 72, rating: 4.9 },
  { id: "exp-046", title: "Ruta de tapas por el centro", description: "Visita a pequenos bares para probar tapas variadas y conocer costumbres locales de encuentro alrededor de la mesa.", category: "Food", destination: "Sevilla, Espana", price: 53, rating: 4.7 },
  { id: "exp-047", title: "Pan de masa madre en Copenhague", description: "Taller basico de panificacion para mezclar, formar y hornear una pieza, con consejos para cuidar la masa madre en casa.", category: "Food", destination: "Copenhague, Dinamarca", price: 61, rating: 4.6 },
  { id: "exp-048", title: "Especias y cocina de Jaipur", description: "Visita a puestos de especias seguida de una demostracion de cocina con mezclas aromaticas de la region.", category: "Food", destination: "Jaipur, India", price: 43, rating: 4.8 },
  { id: "exp-049", title: "Degustacion de quesos alpinos", description: "Cata comentada de quesos de distintas maduraciones con informacion sobre pastos, productores y metodos de elaboracion.", category: "Food", destination: "Zermatt, Suiza", price: 58, rating: 4.7 },
  { id: "exp-050", title: "Cocina de pescado junto al puerto", description: "Demostracion de recetas de pescado de temporada y visita a la lonja para conocer como se seleccionan los productos.", category: "Food", destination: "Lisboa, Portugal", price: 64, rating: 4.6 },
  { id: "exp-051", title: "Dulces tradicionales de Estambul", description: "Paseo por pastelerias y cafes para probar dulces regionales y conocer tecnicas e ingredientes de su preparacion.", category: "Food", destination: "Estambul, Turquia", price: 34, rating: 4.8 },
  { id: "exp-052", title: "Cata de aceite de oliva en la Toscana", description: "Introduccion a la cata de aceite con muestras de distintas variedades y una explicacion del cultivo del olivo.", category: "Food", destination: "Siena, Italia", price: 48, rating: 4.7 },
  { id: "exp-053", title: "Tacos y antojitos de Ciudad de Mexico", description: "Recorrido por puestos y fondas para conocer recetas cotidianas, metodos de coccion y diversidad de chiles.", category: "Food", destination: "Ciudad de Mexico, Mexico", price: 42, rating: 4.8 },
  { id: "exp-054", title: "Cervecerias artesanales de Portland", description: "Visita a dos pequenas cervecerias para aprender sobre ingredientes y procesos, con degustaciones moderadas.", category: "Food", destination: "Portland, Estados Unidos", price: 55, rating: 4.5 },
  { id: "exp-055", title: "Pasteles y cafe de especialidad", description: "Encuentro en una cafeteria independiente para probar cafe de origen y pasteleria local, con una introduccion a la preparacion.", category: "Food", destination: "Lisboa, Portugal", price: 27, rating: 4.6 },
  { id: "exp-056", title: "Fermentos caseros de Seul", description: "Taller introductorio sobre fermentacion de vegetales con preparacion de una receta y explicaciones de conservacion.", category: "Food", destination: "Seul, Corea del Sur", price: 59, rating: 4.8 },
  { id: "exp-057", title: "Cocina de curry en Chiang Mai", description: "Clase de cocina con visita a un mercado local para elegir hierbas, verduras y especias antes de preparar varios platos.", category: "Food", destination: "Chiang Mai, Tailandia", price: 51, rating: 4.9 },
  { id: "exp-058", title: "Chocolate artesanal de Bruselas", description: "Demostracion de temperado y moldeado de chocolate con degustacion de diferentes porcentajes de cacao.", category: "Food", destination: "Bruselas, Belgica", price: 40, rating: 4.6 },
  { id: "exp-059", title: "Cocina de temporada en un huerto", description: "Preparacion de una comida sencilla con verduras recogidas en un huerto y conversacion sobre cultivo de temporada.", category: "Food", destination: "Kioto, Japon", price: 69, rating: 4.7 },
  { id: "exp-060", title: "Ruta de empanadas mendocinas", description: "Visita a obradores y degustacion de distintas empanadas, con explicaciones sobre masas, rellenos y costumbres regionales.", category: "Food", destination: "Mendoza, Argentina", price: 32, rating: 4.5 },
  { id: "exp-061", title: "Yoga suave frente al mar", description: "Practica accesible de respiracion, movilidad y posturas suaves en una terraza junto al mar, apta para principiantes.", category: "Wellness", destination: "Bali, Indonesia", price: 29, rating: 4.8 },
  { id: "exp-062", title: "Baño termal en una piscina historica", description: "Tiempo de descanso en aguas termales y recorrido introductorio por la historia y las normas del balneario.", category: "Wellness", destination: "Budapest, Hungria", price: 44, rating: 4.7 },
  { id: "exp-063", title: "Meditacion guiada en un jardin zen", description: "Sesion de meditacion para principiantes con ejercicios de atencion a la respiracion y un paseo silencioso por el jardin.", category: "Wellness", destination: "Kioto, Japon", price: 35, rating: 4.8 },
  { id: "exp-064", title: "Masaje tradicional de pies", description: "Sesion de relajacion de pies en un espacio tranquilo, precedida de una explicacion de las tecnicas utilizadas.", category: "Wellness", destination: "Chiang Mai, Tailandia", price: 38, rating: 4.6 },
  { id: "exp-065", title: "Respiracion consciente en la montana", description: "Practica guiada de respiracion y estiramientos suaves al aire libre, con alternativas para diferentes capacidades.", category: "Wellness", destination: "Innsbruck, Austria", price: 26, rating: 4.6 },
  { id: "exp-066", title: "Hammam y ritual de descanso", description: "Visita a un hammam tradicional con una introduccion a sus espacios y costumbres, seguida de tiempo de descanso.", category: "Wellness", destination: "Marrakech, Marruecos", price: 63, rating: 4.7 },
  { id: "exp-067", title: "Tai chi en el parque al amanecer", description: "Clase de movimientos lentos y equilibrio en un parque, con instrucciones adaptadas a quienes no han practicado antes.", category: "Wellness", destination: "Shanghai, China", price: 19, rating: 4.5 },
  { id: "exp-068", title: "Estiramientos y relajacion urbana", description: "Sesion guiada de estiramientos y relajacion en un estudio luminoso, con ejercicios que pueden repetirse en casa.", category: "Wellness", destination: "Copenhague, Dinamarca", price: 24, rating: 4.6 },
  { id: "exp-069", title: "Baño de bosque en las colinas", description: "Paseo pausado por el bosque con ejercicios sensoriales y pausas para escuchar y observar el entorno natural.", category: "Wellness", destination: "Nagano, Japon", price: 33, rating: 4.8 },
  { id: "exp-070", title: "Jornada de descanso junto al lago", description: "Encuentro de bienestar con respiracion, escritura reflexiva y tiempo libre en un espacio tranquilo junto al agua.", category: "Wellness", destination: "Lucerna, Suiza", price: 47, rating: 4.5 },
  { id: "exp-071", title: "Pilates para principiantes en la playa", description: "Clase de pilates de bajo impacto en la arena firme, con opciones de movimiento y una breve vuelta a la calma.", category: "Wellness", destination: "Valencia, Espana", price: 22, rating: 4.6 },
  { id: "exp-072", title: "Aguas termales entre montanas", description: "Visita a piscinas termales al aire libre con vistas a las montanas y recomendaciones para disfrutar del circuito con calma.", category: "Wellness", destination: "La Fortuna, Costa Rica", price: 72, rating: 4.8 },
  { id: "exp-073", title: "Meditacion sonora con cuencos", description: "Sesion de escucha y relajacion con cuencos y otros instrumentos acusticos en una sala de ambiente sereno.", category: "Wellness", destination: "Katmandu, Nepal", price: 31, rating: 4.7 },
  { id: "exp-074", title: "Paseo consciente por la costa", description: "Caminata tranquila junto al mar que combina observacion del paisaje, respiracion y pausas de descanso.", category: "Wellness", destination: "Brighton, Reino Unido", price: 18, rating: 4.4 },
  { id: "exp-075", title: "Introduccion a la aromaterapia", description: "Taller informativo sobre aromas botanicos y sus usos tradicionales, con una actividad sencilla para crear una mezcla personal.", category: "Wellness", destination: "Grasse, Francia", price: 45, rating: 4.6 },
  { id: "exp-076", title: "Yoga restaurativo en un invernadero", description: "Practica pausada con apoyos y posturas de descanso en un invernadero, adecuada para distintos niveles de experiencia.", category: "Wellness", destination: "Amsterdam, Paises Bajos", price: 34, rating: 4.7 },
  { id: "exp-077", title: "Sauna junto al fiordo", description: "Experiencia de sauna con explicaciones sobre su uso local y acceso a una zona de descanso con vistas al fiordo.", category: "Wellness", destination: "Bergen, Noruega", price: 52, rating: 4.6 },
  { id: "exp-078", title: "Caminata de bienestar por un olivar", description: "Paseo suave por un olivar con ejercicios de movilidad, pausas a la sombra y una introduccion al paisaje rural.", category: "Wellness", destination: "Jaen, Espana", price: 28, rating: 4.5 },
  { id: "exp-079", title: "Relajacion guiada en un jardin tropical", description: "Sesion de relajacion con respiracion y visualizacion en un jardin botanico, con tiempo para recorrer sus senderos.", category: "Wellness", destination: "Singapur, Singapur", price: 37, rating: 4.7 },
  { id: "exp-080", title: "Baño de vapor y descanso en la ciudad", description: "Circuito de vapor y reposo en un establecimiento local, con indicaciones para elegir el ritmo y la duracion de la visita.", category: "Wellness", destination: "Estambul, Turquia", price: 56, rating: 4.6 },
  { id: "exp-081", title: "Observacion de aves en el delta", description: "Salida al amanecer para identificar aves acuaticas desde senderos y miradores, con binoculares compartidos y guia naturalista.", category: "Nature", destination: "El Rocio, Espana", price: 41, rating: 4.8 },
  { id: "exp-082", title: "Bosque lluvioso y cascadas", description: "Caminata por senderos del bosque tropical hasta varias cascadas, con paradas para hablar de plantas y ciclos del agua.", category: "Nature", destination: "La Fortuna, Costa Rica", price: 58, rating: 4.8 },
  { id: "exp-083", title: "Paseo botanico por un jardin alpino", description: "Recorrido interpretativo por un jardin de altura para reconocer especies adaptadas al clima y observar las montanas.", category: "Nature", destination: "Zermatt, Suiza", price: 36, rating: 4.6 },
  { id: "exp-084", title: "Tortugas marinas desde la costa", description: "Visita educativa a un centro de conservacion y paseo por la playa para conocer el ciclo de vida de las tortugas.", category: "Nature", destination: "Puerto Vallarta, Mexico", price: 47, rating: 4.7 },
  { id: "exp-085", title: "Geologia de las formaciones rojas", description: "Caminata interpretativa entre formaciones de arenisca para aprender a leer capas, erosion y cambios del paisaje.", category: "Nature", destination: "Page, Estados Unidos", price: 69, rating: 4.8 },
  { id: "exp-086", title: "Jardines de arroz y canales rurales", description: "Paseo por caminos entre arrozales y canales para observar el paisaje agricola y conversar sobre su cuidado estacional.", category: "Nature", destination: "Ubud, Indonesia", price: 27, rating: 4.5 },
  { id: "exp-087", title: "Avistamiento responsable de ballenas", description: "Navegacion de observacion con guia que explica las normas de distancia y el comportamiento de los cetaceos.", category: "Nature", destination: "Husavik, Islandia", price: 99, rating: 4.7 },
  { id: "exp-088", title: "Sendero entre secuoyas gigantes", description: "Caminata por un bosque de secuoyas con informacion sobre su edad, el ecosistema y las labores de conservacion.", category: "Nature", destination: "Eureka, Estados Unidos", price: 53, rating: 4.9 },
  { id: "exp-089", title: "Dunas y vida del desierto", description: "Recorrido a pie por dunas al atardecer para observar plantas resistentes y huellas de animales del desierto.", category: "Nature", destination: "Merzouga, Marruecos", price: 42, rating: 4.6 },
  { id: "exp-090", title: "Marismas y fauna del estuario", description: "Paseo por pasarelas de una marisma con paradas para observar aves y comprender la importancia de los humedales.", category: "Nature", destination: "Aveiro, Portugal", price: 32, rating: 4.5 },
  { id: "exp-091", title: "Bosque de bambu y senderos de montaña", description: "Ruta tranquila por un bosque de bambu y colinas cercanas, con explicaciones sobre la vegetacion y el uso tradicional del entorno.", category: "Nature", destination: "Arashiyama, Japon", price: 30, rating: 4.7 },
  { id: "exp-092", title: "Exploracion de pozas naturales", description: "Caminata guiada hasta pozas de agua dulce para conocer el origen del arroyo y disfrutar del paisaje sin dejar residuos.", category: "Nature", destination: "Banos, Ecuador", price: 39, rating: 4.6 },
  { id: "exp-093", title: "Flores silvestres de los Dolomitas", description: "Paseo botanico de temporada para identificar flores alpinas y aprender sobre los cambios del ecosistema de montaña.", category: "Nature", destination: "Bolzano, Italia", price: 46, rating: 4.8 },
  { id: "exp-094", title: "Atardecer en los acantilados", description: "Caminata por un sendero costero para observar aves marinas, vegetacion litoral y los cambios de luz sobre el oceano.", category: "Nature", destination: "Dingle, Irlanda", price: 35, rating: 4.7 },
  { id: "exp-095", title: "Manglares y canales de agua", description: "Recorrido en una embarcacion pequena por canales de manglar para aprender sobre sus raices y su papel en la costa.", category: "Nature", destination: "Kochi, India", price: 44, rating: 4.6 },
  { id: "exp-096", title: "Lago glaciar y paisaje de montaña", description: "Excursion a pie alrededor de un lago de origen glaciar con paradas para observar el relieve y la vegetacion local.", category: "Nature", destination: "Banff, Canada", price: 61, rating: 4.8 },
  { id: "exp-097", title: "Mariposas en un santuario natural", description: "Visita guiada a un santuario de mariposas para conocer sus etapas de vida, rutas migratorias y habitat.", category: "Nature", destination: "Morelia, Mexico", price: 29, rating: 4.7 },
  { id: "exp-098", title: "Bosque mediterraneo y plantas aromaticas", description: "Ruta de interpretacion por un bosque mediterraneo para reconocer plantas aromaticas y las adaptaciones a la sequia.", category: "Nature", destination: "Girona, Espana", price: 25, rating: 4.5 },
  { id: "exp-099", title: "Costa de lava y piscinas naturales", description: "Paseo por un litoral volcanico con observacion de rocas, charcos intermareales y especies adaptadas a la costa.", category: "Nature", destination: "Ponta Delgada, Portugal", price: 48, rating: 4.7 },
  { id: "exp-100", title: "Amanecer entre secanos y olivares", description: "Caminata a primera hora por caminos rurales para escuchar aves, observar la luz y conocer practicas tradicionales del paisaje.", category: "Nature", destination: "Jaen, Espana", price: 23, rating: 4.6 },
];

const imageByCategory: Record<ExperienceCategory, string> = {
  Adventure:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  Culture:
    "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80",
  Food: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
  Wellness:
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
  Nature:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
};

export const experiences: Experience[] = experienceData.map((experience) => ({
  ...experience,
  imageUrl: imageByCategory[experience.category],
}));

export const FALLBACK_IMAGE_URL = "/experience-placeholder.svg";
