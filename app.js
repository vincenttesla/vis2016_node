var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
var Page = require('./models/page')
var bodyParser = require('body-parser')
var port = process.env.PORT || 2222
var app = express()

mongoose.connect('mongodb://127.0.0.1:2222/test')

app.set('views','./views/pages')
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('imooc started on port ' + port)
 
//index page
app.get('/', function(req, res) {
	res.render('index', {
		title: 'lrd index'
	})
})

//post page
app.post('/', function(req, res){
	var pageObj = req.body.page;
	var _page = new Page({
		page : pageObj
	});
		_page.save(function(err, page){
			if(err){
					console.log(err)
				}
				console.log(page)
				res.redirect('/page/' + page._id)
		})
})

// detail page
app.get('/page/:id', function(req, res) {
	var id = req.params.id

	Page.findById(id, function(err, page){
		res.render('detail', {
			title: 'pageview',
			page: page
		})
	})
})