var express = require('express')
var path = require('path')
var fs = require('fs')
var mongoose = require('mongoose')
var _ = require('underscore')
var Page = require('./models/page')
var bodyParser = require('body-parser')
var port = process.env.PORT || 2222
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()
var xlsx = require('node-xlsx')
var app = express()

mongoose.connect('mongodb://127.0.0.1/test')

app.set('views','./views/pages')
app.set('view engine', 'jade')
// app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('imooc started on port ' + port)
 
//index page
app.get('/', function(req, res) {
	res.render('index', {
		title: 'lrd index'
	})
})

// detail page
app.get('/page/:id', function(req, res) {
	var id = req.params.id

	Page.findById(id, function(err, page){
		res.render('detail',{
			title: "static charts",
			page: page.page
		})
	})
})

//post page
app.post('/aaa', function(req, res){
	var pageObj = req.body.page;
	var _page = new Page({
		page : pageObj
	});
		_page.save(function(err, page){
			if(err){
					console.log(err)
				}
				res.send(page._id)
				// res.redirect('/page/' + page._id)
		})
})

//read excel
app.post('/excel', multipartMiddleware, function(req, res){
	var file = req.files.file
	var fileData = xlsx.parse(file.path)
	var outData = []
	for(var i=0;i<fileData[0].data.length;i++){
		outData[fileData[0].data.length-1-i]={
			key : fileData[0].data[i][0],
			value : fileData[0].data[i][1]
		};
	}
	var outDataStr = JSON.stringify(outData)
	res.send(outDataStr)
	console.log(outDataStr);
	console.log("##########");
	console.log(fileData);
})
