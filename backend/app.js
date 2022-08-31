require('dotenv').config()
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
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

const { PORT = 3003 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const corsOptions = {
  origin: [
    'https://mesto.praktikum.nomoredomains.sbs',
    'http://mesto.praktikum.nomoredomains.sbs',
    'https://api.mesto.praktikum.nomoredomains.sbs',
    'http://api.mesto.praktikum.nomoredomains.sbs',
    'http://localhost:3000',
    'https://locahost:3000',
    'http://localhost:3001',
    'https://locahost:3001',
  ],
}

app.use(cors())
app.use(helmet());
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);
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
