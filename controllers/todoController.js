var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// Connect to the database
mongoose.connect('mongodb+srv://yuxiao:yuxiao@cluster0.gyu3y.mongodb.net/Cluster0?retryWrites=true&w=majority', {useNewUrlParser: true});

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://yuxiao:yuxiao@cluster0.gyu3y.mongodb.net/Cluster0?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'buy flowers'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved');
// });

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

app.get('/todo', function(req, res) {
    // get data from mongodb and pass it to view
    console.log('christa!!');
    Todo.find({}, function(err, data) {
        if (err) throw err;
        res.render('todo', {todos: data});
    });
});

app.post('/todo', urlencodedParser, function(req, res) {
    // get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data) {
        if (err) throw err;
        res.json(data);
    })
});

app.delete('/todo/:item', function(req, res) {
    // delete the requested item from mogodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
        if (err) throw err;
        res.json(data);
    });
});

}