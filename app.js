/**
 * 暂定服务的入口文件
 */

var connect = require('connect');
var http = require('http');
var fs = require('fs');
var parseUrl = require('parseurl');
var serveStatic = require('serve-static');
var mongoose = require('mongoose');
var PersonSchema = require('./schema/person');


var app = new connect();

/*var db = mongoose.createConnection('localhost', 'test');//创建一个数据库连接
db.on('error', console.error.bind(console, '连接错误'));
var PersonModel = db.model('Person', PersonSchema); //将Schema发布为Model*/

app.use(serveStatic('www', {'index': ['index.html', 'index.htm']}));

app.use('/api/user', function(req, res, next) {
	//fs.writeFileSync('./json/output.json', JSON.stringify({a: 1, b: 2}), {flag: 'w+'});
	var JsonObj = JSON.parse(fs.readFileSync('output.json'));
	res.writeHead(200, {'Content-type': 'application/json'});
	//res.write(JsonObj);
	res.end(JSON.stringify(JsonObj));
	/*console.log(json.stringify(req));
	var content = new Buffer('hello', 'utf8');
	res.writeHead(200, {'Content-type' : 'text/html'});
	res.write(content);
	res.end;*/
});




//http.createServer(app).listen(3000);

app.listen(3000);