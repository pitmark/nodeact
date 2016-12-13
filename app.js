var http = require('http'),
    fs =require('fs');　//ファイルシステムモジュールの読み込み
var server = http.createServer();
var settings = require('./settings');
var nowdir;

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

    if(nowdir != "css" && nowdir != "js" && nowdir != "login" && nowdir != "404"){
        fs.readFile(__dirname + '/views/layout.html', 'utf-8', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'});　//htmlファイルなんでhtml
            data = data.replace("content","content_"+ nowdir);
            res.write(data);
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
        if(req.method=='POST') {
   
            var data = '';
            req.setEncoding('utf8'); // 受信するレスポンスボディのエンコード形式をutf8に指定
            req.on('data', function(chunk) {
                data += chunk;
            });
            req.on('end', function() {
                json_data =JSON.parse(data);
                mysql_response(res,json_data);
            });
        }    
    }

});


function mysql_response(res,data){

    let mysql = require('mysql');
    let connection = mysql.createConnection({
        host : '172.17.0.1',
        user : settings.mysqluser,
        password : settings.mysqlpassword,
        port : 3306,
        database: 'react_DB'
    });

    connection.connect();

    connection.query('SELECT id,userid,password FROM users WHERE userid = "'+ json_data['userid'] +'" AND password = "'+ json_data['password'] +'" ;',function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        if(rows && rows.length){
            res.writeHead(200);
            res.end(JSON.stringify(rows[0]));
        }else{
            res.writeHead(200);
            res.end("0");
        }
    });

    connection.end();

}
server.listen(settings.port,settings.host)
