/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var store = new DevExpress.data.CustomStore({
    key: "OrderID",
    load: function(opt){
        var d = $.Deferred();
        var url = `http://${window.location.hostname}:3333/api`;
        fetch(url, {method:"POST", body: JSON.stringify(opt)})
            .then((r) => r.json() )
            .then((r) => {
                if(r.data)
                    return d.resolve(r.data, { summary: r.summary });
                else
                    return d.resolve(r);
            });

        return d.promise();
    }
});

var pivotDSConfig = {
    // retrieveFields: true,
    remoteOperations: true,
    store: store,
    // store: DATA.customStore,
    fields:[
        { dataField: "ShipCountry", area: "row" },
        { dataField: "ShipCity", area: "row" },
        { dataField: "ShipPostalCode", area: "row" },
        { dataField: "SalesAmount", caption: "Sale Amount", format: { type: "currency", presicion: 2 }, summaryType: "sum", area: "data" }
    ],
};
var pivotDS = new DevExpress.data.PivotGridDataSource(pivotDSConfig);
// DATA.store.on("modified", ()=>pivotDS.reload());
// pivotDS.filter("name", "=", "sername")

$("#table").resizable({ handles: "n, e, s, w, ne, se, sw, nw", resize: function(){ pivot.updateDimensions(); } });

var pivot = $("#content").dxPivotGrid({
    stateStoring: {
        enabled: true,
        type: "localStorage",
        storageKey: "pivotgrid"
    },
    // rowHeaderLayout: "tree",
    wordWrapEnabled: false,
    showRowGrandTotals: false,
    showColumnGrandTotals: false,
    showRowTotals: false,
    showColumnTotals: false,
    dataSource: pivotDS,
}).dxPivotGrid("instance");

//********************************************************/
window.log = console.log;
window.pivotDS = pivotDS;
window.pivot = pivot;
window.store = store;

/***/ })
/******/ ]);