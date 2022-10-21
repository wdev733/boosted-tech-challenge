const path = require('path');
// load dependencies
const env = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Loading Routes
const webRoutes = require('./routes/web');
const sequelize = require('./config/database');
const errorController = require('./app/controllers/ErrorController');

env.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(webRoutes);
app.use(errorController.pageNotFound);

sequelize
	//.sync({force : true})
	.sync()
	.then(() => {
		app.listen(process.env.PORT);
		//pending set timezone
		console.log("App listening on port " + process.env.PORT);
	})
	.catch(err => {
		console.log(err);
	});
