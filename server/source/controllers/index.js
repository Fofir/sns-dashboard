const mongodb = require('agenda/node_modules/mongodb');
const AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});
const AGENDA_NAME = require('../constants').AGENDA_NAME;

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
  	const job = agenda.schedule('in 2 seconds', AGENDA_NAME, req.body);
     return res.json({ message: 'Job created succesfully', job });
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
		const sns = new AWS.SNS();
		sns.listTopics({}, function(err, data) {
  		if (err) {
  			return res.send(err);
  		}

  		return res.json(data);
  	});
	}
})
