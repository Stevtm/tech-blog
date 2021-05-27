const express = require("express");
const path = require("path");

// --- uncomment this when it is time to use session ---
// const session = require("express-session");

const exphbs = require("express-handlebars");
// const helpers = require("./utils/helpers");

// initialize the app
const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");

// --- uncomment this when it is time to use session ---
// const SequelizeStore = require("connect-session-sequelize")(session.Store);
// set up sessions
// const sess = {
// 	secret: "RAZAcw2a",
// 	cookie: {},
// 	resave: false,
// 	saveUnititialized: true,
// 	store: new SequelizeStore({
// 		db: sequelize,
// 	}),
// app.use(session(sess));

// require express-handlebars
const hbs = exphbs.create({});

// set up express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// require express-handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// require controller routes
// app.use(require("./controllers/"));

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
	app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});
