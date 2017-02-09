require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const validate = require('express-validation');
const AWS = require('aws-sdk');
const Agenda = require('agenda');
const agenda = new Agenda({db: {address: process.env.DB_URI}});
const controllers = require('./source/controllers')(agenda);
const processors = require('./source/processors');
const schemas = require('./source/schemas');
const AGENDA_NAME = require('./source/constants').AGENDA_NAME;

AWS.config.update({ region: process.env.AWS_REGION });

agenda.define(AGENDA_NAME, processors[AGENDA_NAME].options, processors[AGENDA_NAME].handler);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const apiRouter = express.Router();

apiRouter.route('/topics')
  .get(controllers.getTopics);

apiRouter.route('/jobs')
  .get(controllers.listJobs)
  .post(
    validate(schemas.createJob),
    controllers.createJob
  );

apiRouter.route('/jobs/:id')
  .delete(
    validate(schemas.deleteJob),
    controllers.deleteJob
  );

app.use('/api', apiRouter);

agenda.on('ready', () => {
  agenda.start();
  app.listen(port);
});

console.log('connected on ' + port);