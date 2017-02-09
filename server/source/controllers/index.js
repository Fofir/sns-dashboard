const mongodb = require('agenda/node_modules/mongodb');
const AWS = require('aws-sdk');
const Promise = require('bluebird');
const AGENDA_NAME = require('../constants').AGENDA_NAME;
var sns = new AWS.SNS();

module.exports = (agenda) => ({
  // lists all jobs
  listJobs: (req, res) => {
    agenda.jobs({ name: AGENDA_NAME }, function(err, jobs) {
      if (err) {
        return res.send(err);
      }
      
      return res.json(jobs);
    });
  },

  // Creates a job 
  createJob: (req, res) => {
    const time = req.body.time;
    const job = agenda.schedule(time, AGENDA_NAME, req.body, (err, job) => {
      if (err) {
        return res.send(err);
      };

      return res.json(job);
    });
  },

  // Deletes a job using Agenda
  deleteJob: (req, res) => {
    const _id = mongodb.ObjectID(req.params.id);
    agenda.jobs({ _id }, (err, jobs) => {
      if (!jobs || !jobs.length) {
        return res.send('Not found');
      }

      const job = jobs[0];

      job.remove(function(err) {
          if(err) {
            res.send(err);
          }

          return res.json({ message: 'Job deleted successfully' });
      })
    });
  },

  // Gets all user topics from AWS
  getTopics: (req, res) => {
    const getTopics = () => sns.listTopics({}).promise()
      .then(res => res.Topics);

    const extendTopicsWithSubscribers = (topics) => {
      return Promise.map(topics, topic => {
        return sns.getTopicAttributes({ TopicArn: topic.TopicArn })
          .promise()
          .then(res => res.Attributes)
          .then(attributes => ({
            name: attributes.DisplayName,
            topicArn: attributes.TopicArn,
            subscriptions: attributes.SubscriptionsConfirmed
          }));
      });
    };

    return getTopics()
      .then(extendTopicsWithSubscribers)
      .then(topics => res.json(topics))
  }
})
