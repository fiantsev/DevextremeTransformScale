"use strict";
var DATA = require("./data.js");

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