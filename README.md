# angular-lte
Template admin-lte para Angular 1.5.8 con las siguientes funcionalidades:

- Template con menu izquierdo, header, footer y area para carga de páginas.
- Login que redirige a la página de inicio e inicia una sesión en el navegador. 
  * Si no se colocan datos mostrará mensaje de advertencia
- Manejo de sesiones, esta durará hasta que se haga logout, se cierre el navegador o 
  expire el tiempo de la sesión el cual es configurable
  * Acceso a páginas de acuerdo a permisos del usuario
- Formulario con validaciones de campos.
  * Webcam para navegador
  * Adjuntar una imagen
- Listar registros y mostrarlos en una tabla html con paginador
  * Mostrar una imagen con modal
- Listar registros y mostrarlos en una tabla de ui-grid
  * Mostrar una imagen con modal
  * Mostar filtros para buscar en la tabla
  * Exportar a Excel valores de la tabla
- Genera las gráficas de pie y de barras
- Configuración del archivo gulp para generar el proyecto compilado para subir a un servidor.


Utiliza las siguientes librerias

- **"angular": "1.5.8"**  Libreria principal de angular
- **"angular-bootstrap": "0.13.0"** Libreria para enlazar angular con bootstrap
- **"angular-ui-router": "0.2.15"** Libreria para manejar las rutas state
- **"font-awesome": "4.5.0"** Libreria para los íconos font-awesome
- **"jquery": "^3.1.0"** Libreria para la funcionalidad de jquery
- **"bootstrap": "~3.3.6"** Libreria de bootstrap
- **"angular-ui-grid": "^3.2.1"** Libreria para uso de tablas de datos
- **"Ionicons": "ionicons#2.0.1"** Libreria para utilizar los íconos de ionic
- **"restangular": "^1.5.2"** Libreria para realizar consultas a WebServices REST
- **"webcam-directive": "~3.0.0"** Libreria para utilizar la cámara web desde el navegador compatible con Chrome
- **"angular-base64-upload": "~0.1.11"** Libreria para subir archivos como base 64
- **"angular-bind-html-compile": "^1.3.0"** Libreria para renderizar el código html de un string
- **"alasql": "^0.3.2"** Librería que exporta un json a Excel
- **"angular-nvd3": "^1.0.9"** Librería que genera gráficas
- **"ng-idle": "~1.1.0"** Librería para medir el tiempo de inactividad en la página 

### Clonar proyecto

Clonar repositorio de lte-angular-seed utilizando [git][git]:

```
git clone https://github.com/ricpato07/lte-angular-seed.git
cd lte-angular-seed
```

### Instalar dependencias

Tenemos dos clases de dependencias en este proyecto: herramientas y codigó del framework de Angular.
Las herramientas nos ayudan a administrar y probar la aplicación.

* Obtenemos las herramientas a través de `npm`, el [administrador de paquetes npm][npm].
* Obtenermos el código Angular a través de `bower`, el [administrador de paquetes de código del lado del cliente][bower].

Tenemos preconfigurado `npm` para correr automáticamente `bower` así que podemos ejecutar simplemente:

```
npm install
```
Esto nos descargará las dependencias del archivo package.json y bower.json

Si queremos importar únicamente las librerías de bower utilizamos la instrucción

```
bower install
```

### Correr la aplicación

Tenemos preconfigurado el proyecto para correr con el servidor browserSync. Para iniciar el servidor 
colocamos:

```
gulp serve
```
Si no abre la página automáticamente colocamos la dirección `http://localhost:3000/#/login`.



## Directorios

```
app/                    --> carpeta que contiene todos los archivos de la aplicación
 bower_components/      --> carpeta que contiene las librerías descargadas con bower
 config/                --> carpeta que contiene los archivos con las variables utilizadas para desarrollo, pruebas y producción
  config.js              --> archivo que se utiliza para generar una copia reemplazando las variables dependiendo del ambiente
  local.json             --> archivo con las variables utilizadas para ambiente local
  pruebas.json           --> archivo con las variables utilizadas para ambiente de pruebas
  produccion.json        --> archivo con las variables utilizadas para ambiente de producción
 css/                   --> carpeta que contiene los estilos utilizados en el sistema
  app.css                --> principal archivo de estilos  
 images/                --> carpeta que incluye las imágenes utilizadas en la aplicación
 js/                    --> carpeta que contiene las carpetas con los archivos js clasificados
  configuration/         --> carpeta que contiene el archivo config.js
    config.js              --> archivo que contiene las variables de configuración de la aplicación
  controllers/           --> carpeta que contiene los controladores js 
  directives/            --> carpeta que contiene las directivas js 
  services/              --> carpeta que contiene los servicios js
  app.js                 --> principal archivo js de la aplicación
 views/                 --> carpeta que contiene los archivos html     
 404.html               --> archivo html de página no encontrada
 favicon.ico            --> archivo ico con el ícono de la universidad
 index.html             --> archivo principal donde inicia la aplicación
dist/                   --> carpeta que contiene las librerias js, páginas html y estilos para desplegar
node_modules/           --> contiene las librerías descargadas por npm
.gitignore              --> archivo que indica las carpetas o archivos que no se van a subir a git 
LICENSE                 --> descripción del tipo de licencia MIT 
README.md               --> archivo LEEME
bower.json              --> archivo de configuración para bower
gulpfile.js             --> archivo de configuración para el gulp
package.json            --> archivo de configuración para npm
```


[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[browserSync]: https://www.browsersync.io/docs/gulp
