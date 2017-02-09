const AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});
const Job = require('../models/job');

module.exports = {
	// lists all jobs
	listJobs: (req, res) => {
  	Job.find(function(err, jobs) {
      if (err) {
      	return res.send(err);
      }
      
      return res.json(jobs);
    });
	},

	// Creates a job 
	createJob: (req, res) => {
    const job = new Job();
    job.name = req.body.name;

    job.save(function(err) {
      if (err) {
        return res.send(err);
      }

      return res.json({ message: 'Job created succesfully' });
    });
	},

	// Deletes a job (soft delete)
	deleteJob: (req, res) => {
    Job.findById(req.params.id, (err, job) => {
    	if (err) {
        return res.send(err);
    	}

    	job.deleted = true;

    	job.save((err) => {
		    if (err) {
		    	return res.send(err);
		    }

	      return res.json({ message: 'Job deleted successfully' });
	    });
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
}
