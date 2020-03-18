////////////////////////////////////////////////////////
// Set up:
////////////////////////////////////////////////////////

// Set port number and hostname
const PORT = 8081;
const HOST = 'http://localhost';

// local imported libraries
const bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  express = require('express'),
  session = require('express-session'),
  http_module = require('http'),
  path = require('path');

global.app_path = path.join(__dirname, 'public');
if (global.app_path.includes(':')) {
  global.app_path = path.join(__dirname, 'public').split(':')[1];
}
// api
const api = require('./routes/api');

// pages
const {
  getHomePage,
  get404Page,
} = require('./routes/pages');

// Initialize express app and http server
const app = express();
const http = http_module.Server(app);

// get path
global.currentPath = process.cwd();
global.dataFolder = currentPath + '/data/';

// configure middlewares
// set
app.set('port', process.env.PORT || PORT); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine

// use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static('/')); // configure express to use public folder
app.use('/', express.static(__dirname + '/public/'));
app.use(cookieParser());
app.use(
  session({
    secret: "Secret Code Don't Tell Anyone",
    cookie: { maxAge: 30 * 1000 },
    resave: true,
    saveUninitialized: true,
  }),
);
app.use('/api', api);

////////////////////////////////////////////////////////
// Routes for the App:
////////////////////////////////////////////////////////

// get
app.get('/', getHomePage);

// everything else -> 404
app.get('*', get404Page);

////////////////////////////////////////////////////////
// Database Setup:
////////////////////////////////////////////////////////


////////////////////////////////////////////////////////
// Start Server:
////////////////////////////////////////////////////////
const server = http.listen(app.get('port'), () => {
  console.info(`==> 🌎  Go to ` + HOST + `:${app.get('port')}`);
});