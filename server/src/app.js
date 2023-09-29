require('dotenv').config();
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);

const apiRouter = require('./routers/api.router');

const { PORT, SECRET_KEY_SESSION } = process.env;
const corsOptions = {
  origin: [process.env.CORS_PORT],
  credentials: true,
};

const sessionConfig = {
  store: new FileStore(),
  secret: SECRET_KEY_SESSION,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 100 * 60 * 1000,
    httpOnly: true,
  },
};

// const httpsOptions = {
//   key: fs.readFileSync(path.join(process.cwd(), '/certs/privkey.pem')),
//   cert: fs.readFileSync(path.join(process.cwd(), '/certs/fullchain.pem')),
// };

const app = express();

app.use(expressSession(sessionConfig));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use(express.static(path.join(process.cwd(), 'storage')));

// app.use((req, res, next) => {
//   if (!req.secure && req.protocol !== 'https') {
//     const { host } = req.headers;
//     const parts = host.split(':');
//     const hostName = parts[0];
//     res.redirect(`https://${hostName}${req.url}`);
//   } else {
//     next();
//   }
// });

app.use('/api', apiRouter);

// const httpsServer = https.createServer(httpsOptions, app);

// http.createServer(app).listen(PORT, () => {
//   console.log(`HTTP-server started on port ${PORT}`);
// });

// httpsServer.listen(443, () => {
//   console.log('`HTTP-server started on port 443');
// });

app.listen(PORT, () => {
  console.log('Server started - УСПЕХ НЕИЗБЕЖЕН');
  console.log('➜  Local:   ', `http://localhost:${PORT}/`);
});
