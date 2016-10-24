"use strict";angular.module("myApp",["ui.router","services.config","ui.grid","ui.grid.resizeColumns","ui.grid.pagination","restangular","ui.bootstrap","naif.base64","webcam","angular-bind-html-compile"]).config(["$stateProvider","$urlRouterProvider","configuration","$httpProvider","RestangularProvider","$provide",function(e,t,n,o,r,a){r.setBaseUrl(n.apiEndpoint),o.interceptors.push("myMaskInterceptor"),a.decorator("GridOptions",["$delegate","i18nService",function(e,t){var n;return n=angular.copy(e),n.initialize=function(t){var n;return n=e.initialize(t)},t.setCurrentLang("es"),n}]),t.otherwise("/login"),e.state("login",{url:"/login",templateUrl:"views/login.html",controller:"LoginController"}).state("app",{url:"/panel",templateUrl:"views/panel/layout.html",controller:"MainController"}).state("app.404",{url:"/404",templateUrl:"404.html"}).state("app.inicio",{url:"/inicio",templateUrl:"views/panel/inicio.html"}).state("app.tarjeta_basica",{url:"/tarjeta_basica",templateUrl:"views/panel/tarjeta_basica.html",controller:"TarjetaBasicaController"}).state("app.tarjeta_basicat",{url:"/tarjeta_basicat",templateUrl:"views/panel/tarjeta_basicat.html",controller:"TarjetaBasicaController"}).state("app.consulta_tarjetas",{url:"/consulta_tarjetas",templateUrl:"views/panel/consulta_tarjetas.html",controller:"ConsultaTarjetaController"}).state("app.consulta_tarjetas_grid",{url:"/consulta_tarjetas_grid",templateUrl:"views/panel/consulta_tarjetas_grid.html",controller:"ConsultaTarjetagridController"})}]),angular.module("ngLocale",[],["$provide",function(e){var t={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{DATETIME_FORMATS:{AMPMS:["a.m.","p.m."],DAY:["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],ERANAMES:["antes de Cristo","después de Cristo"],ERAS:["a. C.","d. C."],FIRSTDAYOFWEEK:6,MONTH:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],SHORTDAY:["dom.","lun.","mar.","mié.","jue.","vie.","sáb."],SHORTMONTH:["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],WEEKENDRANGE:[5,6],fullDate:"EEEE, d 'de' MMMM 'de' y",longDate:"d 'de' MMMM 'de' y",medium:"dd/MM/y h:mm:ss a",mediumDate:"dd/MM/y",mediumTime:"h:mm:ss a","short":"dd/MM/yy h:mm a",shortDate:"dd/MM/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"$",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-¤",negSuf:"",posPre:"¤",posSuf:""}]},id:"es-mx",pluralCat:function(e,n){return 1==e?t.ONE:t.OTHER}})}]),angular.module("services.config",[]).constant("configuration",{apiEndpoint:"http://192.168.11.141:8083/api",secure:"false"}),angular.module("myApp").directive("headerPanel",function(){return{templateUrl:"views/directives/header.html",restrict:"E",replace:!0}}),angular.module("myApp").directive("sidebar",function(){return{templateUrl:"views/directives/sidebar.html",restrict:"E",replace:!0}}),angular.module("myApp").directive("footerPanel",function(){return{templateUrl:"views/directives/footer.html",restrict:"E",replace:!0}}),angular.module("myApp").directive("message",function(){return{template:'<div bind-html-compile="message.html"></div>',restrict:"E",replace:!0}}),angular.module("myApp").factory("myMaskInterceptor",["$q",function(e){var t=0;return{request:function(n){return 1===++t&&$("#gray-background").show(),n||e.when(n)},response:function(n){return 0===--t&&$("#gray-background").hide(),n||e.when(n)},responseError:function(n){return 0===--t&&$("#gray-background").hide(),e.reject(n)}}}]),angular.module("myApp").factory("ValidaService",function(){var e=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,t=/^[a-zA-Z0-9\.\, ñÑáéíóúüÁÉÍÓÚÜ]*$/,n=/^[a-zA-Z\. ñÑáéíóúÁÉÍÓÚ]*$/,o=/^[a-zA-Z\.\, ñÑáéíóúÁÉÍÓÚ]*$/,r=/^[0-9]*$/,a=/^[0-9]{1,7}(\.[0-9]{1,2})?$/,i=/^[0-9]{1,5}(\.[0-9]{1,2})?$/,l=/^[0-9 \.\-\(\)]*$/,s=/^[0-9 \.\-\(\)ext]*$/,c=/^[a-zA-Z0-9 \.\:\-\(\)]*$/,u=/^[a-zA-Z0-9\. ñÑáéíóúÁÉÍÓÚ\.\,\;\:\_\/\-\_\(\)\[\]\=\*\+]*$/,d=/^([A-ZÑ]{4})([0-9]{6})([A-ZÑ0-9]{3})+$/,m=/^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/,f=/^[0-9]{5}\/[0-9]{4}$/,g=["dd/MM/yyyy","yyyy/MM/dd","dd.MM.yyyy","shortDate"];return{validamail:function(t){var n=e;return n.test(t)},alfanumerico:function(e){var n=t;return n.test(e)},numerico:function(e){var t=r;return t.test(e)},moneda:function(e){var t=a;return t.test(e)},eshorario:function(e){var t=c;return t.test(e)},esnulo:function(e){return"undefined"==typeof e||null==e||""==e},toUTCDate:function(e){if(void 0==e)return null;var t=e.substring(0,4),n=parseInt(e.substring(5,7)),o=e.substring(8,10),r=e.substring(11,13),a=e.substring(14,16),i=e.substring(17,19),l=new Date(t,n-1,o,r,a,i);return l},StringtoDate:function(e){if(void 0==e)return null;var t=e.split("/"),n=new Date(t[2],t[1]-1,t[0]);return n},dateToString:function(e){if(void 0==e)return null;var t=(e.getDate()<10?"0":"")+e.getDate()+"/"+(e.getMonth()<9?"0":"")+(e.getMonth()+1)+"/"+e.getFullYear();return t},dateToStringYMD:function(e){if(void 0==e)return null;var t=e.getFullYear()+"/"+(e.getMonth()<9?"0":"")+(e.getMonth()+1)+"/"+(e.getDate()<10?"0":"")+e.getDate();return t},dateToISOString:function(e){if(void 0==e)return null;var t=e.toISOString();return t},addZero:function(e){return e<10&&(e="0"+e),e},dateToStringHHmm:function(e){var t=this.addZero(e.getHours())+":"+this.addZero(e.getMinutes());return t},StringtoName:function(e){return null!=e&&(e=e.toLowerCase(),e=e.replace(/ /g,"_"),e=e.replace(/á/g,"a"),e=e.replace(/é/g,"e"),e=e.replace(/í/g,"i"),e=e.replace(/ó/g,"o"),e=e.replace(/ú/g,"u")),e},mail_pattern:function(){return e},alfanumerico_pattern:function(){return t},alfanum_simbolos_pattern:function(){return u},numerico_pattern:function(){return r},moneda_pattern:function(){return a},moneda5_pattern:function(){return i},nombre_pattern:function(){return n},nombre_coma_pattern:function(){return o},telefono_pattern:function(){return l},telefono_ext_pattern:function(){return s},horario_pattern:function(){return c},RFC_pattern:function(){return d},CURP_pattern:function(){return m},folio_pattern:function(){return f},formats_date:function(){return g},disabled:function(e){$(e).attr("disabled",!0)},enabled:function(e){$(e).attr("disabled",!1)},get_browser:function(){var e=navigator.appVersion;return e.indexOf("MSIE")!==-1?"MSIE":e.indexOf("Trident")!==-1?"Trident":e.indexOf("Firefox")!==-1?"Firefox":e.indexOf("Chrome")!==-1?"Chrome":e.indexOf("Opera Mini")!==-1?"Opera Mini":e.indexOf("Opera")!==-1?"Opera":e.indexOf("Safari")!==-1?"Safari":"Desconocido"},getAniosCursados:function(e){for(var t=(new Date).getFullYear(),e=e,n=[],o=t;o>=e;o--){var r={};r.id=o,r.nombre=o,n.push(r)}return n},getMeses:function(){for(var e=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],t=[],n=0;n<e.length;n++){var o={};o.id=n+1,o.nombre=e[n],t.push(o)}return t},restaFechas:function(e,t){var n=e-t,o=Math.floor(n/864e5);return o},sumarDiasFecha:function(e,t){var n=parseInt(3024e6),o=e.getDate(),r=e.getMonth()+1,a=e.getFullYear(),i=e.getTime();n=parseInt(24*t*60*60*1e3);e.setTime(i+n);return o=e.getDate(),r=e.getMonth()+1,a=e.getFullYear(),new Date(a,r-1,o)},preventDefault:function(e){e=e||window.event,e.preventDefault&&e.preventDefault(),e.returnValue=!1},preventDefaultForScrollKeys:function(e){if(keys[e.keyCode])return preventDefault(e),!1},disableScroll:function(){window.addEventListener&&window.addEventListener("DOMMouseScroll",this.preventDefault,!1),window.onwheel=this.preventDefault,window.onmousewheel=document.onmousewheel=this.preventDefault,window.ontouchmove=this.preventDefault,document.onkeydown=this.preventDefaultForScrollKeys},enableScroll:function(){window.removeEventListener&&window.removeEventListener("DOMMouseScroll",this.preventDefault,!1),window.onmousewheel=document.onmousewheel=null,window.onwheel=null,window.ontouchmove=null,document.onkeydown=null}}}).directive("upperCase",function(){return{require:"ngModel",link:function(e,t,n,o){o.$parsers.unshift(function(e){return void 0!=e&&null!=e&&(e=e.toUpperCase()),e})}}}).directive("validaFechade",["ValidaService",function(e){return{require:"ngModel",link:function(t,n,o,r){r.$parsers.unshift(function(n){if(void 0!==t.busqueda.form.fechaa.$viewValue)var o=e.StringtoDate(t.busqueda.form.fechaa.$viewValue);return null!==n&&(n.setHours(0),n.setMinutes(0),n.setMinutes(0),n.setSeconds(0),n.setMilliseconds(0)),t.busqueda.form.fechaa.$setValidity("vfechafin",o>=n),n})}}}]).directive("validaFechaa",["ValidaService",function(e){return{require:"ngModel",link:function(t,n,o,r){r.$parsers.unshift(function(n){if(void 0!==t.busqueda.form.fechade.$viewValue)var o=e.StringtoDate(t.busqueda.form.fechade.$viewValue);return null!==n&&(n.setHours(0),n.setMinutes(0),n.setMinutes(0),n.setSeconds(0),n.setMilliseconds(0)),r.$setValidity("vfechafin",n>=o),n})}}}]),angular.module("myApp").factory("ConsultaService",["$q","$http","configuration","Restangular",function(e,t,n,o){return{getBlobURL:function(e){var t="onmessage = function (event) {                                 var xhr = new XMLHttpRequest();                                 xhr.onreadystatechange=function(){                                if (xhr.readyState==4 && xhr.status==200){                                    postMessage(xhr.responseText);                                }                            };                             xhr.open('GET', '"+n.apiEndpoint+e+"' , false);                             xhr.send();                             }";return URL.createObjectURL(new Blob([t]),{type:"application/javascript"})},getBlobURLParam1:function(e,t,n){return this.getBlobURL(e+"?"+t+"="+n)},getBlobURLParams:function(e,t){if(void 0!=t&&null!=t){for(var n="",o=0;o<t.length;o++)n+=t[o].label+"="+t[o].value+(o!=t.length-1?"&":"");return this.getBlobURL(e+"?"+n)}return this.getBlobURL(e)},getWorkerParams:function(t,n){var o=new Worker(this.getBlobURLParams(t,n)),r=e.defer();return o.addEventListener("message",function(e){r.resolve(JSON.parse(e.data))},!1),o.postMessage(""),r.promise},getWorker:function(e){return this.getWorkerParams(e,null)},getRestAngular:function(e){return o.one(e).get()},setRestAngular:function(e,t){return o.all(e).post(t)},getAbsoluteUrl:function(){var e=window.location.href;return e=e.substring(0,e.lastIndexOf("#"))},getLocalJSON:function(e){var n=this.getAbsoluteUrl()+"resources/"+e+".json";return t.get(n)}}}]),angular.module("myApp").factory("UtilService",["$timeout","$q",function(e,t){var n="data:application/vnd.ms-excel;base64,",o='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',r=function(e){return window.btoa(unescape(encodeURIComponent(e)))},a=function(e,t){return e.replace(/{(\w+)}/g,function(e,n){return t[n]})};return{StringtoName:function(e){return null!=e&&(e=e.toLowerCase(),e=e.replace(/ /g,"_"),e=e.replace(/á/g,"a"),e=e.replace(/é/g,"e"),e=e.replace(/í/g,"i"),e=e.replace(/ó/g,"o"),e=e.replace(/ú/g,"u")),e},get_browser:function(){var e=navigator.appVersion;return e.indexOf("MSIE")!==-1?"MSIE":e.indexOf("Trident")!==-1?"Trident":e.indexOf("Firefox")!==-1?"Firefox":e.indexOf("Chrome")!==-1?"Chrome":e.indexOf("Opera Mini")!==-1?"Opera Mini":e.indexOf("Opera")!==-1?"Opera":e.indexOf("Safari")!==-1?"Safari":"Desconocido"},tableToExcel:function(e,t){var i=this.StringtoName(t),l=$("#"+e),s={worksheet:t,table:l.html()},c=n+r(a(o,s)),u=document.createElement("a");u.href=c,u.download=i+".xls";var d=this.get_browser();return"Chrome"==d?(u.click(),null):u},muestra_pdf:function(t,n){e(function(){var e=navigator.userAgent.toLowerCase();if(e.indexOf("msie")!=-1)window.navigator.msSaveOrOpenBlob(t,n+".pdf");else if(e.indexOf("chrome")!=-1||e.indexOf("firefox")!=-1||e.indexOf("safari")!=-1){var o=(window.URL||window.webkitURL).createObjectURL(t),r=document.createElement("a");r.setAttribute("download",n+".pdf"),r.setAttribute("href",o),document.body.appendChild(r),r.click(),setTimeout(function(){document.body.removeChild(r),window.URL.revokeObjectURL(o)},100)}else if(e.indexOf("opera")!=-1){var o=(window.URL||window.webkitURL).createObjectURL(t);window.open(o,"_blank")}else e.indexOf("rident")!=-1?window.navigator.msSaveOrOpenBlob(t,n+".pdf"):alert("Desconozco el navegador del que me visitas")})},pieChart:function(){return{chart:{type:"pieChart",height:250,x:function(e){return e.key},y:function(e){return e.y},showLabels:!0,valueFormat:function(e){return d3.format(",.0f")(e)},duration:500,labelThreshold:.01,labelSunbeamLayout:!0,legendPosition:"top",noData:"No hay datos que mostrar",legend:{margin:{top:5,right:10,bottom:0,left:0}}}}},barChart:function(){return{chart:{type:"multiBarChart",height:250,margin:{top:20,right:20,bottom:120,left:45},clipEdge:!0,duration:500,stacked:!1,wrapLabels:!0,noData:"No hay datos que mostrar",controlLabels:{grouped:"Agrupados",stacked:"Apilados"},xAxis:{axisLabel:"",showMaxMin:!1,tickFormat:function(e){return e}},yAxis:{axisLabel:"",axisLabelDistance:-20,tickFormat:function(e){return d3.format(",.0f")(e)}}}}},gridOptions:function(){return{enableColumnMenus:!1,enableColumnResizing:!0,enableFiltering:!1,maxVisibleColumnCount:1e5,paginationPageSizes:[10,25,50,100],paginationPageSize:10,data:"result"}}}}]),angular.module("myApp").factory("WebCamService",["$q","$timeout",function(e,t){return{getOptions:function(){return{channel:{},webcamError:null,file:null,badjuntado:!1,file_error_tamano:!1}},onError:function(e,n){t(function(){e.$apply(function(){return n})})},makeSnapshot:function(t,n){var o=e.defer();if(t){var r=document.querySelector(n);if(!r)return;r.width=t.width,r.height=t.height;var a=r.getContext("2d"),i=this.getVideoData(t,0,0,t.width,t.height);a.putImageData(i,0,0);var l=this.sendSnapshotToServer(r.toDataURL());l.channel={},l.channel.video=t,o.resolve(l)}return o.promise},getVideoData:function(e,t,n,o,r){var a=document.createElement("canvas");a.width=e.width,a.height=e.height;var i=a.getContext("2d");return i.drawImage(e,0,0,e.width,e.height),i.getImageData(t,n,o,r)},sendSnapshotToServer:function(e){var t={};return t.file={},t.file.base64=e,t.badjuntado=!1,t},removeFile:function(e){e.file=null,e.badjuntado=!1,e.file_error_tamano=!1}}}]),angular.module("myApp").factory("MessageService",function(){var e;return{getMessage:function(e,t){var n='<div ng-if="true">\n                                       <div class="alert alert-content.type alert-dismissible" role="alert">\n                                        <button type="button" class="close" ng-click="close_message()" aria-label="Close"><span\n                                            aria-hidden="true">&times;</span></button>\n                                            content.text\n                                            </div>\n                                       </div>';return n=n.replace("content.show","true"),n=n.replace("content.text",e),n=n.replace("content.type",t)},success:function(t,n){e=t,e.message={},e.message.html=this.getMessage(n,"success")},error:function(t,n){e=t,e.message={},e.message.html=this.getMessage(n,"danger")},warning:function(t,n){e=t,e.message={},e.message.html=this.getMessage(n,"warning")},info:function(t,n){e=t,e.message={},e.message.html=this.getMessage(n,"info")},close:function(){e.message.html=null}}}),angular.module("myApp").factory("AuthService",["$state","$rootScope","$window",function(e,t,n){return{login:function(e){n.sessionStorage.setItem("session",JSON.stringify(e))},logout:function(){t.session=void 0,n.sessionStorage.clear(),e.go("login")},getSession:function(){return t.session=JSON.parse(n.sessionStorage.getItem("session")),t.session},isLoggedIn:function(){var t=this.getSession();null===t&&e.go("login")},getPermisos:function(){return this.getSession().permisos},getDatosUsuario:function(){return this.getSession().datosUsuario},setDatosUsuario:function(e,n){void 0!=e&&null!=e&&(t.session={},t.session.datosUsuario=e,t.session.permisos=n,t.session.logged=!0,this.login(t.session))}}}]),angular.module("myApp").factory("CalendarService",[function(){var e,t=["dd/MM/yyyy","yyyy/MM/dd","dd.MM.yyyy","shortDate"],n={formatYear:"yy",yearRange:1,startingDay:1};return{getOptions:function(o){return e=o,{format:t[0],dateOptions:n,open:function(t,n){t.preventDefault(),t.stopPropagation(),e.calendar[n]=!e.calendar[n]},disabled:function(e,t){return"day"===t&&(0===e.getDay()||6===e.getDay())}}}}}]),angular.module("myApp").controller("MainController",["$scope","$rootScope","AuthService",function(e,t,n){t.class_menu="sidebar-mini",e.bcollapse=!1,e.collapse=function(){e.bcollapse?t.class_menu="sidebar-mini":t.class_menu="sidebar-mini sidebar-collapse",e.bcollapse=!e.bcollapse},e.logout=function(){n.logout()},e.getUserLogged=function(){t.usuario=n.getDatosUsuario()}}]),angular.module("myApp").controller("TarjetaBasicaController",["$scope","ValidaService","ConsultaService","WebCamService","MessageService","AuthService","CalendarService",function(e,t,n,o,r,a,i){a.isLoggedIn(),e.cat={},e.forma={},e.calendar=i.getOptions(e),e.channel_one=o.getOptions(),e.channel_two=o.getOptions(),e.channel_three=o.getOptions(),e.getTiposId=function(){var t="tipo_documentos";n.getLocalJSON(t).then(function(t){e.tiposidlist=t.data,e.cat.tipo_id="1"})["catch"](function(e){console.log("Exception: ",e)})},e.getTiposId(),e.cat.nombre_uno="Juan",e.cat.nombre_dos="Carlos",e.cat.ap_paterno="Santana",e.cat.ap_materno="Flores",e.cat.nombre_m_tarjeta="JUAN CARLOS SANTANA FLOR",e.cat.fecha_nacimiento=new Date,e.cat.rfc="FESW840526",e.cat.num_id=11122222,e.cat.vigencia=2018,e.cat.domicilio="Domicilio conocido",e.cat.llave="SDFSDFSDF2343",e.cat.nom_empresa="Bimbo",e.cat.rfc_empresa="rfcbimbo",e.cat.rfc_rlegal="rfclegal",e.$watch("cat.tipo_id",function(t,n){void 0!==e.forma.form&&void 0!=t&&e.forma.form.tipo_id.$setValidity("error",""!=t)}),e.onError_one=function(t){console.log("onError_one"),console.log(t),e.$apply(function(){e.channel_one.webcamError=t})},e.onError_two=function(t){console.log("onError_two"),console.log(t),e.$apply(function(){e.channel_two.webcamError=t})},e.onError_three=function(t){console.log("onError_three"),console.log(t),e.$apply(function(){e.channel_three.webcamError=t})},e.makeSnapshot=function(t,n){var r;1==n?r=e.channel_one.channel.video:2==n?r=e.channel_two.channel.video:3==n&&(r=e.channel_three.channel.video),o.makeSnapshot(r,t).then(function(t){console.log(t),1==n?e.channel_one=t:2==n?e.channel_two=t:3==n&&(e.channel_three=t)})["catch"](function(e){console.log("Exception: ",e)})},e.quitar_foto=function(t){1==t?(o.removeFile(e.channel_one),$("#foto_one").val("")):2==t?(o.removeFile(e.channel_two),$("#foto_two").val("")):3==t&&(o.removeFile(e.channel_three),$("#foto_three").val(""))},e.on_change_input_one=function(){e.on_change_input(1)},e.on_change_input_two=function(){e.on_change_input(2)},e.on_change_input_three=function(){e.on_change_input(3)},e.on_change_input=function(t){1==t?e.channel_one.badjuntado=!0:2==t?e.channel_two.badjuntado=!0:3==t&&(e.channel_three.badjuntado=!0)},e.limpiar=function(){e.cat={},e.quitar_foto(1),e.quitar_foto(2),e.quitar_foto(3),e.forma.form.$setUntouched()},e.guardar=function(){var t=e.cat,n={};t.id_usuario=1,t.na_dia=e.cat.fecha_nacimiento.getDate(),t.na_mes=e.cat.fecha_nacimiento.getMonth()+1,t.na_anio=e.cat.fecha_nacimiento.getFullYear(),n.datos_tarjeta=t,n.cliente=t,n.documentos=[];var o={},a=e.channel_one.file;o.id_documento=1,o.ext=void 0==a.filename?"png":a.filename.substring(a.filename.indexOf(".")),o.doc_base64=a.base64,o.doc_base64=o.doc_base64.replace("data:image/png;base64,",""),n.documentos.push(o),o={},a=e.channel_two.file,o.id_documento=2,o.ext=void 0==a.filename?"png":a.filename.substring(a.filename.indexOf(".")),o.doc_base64=void 0==a.base64?"png":a.base64,o.doc_base64=o.doc_base64.replace("data:image/png;base64,",""),n.documentos.push(o),o={},a=e.channel_three.file,o.id_documento=3,o.ext=void 0==a.filename?"png":a.filename.substring(a.filename.indexOf(".")),o.doc_base64=void 0==a.base64?"png":a.base64,o.doc_base64=o.doc_base64.replace("data:image/png;base64,",""),n.documentos.push(o),e.limpiar(),r.success(e,"Datos guardados correctamente")},e.close_message=function(){r.close()}}]),angular.module("myApp").controller("LoginController",["$scope","$state","AuthService",function(e,t,n){e.usuario={user:null,password:null},e.ingresar=function(){n.setDatosUsuario(e.usuario,["tarjeta_basica","otro"]),t.go("app.tarjeta_basica")}}]),angular.module("myApp").controller("ConsultaTarjetaController",["$scope","$modal","ConsultaService",function(e,t,n){e.filteredlist=[],e.currentPage=1,e.numPerPage=10,e.maxSize=5,e.lista=[],e.cargainfo=function(){var t="data";n.getLocalJSON(t).then(function(t){e.lista=t.data;for(var n=0;n<t.length;n++)for(var o=0;o<t[n].documentos.length;o++)1==t[n].documentos[o].id_documento?t[n].ife_docum=t[n].documentos[o]:2==t[n].documentos[o].id_documento?t[n].domicilio_docum=t[n].documentos[o]:3==t[n].documentos[o].id_documento&&(t[n].ingresos_docum=t[n].documentos[o]);e.pagination(1)})["catch"](function(e){console.log("Exception: "+e)})},e.cargainfo(),e.pagination=function(t){e.currentPage=t;var n=(e.currentPage-1)*e.numPerPage,o=n+e.numPerPage;e.filteredlist=e.lista.slice(n,o)},e.openmodal=function(e){t.open({animation:!0,template:"<div style='text-align:right' class='modal-header'>\n                            <button class = 'btn btn-primary' ng-click = 'close()'> X </button>\n                            </div> \n                            <div class='modal-body' style='text-align:center;margin:0px;width:595px;height: 450px;overflow-y:scroll;'>\n                               <img class='img-responsive' class='col-xs-12' ng-src='"+e+"'>\n                            </div>",controller:"modalController"})}}]).controller("modalController",["$scope","$modalInstance",function(e,t){e.close=function(){t.close()}}]),angular.module("myApp").controller("ConsultaTarjetagridController",["$scope","$modal","$timeout","ConsultaService","UtilService","uiGridConstants",function(e,t,n,o,r,a){e.gridOptions=r.gridOptions(),e.gridOptions.columnDefs=[{field:"llave_cliente",displayName:"BCA / folio",headerCellClass:"cell_center",cellClass:"cell_center"},{field:"usuario",displayName:"Usuario",headerCellClass:"cell_center"},{field:"getNombreCompleto()",displayName:"Cliente",headerCellClass:"cell_center"},{field:"rfc",displayName:"RFC",headerCellClass:"cell_center",enableFiltering:!1},{field:"nom_empresa",displayName:"Empresa",headerCellClass:"cell_center"},{field:"rfc_empresa",displayName:"RFC Empresa",headerCellClass:"cell_center",cellClass:"cell_center",enableFiltering:!1},{displayName:"IFE",name:"ife",cellTemplate:'<div> <a ng-click="grid.appScope.openmodal(row.entity.ife_docum.ruta_documento)"><i class="fa fa-download" aria-hidden="true"></a></div>',headerCellClass:"cell_center",cellClass:"cell_center",enableFiltering:!1}],e.cargainfo=function(){var t="data";o.getLocalJSON(t).then(function(t){for(var n=t.data,o=0;o<n.length;o++)for(var r=0;r<n[o].documentos.length;r++)1==n[o].documentos[r].id_documento?n[o].ife_docum=n[o].documentos[r]:2==n[o].documentos[r].id_documento?n[o].domicilio_docum=n[o].documentos[r]:3==n[o].documentos[r].id_documento&&(n[o].ingresos_docum=n[o].documentos[r]);e.result=n,console.log(e.result),angular.forEach(e.result,function(e){e.getNombreCompleto=function(){return this.nombre_uno+" "+(null==this.nombre_dos?"":this.nombre_dos+" ")+" "+this.ap_paterno+" "+this.ap_materno},e.getLink=function(){return this.ife_docum.ruta_documento}}),e.result_excel=[];for(var o=0;o<e.result.length;o++)e.result_excel.push({"BCA / Folio":e.result[o].llave_cliente,Usuario:e.result[o].usuario,Cliente:e.result[o].nombre_uno+" "+(null==e.result[o].nombre_dos?"":e.result[o].nombre_dos+" ")+e.result[o].ap_paterno+" "+e.result[o].ap_materno,RFC:e.result[o].rfc,Empresa:e.result[o].nom_empresa,"RFC Empresa":e.result[o].rfc_empresa})})["catch"](function(e){console.log("Exception: "+e)})},e.cargainfo(),e.openmodal=function(e){t.open({animation:!0,template:"<div style='text-align:right' class='modal-header'>\n                            <button class = 'btn btn-primary' ng-click = 'close()'> X </button>\n                            </div> \n                            <div class='modal-body' style='text-align:center;margin:0px;width:595px;height: 450px;overflow-y:scroll;'>\n                               <img class='img-responsive' class='col-xs-12' ng-src='"+e+"'>\n                            </div>",controller:"modalController"})},e.gridOptions.onRegisterApi=function(t){e.gridApi=t},e.mostrar_filtros=function(){e.gridOptions.enableFiltering=!e.gridOptions.enableFiltering,e.gridApi.core.notifyDataChange(a.dataChange.COLUMN)};var i={headers:!0,sheetid:"Datos"};e.exportarExcel=function(){var t="lista.xlsx",n=window.confirm("¿En verdad deseas exportar a Excel?");1==n&&alasql.promise('SELECT * INTO XLSX("'+t+'",?) FROM ?',[i,e.result_excel]).then(function(e){})["catch"](function(e){console.log("Error: ",e)})}}]).controller("modalController",["$scope","$modalInstance",function(e,t){e.close=function(){t.close()}}]);