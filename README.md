# xmen
Proyecto para prueba de empresa

1- Clonar proyecto
git clone https://github.com/edeani/xmen.git <br />

2- Instalamos dependencias:

Instalamos las librerias localmente<br />
$npm install

Instalamos serverless globalmente<br />
$npm install serverless --global

Librerias que son para el serverless offline y leer archivos<br />
$npm install fs path serverless-offline -D

Librerias para pruebas y coverage<br />
$npm i mocha chai nyc -D --global

3- Usar Visual Studio Code, si no lo tienes instalarlo <br />
4- Luego abrir el proyecto descargado <br />
5- Para ejecutar localmente con serverles, desde la raiź del proyecto digitamos: sls offline start --skipCacheInvalidation <br />
6-Con postman creamos el request para /mutant así:<br />
    url http://localhost:3000/dev/mutant<br />
    type POST<br />
    Body {<br />
          "dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]<br />
    }<br />
  Para stats:  <br />
    url http://localhost:3000/dev/stats      <br />
    type POST<br />
    

Los endpoints en aws son:<br />
  https://6wso52cvlg.execute-api.us-east-1.amazonaws.com/dev/mutant<br />
  https://6wso52cvlg.execute-api.us-east-1.amazonaws.com/dev/stats<br />

7- Hacemos los request con Postman.

# Test
Para ejecutar los tests localmente ejecutar desde la raíz: <br />

$nyc --reporter=html mocha --timeout 30000

El comando genera una carpeta coverage, con un index.html que muestra tanto el estado de las pruebas como el coverage en el código.
Abrir el archivo en un navegador para revisar.

