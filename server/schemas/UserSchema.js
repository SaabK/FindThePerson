const { Schema, model } = require('mongoose');
const Person = require('./PersonSchema');

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 8,
	},
	admin: {
		type: Boolean,
		required: false,
		default: false,
	},
	person: {
		type: Schema.Types.ObjectId,
		ref: 'Person',
		default: null,
	},
});

userSchema.pre('remove', async function (next) {
	if (this.person) {
		const Person = mongoose.model('Person');
		await Person.findByIdAndRemove(this.person);
	}

	next();
});

module.exports = model('User', userSchema);
