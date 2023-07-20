const mongoose = require('mongoose');

const connectToMongo = () => {
	mongoose
		.connect('mongodb://127.0.0.1:27017/DailyKnowledge')
		.then(console.log('Connected to Database'))
		.catch(err => console.error(err));
};

module.exports = connectToMongo;
