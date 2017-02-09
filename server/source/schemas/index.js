const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
	createJob: {
		body: {
			time: Joi.date().required(),
			topic: Joi.string().required()
		}
	},
	deleteJob: {
		params: {
			id: Joi.objectId().required()
		}
	}
};
