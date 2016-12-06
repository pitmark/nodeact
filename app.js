var http = require('http'),
      fs =require('fs');　//ファイルシステムモジュールの読み込み
var server = http.createServer();
var settings = require('./settings');
var nowdir;

var header_data = fs.readFileSync(__dirname + '/views/header.html', 'utf-8');
var footer_data = fs.readFileSync(__dirname + '/views/footer.html', 'utf-8');


console.log(settings);
server.on('request', function(req, res) {
switch (req.url) {
    case '/':
      nowdir = 'home';
    break;

    default:
      nowdir = '404';
    break;
}

if ( req.url.match(/.css/)) {
    nowdir = "css";
    cssfile = req.url;
}

console.log(nowdir);
  if(nowdir != "css" && nowdir != "js"){
  fs.readFile(__dirname + '/views/'+nowdir+'.html', 'utf-8', function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'});　//htmlファイルなんでhtml
    res.write(header_data + data + footer_data);
    res.end();
  });
  }else{
  fs.readFile(__dirname +'/public_html'+ cssfile , 'utf-8', function(err, data){
    res.writeHead(200, {'Content-Type': 'text/css'});　//CSSファイルなんでCSS
    res.write(data);
    res.end();
  });
  }

});
server.listen(settings.port,settings.host)
