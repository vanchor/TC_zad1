# <p align="center">LABORATORIUM PROGRAMOWANIA APLIKACJI W CHMURACH OBLICZENIOWYCH</p>

###### <p align="end">Yakorev Volodymyr GL 6.3</p>

## CZĘŚĆ OBOWIĄZKOWA 

### 1. (max. 10%)

Plik server.js
```js
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
```

Plik getDate.js:
```js
function getDate(){
    var today = new Date();
    return today.getDate() + '.' + (today.getMonth()+1) + '.' +  today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
}
exports.getDate = getDate
```

a.

| ![Uruchomienie serwera i tekst w logach](/Images/r1.png) |
|:--:|
| *Rys.1 Uruchomienie serwera i tekst w logach* |


b.

![Strona informująca o adresie IP klienta](/Images/r2.png)
|:--:|
*Rys.2 Strona informująca o adresie IP klienta i na podstawie tego adresu IP, o dacie i godzinie w jego strefie czasowej*




* * *
### 2. (max. 50%)
Plik Dockerfile:
```dockerfile
#Yakorev Volodymyr
FROM node:16.15.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]
```

Plik .dockerignore:
```
node_modules
npm-debug.log
```




* * *
### 3. (max. 20%)
Plik Dockerfile:

a.    ```docker build . -t vy_zadanie1```

![Konsola](/Images/r3.png)

b.    ```docker run -p 3000:3000 -d vy_zadanie1```

![Konsola](/Images/r4.png)

![Konsola](/Images/r5.png)

c.    ```docker logs <CONTAINER ID>```

![Konsola](/Images/r6.png)

Czasy w logach i po stronie klienta są różne. Dzieje się tak, ponieważ nie jest określona strefa czasowa po stronie serwera. Z tego powodu czas serwera jest ustawiony na +0 (w tym przypadku  07:08:09) , a czas klienta na +2 (09:08:23)

d.




* * *
### 4. (max. 20%)

![Buildx ls](/Images/r7_1.png)

![Instalacja pakietu QEMU w lokalnym systemie plikó](/Images/r7_2.png)<br>
*Rys. 3 Instalacja pakietu QEMU w lokalnym systemie plików*



![Utworzenie środowiska budowania obrazów](/Images/r8_1.png)

![Utworzenie środowiska budowania obrazów](/Images/r8_2.png)<br>
*Rys.4 Utworzenie środowiska budowania obrazów* 




![Budowanie](/Images/r9.png)

![Sprawdzanie](/Images/r10.png)

![Dockerhub](/Images/r11.png)

Link na Dockerhub: [DockerHub Page](https://hub.docker.com/repository/docker/vanchor/zadanie1)
