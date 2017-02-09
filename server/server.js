require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const controllers = require('./source/controllers');

// @TODO: Add error handling for failed connection
mongoose.connect(process.env.DB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const apiRouter = express.Router();

apiRouter.route('/topics')
  .get(controllers.getTopics);

apiRouter.route('/jobs')
  .get(controllers.listJobs)
  .post(controllers.createJob);

apiRouter.route('/jobs/:id')
  .delete(controllers.deleteJob);

app.use('/api', apiRouter);

app.listen(port);
console.log('connected on ' + port);