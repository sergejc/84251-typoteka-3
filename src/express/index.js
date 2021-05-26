'use strict';

const express = require(`express`);
const routes = require(`./routes`);
const path = require(`path`);
const {logger} = require(`../api/logger`);
const bodyParser = require(`body-parser`);

const DEFAULT_PORT = 8080;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(`markup`));
app.set(`views`, path.join(__dirname, `templates`));
app.set(`view engine`, `pug`);
app.use(routes);


app.listen(DEFAULT_PORT,
    () => logger.info(`Сервер запущен на порту: ${DEFAULT_PORT}`));
