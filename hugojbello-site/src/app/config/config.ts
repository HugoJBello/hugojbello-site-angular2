interface Config {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  URL_BASE:string;
  URL_BACKEND:string;
  MAIN_PAGE_NAME:string;
  ABOUT_PAGE_NAME:string;
  PERSONAL_INFO_PAGE_NAME:string;

}
var prod:boolean = true;
var useLocalhost:boolean = false;
var spanishVersion:boolean = false;

var port:string;

if (prod) {
  port = "";
  if(spanishVersion) {
    var urlBase = "https://hjbello-blog-es.firebaseapp.com";
  } else {
    var urlBase = "https://hjbello-site.firebaseapp.com"; 
  }
  
} else {
  port = "4200";
  var urlBase = "http://localhost";
}

if (useLocalhost) {
  var urlBackend="http://localhost:8080";
} else {
  if (spanishVersion) {
    var urlBackend = "https://hjbello-blog-es-hjbello-db.193b.starter-ca-central-1.openshiftapps.com";
  } else {
    var urlBackend = "https://hjbello-site-hjbello-site.7e14.starter-us-west-2.openshiftapps.com"; // 'https://hjbello-site.herokuapp.com'
  }
}

export var CONFIG: Config = {
  CLIENT_ID: 'YTP9te890uUMscjE2sbA_IE51ztOMWNB',
  CLIENT_DOMAIN: 'cam-viewer-hjbello.eu.auth0.com', // e.g., you.auth0.com
  URL_BASE: urlBase,
  URL_BACKEND: urlBackend,
  AUDIENCE: 'https://cam-viewer-hjbello.eu.auth0.com/userinfo', 
  REDIRECT: urlBase + ':' + port + '/callback',
  SCOPE: 'openid profile email',
  MAIN_PAGE_NAME:"main_page",
  ABOUT_PAGE_NAME:"about_page",
  PERSONAL_INFO_PAGE_NAME:"personal_info"

};
