const http = require('http');
const url = require('url');
const fs = require("fs");

http.createServer(server).listen(1337, '127.0.0.1');

function server(require, resolve){
	
	if( require.url == '/'){
		let readableStream = fs.createReadStream("index.html", "utf8");
		
		res.writeHead(200, { 'Content-Type': 'text/html' });
		readableStream.pipe(res);
		res.end();
	}else if(require.url == '/save'){
		
	}
}