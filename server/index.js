require('dotenv').config();

const express = require('express');

const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const personRouter = require('./routes/person');

const connectToMongo = require('./db');
const User = require('./schemas/UserSchema');

const app = express();
const port = 4343;
connectToMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//TODO: Wrap everything in try catch blocks

app.get('/', async (req, res) => {
	try {
		const users = await User.find().populate('person');
		res.json(users);
	} catch (error) {
		res.json({ error });
	}
});

app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/person', personRouter);

app.listen(port, () =>
	console.log(`App is running on ${port} | https://localhost:4343/`),
);

// Now for the user to use the protected routes, I just need to pass authenticateToken as the middleware to the route. And I will be able to access req.user object and get the info I want
