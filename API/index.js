const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/shrimpfarm',{
useNewUrlParser: true,
useUnifiedTopology:true
});


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
//routes
app.use('/',routes());


app.listen(5000);