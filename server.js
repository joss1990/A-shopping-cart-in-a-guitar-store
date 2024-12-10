const http = require('http');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test'
});

connection.connect();

http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
    
    const urlParts = req.url.split('/');
    const action = urlParts[1];
    const guitarsID = parseInt(urlParts[2]);   

    if (action == 'add') {
        connection.query('SELECT * FROM guitars WHERE guitarsID=' + guitarsID, function (_, results) {
            let count = results[0].amount;
            count += 1;
            console.log("action: " + action + ",  " + results[0].guitarName + ': ' + count);
            connection.query('UPDATE guitars SET amount = ' + count + ' WHERE guitarsID = ' + guitarsID, function () { });
            res.end(count.toString());
        });
    }

    if (action == 'remove') {
        connection.query('SELECT * FROM guitars WHERE guitarsID=' + guitarsID, function (_, results) {
            let count = results[0].amount;
            if (results[0].amount > 0) {
                count -= 1;
                console.log("action: " + action + ",  " + results[0].guitarName + ': ' + count);
                connection.query('UPDATE guitars SET amount = ' + count + ' WHERE guitarsID = ' + guitarsID, function () { });
                res.end(count.toString());
            }        
        });
    }

    if (action == 'check') {
        connection.query('SELECT * FROM guitars WHERE guitarsID=' + guitarsID, function (_, results) {
            let count = results[0].amount;
            console.log("action: " + action + ",  " + results[0].guitarName + ': ' + count);
            connection.query('UPDATE guitars SET amount = ' + count + ' WHERE guitarsID = ' + guitarsID, function () { });
            res.end(count.toString());
        });
    }

    if (action == 'clear') {
        connection.query('SELECT * FROM guitars WHERE guitarsID=' + guitarsID, function (_, results) {
            let count = results[0].amount;
            count = 0;
            console.log("action: " + action + ",  " + results[0].guitarName + ': ' + count);
            connection.query('UPDATE guitars SET amount = ' + count + ' WHERE guitarsID = ' + guitarsID, function () { });
            res.end(count.toString());
        });
    }

}).listen(3000); 