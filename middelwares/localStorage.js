// localStorageConfig.js

const { LocalStorage } = require('node-localstorage');

// Ruta donde se almacenarán los datos del local storage
const localStoragePath = './localStorage';

// Capacidad máxima del almacenamiento local (en bytes)
const localStorageSize = 5 * 1024 * 1024; // 5 MB

// Instanciar el almacenamiento local
const localStorage = new LocalStorage(localStoragePath, localStorageSize);

// Exportar el almacenamiento local para ser utilizado en otros módulos
module.exports = localStorage;
