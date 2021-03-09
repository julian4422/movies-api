const express = require("express");
const app = express();

const { config } = require("./config/index");
const moviesApi = require('./routes/movies.js');

const { 
    logError,
    wrapErrors, 
    errorHandler,
} = require('./utils/mocks/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/mocks/middleware/notFoundHandler');

//body parser
app.use(express.json());

// routes
moviesApi(app);

// catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logError);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
    console.log(`listening http://localhost:${config.port}`);
});