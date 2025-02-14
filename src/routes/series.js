// Rutas para series - Stefano
const { Router } = require('express');
const { getSeries, getSeriePorId, getSeriesPorGenero, searchSeries } = require('../controllers/series');
const rutas = Router();

// Listado general de series (máximo 50 por página)
rutas.get('/', getSeries);

// Filtrar series por género
rutas.get('/genero', getSeriesPorGenero);

// Buscar series por nombre
rutas.get('/buscar', searchSeries);

// Obtener una serie por ID
rutas.get('/:id', getSeriePorId);

module.exports = rutas;
