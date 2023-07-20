const { Schema, model, SchemaTypes } = require('mongoose');

const Image = require('./ImageSchema');
const User = require('./UserSchema');
const UserSchema = require('./UserSchema');

//TODO: Break the schema into smaller schemas

const personSchema = new Schema({
	firstName: {
		type: String,
		// required: true,
		minLength: 3,
	},
	middleName: {
		type: String,
		minLength: 2,
	},
	lastName: {
		type: String,
		// required: true,
		minLength: 3,
	},
	age: {
		type: Number,
		// required: true,
		min: 0,
		max: 999,
	},
	email: {
		type: String,
		// required: true,
		unique: true,
		lowercase: true,
	},
	// bestFriends: {
	// 	type: [String],
	// },
	// createdAtDate: {
	// 	type: Date,
	// 	default: () => Date.now(),
	// 	immutable: true,
	// },
	// updatedAtDate: {
	// 	type: Date,
	// 	default: () => Date.now(),
	// },
	// hobbies: {
	// 	type: [String],
	// 	// required: true,
	// },
	// address: {
	// 	city: String,
	// 	town: String,
	// 	street: String,
	// },
	// fatherName: {
	// 	type: String,
	// 	// required: true,
	// },
	// motherName: {
	// 	type: String,
	// },
	// grandParentsFromFather: {
	// 	grandFather: {
	// 		type: String,
	// 		minLength: 3,
	// 	},
	// 	grandMother: {
	// 		type: String,
	// 		minLength: 3,
	// 	},
	// },
	// grandParentsFromMother: {
	// 	grandFather: {
	// 		type: String,
	// 		minLength: 3,
	// 	},
	// 	grandMother: {
	// 		type: String,
	// 		minLength: 3,
	// 	},
	// },
	// greatGrandFather: {
	// 	type: String,
	// 	minLength: 3,
	// },
	// greatGrandMother: { type: String, minLength: 3 },
	// tribe: {
	// 	type: String,
	// 	minLength: 3,
	// },
	// famousDescendent: {
	// 	type: String,
	// 	minLength: 3,
	// },
	// dynasty: {
	// 	type: String,
	// 	minLength: 3,
	// },
	// netWorth: {
	// 	amount: {
	// 		type: Number,
	// 		// required: true,
	// 	},
	// 	unit: {
	// 		type: String,
	// 		// required: true,
	// 	},
	// },
	// dob: {
	// 	type: String,
	// 	// required: true,
	// },
	// countryOfBirth: {
	// 	type: String,
	// 	// required: true,
	// },
	// photo: {
	// 	// type: SchemaTypes.ObjectId,
	// 	// ref: 'Image',
	// 	type: String,
	// },
	// achievement: {
	// 	type: String,
	// 	minLength: 10,
	// 	maxLength: 300,
	// },
	personBy: {
		type: SchemaTypes.ObjectId,
		ref: 'User',
	},
});

personSchema.pre('save', function (next) {
	this.updatedAtDate = Date.now();

	next();
});

module.exports = model('Person', personSchema);

// A person info should be like name, age, email, phone number, createdAtDate, updatedAtDate, bestFriends, hobbies, address { street, city, town } father name, mother name, grand father x2, grand mother x2, greatGrandFather, greatGrandMother, Tribe Name, Famous Descendent, netWorth, dob, countryOfBirth, Personal Photo, Biggest Achievement, anotherPerson (this feature will be added in future	)
