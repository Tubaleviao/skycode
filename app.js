const express = require('express'),
  https = require('https'),
  bodyParser = require('body-parser'),
  app = express(),
  session = require('express-session'),
  fs = require('fs')

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/skycode.work/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/skycode.work/fullchain.pem')
}

const server = https.createServer(options, app),
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

server.listen(443, function(){console.log("Server running at the port %d", 443)})