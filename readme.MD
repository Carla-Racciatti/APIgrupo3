API con Express creada con Nodejs - Materia: Laboratorio IV 
GRUPO 3: Racciatti Carla, Mattei Stefano, Clemente Nicolas 

*******************************************************************************************************************

Integrante 1: Carla Racciatti 
>BÚSQUEDA DE LIBROS
Utilicé la API "Books API", la cual proporciona datos de libros y no necesita una API KEY. 

    -Para obtener lista completa de libros (Punto 1 de la consigna: listado de 50 registros o más): 
         Endpoint a usar: 
        GET http://localhost:3000/api/v1/libros

        La API externa suele tardar en enviar la información, por lo que agregué un límite de 70 registros. 
        También desestructuré la respuesta de la API porque enviaba muchos datos que no eran muy relevantes. 
        Elegí que devuelva únicamente los siguientes datos que o considero relevantes: 
        "key", "title" (título), "author_name"(autor),"subject"(temas sobre los que trata el libro), "first_publish_date"/ "first_publish_year" (fecha de primera publicación. tuve que usar dos parámetros porque la API no es consistente en los registros y utiliza ambos campos). 
        La API Open Library no es consistente en la estructura de sus respuestas, utiliza diferentes parámetros para guardar la misma información. 
        Además, es posible que algunos libros no tengan la totalidad de estos datos ya que Open library brinda algunos registros incompletos con campos faltantes. No todos los libros tienen la misma información. Por ejemplo, pude ver muchos libros que no tenían el campo de autor o .



    -Para filtrar libros por id (punto 2 de la consigna: filtrar por id): 
        Cada libro tiene un campo "key", que generalmente tiene un formato como /works/OL123456W, donde "OL123456W" es el ID del libro.
        ENDPOINT A USAR: 
        GET http://localhost:3000/api/v1/libros/{id}
        
        Ejemplos de endpoints que probé: 
        http://localhost:3000/api/v1/libros/OL123456W
        http://localhost:3000/api/v1/libros/OL45846W
        http://localhost:3000/api/v1/libros/OL103123W
        http://localhost:3000/api/v1/libros/OL5819456W
        http://localhost:3000/api/v1/libros/OL99529W
        http://localhost:3000/api/v1/libros/OL531767W
        
    
     -Para filtrar el listado del punto 1 usando query params (punto 2 de la consigna: filtrar por algún campo importante): 
        Decidí filtrarlos por "subjects" (temas sobre los que trata el libro). 
        Siendo que Open Library no es constante en la estructura de los registros, había muchos libros que no tenían el campo subjects, por lo que no pude usar una ruta del tipo /api/v1/libros?subject={subject} sino que tuve que recurrir a otro endpoint que provee la API (/subject) para asegurarme de que devolvería libros que sí cuentan con el campo "subject". 

        ENDPOINT A USAR: 
        http://localhost:3000/api/v1/libros/subject?subject={tema_a_buscar}

        Ejemplos de endpoints que probé: 
        http://localhost:3000/api/v1/libros/subject?subject=poetry
        http://localhost:3000/api/v1/libros/subject?subject=fiction
        http://localhost:3000/api/v1/libros/subject?subject=terror
        http://localhost:3000/api/v1/libros/subject?subject=animales
        http://localhost:3000/api/v1/libros/subject?subject=musica
        http://localhost:3000/api/v1/libros/subject?subject=aventura


*******************************************************************************************************************


Integrante 2: Nicolás Clemente
>BÚSQUEDA DE PELÍCULAS

Utilicé la API de The Movie Database (TMDb), que proporciona datos de películas y requiere un Access Token.

1- Para obtener lista completa de películas populares (Punto 1 de la consigna: listado de 50 registros o más):
   . Endpoint a usar: GET http://localhost:3000/api/v1/peliculas
   . La API devuelve una lista de películas populares. Se ha limitado a una página de resultados, que normalmente contiene 20 películas.
   . Los datos devueltos incluyen: "key" (identificador único de la película), "title" (título), "release_date" (fecha de lanzamiento), "overview" (resumen), "vote_average" (puntuación promedio).

2- Para filtrar películas por id (punto 2 de la consigna: filtrar por id):
   . Cada película tiene un campo "key" con el formato "/movie/{id}", donde "{id}" es el ID de la película.
   . Endpoint a usar: GET http://localhost:3000/api/v1/peliculas/{id}
   . Ejemplos de endpoints que se pueden probar:
     - http://localhost:3000/api/v1/peliculas/550  (El club de la lucha)
     - http://localhost:3000/api/v1/peliculas/238  (El padrino)
     - http://localhost:3000/api/v1/peliculas/680  (Pulp Fiction)
     - http://localhost:3000/api/v1/peliculas/155  (The Dark Knight)
     - http://localhost:3000/api/v1/peliculas/13   (Forrest Gump)

3- Para filtrar el listado del punto 1 usando query params (punto 3 de la consigna: filtrar por algún campo importante):
   . Se ha implementado un filtro por género de película.
   . Endpoint a usar: http://localhost:3000/api/v1/peliculas/generos?genre={nombre_del_genero}
   . Ejemplos de endpoints que se pueden probar:
     - http://localhost:3000/api/v1/peliculas/generos?genre=accion
     - http://localhost:3000/api/v1/peliculas/generos?genre=comedia
     - http://localhost:3000/api/v1/peliculas/generos?genre=drama
     - http://localhost:3000/api/v1/peliculas/generos?genre=horror
     - http://localhost:3000/api/v1/peliculas/generos?genre=romance
     - http://localhost:3000/api/v1/peliculas/generos?genre=ciencia%20ficcion

4- Para obtener la lista de todos los géneros disponibles:
   . Endpoint a usar: GET http://localhost:3000/api/v1/peliculas/generos
   . Este endpoint devuelve una lista de todos los géneros disponibles con sus IDs y nombres.

5- Para buscar películas por título:
   . Endpoint a usar: GET http://localhost:3000/api/v1/peliculas/buscar?query={Título_de_busqueda}
   . Ejemplos de endpoints que se pueden probar:
     - http://localhost:3000/api/v1/peliculas/buscar?query=matrix
     - http://localhost:3000/api/v1/peliculas/buscar?query=star%20wars
     - http://localhost:3000/api/v1/peliculas/buscar?query=avengers

Nota: Asegurarse que las variables de entorno TMDB_BASE_URL y TMDB_ACCESS_TOKEN estén correctamente configuradas en el archivo .env para que la API de películas funcione correctamente.

 Características adicionales:
. La búsqueda de géneros es insensible a mayúsculas y minúsculas, y también ignora los acentos.
. Se ha implementado un manejo de errores consistente en toda la API.
. Todas las respuestas siguen un formato uniforme con campos "msg" y "data" (o "error" en caso de errores).

 Resumen de endpoints:
1- GET http://localhost:3000/api/v1/peliculas - Obtener películas populares
2- GET http://localhost:3000/api/v1/peliculas/{id} - Obtener detalles de una película específica
3- GET http://localhost:3000/api/v1/peliculas/generos - Obtener lista de géneros
4- GET http://localhost:3000/api/v1/peliculas/generos?genre={nombre_del_genero} - Obtener películas por género
5- GET http://localhost:3000/api/v1/peliculas/buscar?query={título_de_busqueda} - Buscar películas por título

 Notas de implementación:
. Se utiliza el Access Token de TMDb para autenticación en todas las solicitudes.
. Las respuestas están en español (es-ES) para una mejor experiencia de usuario en el contexto local.

*******************************************************************************************************************
Integrante 3 : 