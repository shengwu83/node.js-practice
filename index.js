var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.post;
handle["/postText"] = requestHandlers.postText;
handle["/post"] = requestHandlers.post;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;


server.start(router.route , handle);