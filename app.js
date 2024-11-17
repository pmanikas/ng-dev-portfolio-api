const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const SERVER_PORT = process.env.PORT || 3100;

async function startDBConnection() {
  await mongoose.connect(config.database)
    .then(_res => console.log(`Connected to database ${config.database}`))
    .catch(error => console.log(`Database error ${error}`));
}

async function initApp() {
  await startDBConnection();

  const app = express();
  
  // Enables cors Middleware
  app.use(cors());
  
  // Set Static Folder
  app.use(express.static(path.join(__dirname, 'public')));
  
  // Body Parser replace as it was depricated
  app.use(express.json({ limit: '10mb' }));
  
  // Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());
  require('./config/passport')(passport);
  
  // Call routes
  require('./routes/index')(app);
  
  // Start Server
  app.listen(SERVER_PORT, () => console.log(`Server is running on http://localhost:${SERVER_PORT}`));
}

initApp();