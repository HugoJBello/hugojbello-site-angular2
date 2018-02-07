interface Config {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  URL_BASE:string;

}
var prod:boolean = false;
var port:string;
if (prod) {
  port = "";
  var url_base = 'https://hugojbello.github.io'
} else {
  port = "4200";
  var url_base = 'http://localhost'
}


export var CONFIG: Config = {
  CLIENT_ID: 'YTP9te890uUMscjE2sbA_IE51ztOMWNB',
  CLIENT_DOMAIN: 'cam-viewer-hjbello.eu.auth0.com', // e.g., you.auth0.com
  //URL_BASE:'hjbello.hopto.org',
  URL_BASE: url_base,
  AUDIENCE: 'https://cam-viewer-hjbello.eu.auth0.com/userinfo', // e.g., http://localhost:3001
  REDIRECT: url_base + ':' + port + '/callback',
  SCOPE: 'openid profile email',
  

};
