var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
var Page = require('./models/page')
var bodyParser = require('body-parser')
var port = 2222
var app = express()

mongoose.connect('mongodb://localhost/nodemongo')

app.set('views','./views/pages')
app.use(bodyParser.urlencoded())
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
app.post('/', function(res, req){
	var pageObj = req.body.page
	var _page

		_page = new Page(pageObj.slice(0));

		_page.save(function(err, page){
			if(err){
					console.log(err)
				}

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