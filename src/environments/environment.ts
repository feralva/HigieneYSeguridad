// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyCfPfJVFjV2bSgonfSOJ7EyQCSlWGPohzA",
    authDomain: "higiene-y-seguridad-feaf5.firebaseapp.com",
    databaseURL: "https://higiene-y-seguridad-feaf5.firebaseio.com",
    projectId: "higiene-y-seguridad-feaf5",
    storageBucket: "higiene-y-seguridad-feaf5.appspot.com",
    messagingSenderId: "350110028273",
    appId: "1:350110028273:web:6a08cf1d3ee835d8ea7450"
  },
  rutaFotosEmpleadosBase: 'FotosEmpleados',
  rutaFotosEmpresaBase: 'FotosEmpresas',
  rutaFotosClienteBase: 'FotosEmpresas',
  UrlBaseApi: 'https://localhost:44380/api/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
