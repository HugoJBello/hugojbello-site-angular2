interface Config {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  URL_BASE:string;
  URL_BACKEND:string;

}
var prod:boolean = false;
var useLocalhost:boolean = false;

var port:string;
if (prod) {
  port = "";
  var urlBase = "https://hjbello-site.firebaseapp.com"
  //var url_base = 'https://hugojbello.github.io'
} else {
  port = "4200";
  var urlBase = 'http://localhost'
}

if (useLocalhost) {
  var urlBackcend="http://localhost:8080";
} else {
  var urlBackend = 'https://hjbello-site.herokuapp.com';
}

export var CONFIG: Config = {
  CLIENT_ID: 'YTP9te890uUMscjE2sbA_IE51ztOMWNB',
  CLIENT_DOMAIN: 'cam-viewer-hjbello.eu.auth0.com', // e.g., you.auth0.com
  //URL_BASE:'hjbello.hopto.org',
  URL_BASE: urlBase,
  URL_BACKEND: 'https://hjbello-site.herokuapp.com',//"http://localhost:8080",
  AUDIENCE: 'https://cam-viewer-hjbello.eu.auth0.com/userinfo', // e.g., http://localhost:3001
  REDIRECT: urlBase + ':' + port + '/callback',
  SCOPE: 'openid profile email',
   

};
