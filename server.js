const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/config");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
	secret: "Super secret secret",
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};
// tells express to use the session with the sess config var
app.use(session(sess));
// hadlebars documentation tells us to register the helper objects and utility functions
const hbs = exphbs.create({ helpers });
// sets up handlebars as the default template/view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// sets up express to parse json data
app.use(express.json());
// tells express to accept url data
app.use(express.urlencoded({ extended: false }));
// tells express to use the public folder as the root
app.use(express.static(path.join(__dirname, "public")));

// require the routes
app.use(require("./controllers/"));

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
	sequelize.sync({ force: false });
});
