const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const routes = require('./routes');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);

mongoose.connect('mongodb+srv://thatjob:thatjob@cluster0-dlam4.mongodb.net/users?retryWrites=true&w=majority', 
    { useNewUrlParser: true , useUnifiedTopology: true}
);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);