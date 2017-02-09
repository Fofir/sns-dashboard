const AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});

module.exports = {
	// lists all jobs
	listJobs: (req, res) => {

	},

	// Creates a job 
	createJob: (req, res) => {

	},

	// Deletes a job (soft delete)
	deleteJob: (req, res) => {

	},

	// Gets all user topics from AWS
	getTopics: (req, res) => {
		const sns = new AWS.SNS();
		sns.listTopics({}, function(err, data) {
  		if (err) {
  			res.send(err);
  		}

  		res.json(data);
  	});
	}
}
