const express = require('express');
const fs = require('fs')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const apis = require('./api.js')
const cors = require('cors')


const app = express();

app.use(cookieParser('bbtsSession'))
app.use(session({
	secret: 'bbtsSession',
	resave: true,
	saveUninitialized: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
	origin:['http://localhost:8080'],
	methods: ['GET','POST', 'DELETE','PUT'],
	alloweHeaders: ['Conten-Type', 'Authorization']
}))
app.use(apis)

// const resolve = file => path.resolve(__dirname, file)

// app.use('/dist', express.static(resolve('./dist')))


// app.get('/', function(req, res){
// 	res.send('Hello Word!');
// })

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});