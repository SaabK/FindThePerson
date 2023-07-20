const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../schemas/UserSchema');

const router = express.Router();

// FOR: /signup/
router.post('/', async (req, res) => {
	// Create an account for User

	const { name, email, password } = req.body;

	// Securing the password

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const user = new User({
			name,
			email,
			password: hashedPassword,
		});

		await user.save();

		res.json(user);
	} catch (error) {
		res.json({
			error,
			message: 'The account with a similar email already exists',
		});
	}
});

module.exports = router;
