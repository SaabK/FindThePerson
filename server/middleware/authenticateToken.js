require('dotenv').config();

const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
	// Bearer TOKEN

	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.sendStatus(401);
	}

	jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
		if (err) {
			return res.sendStatus(403);
		}
		// Now that there is no error, set the user on the request object to send the user info to client
		req.user = user;
		next();
	});
}

module.exports = authenticateToken;
