//Create ToDo model
const {Schema, model } = require('mongoose');

const schema = new Schema({
	title: {
		type: String, //Type string
		required: true //Required parametr
	},
	completed: {
		type: Boolean, //Type is boolean 
		default: false //Default value
	}
})
module.exports = model('Todo', schema);