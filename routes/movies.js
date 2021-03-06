const express = require('express');
const MoviesService = require('../services/movies');

const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema,
} = require('../utils/schema/movies');

const validationHandler = require('../utils/mocks/middleware/validationHandler');

function moviesApi(app) {
    const router = express.Router();
    app.use("/api/movies", router)

    const moviesService = new MoviesService();

    router.get("/", async function(req, res, next) { 
        const { tags } = req.query;
        
        try {
            const movies = await moviesService.getMovies({ tags });
            throw new Error('Error getting movies');

            res.status(200).json({
            data: movies,
            message: 'movies listed'
            });
        } catch(err) {
            next(err);
        }
    });

    router.get("/:movieID", validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        const { movieId } = req.params;

        try {
            const movies = await moviesService.getMovie({ movieId });

            res.status(200).json({
                data: movies,
                message: 'movie retrieved'
            });
        } catch (err) {
            next(err);
        }
    });

    router.post("/", validationHandler(createMovieSchema), async function(req, res, next) { 
        const { body: movie } = req;

        try {
            const createMovieId = await moviesService.createMovie({ movie });

            res.status(201).json({
                data: createMovieId,
                message: 'movies created'
            });
        } catch(err) {
            next(err);
        }
    });

    router.put("/:movieID", validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async function (req, res, next) {
        const { movieId } = req.params;
        const { body: movie } = req;

        try {
            const updateMovieId = await moviesService.updateMovie({ 
                movieId, 
                movie 
            });

            res.status(200).json({
                data: updateMovieId,
                message: 'movie updated'
            });
        } catch (err) {
            next(err);
        }
    });

    router.delete("/:movieID", validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        const { movieId } = req.params;
        try {
            const deleteMovieId = await moviesService.deleteMovie({ movieId });

            res.status(200).json({
                data: deleteMovieId,
                message: 'movie deleted'
            });
        } catch (err) {
            next(err);
        }
    });
}

module.exports = moviesApi;



