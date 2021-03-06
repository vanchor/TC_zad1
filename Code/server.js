const express = require('express')
const date = require('./getDate')  // The function that returns the current date and time
var http = require('http');
var satelize = require('satelize');

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', function(req, res){
    // getting ip from a third-party api
    http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
         resp.on('data', function(ip) {

            // Get data from ip, such as: country, longitude:, latitude and longitude
            satelize.satelize({ip:(String(ip))}, function(err, payload) {
                // Setting the timezone
                process.env.TZ = payload["timezone"];
                var s = "IP: " + ip + "<br>Data:  " + date.getDate() + "<br>TimeZone: " + payload["timezone"];
                    console.log(s); // Write data in logs
                    res.send(s); // Return data to client
            });
        });
    });
})

// Starting the port listener, and recording data in the logs
app.listen(PORT, () => console.log(`====== ` + date.getDate() + ` ======  \nYakorev Volodymyr\nRunning on port: ${PORT}`))