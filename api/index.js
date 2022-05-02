const express = require('express');
require('colors');
// import environment variables (from .env file)
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

const db = require('./config/db');
const app = express();
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const errorHandler = require('./v1/middlewares/errorHandler');

app.use(hpp());
app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database connection
db.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}...`.cyan.bold);
  });
  console.log('Connected to database'.yellow.bold);
}).catch((err) => {
  console.log(err);
  console.log(`${err.name}: ${err.message}`.red.bold);
  console.log('Error connecting to database !'.red.bold);
});

// security
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());

const messageRoute = require('./v1/routes/messageRoute');
const summaryRoute = require('./v1/routes/summaryRoute');
const userRoute = require('./v1/routes/userRoutes');

app.use('/messages', messageRoute);
app.use('/summary', summaryRoute);
app.use('/users', userRoute);

// error handler
app.use(errorHandler);

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log(`${err.name}: ${err.message}`.bold.red);
  console.log('UNHANDLED REJECTION! SERVER SHUT DOWN!'.bold.red);
  process.exit(1);
});
