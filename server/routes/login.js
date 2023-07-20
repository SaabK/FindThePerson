require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../schemas/UserSchema');
const jwt = require('jsonwebtoken');

const router = express.Router();

// ROUTE: /login/
router.post('/', async (req, res) => {
	// AUTH: Authenticate the user and match the details present in the server

	const { email, password } = req.body;

	try {
		const thatOneUser = await User.findOne({ email }); // [ { email: ali } ]
		if (!thatOneUser)
			return res.json({ success: false, message: "The user doesn't exist" });

		console.log(thatOneUser);

		const passwordCompare = await bcrypt.compare(
			password,
			thatOneUser.password,
		);

		if (!passwordCompare) {
			return res.json({ success: false, message: 'Not Authorized' });
		}
		const accessToken = jwt.sign(
			thatOneUser.toJSON(),
			process.env.ACCESS_SECRET_KEY,
		);

		res.json({ success: true, message: 'Authorized', accessToken });
	} catch (error) {
		console.log(error);
		res.json({
			error,
			message: 'Invalid Credentials',
		});
	}

	// JWT Token Thingy
});

module.exports = router;
