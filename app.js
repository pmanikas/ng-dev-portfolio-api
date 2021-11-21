const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const SERVER_PORT = process.env.PORT || 3100;

// Connect to Database
const DB_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

let connectionStatus = 'INIT';

const startDBConnection = async () => {
  await mongoose.connect(config.database, DB_OPTIONS)
    .then(res => {
      console.log(`Connected to database ${config.database}`);
      connectionStatus = `CONNECTED`;
    })
    .catch(error => {
      console.log(`Database error ${error}`);
      connectionStatus = `ERROR ${error}`;
    });
}

const initApp = async () => {
  await startDBConnection();

  const app = express();
  
  // Enables cors Middleware
  app.use(cors());
  
  // // Set Static Folder
  app.use(express.static(path.join(__dirname, 'public')));
  
  // Body Parser replace as it was depricated
  app.use(express.json({ limit: '20mb' }));
  
  // Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());
  require('./config/passport')(passport);

  // DEV - return connection status
  app.get('/', (req, res) => res.send(
    `
      Status: ${connectionStatus}
      <br>
      IP: ${req.ip}
      <br>
      HEADERS: ${JSON.stringify(req.headers)}
    `
  ));
  
  // Call routes
  require('./routes/index')(app);
  
  // Start Server
  app.listen(SERVER_PORT, () => console.log(`Server is running on http://localhost:${SERVER_PORT}`));
}

initApp();