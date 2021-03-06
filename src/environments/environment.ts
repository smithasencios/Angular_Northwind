// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ApiUrl: "http://192.168.39.190:30101/",
  Auth0ClientId: "V9XlxIdGhcS8gv0KyVdKZEXhs9rDqY8P",
  Auth0Domain: "dev-uq9rrgqz.auth0.com",
  AuthAudience: "http://192.168.39.190:30101",
  firebase: {
    apiKey: 'AIzaSyBmnJ9IXmdC6tnAr3TJ73so7041irIPtLc',
    projectId: 'angular-northwind'
  }
  //you have to run this : sudo minikube service northwind-api-svc --url
  //and copy the result in ApiUrl
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
