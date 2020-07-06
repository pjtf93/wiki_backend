const { config } = require('./wikiAPi/config/index');
const { sequelize } = require('./wikiAPi/lib/postgresql');
const userApi = require('./wikiAPi/routes/users');
const postApi = require('./wikiAPi/routes/posts');
const categoryApi = require('./wikiAPi/routes/category');
const commentApi = require('./wikiAPi/routes/comments');
const loginApi = require('./wikiAPi/routes/login');

const express = require('express');
const cors = require('cors');
const app = express();

// cors
app.use(cors());

// body parser
app.use(express.json());

// routes
loginApi(app);
userApi(app);
postApi(app);
categoryApi(app);
commentApi(app);
//
app.get('/', (req, res) => res.send('Notes App esto sirve'));

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
});
