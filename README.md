# xmen
Proyecto para prueba de empresa

1- Clonar proyecto
git clone https://github.com/edeani/xmen.git

2- Instalamos dependencias:

Instalamos las librerias localmente
$npm install

Instalamos serverless globalmente
$npm install serverless --global

Librerias que son para el serverless offline y leer archivos
$npm install fs path serverless-offline -D

Librerias para pruebas y coverage
$npm i mocha chai nyc -D --global

3- Usar Visual Studio Code, si no lo tienes instalarlo

4- Luego abrir el proyecto descargado

5- Para ejecutar localmente con serverles, desde la raiź del proyecto digitamos: sls offline start --skipCacheInvalidation
  
6-Con postman creamos el request para /mutant así:
    url http://localhost:3000/dev/mutant
    type POST
    Body {
          "dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
         }
  Para stats:  
    url http://localhost:3000/dev/stats      
    type POST
    

Los endpoints en aws son:

  https://6wso52cvlg.execute-api.us-east-1.amazonaws.com/dev/mutant
  https://6wso52cvlg.execute-api.us-east-1.amazonaws.com/dev/stats

7- Hacemos los request con Postman.
