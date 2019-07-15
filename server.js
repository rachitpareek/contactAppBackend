var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var path = require ('path');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

// This function can be written normally, as below, or anonymously, as further below
// function onRequest(request, response){
//     response.writeHead(200, {'Content-type': 'text/plain'});
//     response.write(module2.myString);
//     module2.myFunction();
//     response.end();
// }

// var port = 3000;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Use CORS, Mongoose later
app.use(cors());

//Connect to MongoDB
// mongoose.connect('mongodb+srv://test:test@testdb-o09u9.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connect('mongodb+srv://new:test@testdb-o09u9.mongodb.net/test?retryWrites=true&w=majority');
//on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb @ 27017');
})
mongoose.connection.on('error', (err) => {
    if (err) {
    console.log(err + ' in database connection');
    }
})

//Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', tasks);

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => { console.log(`App listening on port ${PORT}!`); });

// app.listen(port, () =>
//     console.log('Server started on port '+ port)
// );


