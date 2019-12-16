import app, { set } from 'app'; 

var port = normalizePort(process.env.PORT || '3000'); 
set('port', port); 

var server = http.createServer(app); 

server.listen(port); 
server.on('error', onError); 
server.on('listening', onListening); 