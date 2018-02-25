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
  BLOG_VERSION:boolean,
  APP_ID:string,
  APP_NAME:string

}
var prod:boolean = true;
var useLocalhost:boolean = false;
var blogVersion:boolean = false;

var port:string = "";

if (prod) {
  var port = "";
  if(blogVersion) {
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
  if (blogVersion) {
    var urlBackend = 'https://hjbello-site.herokuapp.com'; //= "https://hjbello-blog-es-hjbello-db.193b.starter-ca-central-1.openshiftapps.com";
  } else {
    var urlBackend = 'https://hjbello-site.herokuapp.com'; // https://hjbello-site-hjbello-site.7e14.starter-us-west-2.openshiftapps.com"; // 
  }
}

var appId = (blogVersion) ? "blog": "page";
var mainPage = "main_entry" + "_" + appId; //(blogVersion) ? "main_page_blog" : "main_page" ;
var aboutPage = "about_entry" + "_" + appId; //(blogVersion) ? "about_page_blog" : "about_page" ;
var personalInfo = "main_entry" + "_" + appId; // (blogVersion) ? "personal_info_blog" : "personal_info";
var appName = (blogVersion) ? "Hugo J. Bello": "Hugo J. Bello";

export var CONFIG: Config = {
  CLIENT_ID: 'YTP9te890uUMscjE2sbA_IE51ztOMWNB',
  CLIENT_DOMAIN: 'cam-viewer-hjbello.eu.auth0.com', // e.g., you.auth0.com
  APP_NAME: appName,
  URL_BASE: urlBase,
  URL_BACKEND: urlBackend,
  AUDIENCE: 'https://cam-viewer-hjbello.eu.auth0.com/userinfo', 
  REDIRECT: urlBase + ':' + port + '/callback',
  SCOPE: 'openid profile email',
  MAIN_PAGE_NAME: mainPage,
  ABOUT_PAGE_NAME: aboutPage,
  PERSONAL_INFO_PAGE_NAME: personalInfo,
  BLOG_VERSION: blogVersion,
  APP_ID: appId

};
