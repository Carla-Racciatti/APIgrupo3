const axios = require('axios')
const { request, response } = require('express')
const BASE_URL = process.env.OPEN_LIBRARY_BASE_URL || 'https://openlibrary.org'

// Obtener una lista general de libros. Punto 1 de la consigna
const getLibros = async (req = request, res = response) => {
  try {
    // Consulta a la API de Open Library para obtener una lista de libros. Decidí limitarla a 70)
    const response = await axios.get(`${BASE_URL}/search.json?q=books&limit=70`)
    const { docs } = response.data
    // desestructuro para obtener unicamente los valores que considero relevantes entre todos los que ofrece la API

    const libros = docs.map(({ key, title, author_name, first_publish_date, first_publish_year }) => ({
      key,
      title,
      author_name: author_name || ['Autor desconocido'], // Proporciono esta opción ya que muchos libros no tienen su autor. Open Library  no es constante en los registros
      first_publish_date,
      first_publish_year
    }))

    res.status(200).json({
      msg: 'Ok',
      data: libros
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Error',
      error: 'Error inesperado al obtener la lista general de libros'
    })
  }
}

// Filtro libros por el tema que tratan (subject). Punto 3 de la consigna: filtrar por algún campo relevante.
/// Al ser Open Library una API que no es constante con los registros, algunos libros no tenían el campo "subject",
/// por eso en lugar de usar una url del tipo /api/v1/libros?subject={subject}
/// tuve que recurrir a otro endpoint que provee la API (/subject) para asegurarme de que devolvería libros qu sí tienen el campo "subject"
/// más un query param: http://localhost:3000/api/v1/libros/subject?subject={tema_a_buscar}

const getLibrosPorSubjects = async (req = request, res = response) => {
  const { subject = '' } = req.query

  if (!subject) {
    return res.status(400).json({
      msg: 'Error',
      error: 'Debes proporcionar un subject para filtrar los libros'
    })
  }

  try {
    const response = await axios.get(`${BASE_URL}/subjects/${encodeURIComponent(subject)}.json?limit=70`)
    const { works = [] } = response.data

    const libros = works.map(({ key, title, authors, first_publish_date, first_publish_year }) => {
      let authorNames = []
      if (authors && authors.length > 0) { // uso esto por la inconsistencia de la API en el campo autores.
        authorNames = authors.map(author => author.name || 'Autor desconocido')
      } else {
        authorNames = ['Autor desconocido']
      }

      return {
        key,
        title,
        author_name: authorNames,
        first_publish_date,
        first_publish_year
      }
    })

    if (libros.length === 0) {
      return res.status(404).json({
        msg: 'Error',
        error: 'No se encontraron libros para el subject especificado'
      })
    }

    res.status(200).json({
      msg: 'Ok',
      data: libros
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: 'Error',
      error: 'Error al obtener los libros por subject'
    })
  }
}

// buscar libro por id: punto 1 de la consigna

const getLibroPorId = async (req = request, res = response) => {
  const { id } = req.params

  try {
    const response = await axios.get(`${BASE_URL}/works/${id}.json`)
    // desestructuro la respuesta para devolver unicamente el nombre del libro con su id
    const { key, title } = response.data

    res.status(200).json({
      msg: 'Ok',
      data: {
        key,
        title
      }
    })
  } catch (error) {
    console.error(error)
    res.status(404).json({
      msg: 'Error',
      error: 'Libro no encontrado'
    })
  }
}

module.exports = {
  getLibros,
  getLibrosPorSubjects,
  getLibroPorId
}
