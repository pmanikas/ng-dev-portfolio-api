const users = require('./user.route');
const projects = require('./projects.route');
const articles = require('./articles.route');
const services = require('./services.route');
const uploader = require('./upload.route');

module.exports = (app) => {
  app.use('/users', users); 
  app.use('/projects', projects); 
  app.use('/articles', articles); 
  app.use('/services', services); 
  app.use('/upload', uploader); 

  app.get('/', (req, res) => {
    res.send('Unauthorised');
  })

  app.get('*', (req, res) => {
    res.send('Unauthorised');
  })
}