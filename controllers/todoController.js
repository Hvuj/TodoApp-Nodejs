var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to db
const URI = 'mongodb+srv://Hvuj:a182288H@todos-jsrq6.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(URI, {useNewUrlParser: true });


//create Schema
var todoSchema = new mongoose.Schema({
    item: String
});

//create model
var Todo = mongoose.model('Todo', todoSchema);

// var data = [];
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

module.exports = function (app) {

    app.get('/', (req, res) => {
        //get data from mongodb and pass it to the view
        Todo.find({}, (err, data)=>{
            if(err) throw err;
            res.render('todo', {
                todos: data
            });
        });
        //render view
        // res.render('todo', {
        //     todos: data
        // });
    });

    app.post('/', urlencodedParser, (req, res) => {
        //get data from the view and add it to db
        var newTodo = Todo(req.body).save((err, data)=>{
            if(err) throw err;
            res.json(data);
        });
        // data.push(req.body);
        // res.render('todo', {
        //     todos: data
        // });
        // res.json({todos: data});
    });

    app.delete('//:item', (req, res) => {
        //delete the requested item from db
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
            if(err) throw err;
            res.json(data);
        });
        // data = data.filter((todo) => {
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.json(data);
    });
}