// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyAz0-PbXOtG5W_2LRaDKjWLN-Qu5VFejpU",
    authDomain: "descriassess.firebaseapp.com",
    databaseURL: "https://descriassess.firebaseio.com",
    projectId: "descriassess",
    storageBucket: "descriassess.appspot.com",
    messagingSenderId: "861606412349",
    appId: "1:861606412349:web:149bfae31c378ad2ceaa54",
    measurementId: "G-QJMDR54QGR"
  },
  API_URL : "http://localhost:3000"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
