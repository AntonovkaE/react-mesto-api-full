require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors')
const corsOrigins = {
  origin: [
    'https://mesto.antonovskaya.nomoredomains.sbs/',
    'https://api.mesto.antonovskaya.nomoredomains.sbs/'],
    credentials: true,
}

const {
  errors,
} = require('celebrate');
const {
  NotFoundError,
} = require('./utils/errors/NotFoundError');
const {
  login,
  createUser,
} = require('./controllers/user');
const auth = require('./middlewares/auth');
const { validateSignUp, validateSignIn } = require('./utils/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require("./utils/errors/errorHandler");

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(cors());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use('/', () => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT);
