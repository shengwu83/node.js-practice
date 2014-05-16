var querystring = require("querystring"),
fs = require("fs"),
formidable = require("formidable");


function post(response){
	console.log("request for 'start' called");

	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function postText(response){
	console.log("request for 'start' called");

	var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" content="text/html; '+
	'charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="/upload" method="post">'+
	'<textarea name="text" rows="20" cols="60" ></textarea>'+
	'<input type="submit" value="submit" />'+
	'</form>'+
	'</body>'+
	'</html>';

	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(body);
	response.end();
}

function upload(response,request){
	console.log("request for 'upload' called");
	var form = new formidable.IncomingForm();
	console.log('about to parse');
	form.parse(request, function(error, fields, files){
		console.log('parsing done');
		fs.renameSync(files.upload.path,"./tmp/test.gif");

		response.writeHead(200,{"Content-Type":"text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}

function show(response, req){
	console.log("request for 'show' called");
	fs.readFile("./tmp/test.gif","binary",function(error, file){
		if(error){
			response.writeHead(500,{"Content-Type":"text/plain"});
			response.write(error+"\n");
			response.end();
		}else{
			response.writeHead(200, {"Content-Type":"image/gif"});
			response.write(file, "binary");
			response.end();
		}
	});

}
exports.postText = postText
exports.post = post
exports.upload = upload
exports.show = show