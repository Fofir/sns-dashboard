const AWS = require('aws-sdk');
const AGENDA_NAME = require('../constants').AGENDA_NAME;
const sns = new AWS.SNS();

module.exports = {
  [AGENDA_NAME]: {
    options: { priority: 'high', concurrency: 10 },
    handler: (job, done) => {
      const data = job.attrs.data;
      console.log('sending a push notification for topic', data.topic);

      var params = {
        Message: data.message,
        TopicArn: data.topic
      };

      sns.publish(params, (err, data) => {
        if (err) {
          console.log(err, err.stack)
        };

        console.log('published sns notification successfuly')
        done();
      });
    }
  }
};
