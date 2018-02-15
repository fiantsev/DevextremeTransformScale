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

var DATA = __webpack_require__(1);

var pivotDSConfig = {
    remoteOperations: true,
    
    store: DATA.customStore,
    fields:[
        {caption: "OCCUPATION", dataField:"occupation", area:"row"},
        {caption: "SERNAME", dataField:"sername", area:"row"},
        {caption: "NAME", dataField:"name", area:"row"},
        {caption: "COUNTRY", dataField:"country", area:"column"},
        {caption: "CITY", dataField:"city", area:"column"},
        {caption: "EXPERIENCE", dataField:"experience", dataType: "number", area:"data", summaryType:"sum"},
        {caption: "AGE", dataField:"age", dataType: "number", summaryType:"sum"},
        {caption: "SEX", dataField:"sex", dataType: "string"},
    ],
};
var pivotDS = new DevExpress.data.PivotGridDataSource(pivotDSConfig);
DATA.store.on("modified", ()=>pivotDS.reload());
// pivotDS.filter("name", "=", "sername")

$("#table").resizable({ handles: "n, e, s, w, ne, se, sw, nw", resize: function(){ pivot.updateDimensions(); } });

var pivot = $("#content").dxPivotGrid({
    showRowGrandTotals: false,
    showColumnGrandTotals: false,
    showRowTotals: false,
    showColumnTotals: false,
    dataSource: pivotDS,
}).dxPivotGrid("instance");

//********************************************************/
window.data = DATA.data;
window.store = DATA.store;
window.customStore = DATA.customStore;
window.log = console.log;
window.pivotDS = pivotDS;
window.pivot = pivot;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var data = [
    {id:1,sex:"M", age:28, country:"Japan",city:"Kyoto",name:"Sergey", sername:"Fiantsev", occupation:"Programmer", experience: 1},
    {id:2,sex:"M", age:28, country:"Russia",city:"Moscow",name:"Pashaa", sername:"Baykov", occupation:"Programmer", experience: 2},
    {id:3,sex:"M", age:23, country:"Russia",city:"Moscow",name:"Ruslan", sername:"Balkarov", occupation:"Programmer", experience: 3},
    {id:4,sex:"M", age:39, country:"Japan",city:"Tokyo",name:"Aleksey", sername:"Kuznetsov", occupation:"Programmer", experience: 4},
    {id:5,sex:"M", age:39, country:"Japan",city:"Tokyo",name:"Aleksey", sername:"Kuznetsov", occupation:"Programmer", experience: 5},
    {id:6,sex:"M", age:28, country:"Japan",city:"Kyoto",name:"Sergey", sername:"Fiantsev", occupation:"Programmer", experience: 4},
    {id:7,sex:"M", age:28, country:"USA",city:"Boston",name:"Pasha", sername:"Baykov", occupation:"Programmer", experience: 7},
    {id:7,sex:"M", age:28, country:"USA",city:"Boston",name:"Sergey", sername:"Fiantsev", occupation:"Programmer", experience: 7},
    {id:7,sex:"M", age:40, country:"USA",city:"New_York",name:"Tyuldin", sername:"Pasha", occupation:"Tester", experience: 9},
    {id:7,sex:"M", age:40, country:"USA",city:"New_York",name:"Antipov", sername:"Nikolay", occupation:"Tester", experience: 13},
];

var store = new DevExpress.data.ArrayStore({
    key: "id",
    data: data,
});

// store.on("modified", ()=>console.log("Modified"));

var customStore = new DevExpress.data.CustomStore({
    loadMode: "raw",
    load: (opt) => {
        debugger;
        console.log(opt);
        if(opt.skip === 0 && opt.take === 20)
            return store.load();
            //return store.load().then(r=>[r[0]]);
        else
            return store.load();
    },
    insert: () => store.insert()
});

module.exports = {
    data: data,
    store: store,
    customStore: customStore,
};

// window.ds = new DevExpress.data.DataSource({store:store})

/***/ })
/******/ ]);