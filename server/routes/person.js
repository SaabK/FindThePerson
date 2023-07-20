const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const Person = require('../schemas/PersonSchema');
const User = require('../schemas/UserSchema');

const mongoose = require('mongoose');

const router = express.Router();

// ROUTE: /person
router.get('/', authenticateToken, async (req, res) => {
	// Get the person of the user if it exists

	const person = await Person.findOne({}).populate('personBy');

	res.json(person);
});

// ROUTE: /person/create
router.post('/create', authenticateToken, async (req, res) => {
	const {
		uid,
		firstName,
		middleName,
		lastName,
		age,
		email,
		// bestFriends,
		// createdAtDate,
		// updatedAtDate,
		// hobbies,
		// address, // city, town, street
		// fatherName,
		// motherName,
		// grandParentsFromFather, // grandFather, grandMother
		// grandParentsFromMother, // grandFather, grandMother
		// greatGrandFather,
		// greatGrandMother,
		// tribe,
		// famousDescendent,
		// dynasty,
		// netWorth, // amount, unit
		// dob,
		// countryOfBirth,
		// photo,
		// achievement,
		// personBy,
	} = req.body;
	const personObj = req.body;
	try {
		// Create the Person for the user, if the Person doesn't already exist
		const thatOneUser = await User.findById(uid);
		console.log(thatOneUser);

		// I don't phocking understand this code, but it works
		// If Person ID is invalid:
		const personExists = await Person.findById(thatOneUser.person);
		console.log(personExists);
		if (!personExists) {
			thatOneUser.person = null;
			await thatOneUser.save();
		}

		if (thatOneUser.person != null && !thatOneUser.admin) {
			// If the person exists:
			console.log('in the if: ', thatOneUser.person);
			return res.json({
				message:
					'You have already created a person. Only 1 person is allowed per account',
			});
		}

		const person = new Person({
			...personObj,
			personBy: thatOneUser._id,
		});
		await person.save();

		// Update the user and attach the person with it
		await User.findOneAndUpdate(
			{ _id: uid },
			{ person: person._id },
			{ new: true, runValidators: true },
		);

		// console.log('Person Object: ', personObj);
		// console.log('New Person: ', person);

		res.json(person);
	} catch (error) {
		res.json({
			error,
			message: 'Some error occurred',
		});
	}
});

module.exports = router;
