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
Integrante 2 : 

*******************************************************************************************************************
Integrante 3 : 