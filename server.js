const http = require('http');
//const url = require('url');
//const fs = require("fs");

http.createServer(server).listen(1337, '127.0.0.1');

function server(req, res){

    console.log(require);
	if( require.url == '/'){
		var readableStream = fs.createReadStreamSync("index.html", "utf8");
        console.log(readableStream);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        //res.pipe(readableStream);

	}else if(require.url == '/save'){
		
	}
    res.end();
}