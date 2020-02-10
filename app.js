var express  = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//set template engine
app.set('view engine', 'ejs');

//static files-middleware
app.use(express.static('./public'));

//fire controllers
todoController(app);

//litsin to port
app.listen(3000);
console.log('you r litsining to port 3000');