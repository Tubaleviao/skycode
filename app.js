const express = require('express'),
  http = require('http'),
  bodyParser = require('body-parser'),
  app = express(),
  session = require('express-session')

const server = http.createServer(app),
  io = require('socket.io')(server),
  session_secret = process.env.SESSION_SECRET || 'nosecrethereisusedsoyeah'


app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))
app.use(session({ secret: session_secret, saveUninitialized: true, resave: false }))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/', function(req, res){res.render('home')})
app.get('/home', function(req, res){res.render('home')})
app.get('/thunder', function(req, res){res.render('thunder')})
app.get('*', function(req, res){res.send('Nothing here.')})

//io.of('/bitcoin').on('connection', code.bitcoin)

server.listen(3000, function(){console.log("Server running at the port %d", 3000)})