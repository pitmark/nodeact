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

    case '/about':
      nowdir = 'about';
    break;

    case '/login':
      nowdir = 'login';
    break;

    default:
      nowdir = '404';
    break;
}

if ( req.url.match(/.css/)) {
    nowdir = "css";
    cssfile = req.url;
}

if ( req.url.match(/.js/)) {
    nowdir = "js";
    jsfile = req.url;
}

  if(nowdir != "css" && nowdir != "js" && nowdir != "login"){
  fs.readFile(__dirname + '/views/'+nowdir+'.html', 'utf-8', function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'});　//htmlファイルなんでhtml
    res.write(header_data + data + footer_data);
    res.end();
  });
  }else if(nowdir == "css"){
  fs.readFile(__dirname +'/public_html'+ cssfile , 'utf-8', function(err, data){
    res.writeHead(200, {'Content-Type': 'text/css'});　//CSSファイルなんでCSS
    res.write(data);
    res.end();
  });
  }else if(nowdir == "js"){
  fs.readFile(__dirname +'/public_html'+ jsfile , 'utf-8', function(err, data){
    res.writeHead(200, {'Content-Type': 'text/plain'});　//JSファイルなんでplain
    res.write(data);
    res.end();
  });
  }else if(nowdir == "login"){
    console.log(nowdir);
    
    //res.writeHead(302, {'Location': '/'});
    //res.end();
    if(req.method=='POST') {
   
        var data = '';
        req.setEncoding('utf8'); // 受信するレスポンスボディのエンコード形式をutf8に指定
        req.on('data', function(chunk) {
            console.log('chunk:', chunk);
            data += chunk;
        });
        req.on('end', function() {
            //console.log('data;', data);
            res.writeHead(200);
            res.end(JSON.stringify(data));
            server.close();
        });

    }    

  }

  

});
server.listen(settings.port,settings.host)
