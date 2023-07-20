const { Schema, model, SchemaTypes } = require('mongoose');

const imageSchema = Schema({
	name: {
		type: String,
		required: true,
	},
	image: {
		data: Buffer,
		contentType: String,
	},
});

module.exports = model('Image', imageSchema);
