const AGENDA_NAME = require('../constants').AGENDA_NAME;
module.exports = {
	[AGENDA_NAME]: {
		options: { priority: 'high', concurrency: 10 },
		handler: (job, done) => {
  		const data = job.attrs.data;
  		console.log('sending a push notification', data);
  		done();
		  // emailClient.send({
		  //   to: data.to,
		  //   from: 'example@example.com',
		  //   subject: 'Email Report',
		  //   body: '...'
		  // }, done);
		}
	}
};
