const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  name: String,
  deleted: Boolean, 
  topic: String,
  time: Date,
}, {
	timestamps: { createdAt: 'createdAt' }
});

module.exports = mongoose.model('Job', JobSchema);