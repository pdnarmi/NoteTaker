const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname));

// Routes

require('./routes/routes')(app);

app.listen(PORT, ()=>{console.log('App listening on localhost:' + PORT)});