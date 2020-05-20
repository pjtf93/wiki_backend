const express = require('express');
const app = express();

const { config } = require('./wiki_api/config/index');
const wikiApi = require('./wiki_api/routes/wiki');

const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./wiki_api/utils/middleware/errorHandlers.js');

const notFoundHandler = require('./wiki_api/utils/middleware/notFoundHandler');
// const port = 3001;
// const { config } = require('./config/index');
// app.get('/', (req, res) => res.send('Hello World!'));

// body parser
app.use(express.json());

// routes
wikiApi(app);

// Catch 404
app.use(notFoundHandler);

// Errores middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () =>
  console.log(`Example app listening at http://localhost:${config.port}`)
);
